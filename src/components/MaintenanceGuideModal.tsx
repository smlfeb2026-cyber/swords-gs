import React from 'react';
import { X, BookOpen, ShieldAlert, CheckCircle2, Droplet } from 'lucide-react';

interface MaintenanceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MaintenanceGuideModal: React.FC<MaintenanceGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#262626] shadow-2xl flex flex-col max-h-[85vh] text-[#F1F1F1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
              Japanese Blade Care & Choji Oil Guide
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-gray-300 font-light leading-relaxed">
          <div className="p-4 bg-[#141414] border border-[#262626] space-y-2">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider">
              <Droplet className="w-3.5 h-3.5" />
              <span>Singapore Equatorial Climate Advice</span>
            </div>
            <p>
              Singapore’s average relative humidity often exceeds 80%. High-carbon steel blades (such as 1095, 1060, T10, and folded Damascus) are vulnerable to surface moisture oxidation if left untreated. Stainless steel display blades require minimal maintenance, but high-carbon and clay-tempered functional blades should be oiled every 3 to 6 months.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              Step-by-Step Traditional Maintenance
            </h5>

            <div className="space-y-3">
              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1 font-medium">1. Remove Old Oil with Rice Paper (Nuguigami)</span>
                <p className="text-gray-400">Gently draw high-grade lint-free rice paper or microfiber along the blade from the habaki collar toward the kissaki (point). Never wipe backwards against the sharp edge.</p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1 font-medium">2. Tap with Uchiko Powder Ball</span>
                <p className="text-gray-400">Lightly tap the silk uchiko ball along both sides of the blade every 4–5 cm. The ultra-fine limestone powder absorbs residual oils and lightly polishes the steel without scratching the mirror finish.</p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1 font-medium">3. Apply Pure Choji (Clove) Oil</span>
                <p className="text-gray-400">Place 2–3 drops of authentic Choji oil on clean paper. Wipe a microscopically thin, even sheen over the entire blade surface. Excess oil will attract dust inside the wooden saya scabbard.</p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1 font-medium">4. Proper Scabbard Insertion</span>
                <p className="text-gray-400">When sheathing the sword, always rest the mune (spine) against the scabbard groove so the sharpened edge does not cut into the interior wood.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#141414] border-l-2 border-[#D4AF37] space-y-1">
            <span className="text-[#D4AF37] font-mono uppercase text-[10px] block">Golden Rule:</span>
            <p className="text-gray-300">
              Never touch a bare high-carbon steel blade with bare hands. Natural skin acids cause rapid fingerprint staining. Always use a clean cloth or silk handling bag.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#222] bg-[#0A0A0A] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
