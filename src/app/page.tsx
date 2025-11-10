import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import CategoryShowcase from "@/components/CategoryShowcase"
import Footer from "@/components/Footer"
import TrustPilotReviews from "@/components/TrustPilotReviews"
import AllergyInfo from "@/components/AllergyInfo"
import { shopifyFetch } from "@/lib/shopify"

export default async function Page() {
  const { data } = await shopifyFetch(`
    {
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `)

  const products = data?.products?.edges?.map((e: any) => e.node) ?? []

  return (
    <main className="bg-white">
      {/* Sticky Topbar + Header */}
      <div className="sticky top-0 z-50 shadow-sm">
        <Topbar />
        <Header />
      </div>

      {/* Hero */}
      <Hero />

      {/* === Find din komfort === */}
      <CategoryShowcase />

      {/* === Udvalgte produkter === */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h2 className="text-fluid-xl font-bold text-brand-deep text-center sm:text-left">
            Udvalgte produkter
          </h2>
          <a
            href="/collections/dyner"
            className="text-sm underline text-gray-600 hover:text-brand-deep text-center sm:text-right"
          >
            Se alle
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* === Kvalitetssektion (Allergivenlig info) === */}
      <AllergyInfo />

      {/* === TrustPilot Reviews === */}
      {/* Lidt luft over, men stadig tæt og visuelt balanceret */}
      <div className="mt-8 md:mt-12">
        <TrustPilotReviews />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}