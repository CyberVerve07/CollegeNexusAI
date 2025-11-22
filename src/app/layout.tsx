
import type { Metadata } from "next";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase";
import { UserProvider } from "@/contexts/user-context";

export const metadata: Metadata = {
  title: "CollegeNexus AI",
  description: "A complete college management mobile application.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#3F51B5" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
