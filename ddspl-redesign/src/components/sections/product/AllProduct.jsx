// src/pages/ProductsPage/ProductsPage.jsx
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Search, 
  ArrowUpRight, 
  Zap, 
  Grid3X3,
  Palette,
  Settings,
  X,
  Layers,
  Router,
  Lightbulb,
  Signpost,
  Car,
  Building2,
  Printer,
  Paintbrush,
  Type
} from "lucide-react";
import Container from "../../common/Container";

/* ---------------------------------------
   PRODUCT DATA (Categorized)
--------------------------------------- */
const PRODUCTS = [
  // Signage
  { name: "CNC Router Signage", category: "Signage", icon: Router },
  { name: "Pylons Signs", category: "Signage", icon: Signpost },
  { name: "Parking & Exit Signs", category: "Signage", icon: Signpost },
  { name: "Flex Glow Signs", category: "Illuminated", icon: Lightbulb },
  { name: "Cut Vinyl Glow Signs", category: "Illuminated", icon: Lightbulb },
  { name: "ACP Signs", category: "Signage", icon: Grid3X3 },
  { name: "Directory Signs", category: "Signage", icon: Signpost },
  { name: "ACP Backlit Signs", category: "Illuminated", icon: Lightbulb },
  { name: "Backlit Signs", category: "Illuminated", icon: Lightbulb },
  { name: "Store Front Signage", category: "Signage", icon: Building2 },
  
  // Large Format
  { name: "Mall Signage", category: "Signage", icon: Building2 },
  { name: "Building Wrap Graphics", category: "Graphics", icon: Layers },
  { name: "Vehicle Graphics", category: "Graphics", icon: Car },
  { name: "Glow Sign", category: "Illuminated", icon: Lightbulb },
  { name: "Printed Graphics", category: "Graphics", icon: Printer },
  
  // Letters
  { name: "SS Channel Letters", category: "Letters", icon: Type },
  { name: "Neon 3D Channel Letters", category: "Letters", icon: Type },
  { name: "LED Display Solutions", category: "Illuminated", icon: Zap },
  { name: "Digital Printing In Solvent", category: "Printing", icon: Printer },
  { name: "Aluminium Channel Letters", category: "Letters", icon: Type },
  
  // Fabrication
  { name: "ACP Signage & Fabrication Solutions", category: "Fabrication", icon: Settings },
  { name: "Eco-Solvent Printing for Internal Graphic", category: "Printing", icon: Printer },
  { name: "Indoor & Outdoor Digital Printing Solutions", category: "Printing", icon: Printer },
  
  // Finishes
  { name: "Duco & Dupont Painting Solutions", category: "Finishes", icon: Paintbrush },
  { name: "LED Acrylic 3D Channel Letters", category: "Letters", icon: Type },
  { name: "Thermoformed Acrylic Letters", category: "Letters", icon: Type },
];

const CATEGORIES = ["All", "Signage", "Illuminated", "Letters", "Graphics", "Printing", "Fabrication", "Finishes"];

/* ---------------------------------------
   UIVERSE-INSPIRED PRODUCT CARD
--------------------------------------- */
function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const Icon = product.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 12) * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative aspect-square w-full cursor-pointer"
    >
      {/* Ambient Red Glow (Outer - visible on hover) */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-br from-red-600/0 via-red-500/0 to-red-800/0 opacity-0 blur-sm transition-all duration-500 group-hover:from-red-600/60 group-hover:via-red-500/40 group-hover:to-red-800/60 group-hover:opacity-100" />

      {/* Card Body */}
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] transition-all duration-500 group-hover:border-red-500/30 group-hover:bg-[#0f0505]">
        
        {/* Animated Background Sweep on Hover */}
        <div className="pointer-events-none absolute -inset-full -top-full bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(220,38,38,0.15)_180deg,transparent_360deg)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite]" />

        {/* Inner Card Content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-2 sm:p-4">
          
          {/* Icon */}
          <div className="relative mb-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.03] transition-all duration-500 group-hover:scale-110 group-hover:bg-red-500/20 sm:mb-3 sm:h-10 sm:w-10 sm:rounded-lg">
            <Icon 
              className="h-3 w-3 text-white/50 transition-colors group-hover:text-red-400 sm:h-5 sm:w-5" 
              strokeWidth={1.5}
            />
          </div>

          {/* Product Name */}
          <h3 className="text-center font-display text-[7px] font-semibold leading-tight tracking-tight text-white/70 transition-colors duration-500 group-hover:text-white sm:text-xs">
            {product.name}
          </h3>
        </div>

        {/* Bottom Red Accent Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-red-500 to-red-700 transition-all duration-500 group-hover:w-full" />

        {/* Corner Number Badge (Desktop only) */}
        <div className="absolute right-1.5 top-1.5 hidden font-mono text-[7px] text-white/15 transition-colors group-hover:text-red-400/70 sm:right-2 sm:top-2 sm:block sm:text-[8px]">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover State Arrow (Desktop only) */}
        <div className="absolute left-1.5 top-1.5 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:left-2 sm:top-2 sm:block">
          <ArrowUpRight size={10} className="text-red-500" strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------
   MAIN PAGE COMPONENT
--------------------------------------- */
export default function AllProduct() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] pt-24 text-white sm:pt-32">
      
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.08),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container>
        {/* =====================================
            HEADER
        ===================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
                02 — Product Portfolio
              </span>
            </div>
            <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tight">
              Manufacturing <br />
              <span className="text-red-600">Capabilities.</span>
            </h1>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-white/50 sm:text-sm">
              Explore our full range of {PRODUCTS.length} specialized signage and fabrication solutions delivered by DDSPL.
            </p>
          </div>

          {/* Product Counter */}
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
        
            <span className="font-mono text-[10px] tracking-widest text-white/60">
              <span className="text-white">{filteredProducts.length}</span>
              <span className="mx-1 text-white/20">/</span>
              <span>{PRODUCTS.length}</span>
              <span className="ml-2 text-white/40 uppercase">Products</span>
            </span>
          </div>
        </motion.div>

        {/* =====================================
            SPLIT LAYOUT: SIDEBAR + GRID
        ===================================== */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          
          {/* LEFT SIDEBAR (Filters + Search) */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <Search size={11} /> Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter products..."
                  className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-4 pr-10 text-sm text-white placeholder:text-white/25 backdrop-blur-md transition-all focus:border-red-500/40 focus:bg-white/[0.05] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/50 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <Palette size={11} /> Category
              </label>
              <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative flex items-center justify-between rounded-lg px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider transition-all lg:w-full ${
                      activeCategory === cat
                        ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        : "border border-white/5 bg-white/[0.02] text-white/50 hover:border-red-500/20 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    {activeCategory === cat && (
                      <motion.span
                        layoutId="active-cat-arrow"
                        className="hidden lg:block"
                      >
                        <ArrowUpRight size={12} />
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Info Card (Desktop Only) */}
            <div className="mt-8 hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-transparent p-4 lg:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
                Need Custom?
              </p>
              <p className="mt-2 text-xs text-white/60">
                Don't see what you need? Our team specializes in bespoke fabrication solutions.
              </p>
              <a
                href="/contact"
                className="mt-4 flex items-center justify-between rounded-full bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-600"
              >
                Talk to Us <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.aside>

          {/* RIGHT PRODUCT GRID */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center"
                >
                  <p className="font-display text-2xl font-bold text-white/60">
                    No products found
                  </p>
                  <p className="mt-2 text-sm text-white/40">Try adjusting your search or filter.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + searchQuery}
                  className="grid grid-cols-6 gap-1.5 sm:gap-2 md:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.name} 
                      product={product} 
                      index={index} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-12 text-center "
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
            All Products · One Roof
          </span>
          <p className="font-display text-lg font-medium text-white/60 sm:text-xl">
            From design to fabrication to erection — engineered by DDSPL.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}