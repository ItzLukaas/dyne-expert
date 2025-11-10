"use client"

import Image from "next/image"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"

export default function OmOsPage() {
  return (
    <main className="bg-white text-gray-600">
      <Topbar />
      <Header />

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-brand-deep mb-6"
        >
          Om Dyne Expert
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-gray-600"
        >
          Hos Dyne Expert tror vi på, at en god nats søvn starter med det rigtige sengeudstyr.
          Vi har gjort det til vores mission at tilbyde kvalitetsdyner, puder og sengetøj,
          som kombinerer komfort, funktionalitet og æstetik – til priser, alle kan være med på.
        </motion.p>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-24"> {/* Increased space between sections */}
        {/* BLOK 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/vores-historie-4.webp"
              alt="Dyne Expert kvalitet og komfort"
              width={600}
              height={400}
              className="rounded-2xl shadow-md object-cover w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-brand-deep">
              Dansk webshop med fokus på tillid og tryghed
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-gray-600">
              På billedet ser du et kæmpe lager – vores er måske ikke helt så stort endnu, men vi er stolte af at have alle vores produkter hjemme, og alt sammen på lager i Give. Det betyder også, at vi sender direkte fra Give.
            </p>

            <p className="max-w-2xl mx-auto mt-6 text-gray-600">
              Hvis du føler dig usikker ved at handle online, så kan du finde vores telefonnummer nederst på siden. Du er altid velkommen til at lægge en ordre eller sende en SMS, så finder vi en tid, hvor du kan afhente din bestilling direkte i Give. Vi klarer det altid hurtigt og uden problemer.
            </p>
          </motion.div>
        </div>

        {/* BLOK 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-brand-deep">
              Derfor kan du stole på os
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-gray-600">
              Når du køber dyner og sengetøj online, vil du gerne være sikker på, at du får kvalitet for pengene. Derfor gør vi det nemt at finde de vigtige oplysninger – fra materialer og certificeringer til leveringsinfo. Vi sender altid direkte fra Danmark med GLS, og skulle du være i tvivl om størrelse eller kvalitet, er vi altid klar til at hjælpe dig med at træffe det rette valg.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-1">
              <li>30 dages returret</li>
              <li>Levering 2–3 hverdage med GLS</li>
              <li>OEKO-TEX® certificerede produkter</li>
              <li>Dansk kundeservice – rigtig person i den anden ende</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/vores-historie-3.webp"
              alt="Lager og forsendelse hos Dyne Expert"
              width={600}
              height={400}
              className="rounded-2xl shadow-md object-cover w-full"
            />
          </motion.div>
        </div>

        {/* TRUST-SEKTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-brand-deep">
            En webshop med gennemsigtighed
          </h2>
          <p className="mb-6">
            Vi er ikke et anonymt udenlandsk lager – vi er en dansk webshop, og du kan altid kontakte os,
            hvis der er noget med din ordre. Vi vil hellere have én glad kunde end ti hurtige ordrer.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
            <Image src="/OEKO-TEX.png" alt="OEKO-TEX" width={80} height={60} />
            <Image src="/GLS.png" alt="GLS Fragtpartner" width={90} height={50} />
            <Image src="/Visa.png" alt="Visa" width={70} height={40} />
            <Image src="/Mastercard.png" alt="Mastercard" width={70} height={40} />
            <Image src="/Apple-Pay.png" alt="Apple Pay" width={70} height={40} />
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
