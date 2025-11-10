"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Clock, X, Feather } from "lucide-react"

export default function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState("")

  useEffect(() => {
    // Pop-up vises altid (ingen cooldown)
    setTimeout(() => setOpen(true), 400)
  }, [])

  // Countdown til kl. 20:00
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date()
      target.setHours(20, 0, 0, 0)
      if (now > target) target.setDate(target.getDate() + 1)
      const diff = target.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
          >
            {/* Luk-knap */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X size={22} />
            </button>

            {/* Billede */}
            <Image
              src="/vores-historie-3.png"
              alt="Dyne Expert historie"
              width={700}
              height={400}
              className="w-full h-56 object-cover"
              priority
            />

            {/* Indhold */}
            <div className="p-8 text-center">
              <div className="flex items-center justify-center mb-3">
                <Feather className="text-black w-5 h-5 mr-2" />
                <h2 className="text-2xl font-bold tracking-tight">
                  Velkommen til Dyne Expert
                </h2>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Historien om Dyne Expert begyndte med et ønske om at gøre
                kvalitetsdyner tilgængelige for alle.  
                <br />
                <br />
                Vi arbejder tæt sammen med vores leverandører og sender direkte
                fra vores lager i Give – så du får topkvalitet uden mellemled.  
                <br />
                <br />
                Lige nu har vi{" "}
                <span className="font-semibold text-gray-800">
                  eksklusive tilbud
                </span>{" "}
                på vores bedst anmeldte produkter. Bestil inden{" "}
                <span className="font-medium">kl. 20:00</span> i dag, og få din
                ordre leveret inden for <span className="font-medium">1–3 hverdage</span>.
              </p>

              {/* Countdown */}
              <div className="bg-gray-100 rounded-xl py-3 px-6 inline-block mb-7">
                <div className="flex items-center justify-center space-x-2 mb-1 text-gray-700 text-sm">
                  <Clock size={16} />
                  <span>Bestil inden kl. 20:00 – tid tilbage:</span>
                </div>
                <p className="text-2xl font-bold tracking-wider text-black">
                  {countdown}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/collections/dyner"
                onClick={() => setOpen(false)}
                className="inline-block bg-black text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-all"
              >
                Se kollektionen
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}