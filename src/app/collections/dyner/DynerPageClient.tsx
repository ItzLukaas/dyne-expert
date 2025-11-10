"use client"

import { useState, useMemo } from "react"
import { Award } from "lucide-react"

export default function DynerPageClient({ collections }: { collections: any[] }) {
  const [filters, setFilters] = useState<Record<string, { size: string; sort: string }>>({})

  const updateFilter = (handle: string, key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [handle]: { ...prev[handle], [key]: value },
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-14 space-y-24">
      {collections.map((collection) => {
        const col = collection.node
        const allProducts = col.products.edges.map((p: any) => p.node)

        // Kun til Helårsdyner → find den dyreste
        const mostExpensiveDyne =
          col.title.toLowerCase().includes("helårsdyner") &&
          useMemo(() => {
            const dyner = allProducts.filter((p: any) =>
              p.title.toLowerCase().includes("dyne")
            )
            return dyner.reduce((prev: any, current: any) => {
              const pricePrev = parseFloat(prev.priceRange.minVariantPrice.amount)
              const priceCurr = parseFloat(current.priceRange.minVariantPrice.amount)
              return priceCurr > pricePrev ? current : prev
            }, dyner[0])
          }, [allProducts])

        const allSizes = useMemo(() => {
          const sizes = new Set<string>()
          allProducts.forEach((p: any) => {
            p.variants.edges.forEach((v: any) => {
              const size = v.node.selectedOptions.find(
                (o: any) => o.name.toLowerCase() === "størrelse"
              )
              if (size) sizes.add(size.value)
            })
          })
          return ["Alle", ...Array.from(sizes)]
        }, [allProducts])

        const selectedSize = filters[col.handle]?.size || "Alle"
        const sortBy = filters[col.handle]?.sort || "billigst"

        const filteredProducts = useMemo(() => {
          let filtered = [...allProducts]
          if (selectedSize !== "Alle") {
            filtered = filtered.filter((p: any) =>
              p.variants.edges.some((v: any) =>
                v.node.selectedOptions.some(
                  (o: any) =>
                    o.name.toLowerCase() === "størrelse" &&
                    o.value === selectedSize
                )
              )
            )
          }
          filtered.sort((a: any, b: any) => {
            const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
            const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
            switch (sortBy) {
              case "billigst":
                return priceA - priceB
              case "dyrest":
                return priceB - priceA
              case "navn":
                return a.title.localeCompare(b.title)
              default:
                return 0
            }
          })
          return filtered
        }, [allProducts, selectedSize, sortBy])

        return (
          <section key={col.id}>
            {/* Titel + filtre */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
              <h2 className="text-3xl font-bold text-brand-deep tracking-tight">
                {col.title}
              </h2>

              <div className="flex gap-3 mt-3 sm:mt-0">
                <select
                  value={selectedSize}
                  onChange={(e) => updateFilter(col.handle, "size", e.target.value)}
                  className="border-none bg-[#F7F5F2] text-gray-700 rounded-full px-4 py-2 text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-brand-deep focus:outline-none"
                >
                  {allSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => updateFilter(col.handle, "sort", e.target.value)}
                  className="border-none bg-[#F7F5F2] text-gray-700 rounded-full px-4 py-2 text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-brand-deep focus:outline-none"
                >
                  <option value="billigst">Billigst først</option>
                  <option value="dyrest">Dyrest først</option>
                  <option value="navn">Navn (A–Å)</option>
                </select>
              </div>
            </div>

            {/* Produkter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product: any) => {
                const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount)
                const oldPrice = parseFloat(
                  product.compareAtPriceRange?.maxVariantPrice?.amount || 0
                )
                const discount =
                  oldPrice > currentPrice
                    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
                    : 0

                const isMostExpensive =
                  mostExpensiveDyne && product.id === mostExpensiveDyne.id

                return (
                  <div key={product.id} className="relative group">
                    <a
                      href={`/products/${product.handle}`}
                      className="relative flex flex-col justify-between border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden pt-[1px]"
                    >
                      {/* Banneret følger kortet */}
                      {col.title.toLowerCase().includes("helårsdyner") && isMostExpensive && (
                        <div
                          className="absolute top-0 left-0 right-0 
                          bg-[#F7F5F2]/90 backdrop-blur-sm border-none outline-none
                          text-zinc-800 text-[13px] font-medium flex items-center justify-center 
                          gap-1.5 py-2 rounded-t-2xl z-20 transition-all duration-300 
                          group-hover:bg-[#F7F5F2]"
                        >
                          <Award size={15} strokeWidth={1.4} className="text-zinc-800" />
                          Kundernes fortrukne dyne
                        </div>
                      )}

                      <div className="overflow-hidden">
                        <img
                          src={product.featuredImage?.url}
                          alt={product.featuredImage?.altText || product.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2">
                          {product.title}
                        </h3>

                        <div className="mt-3">
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-semibold text-brand-deep">
                              {currentPrice.toFixed(2)}{" "}
                              {product.priceRange.minVariantPrice.currencyCode}
                            </p>

                            {discount > 0 && (
                              <span className="bg-[#F7F5F2] text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                                Spar {discount}%
                              </span>
                            )}
                          </div>

                          {discount > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                              {oldPrice.toFixed(2)}{" "}
                              {product.priceRange.minVariantPrice.currencyCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}