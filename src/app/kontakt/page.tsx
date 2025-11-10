"use client"

import { useState, useEffect, useRef } from "react"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Mail, User, MessageSquare, Send } from "lucide-react"

export default function KontaktPage() {
  const [success, setSuccess] = useState(false)
  const [nextUrl, setNextUrl] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNextUrl(`${window.location.origin}/kontakt/success`)
    }
  }, [])

  return (
    <main className="bg-white min-h-screen text-gray-800">
      <Topbar />
      <Header />

      {/* HERO */}
      <section className="text-center py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-brand-deep mb-5 tracking-tight leading-tight">
            Kontakt os
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
            Har du spørgsmål til levering, retur eller produkter?  
            Udfyld kontaktformularen – vi vender tilbage inden for 24 timer.
          </p>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* FORMULAR */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl font-semibold text-brand-deep mb-8 text-center">
            Send os en besked
          </h2>

          <form
            ref={formRef}
            action="https://formsubmit.co/kontaktsvendsen@gmail.com"
            method="POST"
            onSubmit={() => setSuccess(true)}
            className="space-y-7 text-left"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={nextUrl} />

            {/* Navn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-brand-deep" />
                Fulde navn
              </label>
              <input
                required
                name="navn"
                type="text"
                placeholder="Skriv dit navn"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-deep focus:outline-none"
              />
            </div>

            {/* Mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-brand-deep" />
                E-mail
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="Din e-mailadresse"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-deep focus:outline-none"
              />
            </div>

            {/* Besked */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare size={16} className="text-brand-deep" />
                Din besked
              </label>
              <textarea
                required
                name="besked"
                rows={6}
                placeholder="Skriv din besked her..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-deep focus:outline-none resize-none"
              ></textarea>
            </div>

            {/* Send-knap */}
            <button
              type="submit"
              className="w-full bg-brand-deep text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-sm"
            >
              Send besked
              <Send size={18} />
            </button>

            {success && (
              <p className="text-green-600 text-center mt-4 font-medium">
                ✅ Tak for din besked – vi vender snart tilbage!
              </p>
            )}
          </form>
        </div>

        {/* GOOGLE MAPS */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
          <iframe
            title="Dyne Expert lokation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.312481883173!2d9.1155807!3d55.7625025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c601b2364b2f3%3A0x4e0e1e52df7cdb3c!2sHyldevang%2044%2C%207323%20Give!5e0!3m2!1sda!2sdk!4v1731072000000!5m2!1sda!2sdk"
            width="100%"
            height="100%"
            style={{ border: 0, height: "100%", minHeight: "500px" }}
            allowFullScreen
            loading="lazy"
            className="rounded-3xl"
          ></iframe>
        </div>
      </section>

      <Footer />
    </main>
  )
}