import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Next Navbar Demo",
  description: "Next.js Navbar with active state example",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
