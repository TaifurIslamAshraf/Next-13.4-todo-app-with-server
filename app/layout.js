import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./components/context/Context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo app with next js 13.4",
  description: "This is the Todo app and create by Taifur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <ContextProvider>
          <Navbar />
          {children}
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
