import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Google Fonts otimizadas pelo Next.js
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

// Fonte Local De Valencia
const deValencia = localFont({
  src: "./fonts/de-valencia.woff2", // Arquivo agora em formato woff2 otimizado
  variable: "--font-valencia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LD Energy — Soluções Energéticas Éticas, Eficientes e Sustentáveis",
  description:
    "LD Energy: 20 anos no setor energético. Petróleo bruto, óleos combustíveis e biomassa. Poços próprios em SP, BA e ES. Certificações ISO 9001, 14001 e 45001.",
  openGraph: {
    title: "LD Energy — Energia que move o Brasil.",
    description:
      "20 anos de mercado. Petróleo bruto, óleos combustíveis e biomassa. Certificações ISO 9001, 14001 e 45001.",
    url: "https://www.ldenergy.com.br",
    siteName: "LD Energy",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LD Energy — Energia que move o Brasil.",
    description: "20 anos de mercado. Petróleo bruto, óleos combustíveis e biomassa.",
  },
  keywords: [
    "energia",
    "petróleo bruto",
    "óleos combustíveis",
    "biomassa",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ESG",
    "São Paulo",
    "Bahia",
    "Espírito Santo",
  ],
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/Logomarca.svg", type: "image/svg+xml" },
    ],
    apple: "/Logomarca.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={`${inter.variable} ${bodoni.variable} ${deValencia.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/Logomarca.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Logomarca.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
