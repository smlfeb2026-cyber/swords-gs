import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { CategoryType } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-16 bg-[#0A0A0A] border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
                Department Archives
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
              Explore by Weaponry Class
            </h2>
          </div>

          <button
            onClick={() => {
              onSelectCategory('all');
              const catalogueEl = document.getElementById('catalogue-section');
              if (catalogueEl) catalogueEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-mono text-[#D4AF37] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <span>View All Series (40+ Models)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_DATA.map((cat, index) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as CategoryType);
                  const catalogueEl = document.getElementById('catalogue-section');
                  if (catalogueEl) catalogueEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative h-60 bg-[#0F0F0F] border overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'border-[#222] hover:border-[#444]'
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:from-black/90 transition-colors" />

                {/* Top index counter */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-lg font-serif text-white leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-light">
                    {cat.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-gray-400">
                    <span className="text-[#D4AF37]">{cat.count}+ Available</span>
                    <span className="group-hover:translate-x-1 transition-transform text-white">
                      Inspect Series →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
