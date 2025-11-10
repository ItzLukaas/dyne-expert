import { Leaf, ShieldCheck, Moon } from "lucide-react"

export default function AllergyInfo() {
  return (
    <section className="bg-[#F7F3EF] pt-16 pb-14 mt-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep mb-8">
          Komfort, kvalitet og tryghed i hver eneste dyne
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-700">
          <div className="flex flex-col items-center">
            <Leaf size={32} className="text-brand-deep mb-3" />
            <h3 className="font-semibold text-lg mb-2">Allergivenlig</h3>
            <p className="text-[15px] leading-relaxed max-w-xs">
              Fremstillet uden allergifremkaldende stoffer,  
              og udviklet til et sundt sovemiljø.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck size={32} className="text-brand-deep mb-3" />
            <h3 className="font-semibold text-lg mb-2">OEKO-TEX certificeret</h3>
            <p className="text-[15px] leading-relaxed max-w-xs">
              Godkendt efter OEKO-TEX®-standarder,  
              for sikker og kemifri produktion.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Moon size={32} className="text-brand-deep mb-3" />
            <h3 className="font-semibold text-lg mb-2">Designet til god søvn</h3>
            <p className="text-[15px] leading-relaxed max-w-xs">
              Let og temperaturregulerende design,  
              der giver ro og masser af god komfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}