import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Check, 
  Sparkles,
  Info,
  Scale,
  Ruler,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options?: { customEngraving?: string; includeDisplayStand?: boolean }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenLegalGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenLegalGuide,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [includeStand, setIncludeStand] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const calculateTotal = () => {
    let total = product.price;
    if (includeStand) total += 45;
    if (engravingText.trim().length > 0) total += 35;
    return total;
  };

  const handleAdd = () => {
    onAddToCart(product, {
      customEngraving: engravingText.trim() ? engravingText.trim() : undefined,
      includeDisplayStand: includeStand,
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F0F0F] border border-[#262626] shadow-2xl flex flex-col overflow-hidden text-[#F1F1F1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="h-14 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
              {product.sku}
            </span>
            <span className="text-gray-600 text-xs">|</span>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
              {product.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1A1A1A] transition-colors border border-transparent hover:border-[#333]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Imagery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-[#141414] border border-[#222] overflow-hidden relative group">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 border border-[#333] px-2 py-1 text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
                Photo {activeImageIndex + 1} of {product.images.length}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 border overflow-hidden transition-all ${
                      activeImageIndex === idx 
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' 
                        : 'border-[#262626] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* SPF Compliance Notice Box */}
            <div className="p-4 bg-[#141414] border border-[#262626] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Singapore Police Force (SPF) Verified</span>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {product.icVerificationRequired ? (
                  <>First-time buyers of this category require a one-time mandatory identity card verification via email or WhatsApp in accordance with Singapore Arms & Explosives regulations.</>
                ) : (
                  <>This decorative collector piece is fully compliant with Singapore domestic decorative regulations and does not require police licensing.</>
                )}
              </p>
              <button
                onClick={onOpenLegalGuide}
                className="text-[10px] text-[#D4AF37] hover:underline uppercase font-mono tracking-wider flex items-center gap-1 mt-1 cursor-pointer"
              >
                <span>Read SPF Weaponry Compliance Guide</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Specifications, Price & Add-ons */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-2">
                {product.badge && (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] bg-[#16140f] border border-[#D4AF37]/30 px-2 py-0.5">
                    {product.badge}
                  </span>
                )}
                <span className="text-[10px] font-mono text-gray-400 bg-[#161616] border border-[#262626] px-2 py-0.5">
                  {product.sharpness}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif text-white leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-mono font-bold text-[#D4AF37]">
                  S${calculateTotal().toLocaleString('en-SG', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-gray-600 line-through">
                    S${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-400 ml-2">
                  • Available in Singapore
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Historical Context if available */}
              {product.historicalContext && (
                <div className="mt-3 p-3 bg-[#121212] border-l-2 border-[#D4AF37] text-xs text-gray-400 italic">
                  "{product.historicalContext}"
                </div>
              )}

              {/* Technical Specifications Grid */}
              <div className="mt-5 border-t border-[#222] pt-4">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-gray-400 mb-3">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {product.steelType && (
                    <div className="p-2 bg-[#141414] border border-[#222]">
                      <span className="text-gray-500 block text-[9px] uppercase">Steel / Composition</span>
                      <span className="text-gray-200">{product.steelType}</span>
                    </div>
                  )}
                  {product.overallLength && (
                    <div className="p-2 bg-[#141414] border border-[#222]">
                      <span className="text-gray-500 block text-[9px] uppercase">Overall Length</span>
                      <span className="text-gray-200">{product.overallLength}</span>
                    </div>
                  )}
                  {product.bladeLength && (
                    <div className="p-2 bg-[#141414] border border-[#222]">
                      <span className="text-gray-500 block text-[9px] uppercase">Blade Length</span>
                      <span className="text-gray-200">{product.bladeLength}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="p-2 bg-[#141414] border border-[#222]">
                      <span className="text-gray-500 block text-[9px] uppercase">Weight</span>
                      <span className="text-gray-200">{product.weight}</span>
                    </div>
                  )}
                  {product.fittings && (
                    <div className="p-2 bg-[#141414] border border-[#222] col-span-2">
                      <span className="text-gray-500 block text-[9px] uppercase">Fittings & Tsuba</span>
                      <span className="text-gray-200">{product.fittings}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customization Options */}
              <div className="mt-5 border-t border-[#222] pt-4 space-y-3">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  Collector Add-Ons & Services
                </h4>

                {/* Stand checkbox */}
                <label className="flex items-center gap-3 p-3 bg-[#141414] border border-[#222] hover:border-[#333] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeStand}
                    onChange={(e) => setIncludeStand(e.target.checked)}
                    className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="text-gray-200 font-medium">Lacquered Solid Timber Tabletop Stand</span>
                    <span className="text-gray-500 block text-[10px]">Cushioned velvet rests, matches scabbard finish</span>
                  </div>
                  <span className="text-xs font-mono text-[#D4AF37]">+S$45.00</span>
                </label>

                {/* Engraving text input */}
                <div className="p-3 bg-[#141414] border border-[#222] space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-200">Custom Blade / Plaque Engraving</span>
                    <span className="font-mono text-[#D4AF37]">+S$35.00</span>
                  </div>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="E.g. Initials, Clan Motto, Latin Verse"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white px-3 py-1.5 font-mono outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-500 font-mono block">
                    Precision diamond-point or laser etching. Max 30 characters.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-[#222] flex flex-wrap items-center gap-3">
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 text-xs uppercase font-mono tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#D4AF37] text-black hover:bg-[#e4bf4b]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order (S${calculateTotal()})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-12 h-11 border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#991b1b] bg-[#991b1b] text-white'
                    : 'border-[#333] hover:border-[#D4AF37] text-gray-400 hover:text-white bg-[#141414]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <a
                href={`https://wa.me/6591234567?text=Hello%20CAESARS%2C%20I%20am%20interested%20in%20inspecting%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-11 border border-[#333] hover:border-[#D4AF37] text-gray-400 hover:text-emerald-400 bg-[#141414] flex items-center justify-center transition-colors"
                title="Consult via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
