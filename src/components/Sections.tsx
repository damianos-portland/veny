"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGuide } from "@/store/useGuide";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: reduce ? 0.4 : 0.7, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const Bi = ({ el, en }: { el: string; en: string }) => (
  <><span className="lang-el">{el}</span><span className="lang-en">{en}</span></>
);

/* ───────────────── HERO ───────────────── */
export function Hero() {
  return (
    <section id="hero" data-section="hero" className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
      <Reveal className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-lilac px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wider text-plum">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          <Bi el="Συμβουλευτική Ψυχικής Υγείας" en="Mental Health Counselling" />
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.12] text-ink sm:text-6xl">
          <Bi el="Είμαι εδώ για να σε βοηθήσω να νιώσεις καλύτερα." en="I'm here to help you feel better." />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          <Bi
            el="Ένας ασφαλής, ζεστός χώρος για να μιλήσεις — με ενσυναίσθηση, εχεμύθεια και σεβασμό στον δικό σου ρυθμό."
            en="A safe, warm space to talk — with empathy, confidentiality and respect for your own pace."
          />
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#services" className="rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-plum-2">
            <Bi el="Γνώρισε τις υπηρεσίες" en="Explore services" />
          </a>
          <a href="#contact" className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-plum/40 hover:text-plum">
            <Bi el="Κλείσε ραντεβού" en="Book a session" />
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {[
            { el: "Δια ζώσης & online", en: "In-person & online" },
            { el: "Εχεμύθεια", en: "Confidential" },
            { el: "Ελληνικά / English", en: "Greek / English" },
          ].map((x, i) => (
            <span key={i} className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6d4aa6" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
              <Bi el={x.el} en={x.en} />
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────── SERVICES ───────────────── */
const SERVICES = [
  { icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0", el: "Ατομική Συμβουλευτική", en: "Individual Counselling", del: "Στήριξη για προσωπική ανάπτυξη και συναισθηματική ισορροπία.", den: "Support for personal growth and emotional balance." },
  { icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM23 21v-2a4 4 0 0 0-3-3.9", el: "Συμβουλευτική Ζεύγους", en: "Couples Counselling", del: "Βελτίωση της επικοινωνίας και της σχέσης.", den: "Improving communication and connection." },
  { icon: "M12 2a4 4 0 0 0-4 4c0 2 1 3 1 5l-3 2v9h12v-9l-3-2c0-2 1-3 1-5a4 4 0 0 0-4-4z", el: "Συμβουλευτική Εφήβων", en: "Teen Counselling", del: "Υποστήριξη εφήβων σε περιόδους αλλαγής.", den: "Supporting teens through times of change." },
  { icon: "M4 5h16v10H4zM2 20h20M9 9h6", el: "Online Συνεδρίες", en: "Online Sessions", del: "Άνετα και με ασφάλεια από τον χώρο σου.", den: "Comfortably and securely from your own space." },
];

export function Services() {
  return (
    <section id="services" data-section="services" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal className="max-w-xl">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl"><Bi el="Υπηρεσίες που προσφέρω" en="Services I offer" /></h2>
        <p className="mt-3 text-muted"><Bi el="Εξατομικευμένη υποστήριξη για τις δικές σου ανάγκες." en="Personalised support for your own needs." /></p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.en} delay={i * 0.06}>
            <div className="group h-full rounded-xl2 border border-line bg-white p-6 shadow-card transition hover:-translate-y-1.5 hover:shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac text-plum transition group-hover:bg-plum group-hover:text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d={s.icon} /></svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink"><Bi el={s.el} en={s.en} /></h3>
              <p className="mt-2 text-sm leading-relaxed text-muted"><Bi el={s.del} en={s.den} /></p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── WHO FOR ───────────────── */
const TAGS = [
  { el: "Άγχος & στρες", en: "Anxiety & stress" },
  { el: "Χαμηλή αυτοεκτίμηση", en: "Low self-esteem" },
  { el: "Δυσκολίες σχέσεων", en: "Relationship struggles" },
  { el: "Πένθος & απώλειες", en: "Grief & loss" },
  { el: "Μοναξιά", en: "Loneliness" },
  { el: "Επαγγελματική εξουθένωση", en: "Burnout" },
];
export function WhoFor() {
  return (
    <section id="who" data-section="who" className="bg-lilac-2 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-xl">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl"><Bi el="Για ποιον απευθύνομαι" en="Who this is for" /></h2>
          <p className="mt-3 text-muted">
            <Bi el="Σε όσους θέλουν να κατανοήσουν τον εαυτό τους και να βελτιώσουν την ποιότητα της ζωής τους." en="For anyone who wants to understand themselves and improve their quality of life." />
          </p>
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap gap-3">
          {TAGS.map((tg) => (
            <span key={tg.en} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm">
              <Bi el={tg.el} en={tg.en} />
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── METHOD (steps) ───────────────── */
const STEPS = [
  { n: "1", el: "Γνωριμία", en: "Connect", del: "Μια πρώτη επικοινωνία για να γνωριστούμε και να δούμε τι χρειάζεσαι.", den: "A first chat to get to know each other and what you need." },
  { n: "2", el: "Κατανόηση", en: "Understand", del: "Συζητάμε τις ανησυχίες και τους στόχους σου.", den: "We explore your concerns and your goals." },
  { n: "3", el: "Συνεργασία", en: "Work together", del: "Εργαζόμαστε μαζί με εμπιστοσύνη και σεβασμό.", den: "We work together with trust and respect." },
  { n: "4", el: "Εξέλιξη", en: "Grow", del: "Προχωράμε βήμα-βήμα προς την αλλαγή.", den: "We move step by step toward change." },
];
export function Method() {
  return (
    <section id="method" data-section="method" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl"><Bi el="Πώς λειτουργεί η συνεργασία μας" en="How we work together" /></h2>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-plum to-plum-2 font-display text-xl font-semibold text-white shadow-soft">{s.n}</div>
            <h3 className="mt-5 text-lg font-semibold text-ink"><Bi el={s.el} en={s.en} /></h3>
            <p className="mt-2 text-sm leading-relaxed text-muted"><Bi el={s.del} en={s.den} /></p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── FAQ ───────────────── */
const FAQS = [
  { el: "Πόσο διαρκεί μια συνεδρία;", en: "How long is a session?", ael: "Κάθε συνεδρία διαρκεί περίπου 50 λεπτά.", aen: "Each session lasts about 50 minutes." },
  { el: "Οι συνεδρίες είναι εμπιστευτικές;", en: "Are sessions confidential?", ael: "Απολύτως. Ό,τι μοιράζεσαι παραμένει εμπιστευτικό.", aen: "Absolutely. Everything you share stays confidential." },
  { el: "Μπορώ να κάνω online συνεδρία;", en: "Can I have an online session?", ael: "Ναι, οι συνεδρίες γίνονται δια ζώσης ή online.", aen: "Yes, sessions are available in person or online." },
  { el: "Πώς ξεκινάω;", en: "How do I start?", ael: "Άφησέ μου τα στοιχεία σου ή μίλα με τη Βένη — κλείνουμε μια πρώτη γνωριμία.", aen: "Leave your details or chat with Veny — we'll set up a first meeting." },
];
export function Faq() {
  return (
    <section id="faq" data-section="faq" className="bg-lilac-2 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal><h2 className="text-3xl font-semibold text-ink sm:text-4xl"><Bi el="Συχνές ερωτήσεις" en="Frequently asked" /></h2></Reveal>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <details className="group rounded-2xl border border-line bg-white px-5 py-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                  <Bi el={f.el} en={f.en} />
                  <span className="text-plum transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted"><Bi el={f.ael} en={f.aen} /></p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── CONTACT ───────────────── */
export function Contact() {
  const { lang, openChat } = useGuide();
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email) return;
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source: "form" }) });
    } catch { /* stub */ }
    setDone(true);
  };

  return (
    <section id="contact" data-section="contact" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-10 rounded-xl2 border border-line bg-white p-8 shadow-card sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl"><Bi el="Ας μιλήσουμε" en="Let's talk" /></h2>
          <p className="mt-4 max-w-md text-muted">
            <Bi el="Συμπλήρωσε τη φόρμα και θα επικοινωνήσω μαζί σου σύντομα — ή μίλα απευθείας με τη Βένη." en="Fill in the form and I'll get back to you soon — or talk to Veny directly." />
          </p>
          <button onClick={openChat} className="mt-6 inline-flex items-center gap-2 rounded-full bg-lilac px-5 py-2.5 text-sm font-semibold text-plum transition hover:bg-plum hover:text-white">
            💬 <Bi el="Μίλα με τη Βένη" en="Chat with Veny" />
          </button>
          <div className="mt-8 space-y-2 text-sm text-muted">
            <p>📍 <Bi el="Αθήνα · δια ζώσης & online" en="Athens · in-person & online" /></p>
            <p>✉️ hello@veny.gr</p>
          </div>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-sage/25 p-8 text-center">
            <div className="text-3xl">💜</div>
            <p className="mt-3 font-medium text-ink"><Bi el="Ευχαριστώ! Θα επικοινωνήσω σύντομα μαζί σου." en="Thank you! I'll be in touch very soon." /></p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input required placeholder={lang === "el" ? "Ονοματεπώνυμο" : "Full name"} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full rounded-xl border border-line bg-lilac-2 px-4 py-3 text-sm outline-none focus:border-plum" />
            <input required type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full rounded-xl border border-line bg-lilac-2 px-4 py-3 text-sm outline-none focus:border-plum" />
            <input placeholder={lang === "el" ? "Τηλέφωνο (προαιρετικό)" : "Phone (optional)"} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full rounded-xl border border-line bg-lilac-2 px-4 py-3 text-sm outline-none focus:border-plum" />
            <textarea placeholder={lang === "el" ? "Πώς μπορώ να βοηθήσω;" : "How can I help?"} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} rows={4} className="w-full rounded-xl border border-line bg-lilac-2 px-4 py-3 text-sm outline-none focus:border-plum" />
            <button type="submit" className="w-full rounded-full bg-plum py-3.5 text-sm font-semibold text-white transition hover:bg-plum-2">
              <Bi el="Αποστολή αιτήματος" en="Send request" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ───────────────── FOOTER ───────────────── */
export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-semibold text-ink">Βένη Τσαμπροπούλου</p>
          <p className="mt-1"><Bi el="Σύμβουλος Ψυχικής Υγείας · Αθήνα" en="Mental Health Counsellor · Athens" /></p>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted/80">
          <Bi
            el="Η ιστοσελίδα δεν αντικαθιστά επείγουσα φροντίδα. Σε κρίση, κάλεσε 112 ή τη Γραμμή 1018."
            en="This site is not a substitute for emergency care. In a crisis, call 112 or a local helpline."
          />
        </p>
        <p className="text-xs text-muted/70">© 2026 Veny Tsampropoulou</p>
      </div>
    </footer>
  );
}
