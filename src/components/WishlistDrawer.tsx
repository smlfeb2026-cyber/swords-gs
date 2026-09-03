import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F] border-l border-[#262626] flex flex-col justify-between shadow-2xl text-[#F1F1F1]">
          {/* Header */}
          <div className="h-20 border-b border-[#222] px-6 flex items-center justify-between bg-[#0A0A0A] shrink-0">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#D4AF37] fill-current" />
              <span className="text-sm font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
                Saved Collection
              </span>
              <span className="text-xs font-mono text-gray-500">
                ({wishlist.length})
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

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                <Heart className="w-10 h-10 stroke-[1.2] mb-3 text-gray-600" />
                <p className="font-serif text-base text-gray-300">No saved weapons</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Click the heart icon on any sword, armor or replica to bookmark it for later review.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div 
                  key={product.id}
                  className="p-3.5 bg-[#141414] border border-[#222] flex gap-3 relative group"
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover border border-[#262626] shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-4">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block truncate">
                      {product.sku}
                    </span>
                    <h4 className="text-xs font-serif text-white truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono text-[#D4AF37] block mt-1">
                      S${product.price.toLocaleString('en-SG', { minimumFractionDigits: 2 })}
                    </span>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="px-2.5 py-1 bg-[#222] hover:bg-[#D4AF37] hover:text-black text-gray-200 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
