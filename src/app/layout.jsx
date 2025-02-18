import { Geist, Geist_Mono, Poppins, Niconne } from "next/font/google";
import "./globals.css";
import UserPageWrap from "@/components/UserPageWrap/UserPageWrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const niconne = Niconne({
  variable: "--font-niconne",
  weight: ["400"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Romina Peruchin | Portfolio",
  description: "Romina Peruchin's artistic portfolio, here you can find her works of art and contact her",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${niconne.variable} ${poppins.variable} max-w-screen overflow-x-hidden`}
      >

      <UserPageWrap>
        {children}
      </UserPageWrap>

      </body>
    </html>
  );
}
