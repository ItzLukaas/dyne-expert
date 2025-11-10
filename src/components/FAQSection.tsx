"use client"

import { useState } from "react"
import { Truck, HelpCircle, CheckCircle, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Funktion til at håndtere åbning/lukning af FAQ-sektioner
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-brand-deep text-center mb-6"
      >
        Ofte stillede spørgsmål
      </motion.h2>

      {/* FAQ 1 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div
          onClick={() => toggleOpen(1)}
          className="flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition"
        >
          <Truck size={30} className="text-brand-deep" />
          <h3 className="text-xl font-semibold text-brand-deep">Hvordan fungerer gratis fragt?</h3>
        </div>
        {openIndex === 1 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 pl-12"
          >
            Du opnår gratis fragt, når din bestilling overstiger 600 DKK. Det betyder, at vi sender din ordre helt gratis indenfor 2–3 hverdage, når du når grænsen.
          </motion.p>
        )}
      </motion.div>

      {/* FAQ 2 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div
          onClick={() => toggleOpen(2)}
          className="flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition"
        >
          <HelpCircle size={30} className="text-brand-deep" />
          <h3 className="text-xl font-semibold text-brand-deep">Hvilke betalingsmetoder accepterer I?</h3>
        </div>
        {openIndex === 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 pl-12"
          >
            Vi accepterer flere betalingsmetoder, herunder Visa, Mastercard, Apple Pay og Google Pay. Du kan vælge den, der passer dig bedst ved checkout.
          </motion.p>
        )}
      </motion.div>

      {/* FAQ 3 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div
          onClick={() => toggleOpen(3)}
          className="flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition"
        >
          <CheckCircle size={30} className="text-brand-deep" />
          <h3 className="text-xl font-semibold text-brand-deep">Hvordan ved jeg, om en vare er på lager?</h3>
        </div>
        {openIndex === 3 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 pl-12"
          >
            Vi opdaterer vores lagerbeholdning i realtid. Hvis en vare er på lager, vil du se den som tilgængelig, og vi sender den afsted så hurtigt som muligt.
          </motion.p>
        )}
      </motion.div>

      {/* FAQ 4 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div
          onClick={() => toggleOpen(4)}
          className="flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition"
        >
          <Info size={30} className="text-brand-deep" />
          <h3 className="text-xl font-semibold text-brand-deep">Hvordan returnerer jeg en vare?</h3>
        </div>
        {openIndex === 4 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 pl-12"
          >
            Du kan returnere varer indenfor 30 dage efter køb. Vi tilbyder gratis returfragt, og du kan finde returformularen i din ordrebekræftelse.
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}