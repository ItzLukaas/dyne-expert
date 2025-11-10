import { Truck, CheckCircle, Star } from "lucide-react"

export default function Topbar() {
  return (
    <div className="w-full bg-[#F7F3EF] text-gray-800 text-sm py-2 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-3 text-center">

        {/* 🇩🇰 Dansk webshop */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <rect width="24" height="24" fill="#C60C30" />
            <rect x="9" width="3" height="24" fill="#fff" />
            <rect y="10" width="24" height="3" fill="#fff" />
          </svg>
          <span className="font-medium">Dansk webshop</span>
        </div>

        {/* ✅ Garanteret tilfredshed */}
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-brand-deep" />
          <span className="font-medium">Garanteret tilfredshed</span>
        </div>

        {/* 🚚 Levering 2–3 hverdage */}
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-brand-deep" />
          <span className="font-medium">Levering 2–3 hverdage</span>
        </div>

        {/* ⭐ Trustpilot (klikbar) */}
        <a
          href="https://dk.trustpilot.com/review/dyne-expert.dk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium text-gray-800 hover:text-brand-deep transition"
        >
          {[...Array(4)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill="currentColor"
              className="text-brand-deep"
            />
          ))}
          <span className="ml-1">4 stjerner på Trustpilot</span>
        </a>

      </div>
    </div>
  )
}