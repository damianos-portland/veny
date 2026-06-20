"use client";

/** Thin wrapper over the Web Speech API (free, on-device, supports EL & EN). */
export function speak(text: string, lang: "el" | "en") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "el" ? "el-GR" : "en-US";
    u.rate = 0.98;
    u.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang?.toLowerCase().startsWith(u.lang.toLowerCase().slice(0, 2)));
    if (match) u.voice = match;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
