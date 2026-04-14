'use client';

export default function WhatsAppButton({ linkedinUrl = "https://linkedin.com/in/iyiola-ladejo", whatsappUrl = "https://wa.me/4915218162816" }: { linkedinUrl?: string, whatsappUrl?: string }) {
  return (
    <>
      <style>{`
        .floating-buttons {
          position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 9999;
          display: flex; flex-direction: row; gap: 1rem;
        }
        .float-btn {
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none; color: #fff;
        }
        .float-btn:hover { transform: scale(1.12); }
        .wa-btn { background: #25D366; box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
        .wa-btn:hover { box-shadow: 0 6px 28px rgba(37,211,102,0.55); }
        .in-btn { background: #0077b5; box-shadow: 0 4px 20px rgba(0,119,181,0.4); }
        .in-btn:hover { box-shadow: 0 6px 28px rgba(0,119,181,0.55); }
        @media (max-width: 600px) {
          .floating-buttons { bottom: 1.25rem; right: 1.25rem; }
          .float-btn { width: 50px; height: 50px; }
        }
      `}</style>
      <div className="floating-buttons">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn in-btn"
          aria-label="Connect with us on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn wa-btn"
          aria-label="Chat with us on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
