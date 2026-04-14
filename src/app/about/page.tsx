import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon, { IconName } from '@/components/Icon';
import { getTeamMembers, getAboutPage, getStrapiMediaUrl } from '@/lib/api';

export const metadata: Metadata = {
  title: 'About Ladex Group – Germany-Based, Africa-Focused',
  description: 'Learn about Ladex Group — our history, management team, mission and commitment to supplying quality European equipment to Nigeria and West Africa.',
};
export const revalidate = 60;

const VALUES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'shield', title: 'Integrity', desc: 'Genuine products always' },
  { icon: 'gem', title: 'Excellence', desc: 'Engineering precision in everything' },
  { icon: 'clock', title: 'Reliability', desc: 'Delivering on every promise' },
  { icon: 'handshake', title: 'Partnership', desc: 'Growing together with our clients' },
];

const OBJECTIVES: { icon: IconName; text: string }[] = [
  { icon: 'globe', text: 'Supply genuine European equipment directly to industrial clients in Nigeria and West Africa.' },
  { icon: 'trending-up', text: 'Bridge the gap between European manufacturers and African procurement teams.' },
  { icon: 'wrench', text: 'Provide end-to-end technical support from specification through commissioning.' },
  { icon: 'truck', text: 'Manage export logistics, documentation and shipping to minimise lead times.' },
  { icon: 'shield', text: 'Ensure quality, compliance and accuracy through pre-shipment inspection.' },
  { icon: 'landmark', text: 'Act as a trusted technical representative for European manufacturers in West Africa.' },
];

const MOCK_TEAM = [
  {
    name: 'Lekan Ladejo',
    role: 'Founder & Chairman',
    bio: 'Engr. Lekan Ladejo has over 30 years of engineering experience in Nigeria\'s construction sector. He provides strategic leadership, market direction, and senior-level client engagement, guiding the company\'s growth and long-term partnerships across Nigeria and West Africa.',
    flag: '🇳🇬',
    location: 'Nigeria',
  },
  {
    name: 'Iyiola Ladejo',
    role: 'Executive Director',
    bio: 'Mr. Iyiola Ladejo holds an MSc in Electrical Engineering from Grenoble INP – Ense3, France. Based in Munich Area, Germany, he leads European procurement, supplier relations, export logistics, and international business development.',
    flag: '🇩🇪',
    location: 'Munich Area, Germany',
  },
];

export default async function AboutPage() {
  const team = await getTeamMembers();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayTeam: any[] = team.length > 0 ? team : MOCK_TEAM;

  const aboutPage = await getAboutPage();
  const dynamicMission = aboutPage?.mission || 'To bridge the gap between European excellence and global opportunity; delivering premium products, technical expertise and reliable trade solutions to West African and international markets.';
  const dynamicVision = aboutPage?.vision || 'To become the most trusted gateway connecting global businesses with European and American industrial solutions.';

  return (
    <>
      <style>{`
        .about-hero {
          position: relative; height: 55vh; min-height: 380px;
          background: var(--ladex-black); overflow: hidden; display: flex; align-items: flex-end;
        }
        .about-hero-content { position: relative; z-index: 10; padding: 3.5rem 0 4rem; width: 100%; }
        .about-hero h1 { color: #fff; font-size: clamp(2rem, 5vw, 3.5rem); max-width: 700px; line-height: 1.1; }
        .about-hero p { color: rgba(255,255,255,.55); font-size: 1.1rem; margin-top: 1rem; max-width: 560px; line-height: 1.8; }

        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
        .mv-card { padding: 3rem 2.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border); }
        .mv-card-dark { background: var(--ladex-black); }
        .mv-card-light { background: #fff; }
        .mv-eyebrow { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: var(--ladex-gold); margin-bottom: 0.75rem; }
        .mv-card-dark h3, .mv-card-dark p { color: rgba(255,255,255,.8); }
        .mv-card h3 { font-size: 1.25rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; }
        .mv-card p { font-size: 0.95rem; line-height: 1.8; color: var(--text-muted); }
        .mv-card-dark p { color: rgba(255,255,255,.55); }

        .objectives-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 3rem; }
        .objective-item { display: flex; align-items: flex-start; gap: 1rem; background: #fff; border: 1px solid var(--border); padding: 1.5rem; border-radius: var(--radius-sm); transition: border-color .2s; }
        .objective-item:hover { border-color: var(--ladex-gold); }
        .objective-icon { color: var(--ladex-gold); flex-shrink: 0; }
        .objective-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; font-weight: 500; }

        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem; }
        .value-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 2.5rem 2rem; text-align: center; transition: all .3s var(--ease-out-expo); }
        .value-card:hover { border-color: var(--ladex-gold); transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .value-card h3 { font-size: 1rem; font-weight: 900; text-transform: uppercase; margin: 1rem 0 0.5rem; }
        .value-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; }

        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .team-card {
          background: #fff; border: 1px solid var(--border); border-radius: var(--radius-sm);
          overflow: hidden; transition: all .3s var(--ease-out-expo);
          display: flex; flex-direction: column;
        }
        .team-card:hover { box-shadow: var(--shadow-xl); transform: translateY(-6px); }
        .team-avatar {
          height: 260px; background: var(--ladex-black); position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .team-avatar-initials { font-size: 4rem; font-weight: 900; color: var(--ladex-gold); font-family: 'Montserrat', sans-serif; }
        .team-body { padding: 2rem; flex: 1; }
        .team-flag { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .team-name { font-size: 1.35rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.25rem; }
        .team-role { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--ladex-gold); margin-bottom: 1rem; }
        .team-location { font-size: 0.82rem; color: var(--text-muted); font-weight: 600; margin-bottom: 1rem; }
        .team-bio { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; }

        @media (max-width: 900px) {
          .mv-grid { grid-template-columns: 1fr; }
          .objectives-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
          .about-hero { min-height: 320px; }
        }
      `}</style>

      {/* Hero */}
      <div className="about-hero">
        <Image src="/hero/hero_about.jpg" alt="Ladex Group operations" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.55 }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 10%, rgba(10,10,10,0.65))', zIndex: 5 }} />
        <div className="about-hero-content">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/" style={{ color: 'var(--ladex-gold)', fontWeight: 800 }}>Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span style={{ color: '#fff' }}>About Us</span>
            </nav>
            <h1 className="fade-up">Germany-Based.<br />Africa-Focused.</h1>
            <p className="fade-up stagger-1">Direct access to European supply chains combined with on-ground technical support and delivery coordination across Nigeria and West Africa.</p>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Our Identity</p>
          <h2 className="section-title">Rooted in Engineering. Built for Trade.</h2>
          <p className="section-lead">Ladex Group is a Germany-based procurement and export company supplying high-quality equipment and solutions from leading European manufacturers to Nigeria and West Africa. With operations in Germany and Nigeria, we combine direct access to European supply chains with on-ground technical support and delivery coordination in Africa.</p>

          <div className="mv-grid">
            <div className="mv-card mv-card-dark">
              <div className="mv-eyebrow">Our Mission</div>
              <h3>Bridging European Excellence &amp; African Opportunity</h3>
              <p>{dynamicMission}</p>
            </div>
            <div className="mv-card mv-card-light">
              <div className="mv-eyebrow">Our Vision</div>
              <h3>West Africa&apos;s Trusted Gateway</h3>
              <p>{dynamicVision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-off">
        <div className="container">
          <p className="section-eyebrow">Principles</p>
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid fade-up stagger-1">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card">
                <div style={{ color: 'var(--ladex-gold)', display: 'flex', justifyContent: 'center' }}>
                  <Icon name={v.icon} size={40} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="section bg-off">
        <div className="container">
          <p className="section-eyebrow">Leadership</p>
          <h2 className="section-title">Management Team</h2>
          <p className="section-lead">Experienced professionals combining deep African market knowledge with direct European procurement capability.</p>
          <div className="team-grid">
            {displayTeam.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-avatar">
                  {member.photo?.url || member.image?.url ? (
                    <Image
                      src={getStrapiMediaUrl(member.photo?.url || member.image?.url)}
                      alt={member.name}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="team-avatar-initials">
                      {String(member.name).split(' ').map((n: string) => n[0]).slice(-2).join('')}
                    </div>
                  )}
                </div>
                <div className="team-body">
                  <div className="team-flag">{member.flag || '🌍'}</div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  {member.location && (
                    <div className="team-location">📍 {member.location}</div>
                  )}
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'var(--ladex-black)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem' }}>
          <div style={{ maxWidth: '580px' }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Ready to Source European Equipment?</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', margin: 0, fontSize: '1.05rem', lineHeight: 1.8 }}>
              Share your requirement and specification. Our team will identify the right European supplier and manage the entire procurement process for you.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn btn-outline-white">Our Services</Link>
            <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
          </div>
        </div>
      </div>
    </>
  );
}
