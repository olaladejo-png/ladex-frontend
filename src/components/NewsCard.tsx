'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/api';
import type { NewsEvent } from '@/lib/api';

interface NewsCardProps { article: NewsEvent; }

const CATEGORY_BADGE: Record<string, [string, string]> = {
  Company: ['bg-black text-white border border-white/10', 'Company'],
  Logistics: ['bg-gold text-black', 'Logistics'],
  Procurement: ['bg-gold text-black', 'Procurement'],
  Technical: ['bg-white text-black border border-black/10', 'Technical'],
  Events: ['bg-black text-gold border border-gold/20', 'Events'],
};

const PLACEHOLDER_IMAGES: Record<string, string> = {
  Company: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  Logistics: 'https://images.unsplash.com/photo-1586528116311-ad86d7c57656?q=80&w=2070&auto=format&fit=crop',
  Procurement: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
  Technical: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
  Events: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
};

export default function NewsCard({ article }: NewsCardProps) {
  const { title, excerpt, date, image, category, slug, is_featured } = article;

  // Map old categories to new ones for safety if any old mock data persists
  const displayCat = (category === 'news' ? 'Company' : 
                     category === 'logistics' ? 'Logistics' :
                     category === 'technical' ? 'Technical' : 
                     category === 'event' ? 'Events' : 
                     category === 'company' ? 'Company' :
                     category === 'procurement' ? 'Procurement' : category) as string;

  const imgSrc = image?.url
    ? getStrapiMediaUrl(image.url)
    : (PLACEHOLDER_IMAGES[displayCat] ?? PLACEHOLDER_IMAGES.Company);
  const hasStrapi = !!image?.url;

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const [badgeClass, badgeLabel] = CATEGORY_BADGE[displayCat] ?? ['bg-gray-100 text-gray-800', displayCat];

  return (
    <>
      <style>{`
        .news-card {
          background: #fff; border-radius: 4px;
          border: 1px solid var(--border); overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.5s var(--ease-out-expo);
        }
        .news-card:hover { 
          box-shadow: 0 30px 60px rgba(0,0,0,0.12); 
          transform: translateY(-10px); 
          border-color: var(--ladex-gold);
        }
        .news-card-img {
          aspect-ratio: 16/10; position: relative; overflow: hidden;
          background: var(--ladex-black);
        }
        .news-card-img img { transition: transform 1.2s var(--ease-out-expo); filter: grayscale(20%); }
        .news-card:hover .news-card-img img { transform: scale(1.1); filter: grayscale(0%); }
        .news-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,15,15,0.4) 0%, transparent 60%);
        }
        .news-card-featured-tag {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: var(--ladex-gold); color: var(--ladex-black);
          font-size: 0.7rem; font-weight: 900; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 2px;
          box-shadow: 0 8px 24px rgba(201, 162, 37, 0.4);
        }
        .news-card-body { padding: 2.5rem 2rem; display: flex; flex-direction: column; flex: 1; }
        .news-card-meta {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .news-card-badge {
          font-size: 0.7rem; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.1em; padding: 0.4rem 1rem; border-radius: 2px;
        }
        .bg-gold { background: var(--ladex-gold); }
        .text-black { color: var(--ladex-black); }
        .news-card-date { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .news-card-title {
          font-size: 1.5rem; font-weight: 900; line-height: 1.2;
          color: var(--ladex-black); margin-bottom: 1rem;
          transition: color .3s; text-transform: uppercase;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .news-card:hover .news-card-title { color: var(--ladex-gold); }
        .news-card-excerpt {
          font-size: 1rem; color: var(--text-secondary); line-height: 1.7;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          flex: 1; margin-bottom: 2rem; font-weight: 500;
        }
        .news-card-link {
          font-size: 0.9rem; font-weight: 900; color: var(--ladex-black);
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.1em;
        }
        .news-card-link::after { content: '→'; transition: transform 0.3s; }
        .news-card:hover .news-card-link { color: var(--ladex-gold); }
        .news-card:hover .news-card-link::after { transform: translateX(8px); }
      `}</style>

      <Link href={`/news/${slug}`} className="news-card">
        <div className="news-card-img">
          <Image
            src={imgSrc}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
            unoptimized={!hasStrapi}
          />
          <div className="news-card-img-overlay" />
          {is_featured && <span className="news-card-featured-tag">Strategic</span>}
        </div>
        <div className="news-card-body">
          <div className="news-card-meta">
            <span className={`news-card-badge ${badgeClass}`}>{badgeLabel}</span>
            <span className="news-card-date">{formattedDate}</span>
          </div>
          <h3 className="news-card-title">{title}</h3>
          {excerpt && <p className="news-card-excerpt">{excerpt}</p>}
          <span className="news-card-link">Explore Intelligence</span>
        </div>
      </Link>
    </>
  );
}
