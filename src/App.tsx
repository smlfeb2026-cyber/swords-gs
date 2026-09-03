import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS_DATA, TESTIMONIALS_DATA } from './data/products';
import { Product, CategoryType, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LegalGuideModal } from './components/LegalGuideModal';
import { PlazaNoticeModal } from './components/PlazaNoticeModal';
import { MaintenanceGuideModal } from './components/MaintenanceGuideModal';
import { TalkToUs } from './components/TalkToUs';
import { Footer } from './components/Footer';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  MessageCircle, 
  MessageSquare,
  Filter, 
  SlidersHorizontal, 
  RotateCcw,
  CheckCircle2,
  Droplet,
  Award,
  ChevronDown
} from 'lucide-react';

export default function App() {
  // Navigation & Filter states
  const [activeTab, setActiveTab] = useState<'catalogue' | 'talk-to-us'>('catalogue');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSteel, setSelectedSteel] = useState('all');
  const [selectedSharpness, setSelectedSharpness] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [filterRegulatedOnly, setFilterRegulatedOnly] = useState(false);

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [legalGuideOpen, setLegalGuideOpen] = useState(false);
  const [plazaNoticeOpen, setPlazaNoticeOpen] = useState(false);
  const [maintenanceGuideOpen, setMaintenanceGuideOpen] = useState(false);

  // Cart & Wishlist persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('caesars_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('caesars_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('caesars_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('caesars_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle Cart Operations
  const handleAddToCart = (
    product: Product, 
    options?: { customEngraving?: string; includeDisplayStand?: boolean }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => 
          item.product.id === product.id &&
          item.customEngraving === options?.customEngraving &&
          item.includeDisplayStand === options?.includeDisplayStand
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            customEngraving: options?.customEngraving,
            includeDisplayStand: options?.includeDisplayStand,
          },
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Handle Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Extract unique steel options for filter
  const availableSteels = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS_DATA.forEach((p) => {
      if (p.steelType) set.add(p.steelType);
    });
    return Array.from(set);
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesSteel = product.steelType?.toLowerCase().includes(query);
        const matchesContext = product.historicalContext?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSku && !matchesSteel && !matchesContext) {
          return false;
        }
      }

      // Steel filter
      if (selectedSteel !== 'all' && product.steelType !== selectedSteel) {
        return false;
      }

      // Sharpness filter
      if (selectedSharpness !== 'all' && product.sharpness !== selectedSharpness) {
        return false;
      }

      // Regulated filter
      if (filterRegulatedOnly && !product.icVerificationRequired) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isCollectorGrade ? 1 : 0) - (a.isCollectorGrade ? 1 : 0);
    });
  }, [
    activeCategory, 
    searchQuery, 
    selectedSteel, 
    selectedSharpness, 
    filterRegulatedOnly, 
    sortBy
  ]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedSteel('all');
    setSelectedSharpness('all');
    setFilterRegulatedOnly(false);
    setSortBy('featured');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1] flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* 1. Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveTab('catalogue');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenLegalGuide={() => setLegalGuideOpen(true)}
        onOpenPlazaNotice={() => setPlazaNoticeOpen(true)}
        onOpenMaintenanceGuide={() => setMaintenanceGuideOpen(true)}
        filteredProducts={filteredProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content Area based on activeTab */}
      {activeTab === 'talk-to-us' ? (
        <TalkToUs
          onBackToCatalogue={() => {
            setActiveTab('catalogue');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenLegalGuide={() => setLegalGuideOpen(true)}
          onOpenPlazaNotice={() => setPlazaNoticeOpen(true)}
        />
      ) : (
        <>
          {/* 2. Hero Section with Carousel & Tri-Column Grid */}
          <Hero
            onSelectCategory={setActiveCategory}
            onOpenPlazaNotice={() => setPlazaNoticeOpen(true)}
            onOpenLegalGuide={() => setLegalGuideOpen(true)}
          />

      {/* 3. Category Archive Showcase */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 4. Catalogue & Filter Section */}
      <main id="catalogue-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Section Title & Subhead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#222] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
                Current Inventory
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
              {activeCategory === 'all' 
                ? 'Master Catalogue' 
                : `${activeCategory.toUpperCase()} COLLECTION`}
            </h2>
            <p className="text-xs text-gray-400 font-light mt-1 font-mono">
              Showing {filteredProducts.length} pieces in Singapore stock
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {(activeCategory !== 'all' || searchQuery || selectedSteel !== 'all' || selectedSharpness !== 'all' || filterRegulatedOnly) && (
              <button
                onClick={resetFilters}
                className="text-[10px] font-mono text-[#D4AF37] hover:text-white flex items-center gap-1 bg-[#16140f] border border-[#D4AF37]/40 px-3 py-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0F0F0F] border border-[#222] p-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category selection tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {[
                { id: 'all', label: 'All Classes' },
                { id: 'japanese', label: 'Japanese Katana' },
                { id: 'western', label: 'Medieval' },
                { id: 'movie', label: 'Movie & Anime' },
                { id: 'firearms', label: 'Replica Guns' },
                { id: 'armour', label: 'Armour' },
                { id: 'knives', label: 'Knives' },
                { id: 'maintenance', label: 'Care / Stands' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CategoryType)}
                  className={`px-3 py-1.5 uppercase tracking-wider transition-colors cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Talk to Us Tab in Catalogue Filter Bar */}
              <button
                id="filter-talk-to-us-tab"
                onClick={() => {
                  setActiveTab('talk-to-us');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border border-[#D4AF37]/50 bg-[#16140D] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold ml-1"
                title="Open Collector Forum & Disqus Discussion"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Talk to Us</span>
                <span className="text-[9px] bg-[#221f15] border border-[#D4AF37]/40 px-1 py-0.2 rounded-none">Disqus</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="uppercase text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#141414] border border-[#262626] text-gray-200 text-xs px-2.5 py-1.5 outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Featured / Collector Grade</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters: Steel, Sharpness, Regulated */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C1C1C] text-xs font-mono">
            <div className="flex flex-wrap items-center gap-3">
              {/* Sharpness selector */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[10px] uppercase">Condition:</span>
                <select
                  value={selectedSharpness}
                  onChange={(e) => setSelectedSharpness(e.target.value)}
                  className="bg-[#141414] border border-[#262626] text-gray-300 text-xs px-2 py-1 outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">All Specs</option>
                  <option value="Battle-Ready (Sharp)">Battle-Ready (Sharp)</option>
                  <option value="Display (Unsharpened)">Display (Unsharpened)</option>
                  <option value="Semi-Edged">Semi-Edged</option>
                  <option value="Non-Firing Replica">Non-Firing Replica</option>
                </select>
              </div>

              {/* Steel composition filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[10px] uppercase">Steel / Material:</span>
                <select
                  value={selectedSteel}
                  onChange={(e) => setSelectedSteel(e.target.value)}
                  className="bg-[#141414] border border-[#262626] text-gray-300 text-xs px-2 py-1 outline-none focus:border-[#D4AF37] max-w-[200px] truncate"
                >
                  <option value="all">All Steels</option>
                  {availableSteels.map((steel) => (
                    <option key={steel} value={steel}>
                      {steel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SPF IC Verification Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={filterRegulatedOnly}
                onChange={(e) => setFilterRegulatedOnly(e.target.checked)}
                className="accent-[#D4AF37] w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-[11px]">SPF IC Regulated Pieces Only</span>
            </label>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 border border-[#222] bg-[#0F0F0F] text-center space-y-4">
            <h3 className="text-lg font-serif text-white">No Blades Match Your Filter Criteria</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
              We couldn't find any steel instruments matching "{searchQuery}". Try selecting "All Classes" or clearing your custom filter options.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#D4AF37] text-black font-mono font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Show Entire Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. Blade Care & Japanese Craftsmanship Interactive Banner */}
      <section className="bg-[#0A0A0A] border-t border-b border-[#222] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Japanese Maintenance */}
          <div className="p-8 bg-[#0F0F0F] border border-[#222] space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[11px] uppercase tracking-widest">
              <Droplet className="w-4 h-4 text-[#D4AF37]" />
              <span>Singapore Climate Protection</span>
            </div>
            <h3 className="text-xl font-serif text-white">
              Traditional Japanese Blade Care
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              In Singapore's high humidity, high-carbon 1095 and folded steel blades require regular application of pure mineral Choji clove oil and non-abrasive Uchiko powder.
            </p>
            <button
              onClick={() => setMaintenanceGuideOpen(true)}
              className="text-xs font-mono text-[#D4AF37] hover:underline uppercase tracking-wider block pt-2"
            >
              Read Oiling Instructions →
            </button>
          </div>

          {/* Card 2: SPF Legal Guide */}
          <div className="p-8 bg-[#0F0F0F] border border-[#222] space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[11px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Legislation & Compliance</span>
            </div>
            <h3 className="text-xl font-serif text-white">
              Singapore Police Force License
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Operating legally since 2000 under the Arms & Explosives Act. All replica firearms are permanently non-firing, and regulated blades undergo simple IC verification.
            </p>
            <button
              onClick={() => setLegalGuideOpen(true)}
              className="text-xs font-mono text-[#D4AF37] hover:underline uppercase tracking-wider block pt-2"
            >
              View SPF Compliance Rules →
            </button>
          </div>

          {/* Card 3: Plaza Singapura Transition */}
          <div className="p-8 bg-[#0F0F0F] border border-[#222] space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[11px] uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Boutique Transition Notice</span>
            </div>
            <h3 className="text-xl font-serif text-white">
              Plaza Singapura (2026 - 2028)
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Following the multi-year redevelopment of Plaza Singapura, CAESARS is currently operating via our flagship online store with white-glove islandwide delivery and WhatsApp concierge.
            </p>
            <button
              onClick={() => setPlazaNoticeOpen(true)}
              className="text-xs font-mono text-[#D4AF37] hover:underline uppercase tracking-wider block pt-2"
            >
              Read Transition Announcement →
            </button>
          </div>
        </div>
      </section>

      {/* 6. Collector Reviews Section */}
      <section className="py-16 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
                  Singapore Collector Feedback
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                Trusted by Discerning Collectors
              </h2>
            </div>
            <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Over 26 Years of Proven Collector Heritage in Singapore</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#0F0F0F] border border-[#222] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37] text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{rev.date}</span>
                </div>
                <h4 className="font-serif text-sm text-white font-medium">
                  {rev.title}
                </h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="pt-3 border-t border-[#222] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-300">{rev.author}</span>
                  <span className="text-emerald-400">✓ Verified Collector</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* 7. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveTab('catalogue');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegalGuide={() => setLegalGuideOpen(true)}
        onOpenPlazaNotice={() => setPlazaNoticeOpen(true)}
        onOpenMaintenanceGuide={() => setMaintenanceGuideOpen(true)}
        onOpenTalkToUs={() => {
          setActiveTab('talk-to-us');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 8. Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenLegalGuide={() => {
          setSelectedProduct(null);
          setLegalGuideOpen(true);
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenLegalGuide={() => {
          setCartOpen(false);
          setLegalGuideOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <LegalGuideModal
        isOpen={legalGuideOpen}
        onClose={() => setLegalGuideOpen(false)}
      />

      <PlazaNoticeModal
        isOpen={plazaNoticeOpen}
        onClose={() => setPlazaNoticeOpen(false)}
      />

      <MaintenanceGuideModal
        isOpen={maintenanceGuideOpen}
        onClose={() => setMaintenanceGuideOpen(false)}
      />
    </div>
  );
}
