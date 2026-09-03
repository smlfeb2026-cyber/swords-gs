import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  onSelectCategory: (category: CategoryType) => void;
  onOpenPlazaNotice: () => void;
  onOpenLegalGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSelectCategory, 
  onOpenPlazaNotice,
  onOpenLegalGuide 
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = [
    {
      collectionTag: 'Exclusive Collections',
      titleLine1: 'Masterpieces',
      titleLine2: 'of',
      titleAccent: 'Steel',
      description: 'Discover our meticulously curated selection of legendary hand-forged Japanese blades, European medieval armaments, and museum-grade collector replicas.',
      targetCategory: 'japanese' as CategoryType,
      primaryBtnText: 'View Series',
      bgImage: 'https://images.unsplash.com/photo-1590502160462-58b41354f588?auto=format&fit=crop&w=1600&q=85',
    },
    {
      collectionTag: 'Heritage & Cinema',
      titleLine1: 'Legends of',
      titleLine2: 'Myth &',
      titleAccent: 'Cinema',
      description: 'Officially inspired arms from Lord of the Rings, Game of Thrones, and anime classics. Crafted with authentic materials for Singapore’s premier collections.',
      targetCategory: 'movie' as CategoryType,
      primaryBtnText: 'Explore Cinema',
      bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=85',
    },
    {
      collectionTag: 'Singapore Police Force Compliant',
      titleLine1: 'Sengoku Armour',
      titleLine2: '& Vintage',
      titleAccent: 'Firearms',
      description: 'Hand-hammered wearable samurai suits and non-firing flintlocks strictly compliant with Singapore Arms and Explosives licensing regulations.',
      targetCategory: 'armour' as CategoryType,
      primaryBtnText: 'Inspect Armours',
      bgImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlideIndex];

  return (
    <div className="w-full bg-[#0A0A0A] flex flex-col border-b border-[#222]">
      {/* Main Hero Banner */}
      <section className="min-h-[460px] lg:h-[500px] relative flex items-center px-6 sm:px-12 overflow-hidden">
        {/* Background Gradients & Imagery */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 transform scale-100"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          {/* Subtle architectural geometric grid lines */}
          <div className="absolute inset-0 bg-[#0A0A0A]/40" />
          <div className="absolute right-0 top-0 bottom-0 w-2/3 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
            <div className="w-[600px] h-[300px] border border-[#333] rotate-[-15deg] flex items-center justify-center">
              <div className="w-[500px] h-[1px] bg-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative z-20 max-w-xl py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[1px] bg-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
              {slide.collectionTag}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif mb-6 leading-tight text-[#F1F1F1]">
            {slide.titleLine1} <br/>
            {slide.titleLine2} <span className="italic text-[#D4AF37]">{slide.titleAccent}</span>
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md font-light">
            {slide.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              id="hero-view-series-btn"
              onClick={() => {
                onSelectCategory(slide.targetCategory);
                const catalog = document.getElementById('catalogue-section');
                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-black text-[11px] uppercase tracking-widest font-bold hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
            >
              {slide.primaryBtnText}
            </button>

            <button 
              id="hero-catalog-btn"
              onClick={() => {
                onSelectCategory('all');
                const catalog = document.getElementById('catalogue-section');
                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 border border-white/20 text-white text-[11px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors cursor-pointer"
            >
              Full Catalog
            </button>

            <a
              href="https://wa.me/6591234567?text=Hello%20CAESARS%20Singapore%2C%20I%20would%20like%20to%20inquire%20about%20a%20collector%20piece"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors font-mono"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        {/* Carousel slide indicators */}
        <div className="absolute right-6 sm:right-12 bottom-6 z-20 flex items-center gap-3">
          <button
            onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-8 h-8 border border-gray-700 hover:border-[#D4AF37] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5 font-mono text-[10px] text-[#D4AF37]">
            0{currentSlideIndex + 1} / 0{heroSlides.length}
          </div>
          <button
            onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
            className="w-8 h-8 border border-gray-700 hover:border-[#D4AF37] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Tri-Column Series Showcase (Exact match with Design HTML layout) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border-t border-[#222]">
        {/* Card 01 */}
        <div 
          onClick={() => {
            onSelectCategory('japanese');
            const cat = document.getElementById('catalogue-section');
            if (cat) cat.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#0F0F0F] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#151515] transition-colors min-h-[160px]"
        >
          <div>
            <span className="text-[10px] text-[#D4AF37] font-mono mb-2 block tracking-widest">01</span>
            <h3 className="text-lg font-serif tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
              The Katana & Wakizashi
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1">Clay-tempered 1095 carbon steel & authentic ray skin fittings.</p>
          </div>
          <div className="flex items-end justify-between mt-6">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Hand-Forged</span>
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
              <span className="text-[#D4AF37] text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        </div>

        {/* Card 02 */}
        <div 
          onClick={() => {
            onSelectCategory('western');
            const cat = document.getElementById('catalogue-section');
            if (cat) cat.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#0F0F0F] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#151515] transition-colors min-h-[160px]"
        >
          <div>
            <span className="text-[10px] text-[#D4AF37] font-mono mb-2 block tracking-widest">02</span>
            <h3 className="text-lg font-serif tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
              European & Medieval Heritage
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1">Crusader arming swords, two-handed claymores and rapiers.</p>
          </div>
          <div className="flex items-end justify-between mt-6">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Authentic Replicas</span>
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
              <span className="text-[#D4AF37] text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        </div>

        {/* Card 03 */}
        <div 
          onClick={() => {
            onSelectCategory('armour');
            const cat = document.getElementById('catalogue-section');
            if (cat) cat.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#0F0F0F] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#151515] transition-colors min-h-[160px]"
        >
          <div>
            <span className="text-[10px] text-[#D4AF37] font-mono mb-2 block tracking-widest">03</span>
            <h3 className="text-lg font-serif tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
              Wearable Armour & Arms
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1">Full Sengoku Yoroi suits, Centurion helmets & SPF compliant replicas.</p>
          </div>
          <div className="flex items-end justify-between mt-6">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Collector Grade</span>
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
              <span className="text-[#D4AF37] text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
