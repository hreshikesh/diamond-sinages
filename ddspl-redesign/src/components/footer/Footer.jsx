// src/components/common/Footer/Footer.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  MessageCircle,

  Send,
  ArrowUp,
} from "lucide-react";

import Container from "../common/Container";
import logoUrl from "../../assets/images/logo/logo.jpg";

/* ---------------------------------------
   DATA
--------------------------------------- */
const COMPANY = {
  name: "Diamond Display Solutions Pvt. Ltd.",
  shortName: "DDSPL",
  established: "1998",
  location: "Bangalore, India",
  email: "info@ddspl.in",
  phones: ["+91 7760961755", "+91 9980547102"],
  whatsapp: "917760961755",
};

const NAV_LINKS = [
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Facilities", path: "/facilities" },
  { label: "Contact", path: "/contact" },
];

const SPECIALITY_LINKS = [
  { label: "Automobile Signs", path: "/automobilesigns" },
  { label: "Short-Time Projects", path: "/short-time-projects" },
  { label: "Furniture & Fixtures", path: "/furniture-fix" },
];

const SERVICE_LINKS = [
  { label: "Backlit Signs", path: "/products" },
  { label: "3D Illuminated Signs", path: "/products" },
  { label: "Rooftop Signs", path: "/products" },
  { label: "ACP Signs", path: "/products" },
  { label: "Stainless Steel Signs", path: "/products" },
];

// const SOCIAL_LINKS = [
//   { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
//   { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
//   { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
// ];

/* ---------------------------------------
   FOOTER
--------------------------------------- */
export default function Footer() {
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}`;

  // Live Bangalore clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-[150px]" />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <Container className="relative z-10">
        {/* ========================================
            TOP: NEWSLETTER + CTA
        ======================================== */}
         {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/10 py-14 sm:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Stay Connected
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[0.95] tracking-tight">
                Have a project in <br />
                <span className="italic text-red-500">mind?</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                Subscribe to receive project stories, case studies, and behind-the-scenes fabrication insights from DDSPL.
              </p>
            </div>

          
            <div className="flex flex-col justify-center">
              <form
                onSubmit={handleSubscribe}
                className="group relative flex items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md transition-all focus-within:border-red-500/50"
              >
                <div className="flex h-full items-center pl-5 pr-2 text-white/40">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 bg-transparent py-4 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none sm:py-5 sm:text-base"
                />
                <button
                  type="submit"
                  className="group/btn m-1.5 flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  {subscribed ? (
                    <>
                      <span>Subscribed</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        ✓
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Subscribe</span>
                      <span className="sm:hidden">Send</span>
                      <Send size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div> */} 

        {/* ========================================
            MIDDLE: 4-COLUMN LINK GRID
        ======================================== */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-8 lg:py-20">
          
          {/* COL 1: Company Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-4"
          >
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-2 ring-red-500/30 transition-all group-hover:ring-red-500/60">
                <img
                  src={logoUrl}
                  alt="DDSPL"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold tracking-tight">
                  DDSPL
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
                  Since {COMPANY.established}
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Diamond Display Solutions transforms spaces into immersive brand experiences through precision signage engineering.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              {/* {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-red-500/50 hover:bg-red-600 hover:text-white"
                >
                  <social.icon size={15} strokeWidth={1.8} />
                </a>
              ))} */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group ml-2 flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-green-400 transition-all hover:border-green-400 hover:bg-green-500/20"
              >
                <MessageCircle size={12} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* COL 2: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Sitemap
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-red-400"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COL 3: Specialities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Specialities
            </h3>
            <ul className="space-y-3">
              {SPECIALITY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-red-400"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>

           
          </motion.div>

          {/* COL 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-3"
          >
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Get In Touch
            </h3>

            <div className="space-y-4">
              {/* Location */}
              <div className="group flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-white/50 transition-colors group-hover:text-red-400">
                  <MapPin size={13} />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Studio
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    {COMPANY.location}
                  </p>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex items-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-white/50 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Mail size={13} />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Email
                  </p>
                  <p className="mt-0.5 text-sm text-white/80 transition-colors group-hover:text-red-400">
                    {COMPANY.email}
                  </p>
                </div>
              </a>

              {/* Phones */}
              {COMPANY.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-white/50 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Phone size={13} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {i === 0 ? "Primary" : "Sales"}
                    </p>
                    <p className="mt-0.5 text-sm text-white/80 transition-colors group-hover:text-red-400">
                      {phone}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ========================================
            GIANT MARQUEE LOGO WATERMARK
        ======================================== */}
        <div className="relative overflow-hidden border-y border-white/10 py-6 sm:py-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex w-max items-center gap-8 whitespace-nowrap"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="font-display text-[clamp(0.6rem,0.6vw,0.2rem)] font-black leading-none tracking-tighter text-white/[0.08] transition-colors hover:text-red-500/30">
                  DDSPL
                </span>
                <span className="h-3 w-3 rotate-45 shrink-0 bg-red-600/60" />
                <span className="font-display text-[clamp(0.6rem,0.6vw,0.2rem)] font-bold italic tracking-tight text-white/20">
                  Diamond Display Solutions
                </span>
                <span className="h-3 w-3 rotate-45 shrink-0 bg-red-600/60" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ========================================
            BOTTOM: LEGAL STRIP + BACK TO TOP
        ======================================== */}
        <div className="flex flex-col items-start justify-between gap-6 py-8 lg:flex-row lg:items-center">
          
          {/* Legal + Copyright */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              © {currentYear} {COMPANY.name}
            </p>
            {/* <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link
                to="/terms"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                Terms
              </Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link
                to="/sitemap"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
              >
                Sitemap
              </Link>
            </div> */}
          </div>

          {/* Right: Time + Back to Top */}
          <div className="flex items-center gap-4">
          

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-red-500 hover:bg-red-600 hover:text-white"
            >
              <span>Back to Top</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUp size={12} strokeWidth={2.5} />
              </motion.span>
            </button>
          </div>
        </div>

       
      </Container>
    </footer>
  );
}