"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Menu,
  PackageCheck,
  Pause,
  Plane,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const heroSlides = [
  { src: "/hero-welcome.jpg", title: "Little's baby collection", alt: "Little's baby shop scene with a smiling baby boy in blue and baby girl in pink" },
  { src: "/hero-clothing.jpg", title: "Baby and kids clothing", alt: "Smiling boy and girl wearing Little's blue and pink clothing in a colorful boutique" },
  { src: "/hero-footwear.jpg", title: "Kids footwear", alt: "Smiling boy and girl presenting comfortable blue and pink children's footwear" },
  { src: "/hero-accessories.jpg", title: "Kids accessories", alt: "Smiling boy and girl surrounded by colorful bags, sunglasses, hair accessories and jewelry" },
  { src: "/hero-toys.jpg", title: "Toys and learning", alt: "Smiling boy and girl enjoying colorful educational toys and soft toys" },
  { src: "/hero-feeding-diapers.jpg", title: "Feeding and diapers", alt: "Happy baby with feeding bottles, baby food, diapers and wipes" },
  { src: "/hero-bath-care.jpg", title: "Bath and care", alt: "Happy baby at bath time with gentle skincare, towels and baby wipes" },
];

const categories = [
  { name: "Newborn Essentials", note: "First-day basics", emoji: "🍼", tone: "peach" },
  { name: "Baby Clothing", note: "Everyday essentials", emoji: "🧸", tone: "blue" },
  { name: "Diapers & Wipes", note: "Changing essentials", emoji: "🧷", tone: "yellow" },
  { name: "Bath & Skincare", note: "Gentle daily care", emoji: "🧴", tone: "mint" },
  { name: "Baby Cologne & Grooming", note: "Fresh care", emoji: "🪮", tone: "blue" },
  { name: "Feeding Essentials", note: "Mealtime must-haves", emoji: "🥣", tone: "peach" },
  { name: "Toys & Learning", note: "Play and discover", emoji: "🪁", tone: "mint" },
  { name: "Nursery & Sleep", note: "Calm, cozy spaces", emoji: "🌙", tone: "yellow" },
];

const products = [
  { name: "Snuggle Bear Romper", category: "Baby Clothing", price: "28.00", oldPrice: "35.00", rating: "4.9", emoji: "🧸", tone: "mint", badge: "Bestseller" },
  { name: "Rainbow Stacker", category: "Toys & Learning", price: "22.00", oldPrice: "", rating: "4.8", emoji: "🌈", tone: "yellow", badge: "New" },
  { name: "Little Cloud Set", category: "Newborn Essentials", price: "34.00", oldPrice: "42.00", rating: "5.0", emoji: "☁️", tone: "blue", badge: "20% off" },
  { name: "Bunny Bath Bundle", category: "Bath & Skincare", price: "26.00", oldPrice: "", rating: "4.9", emoji: "🐰", tone: "peach", badge: "Loved" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);

  useEffect(() => {
    if (sliderPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [sliderPaused]);

  function changeSlide(direction: number) {
    setActiveSlide((slide) => (slide + direction + heroSlides.length) % heroSlides.length);
  }

  function addToBag(item: string) {
    setCartCount((count) => count + 1);
    setNotice(`${item} added to your little bag!`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Welcome to the Little's family!");
    event.currentTarget.reset();
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main>
      <div className="announcement">
        <span><Sparkles size={15} aria-hidden="true" /> A little joy in every parcel</span>
        <span className="announcement-detail">Free delivery on orders over 60</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Little's home">
          <Image className="brand-logo" src="/littles-logo.jpg" alt="Little's" width={370} height={120} priority />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="active" href="#top">Home</a>
          <a href="#categories">Shop</a>
          <a href="#new">New arrivals</a>
          <a href="#about">Our story</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button desktop-only" aria-label="Search"><Search size={20} /></button>
          <button className="icon-button desktop-only" aria-label="Favorites"><Heart size={20} /></button>
          <button className="bag-button" aria-label={`Shopping bag with ${cartCount} items`}>
            <ShoppingBag size={20} />
            <span className="bag-label">Bag</span>
            <b>{cartCount}</b>
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#categories" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#new" onClick={() => setMenuOpen(false)}>New arrivals</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top" aria-label="Featured Little's collections">
        <div
          className="hero-visual"
          onTouchStart={(event) => { swipeStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (swipeStart.current === null) return;
            const distance = event.changedTouches[0].clientX - swipeStart.current;
            if (Math.abs(distance) > 45) changeSlide(distance > 0 ? -1 : 1);
            swipeStart.current = null;
          }}
        >
          {heroSlides.map((slide, index) => (
            <div className={`hero-slide ${index === activeSlide ? "is-active" : ""}`} key={slide.src} aria-hidden={index !== activeSlide}>
              <Image className="hero-image" src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
            </div>
          ))}
          <div className="hero-overlay" />
          <span className="hero-floater hero-plane" aria-hidden="true"><Plane size={25} /></span>
          <span className="hero-floater hero-butterfly" aria-hidden="true">🦋</span>
          <div className="slider-controls" aria-label="Hero slider controls">
            <button className="slider-arrow" type="button" onClick={() => changeSlide(-1)} aria-label="Previous slide"><ChevronLeft size={19} /></button>
            <div className="slider-dots">
              {heroSlides.map((slide, index) => (
                <button className={`slider-dot ${index === activeSlide ? "is-active" : ""}`} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show ${slide.title}`} aria-current={index === activeSlide ? "true" : undefined} key={slide.src} />
              ))}
            </div>
            <button className="slider-pause" type="button" onClick={() => setSliderPaused((paused) => !paused)} aria-label={sliderPaused ? "Play slideshow" : "Pause slideshow"}>
              {sliderPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button className="slider-arrow" type="button" onClick={() => changeSlide(1)} aria-label="Next slide"><ChevronRight size={19} /></button>
          </div>
          <span className="sr-only" aria-live="polite">{heroSlides[activeSlide].title}</span>
        </div>
        <div className="hero-copy">
          <span className="eyebrow"><span>New</span> Cozy days collection</span>
          <h1>Big love for<br className="desktop-break" /><em>little moments.</em></h1>
          <p>Soft essentials and playful finds for their happiest little days.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#new"><Sparkles className="button-sparkle" size={17} aria-hidden="true" /> Shop new arrivals <ArrowRight className="button-arrow" size={18} aria-hidden="true" /></a>
            <a className="text-link" href="#categories">Explore all <ChevronRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="benefits" aria-label="Shopping benefits">
        <div><span><Truck /></span><p><b>Free shipping</b></p></div>
        <div><span><ShieldCheck /></span><p><b>Baby-safe picks</b></p></div>
        <div><span><PackageCheck /></span><p><b>Easy returns</b></p></div>
        <div><span><Gift /></span><p><b>Wrapped with love</b></p></div>
      </section>

      <section className="section categories-section" id="categories">
        <div className="section-heading">
          <div><span className="kicker">Find their favorites</span><h2>Shop by little need</h2></div>
          <a href="#new">View all categories <ArrowRight size={17} /></a>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className={`category-card ${category.tone}`} href="#new" key={category.name}>
              <span className="category-emoji" aria-hidden="true">{category.emoji}</span>
              <div><h3>{category.name}</h3><p>{category.note}</p></div>
              <span className="round-arrow"><ArrowRight size={18} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="section products-section" id="new">
        <div className="section-heading centered">
          <div><span className="kicker">Just landed</span><h2>Small things, big smiles</h2></div>
        </div>
        <div className="toy-car-track" aria-hidden="true"><span className="track-dashes" /><span className="toy-car">🚗</span></div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className={`product-image ${product.tone}`}>
                <span className="product-badge">{product.badge}</span>
                <button className="heart-button" aria-label={`Save ${product.name}`}><Heart size={18} /></button>
                <span className="product-emoji" role="img" aria-label={product.category}>{product.emoji}</span>
                <button className="quick-add" onClick={() => addToBag(product.name)}>Quick add <ShoppingBag size={17} /></button>
              </div>
              <div className="product-info">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-meta"><p><b>{product.price}</b>{product.oldPrice && <del>{product.oldPrice}</del>}</p><p className="rating"><Star size={14} fill="currentColor" /> {product.rating}</p></div>
              </div>
            </article>
          ))}
        </div>
        <a className="button button-outline" href="#categories">See all little finds <ArrowRight size={18} /></a>
      </section>

      <section className="story-section" id="about">
        <div className="story-art" aria-hidden="true"><span className="sun">☀️</span><span className="rainbow">🌈</span><span className="bear">🧸</span><span className="cloud one">☁️</span><span className="cloud two">☁️</span></div>
        <div className="story-copy">
          <span className="kicker">Our tiny promise</span>
          <h2>Picked by parents,<br />loved by little ones.</h2>
          <p>Safe, soft, beautiful essentials—picked to make everyday parenting feel a little lighter.</p>
          <div className="story-points"><span><ShieldCheck size={19} /> Safe materials</span><span><Heart size={19} /> Parent approved</span></div>
          <a className="text-link dark" href="#top">Meet the Little&apos;s family <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="newsletter">
        <div><span className="kicker">A little note for you</span><h2>Sweet updates, tiny prices.</h2></div>
        <form onSubmit={subscribe}>
          <label className="sr-only" htmlFor="email">Email address</label>
          <input id="email" type="email" required placeholder="Your email address" />
          <button type="submit">Join the family <ArrowRight size={18} /></button>
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Little's home"><Image className="brand-logo" src="/littles-logo.jpg" alt="Little's" width={370} height={120} /></a>
        <p>Made for little people and their very big adventures.</p>
        <div className="footer-links"><a href="#categories">Shop</a><a href="#about">Our story</a><a href="#top">Delivery</a><a href="#top">Contact</a></div>
        <small><span>© 2026 Little&apos;s. Frontend showcase.</span><a className="footer-credit" href="https://www.umigs.com" target="_blank" rel="noopener noreferrer">Website developed by UMIGS</a></small>
      </footer>

      {notice && <div className="toast" role="status"><Sparkles size={17} /> {notice}</div>}
    </main>
  );
}
