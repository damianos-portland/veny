"use client";

import { useEffect } from "react";
import { useGuide } from "@/store/useGuide";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Nav } from "@/components/Nav";
import { Hero, Services, WhoFor, Method, Faq, Contact, Footer } from "@/components/Sections";
import { FloatingAvatar } from "@/components/FloatingAvatar";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  const lang = useGuide((s) => s.lang);
  useActiveSection();

  useEffect(() => {
    document.body.classList.toggle("en", lang === "en");
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhoFor />
        <Method />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingAvatar />
      <Chatbot />
    </>
  );
}
