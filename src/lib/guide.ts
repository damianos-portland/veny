export type Pose = "wave" | "arms" | "think" | "smile" | "tablet";

export interface GuideStep {
  id: string;
  pose: Pose;
  msg: { el: string; en: string };
}

/** What the avatar says (and how she stands) in each section as you scroll. */
export const GUIDE: GuideStep[] = [
  {
    id: "hero",
    pose: "wave",
    msg: {
      el: "Γεια σου! Είμαι η Βένη. Χαίρομαι που είσαι εδώ. Πώς μπορώ να σε βοηθήσω σήμερα;",
      en: "Hi! I'm Veny. I'm so glad you're here. How can I help you today?",
    },
  },
  {
    id: "services",
    pose: "tablet",
    msg: {
      el: "Αυτές είναι οι υπηρεσίες μου — κάθε διαδρομή προσαρμόζεται σε εσένα.",
      en: "These are my services — each path is tailored to you.",
    },
  },
  {
    id: "who",
    pose: "arms",
    msg: {
      el: "Ίσως αναγνωρίσεις τον εαυτό σου εδώ. Δεν είσαι μόνος/η.",
      en: "You might recognise yourself here. You're not alone.",
    },
  },
  {
    id: "method",
    pose: "think",
    msg: {
      el: "Να σου δείξω πώς δουλεύουμε μαζί, βήμα-βήμα.",
      en: "Let me show you how we work together, step by step.",
    },
  },
  {
    id: "process",
    pose: "smile",
    msg: {
      el: "Η πρώτη συνεδρία είναι απλή — μια γνωριμία, χωρίς πίεση.",
      en: "The first session is simple — just a chat, no pressure.",
    },
  },
  {
    id: "faq",
    pose: "think",
    msg: {
      el: "Έχεις απορίες; Ρώτησέ με ό,τι θέλεις.",
      en: "Have questions? Ask me anything.",
    },
  },
  {
    id: "contact",
    pose: "wave",
    msg: {
      el: "Όποτε νιώσεις έτοιμος/η, κλείσε ραντεβού. Είμαι εδώ.",
      en: "Whenever you feel ready, book a session. I'm here.",
    },
  },
];

export const GUIDE_MAP: Record<string, GuideStep> = Object.fromEntries(
  GUIDE.map((g) => [g.id, g])
);
