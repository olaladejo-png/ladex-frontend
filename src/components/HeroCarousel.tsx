'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Carousel } from '@/lib/api';
import { getStrapiMediaUrl } from '@/lib/api';

const HERO_IMAGES = [
  { src: '/hero/hero_carousel_1.jpg', credit: 'Ladex Group — Oil & Gas Operations' },
  { src: '/hero/hero_carousel_2.png', credit: 'Ladex Group — Mining & Heavy Engineering' },
  { src: '/hero/hero_carousel_3.png', credit: 'Ladex Group — Manufacturing & Industry' },
  { src: '/hero/hero_carousel_4.jpg', credit: 'Ladex Group — Instrumentation & Control' },
];

export default function HeroCarousel({ slides, tagline }: { slides: Carousel[]; tagline?: string }) {
  const [current, setCurrent] = useState(0);

  const displaySlides = slides.length > 0 ? slides : [
    {
      id: 1, documentId: 'fallback-1',
      title: 'European Excellence.\\nAfrican Opportunity.',
      subtitle: 'Complete supply chain mastery — from advanced German engineering to precision delivery across Nigeria.',
      link_url: '/about', link_text: 'Discover Our Edge',
      order: 1, is_active: true, image: { id: 0, documentId: '', url: '' },
    },
    {
      id: 2, documentId: 'fallback-2',
      title: 'Specialised Industrial\\nSupply Chains.',
      subtitle: 'Delivering end-to-end technical procurement for heavy industry, ensuring zero downtime and maximum reliability.',
      link_url: '/services', link_text: 'Explore Services',
      order: 2, is_active: true, image: { id: 0, documentId: '', url: '' },
    },
    {
      id: 3, documentId: 'fallback-3',
      title: 'Powering Progress with\\nReliable Systems.',
      subtitle: 'High-capacity generators, switchgears, and power management solutions from world-class international manufacturers.',
      link_url: '/services', link_text: 'View Services',
      order: 3, is_active: true, image: { id: 0, documentId: '', url: '' },
    },
    {
      id: 4, documentId: 'fallback-4',
      title: 'Built For The\\nToughest Environments.',
      subtitle: 'Robust equipment and NDT structural inspection tools for mining and highly demanding industrial operations.',
      link_url: '/services', link_text: 'Browse Services',
      order: 4, is_active: true, image: { id: 0, documentId: '', url: '' },
    },
  ] as Carousel[];

  const count = displaySlides.length;
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);
  const prev = () => setCurrent((c) => (c - 1 + count) % count);

  useEffect(() => {
    const t = setInterval(next, 7000); // Slower, more majestic transition
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="hero-container">
      <style>{`
        .hero-container {
          position: relative;
          height: calc(100vh - 80px);
          min-height: 600px;
          max-height: 950px;
          overflow: hidden;
          background: var(--ladex-black);
        }
        
        .hero-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          align-items: center;
          padding: 0 6%;
          overflow: hidden;
        }
        .hero-slide.active { opacity: 1; z-index: 2; }
        
        /* The Image */
        .hero-slide img {
          position: absolute;
          inset: 0; width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.05); transform-origin: 60% 50%;
          transition: transform 12s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0; filter: contrast(1.05) brightness(0.9);
        }
        .hero-slide.active img { transform: scale(1); }
        
        /* Darker Left-to-Right layout gradient */
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.95) 0%, 
            rgba(0, 0, 0, 0.75) 45%, 
            rgba(0, 0, 0, 0.1) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative; z-index: 2;
          max-width: 850px;
          padding-top: 2rem;
        }

        .hero-eyebrow, .hero-title, .hero-desc, .hero-cta-group {
          opacity: 0; transform: translateY(20px);
          transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .hero-slide.active .hero-eyebrow { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        .hero-slide.active .hero-title   { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }
        .hero-slide.active .hero-desc    { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }
        .hero-slide.active .hero-cta-group { opacity: 1; transform: translateY(0); transition-delay: 0.65s; }
        
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.75rem;
          background: rgba(201,162,39,0.1);
          border: 1px solid rgba(201,162,39,0.3);
          padding: 0.4rem 1rem; border-radius: 100px;
          font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--ladex-gold);
          margin-bottom: 2rem;
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          font-weight: 900; color: #fff; line-height: 1.05;
          letter-spacing: -0.04em; margin-bottom: 1.5rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        
        /* Gold accent line inside title */
        .hero-title span { color: var(--ladex-gold); position: relative; }
        .hero-title span::after {
            content: ''; position: absolute; left: 0; bottom: 8px;
            width: 100%; height: 6px; background: rgba(201,162,39,0.3); z-index: -1;
        }
        
        .hero-desc {
          font-size: clamp(1.05rem, 1.5vw, 1.3rem);
          color: rgba(255, 255, 255, 0.7); line-height: 1.6;
          max-width: 600px; margin-bottom: 3rem;
        }
        
        .hero-cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .hero-btn { display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s; border-radius: 4px; cursor: pointer; text-decoration: none; }
        .hero-btn-primary { background: var(--ladex-gold); color: var(--ladex-black); border: none; }
        .hero-btn-primary:hover { background: #fff; transform: translateY(-2px); }
        .hero-btn-outline { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px); }
        .hero-btn-outline:hover { background: rgba(255,255,255,1); color: var(--ladex-black); transform: translateY(-2px); }

        /* Custom minimal UI Controls */
        .hero-bottom-bar {
          position: absolute; bottom: 0; left: 0; width: 100%;
          padding: 2.5rem 6%; display: flex; justify-content: space-between; align-items: flex-end;
          z-index: 10; pointer-events: none;
        }
        .hero-bottom-bar > * { pointer-events: auto; }
        
        .hero-nav { display: flex; gap: 0.5rem; }
        .hero-nav-btn {
          width: 50px; height: 50px; border-radius: 50%;
          background: transparent; border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 1.25rem; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .hero-nav-btn:hover { background: #fff; color: var(--ladex-black); border-color: #fff; }

        .hero-progress-bars { display: flex; gap: 0.5rem; align-items: center; }
        .hero-progress-track {
            width: 40px; height: 3px; background: rgba(255,255,255,0.2); border-radius: 2px;
            overflow: hidden; cursor: pointer; position: relative; transition: width 0.3s;
        }
        .hero-progress-track.active { width: 80px; }
        .hero-progress-fill {
            position: absolute; top: 0; left: 0; height: 100%; width: 0;
            background: var(--ladex-gold);
        }
        .hero-progress-track.active .hero-progress-fill { animation: fillProgress 7s linear forwards; }
        
        @keyframes fillProgress { from { width: 0; } to { width: 100%; } }

        @media (max-width: 900px) {
          .hero-overlay { background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%); }
          .hero-slide { align-items: flex-end; padding: 15% 6%; text-align: center; }
          .hero-content { padding-top: 0; display: flex; flex-direction: column; align-items: center; }
          .hero-eyebrow { margin-bottom: 1.5rem; }
          .hero-title { font-size: clamp(2rem, 10vw, 3rem); }
          .hero-desc { text-align: center; margin-bottom: 2rem; }
          .hero-bottom-bar { padding: 10% 6%; flex-direction: column; align-items: center; gap: 2rem; }
          .hero-nav { display: none; }
        }
      `}</style>

      {displaySlides.map((slide, i) => {
        const hasStrapi = !!slide.image?.url;
        const imgUrl = hasStrapi ? getStrapiMediaUrl(slide.image.url) : HERO_IMAGES[i % HERO_IMAGES.length].src;
        // Simple heuristic to split title dynamically if it contains newline
        const [titlePart1, titlePart2] = slide.title.split('\\n');

        return (
          <div key={slide.id} className={`hero-slide ${i === current ? 'active' : ''}`}>
             <Image
              src={imgUrl}
              alt={slide.title.replace('\\n', ' ')}
              fill priority={i === 0} quality={95} sizes="100vw"
            />
            <div className="hero-overlay" />
            
            <div className="hero-content">
              <div className="hero-eyebrow">{tagline || 'Quality Without Compromise. Europe to the World.'}</div>
              {titlePart2 ? (
                  <h1 className="hero-title">{titlePart1}<br/><span>{titlePart2}</span></h1>
              ) : (
                  <h1 className="hero-title">{slide.title}</h1>
              )}
              {slide.subtitle && <p className="hero-desc">{slide.subtitle}</p>}
              
              <div className="hero-cta-group">
                {slide.link_url && (
                  <Link href={slide.link_url} className="hero-btn hero-btn-primary">
                    {slide.link_text || 'Learn More'}
                  </Link>
                )}
                <Link href="/services" className="hero-btn hero-btn-outline">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-bottom-bar">
        <div className="hero-progress-bars">
          {displaySlides.map((_, i) => (
            <div key={i} className={`hero-progress-track ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)}>
              <div className="hero-progress-fill" />
            </div>
          ))}
        </div>
        <div className="hero-nav">
          <button className="hero-nav-btn" onClick={prev} aria-label="Previous slide">←</button>
          <button className="hero-nav-btn" onClick={next} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  );
}
