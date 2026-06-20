"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGuide } from "@/store/useGuide";

type Msg = { from: "bot" | "user"; text: string };

const T = {
  el: {
    title: "Ρώτησε τη Βένη",
    hi: "Γεια σου! 💜 Πώς μπορώ να σε βοηθήσω;",
    chips: [
      { q: "Ποιες υπηρεσίες προσφέρεις;", a: "Προσφέρω ατομική συμβουλευτική, συμβουλευτική ζεύγους & εφήβων, καθώς και online συνεδρίες — προσαρμοσμένες στις δικές σου ανάγκες." },
      { q: "Πώς γίνεται η πρώτη συνεδρία;", a: "Η πρώτη συνεδρία είναι μια ήρεμη γνωριμία. Μαζί βλέπουμε τι σε απασχολεί και ορίζουμε στόχους — χωρίς πίεση." },
      { q: "Κόστος & διάρκεια;", a: "Κάθε συνεδρία διαρκεί περίπου 50’. Για κόστος και διαθεσιμότητα, άφησέ μου τα στοιχεία σου και επικοινωνώ σύντομα." },
    ],
    book: "Θα ήθελα να κλείσω ραντεβού",
    bookA: "Υπέροχα. Συμπλήρωσε τα στοιχεία σου και θα επικοινωνήσω μαζί σου για να βρούμε χρόνο που σε βολεύει.",
    name: "Ονοματεπώνυμο", email: "Email", phone: "Τηλέφωνο (προαιρετικό)", msg: "Μήνυμα (προαιρετικό)",
    consent: "Συμφωνώ να επικοινωνήσει μαζί μου η Βένη.",
    send: "Αποστολή",
    done: "Ευχαριστώ! 💜 Έλαβα το μήνυμά σου και θα επικοινωνήσω πολύ σύντομα.",
    ph: "Γράψε το μήνυμά σου…",
  },
  en: {
    title: "Ask Veny",
    hi: "Hi there! 💜 How can I help you?",
    chips: [
      { q: "What services do you offer?", a: "I offer individual counselling, couples & teen counselling, and online sessions — tailored to your needs." },
      { q: "How does the first session work?", a: "The first session is a calm introduction. Together we look at what's on your mind and set goals — no pressure." },
      { q: "Cost & duration?", a: "Each session lasts about 50 minutes. For cost and availability, leave your details and I'll get back to you soon." },
    ],
    book: "I'd like to book a session",
    bookA: "Wonderful. Leave your details and I'll reach out to find a time that suits you.",
    name: "Full name", email: "Email", phone: "Phone (optional)", msg: "Message (optional)",
    consent: "I agree to be contacted by Veny.",
    send: "Send",
    done: "Thank you! 💜 I've received your message and will be in touch very soon.",
    ph: "Type your message…",
  },
};

export function Chatbot() {
  const { chatOpen, closeChat, lang } = useGuide();
  const t = T[lang];
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: T[lang].hi }]);
  const [form, setForm] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { setMsgs([{ from: "bot", text: T[lang].hi }]); setForm(false); setDone(false); }, [lang]);
  useEffect(() => { scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [msgs, form, done]);

  const ask = (q: string, a: string) => {
    setMsgs((m) => [...m, { from: "user", text: q }, { from: "bot", text: a }]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.consent) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "chatbot", transcript: msgs }),
      });
    } catch { /* stubbed — see API route */ }
    setDone(true);
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-[60] flex h-[min(560px,80vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft sm:bottom-6 sm:right-6"
        >
          {/* header */}
          <div className="flex items-center justify-between bg-plum px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <img src="/avatar/smile.png" alt="" className="h-9 w-9 rounded-full bg-white/15 object-cover object-top" />
              <span className="font-display font-semibold">{t.title}</span>
            </div>
            <button onClick={closeChat} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15">×</button>
          </div>

          {/* messages */}
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-lilac-2 p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-snug ${m.from === "user" ? "rounded-br-md bg-plum text-white" : "rounded-bl-md border border-line bg-white text-ink"}`}>
                  {m.text}
                </div>
              </div>
            ))}

            {!form && !done && (
              <div className="flex flex-wrap gap-2 pt-1">
                {t.chips.map((c) => (
                  <button key={c.q} onClick={() => ask(c.q, c.a)}
                    className="rounded-full border border-plum/30 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-plum transition hover:bg-plum hover:text-white">
                    {c.q}
                  </button>
                ))}
                <button onClick={() => { setMsgs((m) => [...m, { from: "user", text: t.book }, { from: "bot", text: t.bookA }]); setForm(true); }}
                  className="rounded-full bg-plum px-3 py-1.5 text-[0.78rem] font-semibold text-white transition hover:bg-plum-2">
                  {t.book}
                </button>
              </div>
            )}

            {form && !done && (
              <form onSubmit={submit} className="space-y-2.5 rounded-2xl border border-line bg-white p-3.5">
                <input required placeholder={t.name} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full rounded-lg border border-line bg-lilac-2 px-3 py-2 text-sm outline-none focus:border-plum" />
                <input required type="email" placeholder={t.email} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full rounded-lg border border-line bg-lilac-2 px-3 py-2 text-sm outline-none focus:border-plum" />
                <input placeholder={t.phone} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full rounded-lg border border-line bg-lilac-2 px-3 py-2 text-sm outline-none focus:border-plum" />
                <label className="flex items-start gap-2 text-[0.74rem] text-muted">
                  <input type="checkbox" checked={data.consent} onChange={(e) => setData({ ...data, consent: e.target.checked })} className="mt-0.5 accent-[#6d4aa6]" />
                  {t.consent}
                </label>
                <button type="submit" className="w-full rounded-full bg-plum py-2.5 text-sm font-semibold text-white transition hover:bg-plum-2">
                  {t.send}
                </button>
              </form>
            )}

            {done && (
              <div className="rounded-2xl border border-sage bg-sage/30 px-4 py-3 text-[0.9rem] text-ink">{t.done}</div>
            )}
          </div>

          {/* footer note */}
          <div className="border-t border-line px-4 py-2 text-center text-[0.66rem] text-muted">
            {lang === "el" ? "Υποστηρικτικός βοηθός · όχι έκτακτη ανάγκη" : "Supportive assistant · not for emergencies"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
