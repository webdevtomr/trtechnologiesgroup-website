import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TR Technologies Group — Professional Software Engineering and Technology Services",
  description: "A client-focused technology consultancy delivering practical, modern software and digital solutions for small and medium organisations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=mona-sans@600,700&f[]=hubot-sans@400,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lilex:wght@400;500;600&family=M+PLUS+1+Code:wght@300&family=Stack+Sans+Notch:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-body antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
