import React, { useEffect, useState, useRef } from 'react';
import { 
  MessageSquare, 
  MessageCircle, 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Sparkles, 
  HelpCircle,
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

// Real fixed values for Disqus configuration as requested
const DISQUS_SHORTNAME = 'katana-sword-1';
const PAGE_URL = 'https://caesars.com.sg/talk-to-us';
const PAGE_IDENTIFIER = 'caesars-singapore-talk-to-us';
const PAGE_TITLE = 'Talk to Us | CAESARS Singapore Weaponry Boutique';

interface TalkToUsProps {
  onBackToCatalogue: () => void;
  onOpenLegalGuide: () => void;
  onOpenPlazaNotice: () => void;
}

export const TalkToUs: React.FC<TalkToUsProps> = ({
  onBackToCatalogue,
  onOpenLegalGuide,
  onOpenPlazaNotice,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize or reload Disqus whenever the component mounts or reloadKey changes
  useEffect(() => {
    let isMounted = true;

    const configureAndLoadDisqus = () => {
      // If DISQUS is already on the window (e.g. user navigated back to this tab in SPA)
      if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
        try {
          window.DISQUS.reset({
            reload: true,
            config: function () {
              this.page.url = PAGE_URL;
              this.page.identifier = PAGE_IDENTIFIER;
              this.page.title = PAGE_TITLE;
            },
          });
          if (isMounted) setIsLoaded(true);
        } catch (err) {
          console.warn('Disqus reset notice:', err);
        }
      } else {
        // Initial load configuration
        window.disqus_config = function () {
          this.page.url = PAGE_URL;
          this.page.identifier = PAGE_IDENTIFIER;
          this.page.title = PAGE_TITLE;
        };

        // Inject the embed.js script if not present
        const existingScript = document.getElementById('disqus-embed-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-embed-script';
          s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onload = () => {
            if (isMounted) setIsLoaded(true);
          };
          (d.head || d.body).appendChild(s);
        } else {
          // Script exists but DISQUS might still be initializing
          const checkDisqus = setInterval(() => {
            if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
              clearInterval(checkDisqus);
              try {
                window.DISQUS.reset({
                  reload: true,
                  config: function () {
                    this.page.url = PAGE_URL;
                    this.page.identifier = PAGE_IDENTIFIER;
                    this.page.title = PAGE_TITLE;
                  },
                });
                if (isMounted) setIsLoaded(true);
              } catch (e) {
                console.warn('Disqus retry error:', e);
              }
            }
          }, 200);

          setTimeout(() => clearInterval(checkDisqus), 4000);
        }

        // Count script injection if not present
        if (!document.getElementById('dsq-count-scr')) {
          const cs = document.createElement('script');
          cs.id = 'dsq-count-scr';
          cs.src = `//${DISQUS_SHORTNAME}.disqus.com/count.js`;
          cs.async = true;
          (document.head || document.body).appendChild(cs);
        }
      }
    };

    // Allow DOM to paint <div id="disqus_thread"></div> first
    const timer = setTimeout(() => {
      configureAndLoadDisqus();
    }, 60);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [reloadKey]);

  const handleManualReload = () => {
    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = PAGE_URL;
          this.page.identifier = PAGE_IDENTIFIER;
          this.page.title = PAGE_TITLE;
        },
      });
    } else {
      setReloadKey((k) => k + 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-[#F1F1F1] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back action */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-[#222] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <button
              onClick={onBackToCatalogue}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              CAESARS BOUTIQUE
            </button>
            <span>/</span>
            <span className="text-[#D4AF37]">TALK TO US</span>
          </div>

          <button
            onClick={onBackToCatalogue}
            className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>← Back to Master Catalogue</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
              Collector Inquiries & Discussions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-wide">
            Talk To Us
          </h1>
          <p className="text-sm text-gray-400 font-light mt-3 max-w-3xl leading-relaxed">
            Have a question about Singapore Police Force licensing, traditional Japanese Choji oil maintenance, custom blade engraving, or historical weapon availability? Join our community forum below or reach our concierge directly.
          </p>
        </div>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Channel 1: WhatsApp Concierge */}
          <div className="bg-[#0F0F0F] border border-[#222] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-none bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#D4AF37]">
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5">
                Active
              </span>
            </div>
            <h3 className="font-serif text-base text-white">Direct WhatsApp Concierge</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Immediate order inquiries, private viewings, and urgent custom engraving consultations.
            </p>
            <a
              href="https://wa.me/6591234567?text=Hello%20CAESARS%20Singapore%2C%20I%20have%20an%20inquiry%20regarding%20swords%20and%20armour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:underline pt-2 cursor-pointer"
            >
              <span>Chat on WhatsApp (+65 9123 4567)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Channel 2: SPF Legal Inquiries */}
          <div className="bg-[#0F0F0F] border border-[#222] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-none bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                Compliance
              </span>
            </div>
            <h3 className="font-serif text-base text-white">SPF Arms & Explosives Inquiries</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Questions regarding NRIC/FIN verification, legal ownership in Singapore, or travel export.
            </p>
            <button
              onClick={onOpenLegalGuide}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:underline pt-2 cursor-pointer"
            >
              <span>View SPF Arms Regulations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Channel 3: Plaza Singapura Transition */}
          <div className="bg-[#0F0F0F] border border-[#222] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-none bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                2026 - 2028
              </span>
            </div>
            <h3 className="font-serif text-base text-white">Plaza Singapura Redevelopment</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Our Plaza Singapura physical boutique is in transition. Inquiries are serviced online with islandwide delivery.
            </p>
            <button
              onClick={onOpenPlazaNotice}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:underline pt-2 cursor-pointer"
            >
              <span>Read Mall Transition Notice</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Disqus Discussion Thread Section */}
        <div className="bg-[#0F0F0F] border border-[#222] p-6 sm:p-10 mb-12">
          {/* Thread Header Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#222]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#D4AF37]">
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-serif text-white">
                  Community Discussion & Public Q&A
                </h2>
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mt-0.5">
                  <span>Powered by Disqus</span>
                  <span>•</span>
                  <span className="text-gray-400">Canonical: caesars.com.sg/talk-to-us</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="reload-disqus-button"
                onClick={handleManualReload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#2B2B2B] hover:border-[#D4AF37] text-xs font-mono text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                title="Reload Disqus comments in this single-page view"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reload Thread</span>
              </button>
            </div>
          </div>

          {/* Quick Discussion Topic Prompts */}
          <div className="mb-6 p-4 bg-[#141414] border border-[#1F1F1F] rounded-none">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3 h-3" />
              <span>Common Discussion Topics for Collectors</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-400">
              <span className="bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-1 text-gray-300">
                Blade sharpening vs. unsharpened display models
              </span>
              <span className="bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-1 text-gray-300">
                Choji oil application in Singapore humidity
              </span>
              <span className="bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-1 text-gray-300">
                Denix non-firing replica gun legality
              </span>
              <span className="bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-1 text-gray-300">
                Lord of the Rings & anime replica steel types
              </span>
            </div>
          </div>

          {/* The official Disqus thread container */}
          <div 
            ref={containerRef}
            className="disqus-container min-h-[350px] relative transition-opacity duration-300"
          >
            <div id="disqus_thread" className="w-full"></div>
            
            <noscript>
              <div className="p-6 bg-[#161616] border border-[#333] text-center text-sm font-mono text-gray-400">
                Please enable JavaScript to view the{' '}
                <a 
                  href="https://disqus.com/?ref_noscript" 
                  rel="nofollow"
                  className="text-[#D4AF37] underline"
                >
                  comments powered by Disqus.
                </a>
              </div>
            </noscript>
          </div>
        </div>

        {/* Operating Hours & Advisory */}
        <div className="p-6 bg-[#080808] border border-[#1C1C1C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>Support Desk Hours: Daily 11:00 AM – 8:30 PM SGT</span>
          </div>
          <div className="text-gray-500 text-center md:text-right">
            Discussions are moderated according to Singapore Police Force compliance guidelines.
          </div>
        </div>
      </div>
    </div>
  );
};
