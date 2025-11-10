// ✅ SERVER-KOMPONENT
import Topbar from "@/components/Topbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DynerPageClient from "../dyner/DynerPageClient" // Genbrug alt logikken og UI
import { shopifyFetch } from "@/lib/shopify"

export default async function PuderPage() {
  const { data } = await shopifyFetch(`
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  featuredImage { url altText }
                  priceRange { minVariantPrice { amount currencyCode } }
                  compareAtPriceRange { maxVariantPrice { amount currencyCode } }
                  variants(first: 10) {
                    edges {
                      node {
                        title
                        selectedOptions { name value }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  // 💡 Kun “Hovedpuder”-kollektionen
  const pudeCollections = data.collections.edges.filter(
    (col: any) => col.node.handle === "hovedpuder"
  )

  return (
    <main className="bg-white">
      <Topbar />
      <Header />
      <DynerPageClient collections={pudeCollections} />
      <Footer />
    </main>
  )
}