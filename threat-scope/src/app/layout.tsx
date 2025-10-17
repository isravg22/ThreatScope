
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreatScope - Portal de Inteligencia de Ciberamenazas",
  description: "ThreatScope analiza y visualiza amenazas cibernéticas en tiempo real. Plataforma desarrollada con NextJS, NestJS y PostgreSQL.",
  keywords:"ciberseguridad, amenazas cibernéticas, dashboard, inteligencia de seguridad, NextJS, NestJS, PostgreSQL, analista SOC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
