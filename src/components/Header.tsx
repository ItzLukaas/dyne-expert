"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Heart } from "lucide-react"
import CartDrawer from "@/components/CartDrawer"
import { shopifyFetch } from "@/lib/shopify"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartTotal, setCartTotal] = useState<number | null>(null)
  const [favCount, setFavCount] = useState(0)

  // 🛒 Kurv – henter totalbeløbet i DKK
  useEffect(() => {
    const updateCartTotal = async () => {
      const cartId = localStorage.getItem("cartId")
      if (!cartId) return

      const query = `
        query getCart($id: ID!) {
          cart(id: $id) {
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }`
      const { data } = await shopifyFetch(query, { id: cartId })
      const total = data?.cart?.cost?.totalAmount?.amount
      setCartTotal(total ? parseFloat(total) : 0)
    }

    updateCartTotal()
    window.addEventListener("cartUpdated", updateCartTotal)
    return () => window.removeEventListener("cartUpdated", updateCartTotal)
  }, [])

  // ❤️ Favoritter
  useEffect(() => {
    const updateFavCount = () => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavCount(favs.length)
    }

    updateFavCount()
    window.addEventListener("storage", updateFavCount)
    window.addEventListener("favoritesUpdated", updateFavCount)

    return () => {
      window.removeEventListener("storage", updateFavCount)
      window.removeEventListener("favoritesUpdated", updateFavCount)
    }
  }, [])

  // Dansk valutaformat
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-dyneexpert.png"
            alt="Dyne Expert Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">
          <Link href="/collections/dyner" className="hover:text-brand-deep transition">
            Dyner
          </Link>
          <Link href="/collections/puder" className="hover:text-brand-deep transition">
            Puder
          </Link>
          <Link href="/collections/sengetoj" className="hover:text-brand-deep transition">
            Sengetøj
          </Link>
          <Link href="/kontakt" className="hover:text-brand-deep transition">
            Kontakt
          </Link>
          <Link href="/om-os" className="hover:text-brand-deep transition">
            Om os
          </Link>
        </nav>

        {/* Ikoner */}
        <div className="flex items-center gap-6">
          {/* ❤️ Favoritter (kun desktop) */}
          <Link
            href="/favoritter"
            className="relative text-gray-700 hover:text-brand-deep transition hidden md:block"
            aria-label="Mine favoritter"
          >
            <Heart size={23} />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-deep text-white text-xs rounded-full px-1.5">
                {favCount}
              </span>
            )}
          </Link>

          {/* 🛒 Kurv med beløb */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 text-gray-700 hover:text-brand-deep transition-all group"
            aria-label="Åbn kurv"
          >
            <ShoppingBag
              size={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {cartTotal !== null && (
              <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-deep transition-colors">
                {cartTotal > 0 ? formatPrice(cartTotal) : "0 kr."}
              </span>
            )}
          </button>

          {/* ☰ Burger menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 hover:text-brand-deep transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-3 text-gray-800 text-sm">
            <Link href="/collections/dyner" onClick={() => setOpen(false)} className="py-2">
              Dyner
            </Link>
            <Link href="/collections/puder" onClick={() => setOpen(false)} className="py-2">
              Puder
            </Link>
            <Link href="/collections/sengetoj" onClick={() => setOpen(false)} className="py-2">
              Sengetøj
            </Link>
            <Link href="/kontakt" onClick={() => setOpen(false)} className="py-2">
              Kontakt
            </Link>
            <Link href="/om-os" onClick={() => setOpen(false)} className="py-2">
              Om os
            </Link>
          </nav>
        </div>
      )}

      {/* Kurv Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}