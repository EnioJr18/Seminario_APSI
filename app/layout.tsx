import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "TaskFlow | React + Next.js",
  description: "PoC de Design Patterns para o seminário IFAL",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
