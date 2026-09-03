import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  MessageCircle, 
  MapPin, 
  Menu, 
  X, 
  BookOpen
} from 'lucide-react';
import { CategoryType, Product } from '../types';

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLegalGuide: () => void;
  onOpenPlazaNotice: () => void;
  onOpenMaintenanceGuide: () => void;
  filteredProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenLegalGuide,
  onOpenPlazaNotice,
  onOpenMaintenanceGuide,
  filteredProducts,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navCategories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'japanese', label: 'Swords' },
    { id: 'knives', label: 'Knives' },
    { id: 'armour', label: 'Armour' },
    { id: 'firearms', label: 'Firearms' },
    { id: 'movie', label: 'Collectibles' },
    { id: 'maintenance', label: 'Care' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222]">
      {/* Top Advisory Bar */}
      <div className="bg-[#050505] text-[#999] border-b border-[#1c1c1c] px-4 lg:px-12 py-1.5 text-[11px] uppercase tracking-[0.18em]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] font-semibold">Singapore Premier Weaponry Boutique • Est. 2000</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <button 
              onClick={onOpenPlazaNotice}
              className="hidden sm:inline-flex items-center gap-1 text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span>Plaza Singapura Redevelopment Notice</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <button 
              onClick={onOpenLegalGuide}
              className="flex items-center gap-1 text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>SPF Compliance & IC Verification</span>
            </button>
            <span className="text-neutral-800">|</span>
            <a 
              href="https://wa.me/6591234567?text=Hello%20CAESARS%20Singapore%2C%20I%20would%20like%20to%20inquire%20about%20your%20sword%20and%20armour%20collection" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#D4AF37]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-8 lg:gap-12">
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <div 
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-baseline gap-2 cursor-pointer group"
          >
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.2em] text-[#D4AF37] font-normal group-hover:opacity-90 transition-opacity">
              CAESARS
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] text-gray-500 font-mono">
              SG
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] font-medium text-gray-400">
            {navCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`transition-colors pb-1 cursor-pointer ${
                    active 
                      ? 'text-[#D4AF37] border-b border-[#D4AF37]' 
                      : 'hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Actions & Shop Now button */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Quick search input */}
          <div className="relative hidden md:block w-44 lg:w-56">
            <input
              id="desktop-search-input"
              type="text"
              placeholder="Search steel..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
              className="w-full bg-[#111] border border-[#262626] focus:border-[#D4AF37] text-xs text-[#F1F1F1] placeholder:text-gray-500 px-3 py-1.5 pl-8 rounded-none outline-none font-mono"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}

            {/* Search Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0F0F0F] border border-[#262626] shadow-2xl p-2 z-50 max-h-72 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-[#D4AF37] border-b border-[#222] flex justify-between">
                  <span>Results ({filteredProducts.length})</span>
                  <span className="text-gray-600">SGD</span>
                </div>
                {filteredProducts.length === 0 ? (
                  <p className="p-3 text-[11px] text-gray-500 text-center font-mono">No matching blades found</p>
                ) : (
                  filteredProducts.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setSearchFocused(false);
                      }}
                      className="p-2 hover:bg-[#181818] cursor-pointer flex items-center gap-2.5 transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-8 h-8 object-cover border border-[#333]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-200 truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{p.categoryLabel}</p>
                      </div>
                      <span className="text-xs text-[#D4AF37] font-mono shrink-0">
                        S${p.price}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Guide Quick Link */}
          <button
            id="care-guide-btn"
            onClick={onOpenMaintenanceGuide}
            className="hidden xl:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Care Guide</span>
          </button>

          {/* Wishlist */}
          <button
            id="wishlist-btn"
            onClick={onOpenWishlist}
            className="relative text-gray-400 hover:text-[#D4AF37] transition-colors p-1"
            title="Saved Items"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#991b1b] text-white text-[9px] font-mono flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <div 
            id="cart-drawer-trigger"
            onClick={onOpenCart}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 border border-[#333] group-hover:border-[#D4AF37] flex items-center justify-center p-1 transition-colors">
              <ShoppingBag className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37]" />
            </div>
            {cartCount > 0 && (
              <span className="text-[11px] font-mono text-[#D4AF37]">
                ({cartCount})
              </span>
            )}
          </div>

          {/* Shop Now CTA */}
          <div 
            onClick={() => {
              onSelectCategory('all');
              const catalogue = document.getElementById('catalogue-section');
              if (catalogue) catalogue.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[10px] uppercase tracking-widest bg-[#D4AF37] text-black px-4 py-2 font-bold cursor-pointer hover:bg-[#e4c04c] transition-colors"
          >
            Shop Now
          </div>
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            id="mobile-search-input"
            type="text"
            placeholder="Search katanas, knives, armours..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#111] border border-[#262626] text-xs text-[#F1F1F1] placeholder:text-gray-500 px-3 py-2 pl-8 outline-none font-mono"
          />
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-t border-[#222] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wider">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2 border ${
                  activeCategory === cat.id 
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#161616]' 
                    : 'border-[#222] text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#222] space-y-2 text-xs text-gray-400">
            <button 
              onClick={() => { onOpenLegalGuide(); setMobileMenuOpen(false); }}
              className="w-full text-left py-1 hover:text-[#D4AF37]"
            >
              SPF Arms & Explosives Legal Notice
            </button>
            <button 
              onClick={() => { onOpenPlazaNotice(); setMobileMenuOpen(false); }}
              className="w-full text-left py-1 hover:text-[#D4AF37]"
            >
              Plaza Singapura Store Transition
            </button>
            <button 
              onClick={() => { onOpenMaintenanceGuide(); setMobileMenuOpen(false); }}
              className="w-full text-left py-1 hover:text-[#D4AF37]"
            >
              Japanese Blade Maintenance Instructions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
