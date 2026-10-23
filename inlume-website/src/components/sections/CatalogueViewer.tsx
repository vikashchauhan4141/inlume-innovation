'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaCompress,
  FaBook,
  FaSpinner,
  FaArrowLeft,
} from 'react-icons/fa';
import type { CatalogueItem } from '@/data/catalogues';

/* ─── PDF.js CDN versions ─── */
const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

/* ─── Types ─── */
type PdfjsLib = {
  getDocument: (src: { url: string; cMapUrl: string; cMapPacked: boolean }) => { promise: Promise<PdfDoc> };
  GlobalWorkerOptions: { workerSrc: string };
};
type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage>;
};
type PdfPage = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (ctx: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
};

/* ─────────────────────────────────────
   SINGLE PAGE CANVAS RENDERER
───────────────────────────────────── */
function PdfPageCanvas({
  pdfDoc,
  pageNum,
  targetWidth,
  isCurrent,
  accentColor,
}: {
  pdfDoc: PdfDoc;
  pageNum: number;
  targetWidth: number;
  isCurrent: boolean;
  accentColor: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    setRendered(false);

    let cancelled = false;
    pdfDoc.getPage(pageNum).then((page) => {
      if (cancelled) return;
      const dpr = window.devicePixelRatio || 1;
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = (targetWidth / baseViewport.width) * dpr;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${Math.round(viewport.height / dpr)}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task as unknown as { cancel: () => void };
      (task as unknown as { promise: Promise<void> }).promise
        .then(() => { if (!cancelled) setRendered(true); })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
      try { renderTaskRef.current?.cancel(); } catch {}
    };
  }, [pdfDoc, pageNum, targetWidth]);

  return (
    <div className="relative">
      {!rendered && (
        <div
          className="flex items-center justify-center bg-slate-800/80 rounded-xl animate-pulse"
          style={{ width: targetWidth, minHeight: Math.round(targetWidth * 1.414) }}
        >
          <FaSpinner className="w-7 h-7 text-slate-500 animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="rounded-xl block"
        style={{
          display: rendered ? 'block' : 'none',
          maxWidth: '100%',
          boxShadow: isCurrent
            ? `0 0 0 2px ${accentColor}, 0 24px 64px rgba(0,0,0,0.6)`
            : '0 8px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.3s',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN VIEWER
───────────────────────────────────── */
interface CatalogueViewerProps {
  catalogue: CatalogueItem;
}

export default function CatalogueViewer({ catalogue }: CatalogueViewerProps) {
  const [pdfjsLib, setPdfjsLib] = useState<PdfjsLib | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PdfDoc | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [baseWidth, setBaseWidth] = useState(800);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'scroll' | 'single'>('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Load PDF.js from CDN once ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    import(/* webpackIgnore: true */ PDFJS_CDN)
      .then((lib: unknown) => {
        const pdfjs = lib as PdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        setPdfjsLib(pdfjs);
      })
      .catch((err: Error) => {
        setLoadError('Failed to load PDF engine: ' + err.message);
        setIsLoading(false);
      });
  }, []);

  /* ── Load document whenever catalogue or pdfjs changes ── */
  useEffect(() => {
    if (!pdfjsLib) return;
    setIsLoading(true);
    setLoadError(null);
    setPdfDoc(null);
    setNumPages(0);
    setCurrentPage(1);
    pageRefs.current = [];

    pdfjsLib
      .getDocument({
        url: catalogue.file,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/',
        cMapPacked: true,
      })
      .promise.then((doc) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setLoadError(err.message);
        setIsLoading(false);
      });
  }, [pdfjsLib, catalogue.file]);

  /* ── Measure container width ── */
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        const w = wrapperRef.current.clientWidth - 40;
        setBaseWidth(Math.min(Math.max(w, 320), 960));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [isFullscreen]);

  /* ── Scroll-based page tracking ── */
  useEffect(() => {
    if (viewMode !== 'scroll' || numPages === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const idx = pageRefs.current.indexOf(best.target as HTMLDivElement);
          if (idx !== -1) setCurrentPage(idx + 1);
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    );
    pageRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [viewMode, numPages, pdfDoc]);

  /* ── Fullscreen listener ── */
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const goToPage = useCallback(
    (n: number) => {
      const p = Math.max(1, Math.min(n, numPages));
      setCurrentPage(p);
      if (viewMode === 'scroll') {
        pageRefs.current[p - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [numPages, viewMode]
  );

  const handleZoom = (delta: number) =>
    setScale((s) => parseFloat(Math.max(0.5, Math.min(2.5, s + delta)).toFixed(1)));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement('a');
    a.href = catalogue.file;
    a.download = `INLUME_${catalogue.label.replace(/ /g, '_')}_Catalogue.pdf`;
    a.click();
    setTimeout(() => setDownloading(false), 2500);
  };

  const pageWidth = Math.round(baseWidth * scale);

  /* ══════════════════════════════════════ RENDER ══════════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: '#080f1a' }}>

      {/* ══ HERO ══ */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #020c18 0%, #062340 55%, ${catalogue.gradientFrom}55 100%)`,
          paddingTop: '80px',
        }}
      >
        {/* Glow orb */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${catalogue.accentColor}28 0%, transparent 70%)` }} />
        <div className="absolute -bottom-20 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 pb-12 pt-8">
          {/* Back link */}
          <Link
            href="/catalogues"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:text-white"
            style={{ color: '#475569' }}
          >
            <FaArrowLeft className="w-3 h-3" />
            All Catalogues
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Tag icon */}
            <div className="flex-shrink-0">
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center font-black text-2xl tracking-wider transition-all"
                style={{
                  background: `linear-gradient(135deg, ${catalogue.gradientFrom}, ${catalogue.gradientTo})`,
                  boxShadow: `0 0 80px ${catalogue.accentColor}50`,
                  color: '#fff',
                }}
              >
                {catalogue.tag}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: `${catalogue.accentColor}18`,
                    color: catalogue.accentColor,
                    border: `1px solid ${catalogue.accentColor}40`,
                  }}>
                  ⚡ Product Catalogue
                </span>
                {numPages > 0 && (
                  <span className="text-[11px] text-slate-400 font-medium bg-slate-800 px-3 py-1.5 rounded-full">
                    {numPages} Pages
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                {catalogue.label}
              </h1>
              <p className="text-slate-300 text-base md:text-lg mb-1.5">{catalogue.subtitle}</p>
              <p className="text-slate-500 text-sm italic">&ldquo;{catalogue.tagline}&rdquo;</p>
            </div>

            {/* Download CTA */}
            <div className="flex-shrink-0">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm transition-all duration-300"
                style={{
                  background: downloading
                    ? 'rgba(255,255,255,0.05)'
                    : `linear-gradient(135deg, ${catalogue.gradientFrom}, ${catalogue.gradientTo})`,
                  color: downloading ? '#475569' : '#fff',
                  boxShadow: downloading ? 'none' : `0 10px 40px ${catalogue.accentColor}50`,
                }}
              >
                <FaDownload className={`w-4 h-4 ${downloading ? 'animate-bounce' : 'group-hover:-translate-y-0.5 transition-transform'}`} />
                {downloading ? 'Downloading…' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STICKY TOOLBAR ══ */}
      <div
        className="sticky top-[64px] md:top-[80px] z-30"
        style={{
          background: 'rgba(8,15,26,0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 flex-wrap">

          {/* Page navigation */}
          <div className="flex items-center bg-slate-800 rounded-xl px-1.5 py-1 gap-0.5">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1 px-2">
              <input
                type="number" min={1} max={numPages || 1} value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
                className="w-9 text-center text-sm font-bold text-white bg-transparent outline-none"
                style={{ MozAppearance: 'textfield' } as React.CSSProperties}
              />
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-slate-400 text-xs font-semibold">{numPages || '–'}</span>
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center bg-slate-800 rounded-xl px-1.5 py-1 gap-0.5">
            <button onClick={() => handleZoom(-0.1)} disabled={scale <= 0.5}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
              <FaSearchMinus className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setScale(1.0)}
              className="px-2.5 text-[11px] font-bold text-slate-300 hover:text-white transition-colors min-w-[44px] text-center">
              {Math.round(scale * 100)}%
            </button>
            <button onClick={() => handleZoom(0.1)} disabled={scale >= 2.5}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
              <FaSearchPlus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View mode */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 gap-0.5">
            {(['scroll', 'single'] as const).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                title={mode === 'scroll' ? 'Scroll all pages' : 'Single page'}
                className="px-3 h-8 rounded-lg text-[10px] font-bold transition-all"
                style={{
                  background: viewMode === mode ? catalogue.accentColor : 'transparent',
                  color: viewMode === mode ? '#fff' : '#94a3b8',
                  boxShadow: viewMode === mode ? `0 2px 12px ${catalogue.accentColor}55` : 'none',
                }}>
                {mode === 'scroll' ? '≡ Scroll' : '□ Page'}
              </button>
            ))}
          </div>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            {isFullscreen ? <FaCompress className="w-3.5 h-3.5" /> : <FaExpand className="w-3.5 h-3.5" />}
          </button>

          {/* Download (desktop) */}
          <div className="ml-auto hidden md:block">
            <button onClick={handleDownload} disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-all"
              style={{
                background: `${catalogue.accentColor}15`,
                color: catalogue.accentColor,
                border: `1px solid ${catalogue.accentColor}35`,
              }}>
              <FaDownload className="w-3 h-3" />
              {downloading ? 'Saving…' : 'Download'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-slate-800/60">
          <div className="h-full transition-all duration-500 ease-out"
            style={{
              width: numPages ? `${(currentPage / numPages) * 100}%` : '0%',
              background: `linear-gradient(90deg, ${catalogue.gradientFrom}, ${catalogue.gradientTo})`,
            }} />
        </div>
      </div>

      {/* ══ PDF PAGES ══ */}
      <div
        ref={wrapperRef}
        className="max-w-6xl mx-auto px-4 py-10"
        style={isFullscreen ? {
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#080f1a', overflowY: 'auto',
          padding: '90px 16px 24px', maxWidth: '100%',
        } : {}}
      >
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{ background: `${catalogue.accentColor}12`, border: `2px solid ${catalogue.accentColor}28` }}>
                <FaBook className="w-10 h-10" style={{ color: catalogue.accentColor }} />
              </div>
              <div className="absolute -inset-3 rounded-[28px] border-2 animate-spin"
                style={{ borderColor: 'transparent', borderTopColor: catalogue.accentColor, animationDuration: '1.2s' }} />
            </div>
            <div className="text-center">
              <p className="text-slate-200 font-semibold text-xl">Loading Catalogue…</p>
              <p className="text-slate-500 text-sm mt-2">Fetching &ldquo;{catalogue.label}&rdquo; from PDF engine</p>
            </div>
          </div>
        )}

        {/* Error */}
        {loadError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <p className="text-5xl">⚠️</p>
            <p className="text-slate-200 font-semibold text-lg">Failed to load catalogue</p>
            <p className="text-slate-500 text-sm max-w-sm text-center">{loadError}</p>
          </div>
        )}

        {/* ─── SCROLL MODE ─── */}
        {!isLoading && !loadError && pdfDoc && viewMode === 'scroll' && (
          <div className="flex flex-col items-center gap-8">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pn) => (
              <div
                key={pn}
                ref={(el) => { pageRefs.current[pn - 1] = el; }}
                className="w-full flex flex-col items-center"
                style={{ scrollMarginTop: '110px' }}
              >
                {/* Page label */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300"
                    style={{
                      background: currentPage === pn ? `${catalogue.accentColor}22` : 'rgba(255,255,255,0.04)',
                      color: currentPage === pn ? catalogue.accentColor : '#475569',
                      border: `1px solid ${currentPage === pn ? catalogue.accentColor + '44' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    Page {pn}
                  </span>
                </div>
                <PdfPageCanvas
                  pdfDoc={pdfDoc}
                  pageNum={pn}
                  targetWidth={pageWidth}
                  isCurrent={currentPage === pn}
                  accentColor={catalogue.accentColor}
                />
              </div>
            ))}
            <div className="mt-8 text-center py-8 border-t w-full" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-slate-600 text-sm">✦ End of Catalogue ✦</p>
            </div>
          </div>
        )}

        {/* ─── SINGLE PAGE MODE ─── */}
        {!isLoading && !loadError && pdfDoc && viewMode === 'single' && (
          <div className="flex flex-col items-center">
            <PdfPageCanvas
              pdfDoc={pdfDoc}
              pageNum={currentPage}
              targetWidth={pageWidth}
              isCurrent={true}
              accentColor={catalogue.accentColor}
            />
            <div className="flex items-center gap-5 mt-10">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                className="group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                <FaChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Previous
              </button>
              <span className="text-slate-500 text-sm font-medium">{currentPage} / {numPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
                className="group flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all disabled:opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${catalogue.gradientFrom}, ${catalogue.gradientTo})`,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${catalogue.accentColor}40`,
                }}>
                Next
                <FaChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══ BOTTOM CTA ══ */}
      {numPages > 0 && !isFullscreen && (
        <div className="py-14 mt-4"
          style={{
            background: `linear-gradient(0deg, ${catalogue.accentColor}08 0%, transparent 100%)`,
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
          <div className="max-w-lg mx-auto text-center px-6">
            <p className="text-white font-black text-xl mb-2">
              Interested in {catalogue.label}?
            </p>
            <p className="text-slate-400 text-sm mb-8">
              {catalogue.desc}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={handleDownload}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${catalogue.gradientFrom}, ${catalogue.gradientTo})`,
                  boxShadow: `0 8px 32px ${catalogue.accentColor}44`,
                }}>
                <FaDownload className="w-4 h-4" />
                Download PDF
              </button>
              <Link href="/catalogues"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                }}>
                ← All Catalogues
              </Link>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                }}>
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
