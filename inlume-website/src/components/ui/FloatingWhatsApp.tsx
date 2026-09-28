'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918368690828?text=Hi%20Inlume%20Innovations%2C%20I%20would%20like%20to%20inquire%20about%20your%20LED%20lighting%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap">
        Chat with us on WhatsApp
      </span>

      {/* Pulsing ring wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Animated Ping Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />

        {/* Main Floating Circle Button */}
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30">
          <FaWhatsapp className="w-8 h-8 text-white" />
        </div>
      </div>
    </a>
  );
}

