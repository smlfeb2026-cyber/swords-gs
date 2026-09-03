import React from 'react';
import { CategoryType } from '../types';
import { ShieldCheck, MessageCircle, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenLegalGuide: () => void;
  onOpenPlazaNotice: () => void;
  onOpenMaintenanceGuide: () => void;
  onOpenTalkToUs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenLegalGuide,
  onOpenPlazaNotice,
  onOpenMaintenanceGuide,
  onOpenTalkToUs,
}) => {
  return (
    <footer className="w-full bg-[#070707] border-t border-[#222] text-gray-400">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
        {/* Brand & History */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif tracking-[0.2em] text-[#D4AF37]">CAESARS</span>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Singapore</span>
          </div>
          <p className="text-gray-400 font-light leading-relaxed">
            Singapore’s premier licensed boutique for collectible swords, Japanese katanas, armour, and historical replica firearms since 2000. Operating under Singapore Police Force Arms & Explosives Division regulations.
          </p>
          <div className="pt-2 flex items-center gap-3 text-[10px] font-mono text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>SPF Licensed Dealer • 100% Legal Collectibles</span>
          </div>
        </div>

        {/* Weaponry Departments */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white font-semibold">
            Collections
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button 
                onClick={() => onSelectCategory('japanese')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Japanese Katana & Tanto
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('western')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Western & Medieval Swords
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('movie')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Movie, LOTR & Anime Replicas
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('firearms')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Non-Firing Historical Guns
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('armour')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Full Wearable Suits of Armour
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategory('knives')} 
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Nepalese Gurkha Kukris & Knives
              </button>
            </li>
          </ul>
        </div>

        {/* Collector Services & Guides */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white font-semibold">
            Information & Legal
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button 
                onClick={onOpenLegalGuide}
                className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
              >
                SPF Arms & Explosives Regulations
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenLegalGuide}
                className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
              >
                Mandatory IC Verification FAQ
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenPlazaNotice}
                className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
              >
                Plaza Singapura Store Transition
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenMaintenanceGuide}
                className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
              >
                Japanese Blade Maintenance Guide
              </button>
            </li>
            {onOpenTalkToUs && (
              <li>
                <button 
                  onClick={onOpenTalkToUs}
                  className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer text-[#D4AF37]"
                >
                  Talk to Us (Collector Forum & Q&A)
                </button>
              </li>
            )}
            <li>
              <span className="text-gray-500">Free Islandwide Delivery over S$150</span>
            </li>
          </ul>
        </div>

        {/* Contact & Concierge */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white font-semibold">
            Boutique Concierge
          </h4>
          <div className="space-y-2 text-gray-400 font-light">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Flagship: #07-14 Plaza Singapura, 68 Orchard Rd, Singapore 238839 (Transitioned to Online Store)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a 
                href="https://wa.me/6591234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
              >
                WhatsApp: +65 9123 4567
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>inquiry@caesars.com.sg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Direct match to Professional Polish design HTML) */}
      <div className="h-14 bg-black border-t border-[#222] flex flex-col sm:flex-row items-center justify-between px-6 lg:px-12 text-[9px] uppercase tracking-[0.2em] text-gray-500 shrink-0 gap-2">
        <span>&copy; 2026 CAESARS Singapore. All Rights Reserved.</span>
        <div className="flex gap-8">
          <button onClick={onOpenLegalGuide} className="hover:text-gray-300 transition-colors cursor-pointer">
            Legal & SPF Compliance
          </button>
          <span className="hover:text-gray-300 transition-colors cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-gray-300 transition-colors cursor-pointer">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
};
