import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import { Poppins} from 'next/font/google'

export const metadata: Metadata = {
  title: "NotionAI",
  description: "A Collabrative AI Powered Environment ",
  icons:{
    icon:'/logo.png'
  }
};



const poppins = Poppins({
  weight:["100","200","300","400","500","600","700"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Header />
      <html lang="en" className={poppins.className}>
        <body className="">
          <div className="flex grid-cols-2">
            <div className="flex  min-h-screen">
              <Sidebar />
            </div>
            <div className=" flex-1 bg-[#99ddcc]  p-4 overflow-y-auto scrollbar-hide ">
              {children}
            </div>
          </div>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
