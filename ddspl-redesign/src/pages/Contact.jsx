// src/pages/ContactPage/ContactPage.jsx
import { useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Printer,
  Globe,
  MessageCircle,
  User,
  ArrowUpRight,
  Copy,
  Check,
  Building2,
  ArrowRight,
} from "lucide-react";
import Container from "../components/common/Container";

/* ---------------------------------------
   CONSTANTS & VALIDATION
--------------------------------------- */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "YOUR_FORM_ID";

const BUSINESS_HEADS = [
  {
    id: "daniel",
    name: "Daniel Kumar",
    role: "Associate Business Head",
    phone: "+91 9980547102",
    phoneRaw: "919980547102",
    email: "daniel@ddspl.in",
    color: "from-red-600 to-red-800",
  },
  {
    id: "nadeem",
    name: "Nadeem",
    role: "Associate Business Head",
    phone: "+91 7760961755",
    phoneRaw: "917760961755",
    email: "nadeem@ddspl.in",
    color: "from-red-700 to-red-900",
  },
];

const COMPANY = {
  name: "Diamond Display Solutions Pvt. Ltd.",
  address:
    "No: 8, 1st Floor, 5th Main Road, Near Ramamurthy Nagar Police Station, Vijinapura Extn., Bangalore - 560016, INDIA",
  phone: "+91 80 42461000",
  fax: "+91 80 41153713",
  email: "info@ddspl.in",
  website: "www.ddspl.in",
  mapLink: "https://maps.google.com/?q=Ramamurthy+Nagar+Police+Station+Bangalore",
};

const INQUIRY_TYPES = [
  "General Inquiry",
  "Signage Project",
  "Custom Fabrication",
  "Retail Rollout",
  "Partnership",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_RE = /^[+]?[\d\s()-]{10,18}$/;

function validate(form) {
  const errors = {};

  const name = form.name.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 80) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email (e.g. you@company.com).";

  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = "Enter a valid phone number with country code.";
  }

  if (!form.inquiry) errors.inquiry = "Select an inquiry type.";

  if (!message) errors.message = "Please describe your project briefly.";
  else if (message.length < 20)
    errors.message = "Please add a bit more detail (at least 20 characters).";
  else if (message.length > 2000)
    errors.message = "Message is too long (max 2000 characters).";

  return errors;
}

/* ---------------------------------------
   COPY-TO-CLIPBOARD HOOK
--------------------------------------- */
function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-red-500 hover:bg-red-600 hover:text-white"
      aria-label={label}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

/* ---------------------------------------
   MAIN PAGE
--------------------------------------- */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: INQUIRY_TYPES[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState("");

  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const next = { ...formData, [name]: value };
      const nextErrors = validate(next);
      setErrors((prev) => {
        const copy = { ...prev };
        if (!nextErrors[name]) delete copy[name];
        else copy[name] = nextErrors[name];
        return copy;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextErrors = validate(formData);
    setErrors((prev) => {
      const copy = { ...prev };
      if (nextErrors[name]) copy[name] = nextErrors[name];
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextTouched = {
      name: true,
      email: true,
      phone: true,
      inquiry: true,
      message: true,
    };
    setTouched(nextTouched);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          inquiry: formData.inquiry,
          message: formData.message.trim(),
          _subject: `[DDSPL Contact] ${formData.inquiry} — ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry: INQUIRY_TYPES[0],
        message: "",
      });
      setTouched({});
      setErrors({});

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Failed to send. Please email info@ddspl.in.");
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">
      {/* ============================================
          HERO SECTION
      ============================================ */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#0a0000] to-[#050505]" />
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-red-600/20 blur-[150px]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <Container>
          <motion.div
            style={reduceMotion ? undefined : { y: heroY }}
            className="grid gap-10 pb-16 lg:grid-cols-2 lg:items-end lg:gap-16 lg:pb-24"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Get In Touch
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight"
              >
                Let's build <br />
                <span className="italic text-red-500">something great.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              >
                Whether you have a full-scale rollout in mind or just an idea worth exploring, our team is ready to engineer it into reality.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-red-500/40 hover:bg-white/[0.06] sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 transition-all group-hover:bg-red-600">
                  <Phone size={16} className="text-red-400 group-hover:text-white" />
                </div>
                <div className="mt-6">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Direct Line</p>
                  <p className="mt-1 font-display text-sm font-bold text-white sm:text-base">{COMPANY.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-red-500/40 hover:bg-white/[0.06] sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 transition-all group-hover:bg-red-600">
                  <Mail size={16} className="text-red-400 group-hover:text-white" />
                </div>
                <div className="mt-6">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Email Us</p>
                  <p className="mt-1 font-display text-sm font-bold text-white sm:text-base">{COMPANY.email}</p>
                </div>
              </a>

              <a
                href={COMPANY.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-2 flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/40 to-transparent p-5 backdrop-blur-md transition-all hover:border-red-500/40 hover:from-red-950/60 sm:p-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-red-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Studio Location</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white sm:text-base">
                    Bangalore, Karnataka, India
                  </p>
                  <p className="mt-1 text-[11px] text-white/45">
                    Ramamurthy Nagar · 560016
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all group-hover:rotate-45 group-hover:bg-red-600">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============================================
          BUSINESS HEADS SECTION
      ============================================ */}
      <section className="relative border-t border-white/10 py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Direct Access
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight tracking-tight">
                Talk to a Business <span className="text-red-500">Head.</span>
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-white/45 sm:text-sm">
              Skip the queue. Our leadership team responds within hours, not days.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {BUSINESS_HEADS.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-md transition-all hover:border-red-500/30 hover:from-white/[0.06] sm:p-8"
              >
                <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20 transition-colors group-hover:border-red-500" />
                <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-white/20 transition-colors group-hover:border-red-500" />
                <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/20 transition-colors group-hover:border-red-500" />
                <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20 transition-colors group-hover:border-red-500" />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${person.color} shadow-[0_10px_30px_rgba(220,38,38,0.3)]`}>
                        <User size={26} className="text-white" strokeWidth={1.5} />
                      </div>
                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#050505] bg-green-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                        {person.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-white/50">{person.role}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-red-400" />
                      <span className="font-mono text-sm font-semibold text-white">
                        {person.phone}
                      </span>
                    </div>
                    <CopyButton text={person.phone} />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-red-400" />
                      <span className="truncate font-mono text-sm font-semibold text-white">
                        {person.email}
                      </span>
                    </div>
                    <CopyButton text={person.email} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${person.phoneRaw}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${person.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:from-green-500 hover:to-green-600"
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================
          MAP + ADDRESS SECTION
      ============================================ */}
      <section className="relative border-t border-white/10 py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Visit Our Studio
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight tracking-tight">
                Find us in <span className="text-red-500">Bangalore.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] lg:col-span-7">
              <div className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8895!2d77.6635!3d13.0128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1741ff26e93b%3A0x0!2sRamamurthy+Nagar+Police+Station!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%) contrast(1.1) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DDSPL Location"
                />
              </div>

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-4 py-2 backdrop-blur-md sm:left-6 sm:top-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                    HQ · Bangalore
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/30 to-transparent p-6 backdrop-blur-md sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600/20">
                    <Building2 size={20} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Registered Office
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-white">
                      {COMPANY.name}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm leading-relaxed text-white/70">
                    {COMPANY.address}
                  </p>
                </div>

                <a
                  href={COMPANY.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                >
                  Get Directions
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Phone size={11} className="text-red-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Phone
                    </p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-white sm:text-sm">
                    {COMPANY.phone}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Printer size={11} className="text-red-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Fax
                    </p>
                  </div>
                  <p className="font-mono text-xs font-semibold text-white sm:text-sm">
                    {COMPANY.fax}
                  </p>
                </div>

                <a
                  href={`mailto:${COMPANY.email}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-red-500/30 hover:bg-white/[0.05]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Mail size={11} className="text-red-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Email
                    </p>
                  </div>
                  <p className="truncate font-mono text-xs font-semibold text-white transition-colors group-hover:text-red-400 sm:text-sm">
                    {COMPANY.email}
                  </p>
                </a>

                <a
                  href={`https://${COMPANY.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-red-500/30 hover:bg-white/[0.05]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Globe size={11} className="text-red-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Website
                    </p>
                  </div>
                  <p className="truncate font-mono text-xs font-semibold text-white transition-colors group-hover:text-red-400 sm:text-sm">
                    {COMPANY.website}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          INQUIRY FORM SECTION
      ============================================ */}
      <section className="relative border-t border-white/10 py-16 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* LEFT: Info */}
            <div className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Send Inquiry
                </span>
              </div>

              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-tight">
                Start your <br />
                <span className="italic text-red-500">project brief.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                Tell us about your requirement. Our design engineers will respond within 24 hours with a discovery call.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { title: "Response within 24 hours", desc: "Guaranteed callback." },
                  { title: "Free discovery consultation", desc: "No obligation, just clarity." },
                  { title: "NDA available on request", desc: "Your ideas stay confidential." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10">
                      <Check size={12} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-md sm:p-10"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

                <div className="relative space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                      <User size={11} /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      className={`w-full rounded-xl border bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 backdrop-blur-md transition-all focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 focus:border-red-500 focus:bg-black/60 focus:ring-red-500/20"
                      }`}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                    />
                    {errors.name && (
                      <p id="err-name" className="mt-1.5 text-[11px] text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <Mail size={11} /> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        className={`w-full rounded-xl border bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 backdrop-blur-md transition-all focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-red-500 focus:ring-red-500/20"
                        }`}
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <Phone size={11} /> Phone{" "}
                        <span className="text-white/30 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="tel"
                        className={`w-full rounded-xl border bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 backdrop-blur-md transition-all focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-red-500 focus:ring-red-500/20"
                        }`}
                        placeholder="+91 XXXXX XXXXX"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-[11px] text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Inquiry Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, inquiry: type }));
                            setTouched((prev) => ({ ...prev, inquiry: true }));
                          }}
                          className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                            formData.inquiry === type
                              ? "border-red-500 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                              : "border-white/10 bg-white/[0.03] text-white/50 hover:border-red-500/30 hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.inquiry && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.inquiry}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        <MessageCircle size={11} /> Project Brief
                      </label>
                      <span
                        className={`text-[10px] ${
                          formData.message.length > 2000 ? "text-red-400" : "text-white/30"
                        }`}
                      >
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={`w-full resize-none rounded-xl border bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 backdrop-blur-md transition-all focus:outline-none focus:ring-2 ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500/20"
                          : "border-white/10 focus:border-red-500 focus:ring-red-500/20"
                      }`}
                      placeholder="Tell us about your project — scale, timeline, materials..."
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Server error */}
                  {status === "error" && serverError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                      {serverError}{" "}
                      <a href="mailto:info@ddspl.in" className="underline hover:text-white">
                        info@ddspl.in
                      </a>
                    </div>
                  )}

                  {/* Success */}
                  {status === "success" && (
                    <div className="rounded-xl border border-green-500/30 bg-green-950/30 px-4 py-3 text-sm text-green-300">
                      Thank you. Your inquiry was sent successfully. We’ll reply within 24 hours.
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] text-white/40">
                      🔒 Your information stays confidential.
                    </p>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all hover:from-red-500 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </span>
                      ) : status === "success" ? (
                        <span className="flex items-center gap-2">
                          <Check size={14} /> Sent Successfully
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit Inquiry
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}