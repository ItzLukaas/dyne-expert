"use client"

import { useEffect, useState } from "react"
import { shopifyFetch } from "@/lib/shopify"
import { Heart } from "lucide-react"

export default function ProductActions({ product }: { product: any }) {
  const variants = product?.variants?.edges || []
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0].node.id : ""
  )
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  // 🔁 Hent eksisterende favoritter fra localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(saved)
  }, [])

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]")
    let updated
    if (saved.includes(product.id)) {
      updated = saved.filter((p: string) => p !== product.id)
      setMessage("Fjernet fra favoritter 💔")
    } else {
      updated = [...saved, product.id]
      setMessage("Tilføjet til favoritter ❤️")
    }
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavorites(updated)

    // Popup besked vises kort
    setTimeout(() => setMessage(""), 2500)
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setLoading(true)
    setMessage("")

    // 1️⃣ Find eller opret kurv
    let cartId = localStorage.getItem("cartId")
    if (!cartId) {
      const res = await shopifyFetch(`
        mutation { cartCreate { cart { id } } }
      `)
      cartId = res.data.cartCreate.cart.id
      localStorage.setItem("cartId", cartId)
    }

    // 2️⃣ Tilføj valgt variant til kurven
    const mutation = `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { id totalQuantity }
        }
      }
    `
    await shopifyFetch(mutation, {
      cartId,
      lines: [{ merchandiseId: selectedVariant, quantity: 1 }],
    })

    // 3️⃣ Åbn kurven + popup
    setLoading(false)
    setMessage("Tilføjet til kurv 🛒")

    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("openCart"))

    setTimeout(() => setMessage(""), 3000)
  }

  const isFav = favorites.includes(product.id)

  return (
    <div className="mt-6 space-y-4 relative">
      {/* Variantvælger */}
      {variants.length > 0 && (
        <>
          <label className="block text-sm font-medium text-gray-700">
            Vælg variant
          </label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-brand-deep focus:outline-none"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {variants.map((v: any) => (
              <option key={v.node.id} value={v.node.id}>
                {v.node.title}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Læg i kurv */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full bg-brand-deep text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-70"
      >
        {loading ? "Tilføjer..." : "Læg i kurv"}
      </button>

      {/* Favorit-knap */}
      <button
        onClick={toggleFavorite}
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium border transition ${
          isFav
            ? "bg-[#F7F3EF] text-brand-deep border-brand-deep"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Heart
          size={16}
          fill={isFav ? "#B48E63" : "none"}
          className={isFav ? "text-brand-deep" : "text-gray-500"}
        />
        {isFav ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      </button>

      {/* Popup besked */}
      {message && (
        <div className="fixed bottom-6 right-6 bg-brand-deep text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-slideUp z-[999999] flex items-center gap-2">
          {message}
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}