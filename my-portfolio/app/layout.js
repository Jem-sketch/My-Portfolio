import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import IntroVideo from "./components/IntroVideo";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Smoothscroll from "./components/smoothScroll";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jem Celestial | Full-stack Developer",
  description: "Portfolio of Full-stack Developer - Jem",
  icons: {
    icon: "/Logo_jem3.0.svg", // Path to your SVG file in the public folder
  },
};



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}>
      
      <body>
        <IntroVideo />
        <ThemeProvider>
        <Navbar />
        <Smoothscroll />
        

        <main>
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}