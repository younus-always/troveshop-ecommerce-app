"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicLayout({ children }) {
      return (
            <div className="min-h-screen flex flex-col">
                  <Header />
                  <Navbar />
                  <main className="grow">
                        {children}
                  </main>
                  <Footer />
            </div>
      )
}
