"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function KontaktSuccessPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col text-gray-800">
      <Topbar />
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-28">
        <CheckCircle className="text-green-600 w-20 h-20 mb-6 animate-bounce" />

        <h1 className="text-4xl font-bold text-brand-deep mb-4">
          Tak for din besked!
        </h1>

        <p className="text-gray-600 text-lg max-w-md leading-relaxed">
          Din henvendelse er blevet sendt afsted til os.  
          Vi vender tilbage inden for <span className="font-semibold text-brand-deep">24 timer</span>.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block bg-brand-deep text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-accent transition"
        >
          Tilbage til forsiden
        </Link>
      </section>

      <Footer />
    </main>
  )
}