import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DonateModalProvider } from "@/components/donate/DonateModalContext";
import DonateModal from "@/components/donate/DonateModal";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Huellitas Arcoíris — Adopción de perros",
  description: "Grupo de rescate sin ánimo de lucro en Querétaro. Conoce nuestros perritos listos para encontrar un hogar de arcoíris.",
  openGraph: {
    title: "Huellitas Arcoíris",
    description: "Adopta un perrito rescatado en Querétaro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable} h-full`}>
      <body className="min-h-screen flex flex-col font-body bg-bg text-text antialiased">
        <DonateModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <DonateModal />
        </DonateModalProvider>
      </body>
    </html>
  );
}
