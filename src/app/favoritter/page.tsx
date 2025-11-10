"use client"

import { useEffect, useState } from "react"
import { shopifyFetch } from "@/lib/shopify"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2, ShoppingBag } from "lucide-react"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(saved)

    if (saved.length > 0) {
      fetchFavorites(saved)
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchFavorites(ids: string[]) {
    if (ids.length === 0) return

    const query = `
      query getFavProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Product {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `
    const { data } = await shopifyFetch(query, { ids })
    setProducts(data.nodes.filter((p: any) => p))
    setLoading(false)
  }

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f !== id)
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavorites(updated)
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <main className="bg-white min-h-screen">
      <Topbar />
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Titel og handlinger */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-brand-deep">Mine favoritter</h1>

          {favorites.length > 0 && (
            <button
              onClick={() => {
                localStorage.removeItem("favorites")
                setFavorites([])
                setProducts([])
              }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition"
            >
              <Trash2 size={16} />
              <span>Ryd alle</span>
            </button>
          )}
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            <div className="animate-pulse w-10 h-10 rounded-full border-4 border-gray-300 border-t-brand-deep mx-auto mb-4"></div>
            Indlæser dine favoritter...
          </div>
        ) : products.length === 0 ? (
          // 🔹 Tom tilstand
          <div className="text-center text-gray-600 mt-20">
            <Heart size={40} className="mx-auto mb-5 text-gray-300" />
            <p className="text-lg font-medium mb-4">Du har ingen favoritter endnu</p>
            <Link
              href="/collections/dyner"
              className="inline-flex items-center gap-2 bg-brand-deep text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >
              <ShoppingBag size={16} />
              Gå til shoppen
            </Link>
          </div>
        ) : (
          // 🔹 Favorit grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                {/* Fjern favorit */}
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition z-10"
                  aria-label="Fjern favorit"
                >
                  <Heart size={18} className="text-red-500 fill-red-500" />
                </button>

                {/* Billede */}
                <Link href={`/products/${product.handle}`}>
                  <Image
                    src={product.featuredImage?.url}
                    alt={product.featuredImage?.altText || product.title}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
                    {product.priceRange.minVariantPrice.currencyCode}
                  </p>
                  <Link
                    href={`/products/${product.handle}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-deep hover:underline"
                  >
                    <ShoppingBag size={14} />
                    Se produkt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}