import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "El Taller de Juan | Restauración artesanal de muebles",
  description:
    "Restauración artesanal de piezas únicas en Vigo. Descubre nuestra colección de muebles recuperados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}