import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/Logomarca.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Logomarca.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
