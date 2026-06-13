import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
  Noto_Serif_Sinhala,
  Yaldevi,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifSinhala = Noto_Serif_Sinhala({
  variable: "--font-noto-serif-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
});

const yaldevi = Yaldevi({
  variable: "--font-yaldevi",
  subsets: ["sinhala", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vihanga-sandali.wedding"),
  title: "විහඟ ❤️ සඳලි | Wedding Invitation",
  description: "Join us as we celebrate our wedding on 29 August 2026.",
  openGraph: {
    title: "විහඟ ❤️ සඳලි | Wedding Invitation",
    description: "Join us as we celebrate our wedding on 29 August 2026.",
    type: "website",
    locale: "si_LK",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vihanga & Sandali Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "විහඟ ❤️ සඳලි | Wedding Invitation",
    description: "Join us as we celebrate our wedding on 29 August 2026.",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#d4af37",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="si"
      suppressHydrationWarning
      className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${notoSerifSinhala.variable} ${yaldevi.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-maroon-deep">
        {children}
      </body>
    </html>
  );
}
