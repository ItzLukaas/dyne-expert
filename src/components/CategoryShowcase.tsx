import Link from "next/link"
import Image from "next/image"

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Dyner",
      image: "https://raw.githubusercontent.com/ItzLukaas/dyne-expert/refs/heads/master/public/Dyner.webp", // Sørg for, at disse billeder ligger i public/
      link: "/collections/dyner",
    },
    {
      name: "Puder",
      image: "https://raw.githubusercontent.com/ItzLukaas/dyne-expert/refs/heads/master/public/Puder.webp", // Sørg for, at disse billeder ligger i public/
      link: "/collections/puder",
    },
    {
      name: "Sengetøj",
      image: "https://raw.githubusercontent.com/ItzLukaas/dyne-expert/refs/heads/master/public/Senget%C3%B8j.webp", // Sørg for, at disse billeder ligger i public/
      link: "/collections/sengetoj",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-brand-deep mb-10">Find din komfort</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.link}
            className="relative group rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src={cat.image} // Brug next/image her
              alt={cat.name}
              width={500} // Giv dimensioner til billedet
              height={340} // Giv dimensioner til billedet
              className="w-full h-[340px] object-cover transform group-hover:scale-105 transition duration-500"
            />

            {/* Let mørk overlay for dybde */}
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-500"></div>

            {/* Hvid tekst med let skygge */}
            <div className="absolute bottom-8 left-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-3px]">
              <h3 className="text-2xl font-bold tracking-wide text-white">{cat.name}</h3>
              <span className="text-sm border-b border-white/70 pb-[2px] opacity-90 hover:opacity-100">
                Shop her
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
