import type { Metadata } from "next";
import { Pirata_One, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pirata = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: "400",
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Hustle Translator – Forge ton titre",
  description:
    "Dis-nous ce que tu codes et depuis quand. La guilde te dira qui tu es.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${pirata.variable} ${pixelify.variable} h-full antialiased`}
    >
      <body className="hustle-body min-h-full flex flex-col">{children}</body>
    </html>
  );
}
