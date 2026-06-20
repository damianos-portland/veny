import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Βένη Τσαμπροπούλου — Σύμβουλος Ψυχικής Υγείας",
  description:
    "Συμβουλευτική ψυχικής υγείας με ενσυναίσθηση και σεβασμό. Ατομική συμβουλευτική, ζεύγους & εφήβων, online συνεδρίες. Κλείστε ραντεβού.",
  openGraph: {
    title: "Βένη Τσαμπροπούλου — Σύμβουλος Ψυχικής Υγείας",
    description: "Είμαι εδώ για να σε βοηθήσω να νιώσεις καλύτερα.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
