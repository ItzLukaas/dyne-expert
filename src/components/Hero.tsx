import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-[#F7F3EF] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Tekst */}
        <div className="text-center md:text-left relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight relative inline-block">
            Få en bedre søvn <br className="hidden sm:block" />
            med{" "}
            <span className="relative inline-block">
              {/* Paint baggrund */}
              <svg
                className="absolute left-0 bottom-0 w-full h-[1.6em] -z-10"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 60 Q50 30,100 55 T200 60 T300 50 T400 65 L400 100 L0 100 Z"
                  fill="#E2B891"
                  opacity="0.9"
                />
                <path
                  d="M0 70 Q70 45,150 65 T300 60 T400 70"
                  stroke="#d5a172"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>

              <span className="text-brand-deep relative">Dyne Expert</span>
            </span>
          </h1>

          <p className="mt-5 text-gray-700 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Vi sørger for, at du får en bedre søvn, når du vælger dyner eller puder fra os.
            Vi er en dansk butik og er altid her for at sikre din tilfredshed.
          </p>

          {/* Knapper */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* Primær knap – samme hover som “Udforsk kollektionen” */}
            <a
              href="/collections/dyner"
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-brand-deep text-white font-semibold transition-all duration-300 text-center shadow-md hover:shadow-lg"
            >
              <span className="relative z-10">Se dyner</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#e1c4a6] to-[#d5a77c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>

            {/* Sekundær knap */}
            <a
              href="/kollektion"
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-brand-accent text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Udforsk kollektionen
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#e1c4a6] to-[#d5a77c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>

        {/* Billede */}
        <div className="rounded-3xl overflow-hidden shadow-sm bg-white max-w-md mx-auto md:max-w-none">
          <img
            src="/vores-historie-2.webp"
            alt="Dyner og puder fra Dyne Expert"
            className="w-full h-[300px] sm:h-[400px] md:h-[440px] object-cover rounded-2xl md:rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}