// src/components/sections/ContactCTA/ContactCTA.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
    Mail,
    Phone,
    MessageCircle,
    MapPin,
    Send,
    Clock,
    ArrowRight,
} from "lucide-react";
import Container from "../../common/Container";
import logoUrl from "../../../assets/images/logo/logo.jpg";

const CONTACT = {
    email: "info@ddspl.in",
    phones: [
        { number: "+91 7760961755", label: "Primary" },
        { number: "+91 9980547102", label: "Sales" },
    ],
    whatsapp: "917760961755",
    location: "Bangalore, India",
};

/* ---------------------------------------
   ANIMATED HEADLINE
--------------------------------------- */
function AnimatedHeadline({ reduceMotion }) {
    const lines = [
        { text: "Let's Make It", style: "text-white" },
        { text: "Visible.", style: "italic text-red-500" },
    ];

    return (
        <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight">
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden pb-1">
                    <motion.div
                        initial={reduceMotion ? false : { y: "110%", rotate: 4 }}
                        whileInView={{ y: "0%", rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.9,
                            delay: i * 0.12,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`block ${line.style}`}
                        style={{ transformOrigin: "left bottom" }}
                    >
                        {line.text}
                    </motion.div>
                </div>
            ))}
        </h2>
    );
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function ContactCTA() {
    const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=Hi%20DDSPL,%20I%27d%20like%20to%20discuss%20a%20project.`;
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-black text-white"
        >
            {/* Background Layers */}
            <motion.div
                style={reduceMotion ? undefined : { y: bgY }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4a0000] via-[#1a0000] to-black"
            />

            <motion.div
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15],
                        }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-red-600/20 blur-[120px] sm:h-96 sm:w-96 sm:blur-[150px]"
            />
            <motion.div
                animate={
                    reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }
                }
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-red-700/15 blur-[130px] sm:h-96 sm:w-96 sm:blur-[180px]"
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Giant Background Typography */}
            <div className="pointer-events-none absolute -bottom-8 left-0 right-0 select-none overflow-hidden sm:-bottom-16">
                <motion.span
                    initial={reduceMotion ? false : { opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-display text-[22vw] font-black leading-[0.75] tracking-[-0.08em] text-white/[0.03]"
                >
                    DDSPL
                </motion.span>
            </div>

            <Container className="relative z-10">
                {/* Fixed: Changed justify-between to justify-center and adjusted padding */}
                <div className="flex min-h-[100svh] flex-col justify-center py-10 sm:py-14 lg:py-16">


                    <div className="grid gap-8 sm:gap-10 lg:grid-cols-12">

                        {/* LEFT — Statement + Contact Info */}
                        <div className="relative z-10 lg:col-span-7">
                            <AnimatedHeadline reduceMotion={reduceMotion} />
                            <motion.h1
                                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                                className="mt-2 font-display text-[clamp(1.3rem,2.5vw,2rem)] font-bold uppercase tracking-tight"
                            >
                                Get In Touch <span className="text-red-500">—</span> Start Your Project
                            </motion.h1>
                            <motion.p
                                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base"
                            >
                                Ready to elevate your brand identity? Whether you have a full-scale rollout in mind or just a spark of an idea, we're here to engineer it.
                            </motion.p>

                            {/* Primary Contact Page CTA */}
                            <motion.div
                                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="mt-6 sm:mt-8"
                            >
                                <a
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] sm:px-6 sm:py-3.5 sm:text-sm"
                                >
                                    Visit Full Contact Page
                                    <motion.span
                                        className="inline-block"
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <ArrowRight size={16} />
                                    </motion.span>
                                </a>
                            </motion.div>

                            {/* Contact Details Grid */}
                            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">

                                {/* Email */}
                                <motion.a
                                    href={`mailto:${CONTACT.email}`}
                                    initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    whileHover={{ x: 4 }}
                                    className="group flex items-start gap-3 border-l-2 border-white/10 pl-4 transition-colors hover:border-red-500 sm:gap-4"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 12, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-red-600 sm:h-10 sm:w-10"
                                    >
                                        <Mail size={15} className="text-white/70 group-hover:text-white" />
                                    </motion.div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                                            Email us
                                        </p>
                                        <p className="mt-1 truncate text-sm font-semibold text-white transition-colors group-hover:text-red-400 sm:text-base">
                                            {CONTACT.email}
                                        </p>
                                    </div>
                                </motion.a>

                                {/* Location */}
                                <motion.div
                                    initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="group flex items-start gap-3 border-l-2 border-white/10 pl-4 sm:gap-4"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 12, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 sm:h-10 sm:w-10"
                                    >
                                        <MapPin size={15} className="text-white/70" />
                                    </motion.div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                                            Studio
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                                            {CONTACT.location}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Phone Numbers */}
                                {CONTACT.phones.map((phone, i) => (
                                    <motion.a
                                        key={i}
                                        href={`tel:${phone.number.replace(/\s/g, "")}`}
                                        initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                                        whileHover={{ x: 4 }}
                                        className="group flex items-start gap-3 border-l-2 border-white/10 pl-4 transition-colors hover:border-red-500 sm:gap-4"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 12, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-red-600 sm:h-10 sm:w-10"
                                        >
                                            <Phone size={15} className="text-white/70 group-hover:text-white" />
                                        </motion.div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
                                                {phone.label}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-white transition-colors group-hover:text-red-400 sm:text-base">
                                                {phone.number}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — WhatsApp Interactive Card */}
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4 }}
                            className="relative z-10 w-full lg:col-span-5"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:rounded-3xl">

                                {/* Card Header — with DDSPL Logo */}
                                <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="relative shrink-0">
                                            <motion.div
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            scale: [1, 1.05, 1],
                                                        }
                                                }
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-2 ring-red-500/40 sm:h-11 sm:w-11"
                                            >
                                                <img
                                                    src={logoUrl}
                                                    alt="DDSPL Logo"
                                                    className="h-full w-full object-contain"
                                                />
                                            </motion.div>
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-white">
                                                DDSPL Support
                                            </p>
                                            <p className="flex items-center gap-1 text-[10px] font-medium text-green-400">
                                                <motion.span
                                                    animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"
                                                />
                                                Online now
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 items-center gap-1.5 text-[10px] text-white/50 md:flex">
                                        <Clock size={11} />
                                        <span className="whitespace-nowrap">Replies in ~2 minutes</span>
                                    </div>
                                </div>

                                {/* Chat Preview */}
                                <div className="space-y-3 p-4 sm:p-5">
                                    <motion.div
                                        initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="w-fit max-w-[85%] rounded-2xl rounded-tl-none bg-white/10 p-3"
                                    >
                                        <p className="text-xs text-white/80 sm:text-sm">
                                            Hi there! 👋
                                        </p>
                                        <p className="mt-1 text-xs text-white/80 sm:text-sm">
                                            Need help with signage design or a project quote?
                                        </p>
                                        <p className="mt-1.5 text-[9px] text-white/40">
                                            DDSPL · Just now
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.9 }}
                                        className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-none bg-red-600 p-3"
                                    >
                                        <p className="text-xs text-white sm:text-sm">
                                            Let's connect!
                                        </p>
                                        <p className="mt-1.5 text-right text-[9px] text-white/70">
                                            You
                                        </p>
                                    </motion.div>

                                    {/* Typing indicator */}
                                    <motion.div
                                        initial={reduceMotion ? false : { opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 1.3 }}
                                        className="flex items-center gap-1.5 pl-2"
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={
                                                    reduceMotion
                                                        ? undefined
                                                        : {
                                                            y: [0, -4, 0],
                                                            opacity: [0.4, 1, 0.4],
                                                        }
                                                }
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.15,
                                                }}
                                                className="h-1.5 w-1.5 rounded-full bg-white/50"
                                            />
                                        ))}
                                        <span className="ml-1 text-[9px] text-white/40">
                                            typing...
                                        </span>
                                    </motion.div>
                                </div>

                                {/* CTA Buttons Stacked */}
                                <div className="border-t border-white/10">
                                    {/* WhatsApp CTA */}
                                    <motion.a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-between overflow-hidden bg-gradient-to-r from-red-700 to-red-600 p-4 transition-all hover:from-red-600 hover:to-red-500 sm:p-5"
                                    >
                                        <motion.div
                                            animate={
                                                reduceMotion
                                                    ? undefined
                                                    : {
                                                        x: ["-100%", "200%"],
                                                    }
                                            }
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear",
                                                repeatDelay: 1,
                                            }}
                                            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        />

                                        <div className="relative z-10 min-w-0 flex-1">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-[10px]">
                                                Start Conversation
                                            </p>
                                            <p className="mt-0.5 font-display text-lg font-bold text-white sm:mt-1 sm:text-xl md:text-2xl">
                                                Chat on WhatsApp
                                            </p>
                                        </div>

                                        <motion.div
                                            whileHover={{ rotate: 45, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="relative z-10 ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-600 sm:h-12 sm:w-12 md:h-14 md:w-14"
                                        >
                                            <Send size={16} strokeWidth={2} className="sm:hidden" />
                                            <Send size={18} strokeWidth={2} className="hidden sm:block" />
                                        </motion.div>
                                    </motion.a>

                                    {/* Contact Page CTA */}
                                    <a
                                        href="/contact"
                                        className="group flex items-center justify-between border-t border-white/10 bg-black/40 p-4 transition-all hover:bg-black/60"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                                                Prefer detailed form?
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold text-white transition-colors group-hover:text-red-400">
                                                Visit Contact Page
                                            </p>
                                        </div>
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all group-hover:border-red-500 group-hover:text-red-400"
                                        >
                                            <ArrowRight size={14} />
                                        </motion.div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}