import React from 'react';
import { Heart, ShoppingBag, Eye, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className="group bg-[#0F0F0F] border border-[#222] hover:border-[#444] hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#141414] overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] bg-black/85 border border-[#D4AF37]/40 px-2 py-0.5 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.icVerificationRequired && (
            <span className="text-[9px] uppercase font-mono tracking-wider text-amber-300 bg-black/85 border border-amber-500/40 px-2 py-0.5 backdrop-blur-sm flex items-center gap-1">
              <ShieldAlert className="w-2.5 h-2.5" />
              <span>SPF IC Regulated</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-7 h-7 border flex items-center justify-center transition-all z-10 ${
            isWishlisted 
              ? 'bg-[#991b1b] border-[#991b1b] text-white' 
              : 'bg-black/60 border-gray-700 text-gray-400 hover:text-white hover:border-[#D4AF37]'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="px-4 py-2 bg-black/90 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest flex items-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Examine Specs</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-[#0F0F0F]">
        <div>
          {/* Sub-label / Classification */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-gray-500 mb-2">
            <span>{product.categoryLabel}</span>
            <span className="text-neutral-400">{product.sharpness}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-serif text-base text-gray-100 group-hover:text-[#D4AF37] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Steel or Material spec preview */}
          {product.steelType && (
            <p className="text-xs text-gray-400 font-light mt-2 line-clamp-1">
              {product.steelType}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-5 pt-4 border-t border-[#222] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-mono font-bold text-[#D4AF37]">
                S${product.price.toLocaleString('en-SG', { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-mono text-gray-600 line-through">
                  S${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-500 font-mono block">
              {product.inStock ? `In Stock (${product.stockCount} left)` : 'Special Order'}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#D4AF37] hover:text-black text-gray-200 border border-[#333] hover:border-[#D4AF37] text-[10px] uppercase font-mono tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Add to order"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
