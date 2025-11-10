"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function KollektionPage() {
  const collections = [
    {
      name: "Dyner",
      image: "/dyner.webp",
      link: "/collections/dyner",
      desc: "",
    },
    {
      name: "Puder",
      image: "/puder.webp",
      link: "/collections/puder",
      desc: "",
    },
    {
      name: "Sengetøj",
      image: "/sengetøj.webp",
      link: "/collections/sengetoj",
      desc: ""
    },
  ]

  return (
    <main className="bg-white">
      {/* Sticky topbar + header */}
      <div className="sticky top-0 z-50 shadow-sm">
        <Topbar />
        <Header />
      </div>

      {/* Hero / intro */}
      <section className="bg-[#F7F3EF] border-b border-gray-200 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-deep mb-4">
            Udforsk vores kollektioner
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Oplev vores udvalg af kvalitetsprodukter — alt fra varme dyner og støttende puder 
            til elegant sengetøj, nøje udvalgt for at give dig den bedste søvn.
          </p>
        </div>
      </section>

      {/* Kollektionskort */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Billede */}
              <Image
                src={col.image}
                alt={col.name}
                width={500}
                height={600}
                className="object-cover w-full h-[420px] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Mørk overlay for kontrast */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500" />

              {/* Tekst */}
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-semibold mb-2 text-white drop-shadow-md">
                  {col.name}
                </h2>
                <p className="text-sm opacity-95 max-w-[260px] mb-4 text-white drop-shadow">
                  {col.desc}
                </p>
                <Link
                  href={col.link}
                  className="inline-block bg-white text-brand-deep font-semibold px-5 py-2 rounded-full hover:bg-brand-accent hover:text-white transition"
                >
                  Se kollektionen
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
