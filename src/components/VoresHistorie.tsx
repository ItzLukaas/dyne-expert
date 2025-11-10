"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Truck, Package } from "lucide-react"

export default function VoresHistorie() {
  return (
    <section className="relative bg-gradient-to-b from-[#FAFAF9] to-[#F3EEE9] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* === Tekstsektion === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep leading-snug">
              Vores historie<br />
            </h2>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            Hos <span className="font-semibold text-brand-deep">Dyne Expert</span> tror vi på ærlighed, kvalitet og en rolig nattesøvn. 
            Vores produkter er <span className="font-semibold">2. sortering</span> – det betyder små kosmetiske fejl eller overskudsproduktion, 
            men altid i <span className="font-semibold">rigtig god kvalitet</span> til en pris, hvor alle kan være med.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            Vi sender alle ordrer direkte fra vores <span className="font-semibold text-brand-deep">danske lager i Give</span>, 
            så du får hurtig levering, lokal service og en tryg handel – hver gang.
          </p>

          {/* === Ikoner === */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {[
              { icon: <Truck size={22} />, title: "Dansk lager i Give" },
              { icon: <Package size={22} />, title: "2. sortering – høj kvalitet" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 border border-gray-200 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 hover:shadow-lg transition"
              >
                <div className="text-brand-deep">{item.icon}</div>
                <span className="text-sm font-medium text-gray-800">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === Billeddel === */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative grid grid-cols-2 gap-5"
        >
          {/* venstre top */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 aspect-[4/5]">
            <Image
              src="/vores-historie-4.webp"
              alt="Dansk lager i Give"
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* højre top */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg mt-10 hover:shadow-2xl transition-all duration-700 aspect-[4/5]">
            <Image
              src="/vores-historie-2.webp"
              alt="Kvalitetsdyner"
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* stor bund */}
          <div className="relative col-span-2 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 aspect-[16/6]">
            <Image
              src="/vores-historie-3.webp"
              alt="Hurtig levering"
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* Blød dekorationsglow */}
      <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-brand-accent/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-brand-deep/5 rounded-full blur-2xl -translate-x-1/4 translate-y-1/3 pointer-events-none" />
    </section>
  )
}