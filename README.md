# Βένη Τσαμπροπούλου — Mental Health Counsellor

A calm, warm site for mental-health counsellor **Veny Tsampropoulou**, centred on a
**floating animated guide** (cartoon avatar) that walks the visitor through the page,
speaks, and answers questions.

Built with **Next.js 15 · TypeScript · TailwindCSS · Framer Motion · Zustand**.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Signature features

- **Floating avatar guide** (`FloatingAvatar.tsx`) — image-based cartoon avatar bottom-right that
  **changes pose & speech per section** as you scroll (wave · tablet · arms · think · smile),
  with a speech bubble, controls (**language / mute / minimize / close**), an idle nudge, a gentle
  float, and **Web Speech** voice (free, on-device, EL & EN). Click it to open the chatbot.
- **Chatbot** (`Chatbot.tsx`) — “Ρώτησε τη Βένη”: quick-reply FAQ (services, first session, cost) +
  **lead form** (name / email / phone / consent) → `POST /api/contact`.
- **Bilingual EL / EN** (toggle in the nav; `lang-el` / `lang-en` spans + store).
- Sections: Hero · Services · For-you · Approach (4 steps) · FAQ · Contact · Footer.
- Soft, accessible palette (lavender / beige / sage / white), mobile-first, reduced-motion aware.

## Wire-ups before launch (placeholders)

- **Email to Veny** — `app/api/contact/route.ts` is a stub; add Resend/Nodemailer (see the comment)
  and set `VENY_EMAIL` / `RESEND_API_KEY`.
- **Real content** — bio, photo, real email/phone, exact services & pricing.
- **Avatar art** — current poses are cropped from the concept render in `public/avatar/`; swap for
  hi-res transparent PNGs (or a Lottie/3D rig) when available.
- Optional: upgrade the chatbot from scripted FAQ to a real LLM (Claude API) behind the same route.

## Structure

```
app/            layout · page (composition) · api/contact (lead route)
src/components/ Nav · Sections · FloatingAvatar · Chatbot
src/store/      useGuide (lang, active section, avatar/chat state)
src/hooks/      useActiveSection (IntersectionObserver) · useSpeech (Web Speech)
src/lib/        guide (per-section pose + bilingual avatar lines)
public/avatar/  wave · arms · think · smile · tablet
```
