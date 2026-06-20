"use client";

import { create } from "zustand";

export type Lang = "el" | "en";
export type AvatarState = "open" | "min" | "closed";

interface GuideState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;

  /** id of the section currently in view — drives the avatar pose & speech */
  active: string;
  setActive: (id: string) => void;

  muted: boolean;
  toggleMute: () => void;

  avatar: AvatarState;
  setAvatar: (a: AvatarState) => void;

  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

export const useGuide = create<GuideState>((set) => ({
  lang: "el",
  setLang: (lang) => set({ lang }),
  toggleLang: () => set((s) => ({ lang: s.lang === "el" ? "en" : "el" })),

  active: "hero",
  setActive: (id) => set((s) => (s.active === id ? s : { active: id })),

  muted: true, // start muted; user opts into voice
  toggleMute: () => set((s) => ({ muted: !s.muted })),

  avatar: "open",
  setAvatar: (avatar) => set({ avatar }),

  chatOpen: false,
  openChat: () => set({ chatOpen: true }),
  closeChat: () => set({ chatOpen: false }),
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
}));
