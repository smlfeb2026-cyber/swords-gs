import React from 'react';
import { X, ShieldCheck, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface LegalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalGuideModal: React.FC<LegalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-[#262626] shadow-2xl flex flex-col max-h-[85vh] text-[#F1F1F1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
              Singapore Police Force (SPF) Legal Notice
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
            <h4 className="text-sm font-serif text-white font-medium">
              Licensed Retailer of Collectible Weaponry in Singapore Since 2000
            </h4>
            <p>
              CAESARS operates under established permits and guidelines regulated by the Arms & Explosives (A&E) Division of the Singapore Police Force (SPF). All blades and firearm replicas imported and offered by CAESARS comply strictly with the Singapore Arms and Explosives Act.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              1. Mandatory IC / NRIC Verification for Regulated Items
            </h5>
            <p>
              Under Singapore law, first-time purchasers of certain replica firearms (non-firing flintlocks, revolvers) and specific edged blades must undergo a one-time identity verification.
            </p>
            <ul className="space-y-1.5 list-disc pl-4 text-gray-400">
              <li>Purchasers must be at least 18 years of age.</li>
              <li>A digital copy of NRIC/FIN or passport must be submitted securely via email or official WhatsApp before dispatch.</li>
              <li>Customer information is handled strictly under the Personal Data Protection Act (PDPA) and archived solely for regulatory compliance audits.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              2. Non-Firing Replica Firearms
            </h5>
            <p>
              All replica guns sold by CAESARS (such as Colt Peacemakers and Napoleonic flintlocks) are 100% inert, non-firing museum-grade display items. They have solid blocked barrels, cannot fire ammunition, and cannot be converted or altered.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              3. Responsible Ownership in Singapore
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-[#D4AF37] font-mono uppercase text-[10px] block mb-1">Permitted:</span>
                <p className="text-gray-400">Display in private residences, offices, dojos, theatrical productions, photography, and private collector cabinets.</p>
              </div>
              <div className="p-3 bg-[#141414] border border-[#222]">
                <span className="text-red-400 font-mono uppercase text-[10px] block mb-1">Prohibited:</span>
                <p className="text-gray-400">Carrying exposed swords, knives or replica guns in public spaces or mass transit (MRT/buses) without a valid permit.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#222] bg-[#0A0A0A] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
