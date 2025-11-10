"use client"

import { Truck } from "lucide-react"
import { motion } from "framer-motion"

export default function FloatingOffer() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-[#64403E] text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium cursor-default select-none z-50"
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Truck size={16} className="text-white" />
      <span>Gratis fragt ved køb over 600 kr.</span>
    </motion.div>
  )
}