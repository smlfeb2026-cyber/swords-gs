import React from 'react';
import { X, MapPin, MessageCircle, Calendar, Sparkles } from 'lucide-react';

interface PlazaNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlazaNoticeModal: React.FC<PlazaNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#262626] shadow-2xl flex flex-col max-h-[85vh] text-[#F1F1F1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
              Plaza Singapura Store Transition Notice
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
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Mall Redevelopment (2026 - 2028)</span>
            </span>
            <h4 className="text-sm font-serif text-white font-medium">
              A New Chapter for CAESARS Singapore
            </h4>
            <p>
              Since 2000, CAESARS has welcomed enthusiasts and collectors to our flagship boutique on Level 7 (#07-14) of Plaza Singapura, 68 Orchard Road. Due to the extensive, multi-year redevelopment of Plaza Singapura from late 2026 through the end of 2028, CAESARS is transitioning from our retail mall presence to an enhanced online flagship.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              How We Continue Serving Collectors
            </h5>
            <div className="space-y-2.5">
              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1">1. Enhanced Online Boutique (caesars.com.sg)</span>
                <p className="text-gray-400">Our entire catalogue of over 1,000 swords, Japanese katanas, armour sets, replica guns, and knives is available 24/7 with high-definition photography and full technical specs.</p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1">2. Dedicated WhatsApp Concierge (+65 9123 4567)</span>
                <p className="text-gray-400">Speak directly with our experienced sword specialists. Request high-resolution videos of specific blades, discuss custom forging orders, and receive blade maintenance advice.</p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-white font-serif block text-xs mb-1">3. White-Glove Islandwide Delivery</span>
                <p className="text-gray-400">All local Singapore orders receive secure, insured white-glove courier delivery straight to your doorstep, with complimentary shipping on orders over S$150.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#222] bg-[#0A0A0A] flex items-center justify-between shrink-0">
          <a
            href="https://wa.me/6591234567?text=Hello%20CAESARS%20Singapore%2C%20I%20have%20an%20inquiry%20regarding%20your%20collection"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-mono"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
