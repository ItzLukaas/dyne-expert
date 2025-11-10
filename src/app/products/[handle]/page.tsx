import { shopifyFetch } from "@/lib/shopify"
import Image from "next/image"
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TrustPilotReviews from "@/components/TrustPilotReviews"
import ProductActions from "@/components/ProductActions"
import { Truck, CheckCircle, Package } from "lucide-react"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  // ✅ vi henter variants igen, så ProductActions kan lægge i kurv
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        totalInventory
        descriptionHtml
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          maxVariantPrice { amount currencyCode }
        }
        images(first: 5) {
          edges { node { url altText } }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 { amount currencyCode }
            }
          }
        }
      }
    }
  `

  const { data } = await shopifyFetch(query, { handle })
  const product = data?.productByHandle

  if (!product) {
    return (
      <main className="bg-white min-h-screen">
        <Topbar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-600">
          Produkt ikke fundet 😴
        </div>
        <Footer />
      </main>
    )
  }

  const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount)
  const oldPrice = parseFloat(product.compareAtPriceRange?.maxVariantPrice?.amount || "0")
  const discount =
    oldPrice > currentPrice
      ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
      : 0

  // ✅ Lagerbadge – farve og kort tekst
  const stock = product.totalInventory || 0
  let stockColor = ""
  let stockText = ""

  if (stock < 10) {
    stockColor = "bg-red-100 text-red-700 border-red-200"
    stockText = `Kun ${stock} stk. tilbage`
  } else if (stock < 20) {
    stockColor = "bg-amber-100 text-amber-800 border-amber-200"
    stockText = `${stock} stk. tilbage`
  } else {
    stockColor = "bg-green-100 text-green-800 border-green-200"
    stockText = `20+ stk. på lager`
  }

  const showStockBadge = stock > 0

  return (
    <main className="bg-white min-h-screen">
      {/* Sticky top */}
      <div className="sticky top-0 z-50 shadow-sm">
        <Topbar />
        <Header />
      </div>

      {/* Produktsektion */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Venstre: billeder */}
        <div className="space-y-4">
          {product.images.edges.map((img: any, i: number) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={img.node.url}
                alt={img.node.altText || product.title}
                width={900}
                height={900}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Højre: info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-brand-deep mb-4">
            {product.title}
          </h1>

          {/* Pris + badges */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <p className="text-3xl font-semibold text-gray-900">
              {currentPrice.toFixed(2)}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>

            {discount > 0 && (
              <>
                <p className="text-lg text-gray-500 line-through">
                  {oldPrice.toFixed(2)}{" "}
                  {product.priceRange.minVariantPrice.currencyCode}
                </p>
                <span className="bg-[#F7F3EF] text-gray-900 text-sm font-semibold px-2 py-1 rounded-md border border-gray-200">
                  Spar {discount}%
                </span>
              </>
            )}

            {showStockBadge && (
              <span
                className={`${stockColor} text-sm font-medium px-2 py-1 rounded-md border`}
              >
                {stockText}
              </span>
            )}
          </div>

          {/* 🟢 På lager badge */}
          <div className="flex items-center gap-2 bg-[#F7F3EF] border border-gray-200 rounded-lg px-4 py-3 mb-8 shadow-sm">
            <Package size={18} className="text-brand-deep" />
            <p className="text-sm font-medium text-gray-800">
              På lager – bestil nu, modtag snart 🚚
            </p>
          </div>

          {/* Beskrivelse */}
          <div
            className="prose prose-sm text-gray-700 mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Variant + Læg i kurv */}
          <ProductActions product={product} />

          {/* Info-linje */}
          <div className="mt-10 w-full bg-[#F7F3EF] text-gray-800 text-sm py-3 border border-gray-200 rounded-xl shadow-sm">
            <div className="max-w-3xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-4 text-center">
              {/* Dansk webshop */}
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <rect width="24" height="24" fill="#C60C30" />
                  <rect x="9" width="3" height="24" fill="#fff" />
                  <rect y="10" width="24" height="3" fill="#fff" />
                </svg>
                <span className="font-medium">Dansk webshop</span>
              </div>

              {/* Garanteret tilfredshed */}
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-brand-deep" />
                <span className="font-medium">Garanteret tilfredshed</span>
              </div>

              {/* Levering */}
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-brand-deep" />
                <span className="font-medium">Levering 2–3 hverdage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot */}
      <TrustPilotReviews />

      <Footer />
    </main>
  )
}