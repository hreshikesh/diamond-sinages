// src/pages/AutomobileSignsPage/AutomobileSignsPage.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { Search, X, Filter, ArrowUpRight, Car } from "lucide-react";
import Container from "../components/common/Container";

/* ---------------------------------------
   BRAND DATA (with updated counts)
--------------------------------------- */
const BRANDS = [
  { name: "All", count: 83 },
  { name: "Hyundai", count: 16 },
  { name: "Mahindra", count: 3 },
  { name: "Renault", count: 12 },
  { name: "Fiat", count: 6 },
  { name: "Honda 4", count: 6 },
  { name: "Mitsubishi", count: 11 },
  { name: "Honda 2", count: 15 },
  { name: "Tata", count: 14 },
];

/* ---------------------------------------
   PROJECT DATA (Automobile Signs)
--------------------------------------- */
const PROJECTS = [
  // Hyundai (16 items)
  { id: "hy-1", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130143_hkwoww.jpg" },
  { id: "hy-2", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130200_udugfo.jpg" },
  { id: "hy-3", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130041_jhajki.jpg" },
  { id: "hy-4", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130215_ppvenq.jpg" },
  { id: "hy-5", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130253_m3hmrd.jpg" },
  { id: "hy-6", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338829/Screenshot_2026-09-02_130317_mlnank.jpg" },
  { id: "hy-7", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130346_bbgszj.jpg" },
  { id: "hy-8", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130423_kihf3a.jpg" },
  { id: "hy-9", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130436_vqrsjn.jpg" },
  { id: "hy-10", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130359_oqngge.jpg" },
  { id: "hy-11", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130446_e1uf6c.jpg" },
  { id: "hy-12", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338830/Screenshot_2026-09-02_130330_yctkvu.jpg" },
  { id: "hy-13", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338831/Screenshot_2026-09-02_130510_qhugjw.jpg" },
  { id: "hy-14", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338832/Screenshot_2026-09-02_130525_mzwfh6.jpg" },
  { id: "hy-15", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338832/Screenshot_2026-09-02_130541_yartsi.jpg" },
  { id: "hy-16", brand: "Hyundai", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788338832/Screenshot_2026-09-02_130554_e5t3sr.jpg" },

  // Mahindra (3 items)
  { id: "mh-1", brand: "Mahindra", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339059/mh1_vsgk1a.jpg" },
  { id: "mh-2", brand: "Mahindra", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339059/mh2_i9rci8.jpg" },
  { id: "mh-3", brand: "Mahindra", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339059/mh3_htvnlt.jpg" },

  // Renault (12 items)
  { id: "re-0", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339302/re0_fkcsyu.jpg" },
  { id: "re-1", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339302/re1_haqikt.jpg" },
  { id: "re-2", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339302/re2_wrry40.jpg" },
  { id: "re-3", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339302/re3_firnz2.jpg" },
  { id: "re-4", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339303/re4_ul2xld.jpg" },
  { id: "re-5", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339303/re5_xhk8h3.jpg" },
  { id: "re-6", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339303/re6_lekaq8.jpg" },
  { id: "re-7", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339303/re7_l0qqwg.jpg" },
  { id: "re-8", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339305/re8_yfbxkb.jpg" },
  { id: "re-9", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339305/re9_mgpyin.jpg" },
  { id: "re-11", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339305/re11_mvgoqw.jpg" },
  { id: "re-12", brand: "Renault", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339306/re12_ydaok8.jpg" },

  // Fiat (6 items)
  { id: "fi-1", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339503/fi1_yvgf4u.jpg" },
  { id: "fi-2", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339504/fi2_xqlutw.jpg" },
  { id: "fi-3", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339505/fi3_q7es7g.jpg" },
  { id: "fi-4", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339506/fi4_teosn6.jpg" },
  { id: "fi-5", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339506/fi5_yhxmaq.jpg" },
  { id: "fi-6", brand: "Fiat", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339507/fi6_uc2bei.jpg" },

  // Honda 4 (6 items)
  { id: "ho-1", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339671/ho1_qiglwi.jpg" },
  { id: "ho-2", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339672/ho2_izec3u.jpg" },
  { id: "ho-3", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339672/ho3_unagzq.jpg" },
  { id: "ho-4", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339673/ho4_ebu833.jpg" },
  { id: "ho-5", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339674/ho5_crwedu.jpg" },
  { id: "ho-6", brand: "Honda 4", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339675/ho6_g0f11u.jpg" },

  // Mitsubishi (11 items)
  { id: "mi-1", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339954/mi1_dtmfkp.jpg" },
  { id: "mi-2", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339954/mi2_kpijjk.jpg" },
  { id: "mi-3", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339956/mi3_dr5nlm.jpg" },
  { id: "mi-4", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339957/mi4_dobox2.jpg" },
  { id: "mi-5", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339958/mi5_jm0xf4.jpg" },
  { id: "mi-6", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339959/mi6_baxlc0.jpg" },
  { id: "mi-7", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339964/mi7_fytxgm.jpg" },
  { id: "mi-8", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339965/mi8_eskkc7.jpg" },
  { id: "mi-9", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339966/mi9_cwoldy.jpg" },
  { id: "mi-10", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339967/mi10_doei6z.jpg" },
  { id: "mi-11", brand: "Mitsubishi", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788339968/mi11_woopnu.jpg" },

  // Honda 2 (15 items)
  { id: "h2-1", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340291/h1_ul5ifo.jpg" },
  { id: "h2-2", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340292/h2_qhrdar.jpg" },
  { id: "h2-3", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340292/h3_mqem9n.jpg" },
  { id: "h2-4", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340294/h4_qqle1q.jpg" },
  { id: "h2-5", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340295/h5_tlifrb.jpg" },
  { id: "h2-6", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340297/h6_phwk59.jpg" },
  { id: "h2-7", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340298/h7_qgdj1g.jpg" },
  { id: "h2-8", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340299/h8_agosen.jpg" },
  { id: "h2-9", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340300/h9_aidxu1.jpg" },
  { id: "h2-10", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340301/h10_hrt9zp.jpg" },
  { id: "h2-11", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340302/h11_kxzujd.jpg" },
  { id: "h2-12", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340303/h12_p76mw3.jpg" },
  { id: "h2-13", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340304/h13_cpvehv.jpg" },
  { id: "h2-14", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340306/h14_nul1zq.jpg" },
  { id: "h2-15", brand: "Honda 2", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340307/h15_cxpnma.jpg" },

  // Tata (14 items)
  { id: "ta-1", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340636/t1_vqoz2j.jpg" },
  { id: "ta-2", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340637/t2_ikp8zo.jpg" },
  { id: "ta-3", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340638/t3_k5qkyk.jpg" },
  { id: "ta-4", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340640/t4_ozjgrn.jpg" },
  { id: "ta-5", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340641/t5_uhrsba.jpg" },
  { id: "ta-6", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340642/t6_jmcmps.jpg" },
  { id: "ta-7", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340644/t7_xwn6fr.jpg" },
  { id: "ta-8", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340645/t8_juyqmx.jpg" },
  { id: "ta-9", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340646/t9_rpokbh.jpg" },
  { id: "ta-10", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340648/t10_yyvmlc.jpg" },
  { id: "ta-11", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340649/t11_cjjdfx.jpg" },
  { id: "ta-12", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340650/t12_h0g3c0.jpg" },
  { id: "ta-13", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340652/t13_ykrvoa.jpg" },
  { id: "ta-14", brand: "Tata", image: "https://res.cloudinary.com/k4uklwi4/image/upload/v1788340654/t14_i0nat6.jpg" },
];

/* ---------------------------------------
   MASONRY GRID LAYOUT UTILITY
--------------------------------------- */
const getSpanClass = (index) => {
  const pattern = [
    "lg:row-span-2 lg:col-span-2",
    "lg:row-span-1",
    "lg:row-span-1",
    "lg:row-span-1",
    "lg:col-span-2",
    "lg:row-span-2",
  ];
  return pattern[index % pattern.length];
};

/* ---------------------------------------
   MAIN PAGE COMPONENT
--------------------------------------- */
export default function AutomobileSignsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.brand === activeFilter);
  }, [activeFilter]);

  // Sticky filter detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lightbox Esc key
  useEffect(() => {
    if (!selectedImage) return;
    const handler = (e) => e.key === "Escape" && setSelectedImage(null);
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] text-white">
      
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.1),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* HERO HEADER */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight">
                Automobile <br />
                <span className="italic text-red-500">Showroom Signs.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                Precision-engineered brand identity systems for India's leading automotive showrooms. Backlit facades, dealership standards, and pylons.
              </p>
            </div>

            {/* Live Stats */}
            <motion.div
              key={activeFilter}
              initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:gap-8"
            >
              <div>
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  {String(filteredProjects.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Active Projects
                </p>
              </div>
              <div className="h-14 w-px bg-white/10" />
              <div>
                <p className="font-display text-4xl font-bold text-red-500 sm:text-5xl">
                  {activeFilter === "All" ? "08" : "01"}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Brand{activeFilter === "All" ? "s" : ""}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* STICKY FILTER RAIL */}
      <div
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <Container>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              <Filter size={12} />
              <span className="hidden sm:inline">Filter by Brand</span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* Scrolling chip filter */}
            <LayoutGroup>
              <div className="scrollbar-hide flex flex-1 items-center gap-2 overflow-x-auto pb-1">
                {BRANDS.map((brand) => {
                  const isActive = activeFilter === brand.name;
                  return (
                    <button
                      key={brand.name}
                      onClick={() => setActiveFilter(brand.name)}
                      className={`group relative shrink-0 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-filter-pill"
                          className="absolute inset-0 rounded-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {brand.name}
                        <span
                          className={`rounded-full px-1.5 text-[9px] font-mono font-normal ${
                            isActive ? "bg-white/20 text-white" : "text-white/30"
                          }`}
                        >
                          {brand.count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </Container>
      </div>

      {/* BENTO MASONRY GRID */}
      <section className="relative pt-8 pb-24 sm:pt-10 lg:pt-14 lg:pb-32">
        <Container>
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-5 auto-rows-[80px] gap-1.5 sm:gap-2 md:auto-rows-[120px] md:gap-3 lg:auto-rows-[160px] lg:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.button
                    layout
                    layoutId={`img-${project.id}`}
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      layout: { type: "spring", stiffness: 200, damping: 25 },
                      opacity: { duration: 0.3, delay: (index % 10) * 0.03 },
                    }}
                    onClick={() => setSelectedImage(project)}
                    className={`group relative col-span-1 row-span-1 overflow-hidden rounded-lg border border-white/[0.06] bg-[#0a0a0a] transition-all duration-500 hover:z-10 hover:border-red-500/40 sm:rounded-xl lg:rounded-2xl ${
                      window.innerWidth >= 1024 ? getSpanClass(index) : ""
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.brand}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-contain opacity-70 grayscale-[30%] transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-red-950/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 w-full translate-y-2 p-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-3 lg:p-4">
                      <div className="flex items-center gap-1.5">
                        <Car size={10} className="text-red-500" />
                        <p className="text-[7px] font-bold uppercase tracking-widest text-red-400 sm:text-[9px]">
                          {project.brand}
                        </p>
                      </div>
                    </div>

                    <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/80 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 sm:right-2 sm:top-2 sm:h-6 sm:w-6">
                      <ArrowUpRight size={10} className="text-white sm:size-3" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Search size={40} className="text-white/20" />
              <p className="mt-4 font-display text-2xl font-bold text-white/60">
                No projects yet for {activeFilter}
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-6 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative border-t border-white/10 py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              End of Portfolio
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight text-white">
              Running an automotive brand?
              <br />
              <span className="italic text-red-500">Let's engineer your identity.</span>
            </h3>
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              Start Your Project
              <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </Container>
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
          >
            <div className="absolute left-4 top-4 z-20 flex items-center gap-3 rounded-full border border-white/20 bg-black/60 px-4 py-2 backdrop-blur-md sm:left-6 sm:top-6">
              <Car size={13} className="text-red-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                DDSPL · {selectedImage.brand}
              </p>
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-600 sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>

            <motion.div
              layoutId={`img-${selectedImage.id}`}
              className="relative max-h-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.brand}
                className="h-auto max-h-[85vh] w-auto object-contain"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 sm:p-10"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                  Automobile Showroom
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">
                  {selectedImage.brand}
                </p>
              </motion.div>
            </motion.div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-widest text-white/40 sm:bottom-6">
              Press ESC or click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}