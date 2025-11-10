import { Star } from "lucide-react"

type Product = {
  id: string
  title: string
  handle: string
  featuredImage?: { url: string; altText?: string | null }
  priceRange?: { minVariantPrice: { amount: string; currencyCode: string } }
  showPreferred?: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange?.minVariantPrice

  return (
    <a
      href={`/products/${product.handle}`}
      className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
    >
      {/* 🌿 Kundernes foretrukne dyne (fast og clean) */}
      {product.showPreferred && (
        <div className="absolute top-0 left-0 right-0 bg-[#F6F3EE] text-gray-800 text-[13px] font-medium flex items-center justify-center gap-1 py-1.5 rounded-t-2xl z-20">
          <Star size={15} strokeWidth={1.5} className="text-gray-700" />
          Kundernes foretrukne dyne
        </div>
      )}

      {/* Produktbillede */}
      <div className="overflow-hidden">
        <img
          src={product.featuredImage?.url || "/placeholder.jpg"}
          alt={product.featuredImage?.altText || product.title}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-semibold text-[17px] text-gray-900 group-hover:text-brand-deep transition-colors line-clamp-2">
          {product.title}
        </h3>

        <p className="text-[15px] font-semibold text-brand-deep">
          {price ? `${price.amount} ${price.currencyCode}` : "Pris ikke tilgængelig"}
        </p>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Star size={14} strokeWidth={1.5} className="text-gray-500" />
          4.8 / 5
        </div>
      </div>
    </a>
  )
}
