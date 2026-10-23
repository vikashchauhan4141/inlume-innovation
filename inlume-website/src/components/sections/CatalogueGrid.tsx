'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CATALOGUES, type CatalogueItem } from '@/data/catalogues';
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
  FaChevronDown,
} from 'react-icons/fa';

/* ─── PDF.js CDN ─── */
const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

type PdfjsLib = {
  getDocument: (src: { url: string; cMapUrl: string; cMapPacked: boolean }) => { promise: Promise<PdfDoc> };
  GlobalWorkerOptions: { workerSrc: string };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfPage = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (ctx: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
};

/* ─── Single page canvas ─── */
function PdfPageCanvas({
  pdfDoc, pageNum, targetWidth, isCurrent, accentColor,
}: {
  pdfDoc: PdfDoc; pageNum: number; targetWidth: number; isCurrent: boolean; accentColor: string;
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
      const base = page.getViewport({ scale: 1 });
      const scale = (targetWidth / base.width) * dpr;
      const vp = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = vp.width;
      canvas.height = vp.height;
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${Math.round(vp.height / dpr)}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const task = page.render({ canvasContext: ctx, viewport: vp });
      renderTaskRef.current = task as unknown as { cancel: () => void };
      (task as unknown as { promise: Promise<void> }).promise
        .then(() => { if (!cancelled) setRendered(true); })
        .catch(() => {});
    });
    return () => { cancelled = true; try { renderTaskRef.current?.cancel(); } catch {} };
  }, [pdfDoc, pageNum, targetWidth]);

  return (
    <div className="relative flex justify-center">
      {!rendered && (
        <div className="flex items-center justify-center bg-slate-800/70 rounded-xl animate-pulse"
          style={{ width: targetWidth, minHeight: Math.round(targetWidth * 1.414) }}>
          <FaSpinner className="w-7 h-7 text-slate-500 animate-spin" />
        </div>
      )}
      <canvas ref={canvasRef} className="rounded-xl block max-w-full"
        style={{
          display: rendered ? 'block' : 'none',
          boxShadow: isCurrent
            ? `0 0 0 2px ${accentColor}, 0 20px 60px rgba(0,0,0,0.6)`
            : '0 8px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.3s',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CATALOGUES PAGE — Split Panel Layout
═══════════════════════════════════════════════════ */
export default function CataloguesPageClient() {
  const [selected, setSelected] = useState<CatalogueItem>(CATALOGUES[0]);
  const [pdfjsLib, setPdfjsLib] = useState<PdfjsLib | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PdfDoc | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [baseWidth, setBaseWidth] = useState(720);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'scroll' | 'single'>('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Load PDF.js CDN once ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    import(/* webpackIgnore: true */ PDFJS_CDN)
      .then((lib: unknown) => {
        const pdfjs = lib as PdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        setPdfjsLib(pdfjs);
      })
      .catch((err: Error) => { setLoadError(err.message); setIsLoading(false); });
  }, []);

  /* ── Load document when catalogue or pdfjs changes ── */
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
        url: selected.file,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/cmaps/',
        cMapPacked: true,
      })
      .promise.then((doc) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
        // scroll viewer to top
        if (viewerRef.current) viewerRef.current.scrollTop = 0;
      })
      .catch((err: Error) => { setLoadError(err.message); setIsLoading(false); });
  }, [pdfjsLib, selected]);

  /* ── Measure viewer width ── */
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth - 32;
        setBaseWidth(Math.min(Math.max(w, 300), 960));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isFullscreen]);

  /* ── Scroll page tracking ── */
  useEffect(() => {
    if (viewMode !== 'scroll' || numPages === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const idx = pageRefs.current.indexOf(best.target as HTMLDivElement);
          if (idx !== -1) setCurrentPage(idx + 1);
        }
      },
      { threshold: [0.2, 0.5, 0.8], root: viewerRef.current }
    );
    pageRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [viewMode, numPages, pdfDoc]);

  /* ── Fullscreen ── */
  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const goToPage = useCallback((n: number) => {
    const p = Math.max(1, Math.min(n, numPages));
    setCurrentPage(p);
    if (viewMode === 'scroll') {
      pageRefs.current[p - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [numPages, viewMode]);

  const handleZoom = (d: number) =>
    setScale((s) => parseFloat(Math.max(0.5, Math.min(2.5, s + d)).toFixed(1)));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && viewerRef.current) viewerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement('a');
    a.href = selected.file;
    a.download = `INLUME_${selected.label.replace(/ /g, '_')}_Catalogue.pdf`;
    a.click();
    setTimeout(() => setDownloading(false), 2500);
  };

  const selectCatalogue = (cat: CatalogueItem) => {
    setSelected(cat);
    setScale(1.0);
    setViewMode('scroll');
    setMobileSidebarOpen(false);
  };

  const pageWidth = Math.round(baseWidth * scale);

  /* ═══════════════ RENDER ═══════════════ */
  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── PAGE HERO (matches products page style) ── */}
      <section className="relative min-h-[200px] sm:min-h-[240px] flex items-center overflow-hidden bg-slate-950 border-b border-gray-800">
        {/* Background */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, #020c18 0%, #062340 60%, #0a3a6b 100%)' }}>
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
              backgroundSize: '48px 48px',
            }} />
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 w-full">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-gray-300 mb-3 border border-white/15">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-400 font-semibold">Catalogues</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">
              Catalogues
            </span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
            Select a catalogue to browse every page online — no download required.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT: Sidebar + Viewer ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Mobile: catalogue selector button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all"
            style={{
              background: selected.tagBg,
              border: `1px solid ${selected.accentColor}44`,
              color: selected.accentColor,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                style={{ background: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})` }}>
                {selected.tag}
              </span>
              {selected.label}
            </div>
            <FaChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile dropdown */}
          {mobileSidebarOpen && (
            <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              {CATALOGUES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => selectCatalogue(cat)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-slate-100 last:border-0"
                  style={{
                    background: selected.slug === cat.slug ? cat.tagBg : 'transparent',
                  }}
                >
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: selected.slug === cat.slug
                        ? `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`
                        : cat.tagBg,
                      color: selected.slug === cat.slug ? '#fff' : cat.accentColor,
                    }}>
                    {cat.tag}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{cat.label}</p>
                    <p className="text-xs text-slate-500">{cat.subtitle}</p>
                  </div>
                  {selected.slug === cat.slug && (
                    <span className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: cat.accentColor }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-6 items-start">

          {/* ── LEFT SIDEBAR (desktop) ── */}
          <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sticky top-24 max-h-[calc(100vh-120px)]">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Sidebar header */}
              <div className="px-4 py-3 border-b border-slate-100"
                style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                <div className="flex items-center gap-2">
                  <FaBook className="w-4 h-4 text-slate-400" />
                  <p className="font-bold text-sm text-slate-700">Select Catalogue</p>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{CATALOGUES.length} catalogues available</p>
              </div>

              {/* Catalogue list — scrollable */}
              <nav className="p-2 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
                {CATALOGUES.map((cat) => {
                  const isActive = selected.slug === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => selectCatalogue(cat)}
                      className="w-full text-left rounded-xl px-3 py-3 flex items-center gap-3 transition-all duration-200 group relative"
                      style={{
                        background: isActive ? cat.tagBg : 'transparent',
                        border: `1px solid ${isActive ? cat.accentColor + '44' : 'transparent'}`,
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                          style={{ background: cat.accentColor }} />
                      )}

                      {/* Tag badge */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all duration-200"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`
                            : cat.tagBg,
                          color: isActive ? '#fff' : cat.accentColor,
                          boxShadow: isActive ? `0 4px 12px ${cat.accentColor}44` : 'none',
                        }}
                      >
                        {cat.tag}
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold text-[13px] leading-tight truncate transition-colors"
                          style={{ color: isActive ? '#1e293b' : '#475569' }}
                        >
                          {cat.label}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{cat.subtitle}</p>
                      </div>

                      {/* Active dot */}
                      {isActive && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: cat.accentColor }} />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Download card below sidebar */}
            <div className="mt-4 rounded-2xl p-4 border border-slate-200 bg-white shadow-sm">
              <p className="text-xs font-bold text-slate-600 mb-1">Currently Viewing</p>
              <p className="text-sm font-black text-slate-800 mb-3">{selected.label}</p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: downloading
                    ? '#f1f5f9'
                    : `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})`,
                  color: downloading ? '#94a3b8' : '#fff',
                  boxShadow: downloading ? 'none' : `0 4px 16px ${selected.accentColor}40`,
                }}
              >
                <FaDownload className={`w-3 h-3 ${downloading ? 'animate-bounce' : ''}`} />
                {downloading ? 'Downloading…' : 'Download PDF'}
              </button>
            </div>
          </aside>

          {/* ── RIGHT: PDF VIEWER ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800">

              {/* Viewer header bar */}
              <div
                className="px-4 py-3 flex items-center gap-3 border-b border-slate-800"
                style={{
                  background: `linear-gradient(135deg, #0d1525, #111827)`,
                }}
              >
                {/* Tag */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})`,
                    color: '#fff',
                    boxShadow: `0 4px 12px ${selected.accentColor}44`,
                  }}>
                  {selected.tag}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{selected.label}</p>
                  <p className="text-slate-500 text-[11px] truncate">{selected.subtitle}</p>
                </div>
                {numPages > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: `${selected.accentColor}18`, color: selected.accentColor, border: `1px solid ${selected.accentColor}30` }}>
                    {numPages} pages
                  </span>
                )}
              </div>

              {/* ── TOOLBAR ── */}
              <div className="px-3 py-2 flex items-center gap-2 flex-wrap border-b border-slate-800"
                style={{ background: 'rgba(15,23,42,0.8)' }}>

                {/* Page nav */}
                <div className="flex items-center bg-slate-800 rounded-lg px-1 py-0.5 gap-0.5">
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                    <FaChevronLeft className="w-2.5 h-2.5" />
                  </button>
                  <div className="flex items-center gap-1 px-1.5">
                    <input type="number" min={1} max={numPages || 1} value={currentPage}
                      onChange={(e) => goToPage(Number(e.target.value))}
                      className="w-8 text-center text-xs font-bold text-white bg-transparent outline-none"
                      style={{ MozAppearance: 'textfield' } as React.CSSProperties}
                    />
                    <span className="text-slate-600 text-[10px]">/</span>
                    <span className="text-slate-400 text-[10px] font-semibold">{numPages || '–'}</span>
                  </div>
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                    <FaChevronRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Zoom */}
                <div className="flex items-center bg-slate-800 rounded-lg px-1 py-0.5 gap-0.5">
                  <button onClick={() => handleZoom(-0.1)} disabled={scale <= 0.5}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                    <FaSearchMinus className="w-3 h-3" />
                  </button>
                  <button onClick={() => setScale(1.0)}
                    className="px-2 text-[10px] font-bold text-slate-300 hover:text-white min-w-[40px] text-center">
                    {Math.round(scale * 100)}%
                  </button>
                  <button onClick={() => handleZoom(0.1)} disabled={scale >= 2.5}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                    <FaSearchPlus className="w-3 h-3" />
                  </button>
                </div>

                {/* View mode */}
                <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
                  {(['scroll', 'single'] as const).map((mode) => (
                    <button key={mode} onClick={() => setViewMode(mode)}
                      className="px-2.5 h-7 rounded-md text-[10px] font-bold transition-all"
                      style={{
                        background: viewMode === mode ? selected.accentColor : 'transparent',
                        color: viewMode === mode ? '#fff' : '#64748b',
                      }}>
                      {mode === 'scroll' ? '≡ Scroll' : '□ Page'}
                    </button>
                  ))}
                </div>

                {/* Fullscreen */}
                <button onClick={toggleFullscreen}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                  {isFullscreen ? <FaCompress className="w-3 h-3" /> : <FaExpand className="w-3 h-3" />}
                </button>

                {/* Download (mobile visible) */}
                <div className="ml-auto">
                  <button onClick={handleDownload} disabled={downloading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                    style={{
                      background: `${selected.accentColor}18`,
                      color: selected.accentColor,
                      border: `1px solid ${selected.accentColor}35`,
                    }}>
                    <FaDownload className="w-2.5 h-2.5" />
                    {downloading ? 'Saving…' : 'Download'}
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-px bg-slate-800">
                <div className="h-full transition-all duration-500"
                  style={{
                    width: numPages ? `${(currentPage / numPages) * 100}%` : '0%',
                    background: `linear-gradient(90deg, ${selected.gradientFrom}, ${selected.gradientTo})`,
                  }} />
              </div>

              {/* ── PDF CONTENT ── */}
              <div
                ref={viewerRef}
                className="overflow-y-auto"
                style={{
                  height: 'calc(100vh - 280px)',
                  minHeight: '500px',
                  background: '#080f1a',
                  ...(isFullscreen ? {
                    position: 'fixed', inset: 0, zIndex: 9999,
                    height: '100vh', overflowY: 'auto',
                    paddingTop: '0',
                  } : {}),
                }}
              >
                {/* Fullscreen toolbar overlay */}
                {isFullscreen && (
                  <div className="sticky top-0 z-10 px-4 py-2 flex items-center gap-2 flex-wrap"
                    style={{ background: 'rgba(8,15,26,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-white font-bold text-sm">{selected.label}</span>
                    <div className="flex items-center bg-slate-800 rounded-lg px-1 py-0.5 gap-0.5 ml-4">
                      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                        <FaChevronLeft className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-slate-300 text-xs px-2">{currentPage} / {numPages}</span>
                      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-25 transition-all">
                        <FaChevronRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <button onClick={toggleFullscreen}
                      className="ml-auto w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
                      <FaCompress className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div ref={containerRef} className="px-4 py-6">
                  {/* Loading */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-5">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                          style={{ background: `${selected.accentColor}12`, border: `2px solid ${selected.accentColor}28` }}>
                          <FaBook className="w-9 h-9" style={{ color: selected.accentColor }} />
                        </div>
                        <div className="absolute -inset-3 rounded-[28px] border-2 animate-spin"
                          style={{ borderColor: 'transparent', borderTopColor: selected.accentColor, animationDuration: '1.2s' }} />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-200 font-semibold text-lg">Loading Catalogue…</p>
                        <p className="text-slate-500 text-sm mt-1">&ldquo;{selected.label}&rdquo;</p>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {loadError && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                      <p className="text-4xl">⚠️</p>
                      <p className="text-slate-200 font-semibold">Failed to load catalogue</p>
                      <p className="text-slate-500 text-sm max-w-xs">{loadError}</p>
                    </div>
                  )}

                  {/* Scroll mode */}
                  {!isLoading && !loadError && pdfDoc && viewMode === 'scroll' && (
                    <div className="flex flex-col items-center gap-6">
                      {Array.from({ length: numPages }, (_, i) => i + 1).map((pn) => (
                        <div key={pn}
                          ref={(el) => { pageRefs.current[pn - 1] = el; }}
                          className="w-full flex flex-col items-center"
                          style={{ scrollMarginTop: '80px' }}>
                          <div className="mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all"
                              style={{
                                background: currentPage === pn ? `${selected.accentColor}22` : 'rgba(255,255,255,0.04)',
                                color: currentPage === pn ? selected.accentColor : '#334155',
                                border: `1px solid ${currentPage === pn ? selected.accentColor + '44' : 'rgba(255,255,255,0.06)'}`,
                              }}>
                              Page {pn}
                            </span>
                          </div>
                          <PdfPageCanvas
                            pdfDoc={pdfDoc} pageNum={pn}
                            targetWidth={pageWidth}
                            isCurrent={currentPage === pn}
                            accentColor={selected.accentColor}
                          />
                        </div>
                      ))}
                      <p className="text-slate-700 text-xs py-4">✦ End of Catalogue ✦</p>
                    </div>
                  )}

                  {/* Single page mode */}
                  {!isLoading && !loadError && pdfDoc && viewMode === 'single' && (
                    <div className="flex flex-col items-center">
                      <PdfPageCanvas
                        pdfDoc={pdfDoc} pageNum={currentPage}
                        targetWidth={pageWidth}
                        isCurrent={true}
                        accentColor={selected.accentColor}
                      />
                      <div className="flex items-center gap-4 mt-8">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all disabled:opacity-30"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                          <FaChevronLeft className="w-3 h-3" /> Previous
                        </button>
                        <span className="text-slate-500 text-xs">{currentPage} / {numPages}</span>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all disabled:opacity-30"
                          style={{
                            background: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})`,
                            color: '#fff',
                            boxShadow: `0 4px 16px ${selected.accentColor}40`,
                          }}>
                          Next <FaChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
