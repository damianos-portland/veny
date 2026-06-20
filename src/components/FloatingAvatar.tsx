"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGuide } from "@/store/useGuide";
import { GUIDE_MAP } from "@/lib/guide";
import { speak, stopSpeaking } from "@/hooks/useSpeech";

export function FloatingAvatar() {
  const { lang, active, muted, toggleMute, avatar, setAvatar, openChat, toggleLang } = useGuide();
  const step = GUIDE_MAP[active] ?? GUIDE_MAP["hero"];
  const [nudge, setNudge] = useState(false);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // speak the line whenever the section/language changes (only if sound is on)
  useEffect(() => {
    if (!muted && avatar === "open") speak(step.msg[lang], lang);
    return () => stopSpeaking();
  }, [active, lang, muted, avatar, step]);

  // gentle idle nudge
  useEffect(() => {
    setNudge(false);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setNudge(true), 14000);
    return () => clearTimeout(idle.current);
  }, [active]);

  // reopen tab when closed
  if (avatar === "closed") {
    return (
      <button
        onClick={() => setAvatar("open")}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-plum shadow-soft transition hover:scale-105"
        aria-label={lang === "el" ? "Άνοιξε τη Βένη" : "Open Veny"}
      >
        <img src="/avatar/smile.png" alt="Veny" className="h-14 w-auto translate-y-1" />
      </button>
    );
  }

  const minimized = avatar === "min";
  const bubbleText = nudge
    ? lang === "el" ? "Θέλεις να σε βοηθήσω με κάτι; 💜" : "Want me to help with something? 💜"
    : step.msg[lang];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[88vw] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* speech bubble */}
      <AnimatePresence mode="wait">
        {!minimized && (
          <motion.div
            key={bubbleText}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bubble relative max-w-[260px] rounded-2xl rounded-br-md border border-line bg-white px-4 py-3 text-[0.92rem] leading-snug text-ink shadow-card"
          >
            {bubbleText}
            <button
              onClick={openChat}
              className="mt-2 block text-[0.78rem] font-semibold text-plum hover:underline"
            >
              {lang === "el" ? "Ρώτησέ με →" : "Ask me →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-2">
        {/* control rail */}
        <div className="mb-2 flex flex-col gap-1.5">
          {[
            { k: "lang", label: lang.toUpperCase(), on: () => toggleLang(), title: "Language" },
            {
              k: "mute",
              label: muted ? "🔇" : "🔊",
              on: () => toggleMute(),
              title: muted ? "Unmute" : "Mute",
            },
            { k: "min", label: minimized ? "▢" : "—", on: () => setAvatar(minimized ? "open" : "min"), title: "Minimize" },
            { k: "close", label: "×", on: () => setAvatar("closed"), title: "Close" },
          ].map((c) => (
            <button
              key={c.k}
              onClick={c.on}
              title={c.title}
              className="grid h-7 w-7 place-items-center rounded-full border border-line bg-white/90 text-[0.7rem] font-semibold text-muted shadow-sm transition hover:border-plum/40 hover:text-plum"
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* the avatar */}
        <motion.button
          onClick={openChat}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="floaty relative drop-shadow-[0_18px_24px_rgba(80,54,140,0.25)]"
          aria-label={lang === "el" ? "Μίλα με τη Βένη" : "Talk to Veny"}
        >
          <span className="absolute -inset-3 -z-10 rounded-full bg-lilac/60 blur-xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/avatar/${minimized ? "smile" : step.pose}.png`}
            alt="Veny"
            className={minimized ? "h-[92px] w-auto" : "h-[168px] w-auto"}
          />
        </motion.button>
      </div>
    </div>
  );
}
