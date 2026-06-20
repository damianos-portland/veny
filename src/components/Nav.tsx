"use client";

import { useGuide } from "@/store/useGuide";

export function Nav() {
  const { lang, toggleLang, openChat } = useGuide();

  const links = [
    { href: "#services", el: "Υπηρεσίες", en: "Services" },
    { href: "#who", el: "Για σένα", en: "For you" },
    { href: "#method", el: "Προσέγγιση", en: "Approach" },
    { href: "#faq", el: "Συχνές ερωτήσεις", en: "FAQ" },
    { href: "#contact", el: "Επικοινωνία", en: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
        <a href="#hero" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-plum to-plum-2 text-white shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>
          </span>
          <span className="font-display text-[0.98rem] font-semibold leading-none text-ink">
            Βένη Τσαμπροπούλου
            <span className="mt-0.5 block text-[0.66rem] font-normal text-muted">
              <span className="lang-el">Σύμβουλος Ψυχικής Υγείας</span>
              <span className="lang-en">Mental Health Counsellor</span>
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.9rem] font-medium text-muted transition hover:text-plum">
              <span className="lang-el">{l.el}</span><span className="lang-en">{l.en}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button onClick={toggleLang} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] font-bold text-muted transition hover:border-plum/40 hover:text-plum">
            {lang === "el" ? "EN" : "EL"}
          </button>
          <button onClick={openChat} className="rounded-full bg-plum px-4 py-2 text-[0.85rem] font-semibold text-white shadow-sm transition hover:bg-plum-2">
            <span className="lang-el">Κλείσε ραντεβού</span><span className="lang-en">Book now</span>
          </button>
        </div>
      </div>
    </header>
  );
}
