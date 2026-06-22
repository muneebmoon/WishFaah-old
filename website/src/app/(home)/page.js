"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiStar, FiChevronLeft, FiChevronRight, FiTruck, FiRefreshCw, FiShield, FiHeart } from "react-icons/fi";

/* ─── Colour tokens (match brand) ─── */
const C = {
  cream:     "#F6F0D7",
  sage:      "#89986D",
  sageMid:   "#9CAB84",
  sageLight: "#C5D89D",
  green:     "#4A5A3A",
  white:     "#FFFFFF",
  charcoal:  "#2C2C2C",
};

/* ─── Hero Slides ─── */
const SLIDES = [
  {
    heading: ["Summer's Finest,", "Worn by You"],
    sub: "Breathable lawn prints & embroidered kurtas — made for Pakistani summers.",
    cta: "Explore Collection",
    href: "/collections",
    bg: "from-[#2C3B22] to-[#4A5A3A]",
    accent: "#C5D89D",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
    tag: "SUMMER '25",
  },
  {
    heading: ["Tradition Woven", "into Every Thread"],
    sub: "Hand-crafted embroidery & heritage fabrics reimagined for modern women.",
    cta: "Shop Formals",
    href: "/shop?cat=formal",
    bg: "from-[#3B2C22] to-[#5A3A2A]",
    accent: "#D9BA84",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
    tag: "HERITAGE",
  },
  {
    heading: ["Effortless Style,", "Every Day"],
    sub: "Mix-and-match separates you can dress up or down across every occasion.",
    cta: "Shop Casuals",
    href: "/shop?cat=casual",
    bg: "from-[#223B3B] to-[#2A5A5A]",
    accent: "#84D9C5",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80",
    tag: "EVERYDAY",
  },
];

/* ─── Featured Categories ─── */
const CATS = [
  {
    label: "Lawn & Unstitched",
    desc: "Soft, airy prints for summer",
    img: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80",
    href: "/collections/lawn",
  },
  {
    label: "Formal Wear",
    desc: "Embroidered elegance",
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    href: "/collections/formal",
  },
  {
    label: "Casual Kurtas",
    desc: "Everyday comfort & style",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    href: "/collections/casual",
  },
  {
    label: "Dupattas & Shawls",
    desc: "Finish the look",
    img: "https://images.unsplash.com/photo-1617627143233-9f7e5f5b2b2c?w=600&q=80",
    href: "/collections/dupattas",
  },
];

/* ─── Featured Products ─── */
const PRODUCTS = [
  {
    id: 1, name: "Gulbano Embroidered Lawn", price: "PKR 4,200", originalPrice: "PKR 5,500",
    badge: "Sale", rating: 4.8, reviews: 124,
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
  },
  {
    id: 2, name: "Mehndi Silk Formal", price: "PKR 8,900", originalPrice: null,
    badge: "New", rating: 5.0, reviews: 48,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  },
  {
    id: 3, name: "Daily Shalwar Kameez Set", price: "PKR 3,100", originalPrice: null,
    badge: null, rating: 4.6, reviews: 211,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
  {
    id: 4, name: "Chanderi Block-Print Dupatta", price: "PKR 1,800", originalPrice: "PKR 2,400",
    badge: "Sale", rating: 4.7, reviews: 89,
    img: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80",
  },
  {
    id: 5, name: "Eid Collection — Organza Suit", price: "PKR 12,500", originalPrice: null,
    badge: "Exclusive", rating: 4.9, reviews: 33,
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
  },
  {
    id: 6, name: "Linen Casual Kurta", price: "PKR 2,600", originalPrice: null,
    badge: null, rating: 4.5, reviews: 155,
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { name: "Fatima Malik", city: "Lahore", text: "The fabric quality is just like the photos — no surprises. My lawn set arrived beautifully packed. WishFaah is my go-to now!", stars: 5 },
  { name: "Sana Rehman", city: "Karachi", text: "Ordered the embroidered formal and got so many compliments at the wedding. Delivery was faster than expected too!", stars: 5 },
  { name: "Ayesha Tariq", city: "Islamabad", text: "Amazing prints, great stitching quality, and the return process was smooth when I needed to exchange a size. Highly recommend.", stars: 5 },
];

/* ─── Perks ─── */
const PERKS = [
  { icon: FiTruck,     title: "Free Delivery",    desc: "On orders above PKR 3,000" },
  { icon: FiRefreshCw, title: "Easy Returns",     desc: "7-day hassle-free exchange" },
  { icon: FiShield,    title: "100% Authentic",   desc: "Genuine fabrics, every time" },
  { icon: FiHeart,     title: "Stitching Option", desc: "Get your outfit tailored" },
];

/* ─── Marquee Text Items ─── */
const MARQUEE_ITEMS = [
  "Free Delivery Above PKR 3,000",
  "New Summer Arrivals",
  "Premium Lawn Fabrics",
  "Stitching Available",
  "Exchange Within 7 Days",
];

/* ════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════ */
export default function HomePage() {
  const [slide, setSlide]     = useState(0);
  const [fading, setFading]   = useState(false);
  const [wishlist, setWishlist] = useState({});
  const timerRef              = useRef(null);

  /* Auto-advance hero */
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => changeSlide(1), 5500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [slide]);

  const changeSlide = (dir) => {
    setFading(true);
    setTimeout(() => {
      setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);
      setFading(false);
    }, 350);
    startTimer();
  };

  const toggleWish = (id) =>
    setWishlist((w) => ({ ...w, [id]: !w[id] }));

  const s = SLIDES[slide];

  return (
    <div className="font-sans overflow-x-hidden" style={{ backgroundColor: C.cream, color: C.green }}>

      {/* ══════════════ 1. HERO ══════════════ */}
      <section className={`relative min-h-screen flex items-center bg-gradient-to-br ${s.bg} transition-all duration-700`}>
        {/* Background image overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.32)",
          }}
        />

        {/* Decorative corner element */}
        <div
          className="absolute top-24 right-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${s.accent}, transparent)` }}
        />
        <div
          className="absolute bottom-16 left-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${s.accent}, transparent)` }}
        />

        <div className={`relative z-10 container mx-auto px-6 lg:px-16 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
          {/* Tag */}
          <span
            className="inline-block text-xs font-bold tracking-[0.25em] px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: `${s.accent}22`, color: s.accent, border: `1px solid ${s.accent}55` }}
          >
            {s.tag}
          </span>

          {/* Headline */}
          <h1 className="text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {s.heading[0]}<br />
            <span style={{ color: s.accent }}>{s.heading[1]}</span>
          </h1>

          <p className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed">{s.sub}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={s.href}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:gap-4 hover:shadow-xl"
              style={{ backgroundColor: s.accent, color: C.green }}
            >
              {s.cta} <FiArrowRight />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setSlide(i); setFading(false); }, 350); }}
              className="transition-all duration-300"
              style={{
                width: i === slide ? 28 : 8,
                height: 8,
                borderRadius: 99,
                backgroundColor: i === slide ? s.accent : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        <button onClick={() => changeSlide(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 hidden md:block">
          <FiChevronLeft size={20} />
        </button>
        <button onClick={() => changeSlide(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 hidden md:block">
          <FiChevronRight size={20} />
        </button>
      </section>

      {/* ══════════════ 2. PERKS BAR ══════════════ */}
      <section style={{ backgroundColor: C.green }}>
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${C.sageLight}22` }}>
                  <p.icon size={20} color={C.sageLight} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                  <p className="text-xs" style={{ color: `${C.sageLight}99` }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 3. CATEGORIES ══════════════ */}
      <section className="py-20 px-6 lg:px-16" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto">
          {/* Section header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] font-semibold mb-2 uppercase" style={{ color: C.sage }}>Browse by Style</p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: C.green, lineHeight: 1.2 }}>
                Collections for Every Occasion
              </h2>
            </div>
            <Link href="/collections" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-3 transition-all duration-200" style={{ color: C.sage }}>
              All Collections <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {CATS.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
                style={{ boxShadow: "0 4px 20px rgba(74,90,58,0.10)" }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B22] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-semibold text-base mb-1" style={{ fontFamily: "Georgia, serif" }}>{cat.label}</h3>
                  <p className="text-white/65 text-xs">{cat.desc}</p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: C.sageLight }}>
                    Shop Now <FiArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 4. MARQUEE STRIP ══════════════ */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: C.sage }}>
        <div className="flex gap-12 marquee-track whitespace-nowrap">
          {[...Array(3)].flatMap((_, repeatIndex) =>
            MARQUEE_ITEMS.map((text, itemIndex) => (
              <span key={`${text}-${repeatIndex}-${itemIndex}`} className="text-xs tracking-widest font-semibold text-white/80 uppercase inline-block">
                {text} &nbsp; <span className="opacity-40">◆</span> &nbsp;
              </span>
            ))
          )}
        </div>
        <style>{`
          .marquee-track {
            animation: marquee 28s linear infinite;
            display: flex;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track { animation: none; }
          }
        `}</style>
      </div>

      {/* ══════════════ 5. FEATURED PRODUCTS ══════════════ */}
      <section className="py-20 px-6 lg:px-16" style={{ backgroundColor: "#F0EAC8" }}>
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] font-semibold mb-2 uppercase" style={{ color: C.sage }}>Handpicked For You</p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: C.green, lineHeight: 1.2 }}>
                Trending Right Now
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-3 transition-all duration-200" style={{ color: C.sage }}>
              View All Products <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 2px 16px rgba(74,90,58,0.07)", transition: "transform .25s, box-shadow .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(74,90,58,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(74,90,58,0.07)"; }}>
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: p.badge === "Sale" ? "#E8534A" : p.badge === "Exclusive" ? C.green : C.sage,
                        color: "white",
                      }}>
                      {p.badge}
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWish(p.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                    <FiHeart size={15} fill={wishlist[p.id] ? C.sage : "none"} color={wishlist[p.id] ? C.sage : C.green} />
                  </button>

                  {/* Quick add overlay */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Link href={`/shop/${p.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white transition-colors duration-200"
                      style={{ backgroundColor: C.green }}>
                      View Product <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs mb-1" style={{ color: C.sageMid }}>WishFaah</p>
                  <h3 className="text-sm font-semibold mb-2 leading-tight" style={{ color: C.green }}>{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={11} fill={i < Math.round(p.rating) ? C.sage : "none"} color={C.sage} />
                    ))}
                    <span className="text-[11px] ml-1" style={{ color: C.sageMid }}>({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base" style={{ color: C.green }}>{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-xs line-through" style={{ color: C.sageMid }}>{p.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. HERITAGE BANNER ══════════════ */}
      <section className="relative overflow-hidden py-24 px-6 lg:px-16" style={{ backgroundColor: C.green }}>
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.25em] font-semibold mb-4 uppercase" style={{ color: C.sageLight }}>Our Promise</p>
            <h2 className="text-white mb-6"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4.5vw,3.4rem)", lineHeight: 1.2 }}>
              Crafted for Pakistani Women, <span style={{ color: C.sageLight }}>with Love</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-10 text-lg">
              Every piece in our collection is selected with you in mind — vibrant prints, comfortable fits, and timeless silhouettes that match the warmth and grace of Pakistani culture.
            </p>
            <Link href="/about"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:gap-4"
              style={{ backgroundColor: C.sageLight, color: C.green }}>
              Our Story <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ 7. TESTIMONIALS ══════════════ */}
      <section className="py-20 px-6 lg:px-16" style={{ backgroundColor: C.cream }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] font-semibold mb-2 uppercase" style={{ color: C.sage }}>Happy Customers</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: C.green }}>
              What They're Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 relative"
                style={{ boxShadow: "0 2px 20px rgba(74,90,58,0.07)" }}>
                {/* Opening quote */}
                <span className="absolute top-5 right-7 text-5xl font-serif leading-none select-none" style={{ color: C.sageLight }}>"</span>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <FiStar key={i} size={14} fill={C.sage} color={C.sage} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.charcoal }}>{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: C.sageMid }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: C.green }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.sageMid }}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 8. NEWSLETTER CTA ══════════════ */}
      <section className="py-16 px-6 lg:px-16" style={{ backgroundColor: "#EBE4C0" }}>
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ backgroundColor: C.sage }}>
            {/* BG pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-2 border-white/10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border-2 border-white/10" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-14">
              <div className="text-center lg:text-left">
                <h2 className="text-white mb-2" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>
                  Get 10% Off Your First Order
                </h2>
                <p className="text-white/70 text-sm max-w-sm">
                  Subscribe to our newsletter for exclusive deals, new arrivals & style tips.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-3.5 rounded-xl text-sm focus:outline-none flex-1 lg:w-72"
                  style={{ color: C.green, backgroundColor: "white" }}
                />
                <button
                  className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg whitespace-nowrap"
                  style={{ backgroundColor: C.green, color: "white" }}>
                  Claim Discount
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}