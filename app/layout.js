import { DM_Serif_Display, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Oliver Kenwright — Senior Product Manager",
  description:
    "Product leader who turns complex problems into clear decisions and ships experiences people trust and actually use.",
  openGraph: {
    title: "Oliver Kenwright — Senior Product Manager",
    description:
      "Product leader who turns complex problems into clear decisions and ships experiences people trust and actually use.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
