import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Tag
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenLegalGuide: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenLegalGuide,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [icUploaded, setIcUploaded] = useState(false);
  const [postalCode, setPostalCode] = useState('');

  // Calculate items subtotal
  const subtotal = items.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.includeDisplayStand) itemPrice += 45;
    if (item.customEngraving) itemPrice += 35;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Discount
  const discount = promoApplied ? subtotal * 0.1 : 0;
  
  // Delivery in Singapore: Free over $150
  const deliveryFee = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Check if any item in cart needs SPF IC verification
  const hasRegulatedItems = items.some((item) => item.product.icVerificationRequired);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CAESARS2026' || promoCode.trim().toUpperCase() === 'ORCHARD') {
      setPromoApplied(true);
    } else {
      alert('Invalid code. Try "CAESARS2026" for 10% off your collection order.');
    }
  };

  // Generate WhatsApp Order inquiry text
  const generateWhatsAppOrderText = () => {
    let text = `Hello CAESARS Singapore, I would like to place an order:%0A%0A`;
    items.forEach((item, i) => {
      text += `${i + 1}. ${item.product.name} (Qty: ${item.quantity}) - S$${item.product.price * item.quantity}%0A`;
      if (item.includeDisplayStand) text += `   + Lacquered Stand (+S$45)%0A`;
      if (item.customEngraving) text += `   + Custom Engraving: "${item.customEngraving}" (+S$35)%0A`;
    });
    text += `%0ASubtotal: S$${subtotal.toFixed(2)}`;
    if (promoApplied) text += `%0ADiscount (10%): -S$${discount.toFixed(2)}`;
    text += `%0ADelivery: ${deliveryFee === 0 ? 'FREE (SG Islandwide)' : 'S$12.00'}`;
    text += `%0A*Estimated Total: S$${finalTotal.toFixed(2)}*`;
    if (postalCode) text += `%0ASingapore Postal Code: ${postalCode}`;
    return text;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-[#262626] flex flex-col justify-between shadow-2xl text-[#F1F1F1]">
          {/* Header */}
          <div className="h-20 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
                Order Bag
              </span>
              <span className="text-xs font-mono text-gray-500">
                ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1A1A1A] transition-colors border border-transparent hover:border-[#333]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutSuccess ? (
              <div className="p-8 text-center space-y-4 my-auto">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white">Order Inquiry Received</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Thank you for collecting with CAESARS Singapore. Our concierge has reserved your selection. If your order contains SPF-regulated blades or non-firing firearm replicas, we will confirm your NRIC/FIN verification.
                </p>
                <div className="pt-4 border-t border-[#222] space-y-2">
                  <a
                    href={`https://wa.me/6591234567?text=${generateWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm via WhatsApp (+65 9123 4567)
                  </a>
                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutSuccess(false);
                      onClose();
                    }}
                    className="block w-full py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Return to Catalogue
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                <ShoppingBag className="w-10 h-10 stroke-[1.2] mb-3 text-gray-600" />
                <p className="font-serif text-base text-gray-300">Your bag is empty</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Select a hand-forged katana, medieval sword, or collectible replica to begin.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#D4AF37] text-black text-[10px] uppercase font-mono tracking-widest font-bold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Regulated Item Notice Banner */}
                {hasRegulatedItems && (
                  <div className="p-3 bg-[#15120c] border border-amber-500/30 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>SPF Regulation Notice</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      Your bag includes SPF-controlled items. 1-time IC verification required before dispatch.
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={onOpenLegalGuide}
                        className="text-[10px] text-gray-400 hover:text-[#D4AF37] underline"
                      >
                        Verification FAQ
                      </button>
                      <button
                        onClick={() => setIcUploaded(!icUploaded)}
                        className={`text-[10px] font-mono px-2 py-0.5 border ${
                          icUploaded 
                            ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' 
                            : 'border-gray-600 text-gray-300 hover:border-[#D4AF37]'
                        }`}
                      >
                        {icUploaded ? '✓ IC Info Verified' : 'Verify IC Online'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-3.5 bg-[#141414] border border-[#222] flex gap-3 relative group"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover border border-[#262626] shrink-0"
                      />
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-[9px] font-mono text-gray-500 uppercase block truncate">
                          {item.product.sku}
                        </span>
                        <h4 className="text-xs font-serif text-white truncate">
                          {item.product.name}
                        </h4>

                        {/* Add-on badges */}
                        {item.includeDisplayStand && (
                          <span className="text-[9px] text-[#D4AF37] block font-mono">
                            + Solid Display Stand (S$45)
                          </span>
                        )}
                        {item.customEngraving && (
                          <span className="text-[9px] text-amber-200 block font-mono truncate">
                            + Engraving: "{item.customEngraving}" (S$35)
                          </span>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-mono text-[#D4AF37]">
                            S${(
                              (item.product.price +
                                (item.includeDisplayStand ? 45 : 0) +
                                (item.customEngraving ? 35 : 0)) *
                              item.quantity
                            ).toLocaleString('en-SG', { minimumFractionDigits: 2 })}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center border border-[#333]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CAESARS2026)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#141414] border border-[#2A2A2A] text-xs text-white px-3 py-1.5 font-mono uppercase outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-3 py-1.5 bg-[#222] hover:bg-[#D4AF37] hover:text-black text-xs font-mono uppercase text-gray-300 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                      ✓ 10% Collector Privilege Applied
                    </span>
                  )}
                </div>

                {/* Postal Code for Singapore Delivery */}
                <div className="pt-1">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Singapore Postal Code (e.g. 238839)"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#141414] border border-[#2A2A2A] text-xs text-white px-3 py-1.5 font-mono outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                    White-glove tracked delivery islandwide in Singapore.
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && !checkoutSuccess && (
            <div className="border-t border-[#222] p-6 bg-[#0A0A0A] space-y-4 shrink-0">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>S${subtotal.toLocaleString('en-SG', { minimumFractionDigits: 2 })}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount (10%)</span>
                    <span>-S${discount.toLocaleString('en-SG', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Singapore Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#D4AF37]">FREE (Orders &gt; S$150)</span>
                    ) : (
                      `S$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#222] flex justify-between text-sm font-bold text-white">
                  <span>Total (SGD)</span>
                  <span className="text-[#D4AF37]">
                    S${finalTotal.toLocaleString('en-SG', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  id="cart-checkout-btn"
                  onClick={() => setCheckoutSuccess(true)}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#e4bf4b] text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/6591234567?text=${generateWhatsAppOrderText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-[#333] hover:border-[#D4AF37] text-gray-300 hover:text-white text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
