"use client"
import Image from "next/image"
import { Phone, Mail, Truck, RotateCcw, Heart } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value

    setStatus("idle")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <footer className="relative mt-20">
      {/* 🌊 Wave-effekt øverst */}
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[90px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66 92.83C906.67 74.76 823.27 52.44 743.53 52.54C673.91 52.63 606.41 71.27 537.3 84.87C466.5 98.86 390.75 106.86 321.39 92.83C255.05 79.55 191.46 51.52 123.2 41.56C82.46 35.64 41.5 37.75 0 47.92V120H1200V27.35C1115.45 61.9 1051.87 110.9 985.66 92.83Z"
            fill="#F7F5F2"
          ></path>
        </svg>
      </div>

      {/* 🧱 Footer-indhold */}
      <div className="bg-[#F7F5F2] text-[#2B2B2B] pt-28 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

          {/* 💤 Logo + kontaktinfo */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/logo-dyneexpert.png"
              alt="Dyne Expert Logo"
              width={140}
              height={60}
              className="mb-3"
            />
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-brand-deep" />
                kontakt@dyne-expert.dk
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Heart size={16} className="text-brand-deep" />
                Hyldevang 44, 7323 Give
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-brand-deep" />
                +45 41 82 00 46
              </li>
            </ul>

            {/* Sociale medier + OEKO-TEX logo */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start items-center">
              <a
                href="https://www.facebook.com/profile.php?id=61577542062333"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:opacity-80 transition flex items-center justify-center"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
              </a>
              <a
                href="https://www.oeko-tex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition"
              >
                <Image
                  src="/OEKO-TEX.png"
                  alt="OEKO-TEX Certificeret"
                  width={40}
                  height={30}
                  className="opacity-85 hover:opacity-100 transition"
                />
              </a>
            </div>
          </div>

          {/* 🛏 Produkter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Produkter</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="/collections/dyner" className="hover:text-brand-deep">Dyner</a></li>
              <li><a href="/collections/puder" className="hover:text-brand-deep">Puder</a></li>
              <li><a href="/collections/sengetoj" className="hover:text-brand-deep">Sengetøj</a></li>
              <li><a href="/kontakt" className="hover:text-brand-deep">Kontakt</a></li>
              <li><a href="/om-os" className="hover:text-brand-deep">Om os</a></li>
            </ul>
          </div>

          {/* 🚚 Fordele */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Vores løfter til dig</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Truck size={16} className="text-brand-deep" /> Levering 2–3 hverdage
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <RotateCcw size={16} className="text-brand-deep" /> 30 dages returret
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Heart size={16} className="text-brand-deep" /> Dansk webshop
              </li>
            </ul>
          </div>

          {/* 📰 Nyhedsbrev */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Tilmeld nyhedsbrevet</h3>
            <p className="hidden sm:block text-sm text-gray-700 mb-4 max-w-xs text-center md:text-left">
              Få nyheder, tilbud og søvntips direkte i din indbakke.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-xs"
            >
              <input
                type="email"
                name="email"
                placeholder="Indtast din e-mail"
                required
                className="flex-1 px-4 py-2 text-gray-800 outline-none w-full"
              />
              <button className="bg-[#64403E] text-white w-full sm:w-auto px-4 py-2 font-medium hover:bg-[#6C6061] transition">
                Tilmeld
              </button>
            </form>

            {status === "success" && (
              <p className="text-green-600 text-sm mt-2 font-medium">
                ✅ Du er tilmeldt!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                Der skete en fejl – prøv igen.
              </p>
            )}
          </div>
        </div>

        {/* Bundlinje med copyright + betalingslogoer + GLS */}
        <div className="border-t border-gray-200 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 px-[10%]">
          <p className="text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-brand-deep">Dyne Expert</span> — Sov bedre hver nat.
          </p>

          {/* 💳 Betalingslogoer + GLS */}
          <div className="flex items-center gap-3 md:gap-4">
            {[
              { src: "/Visa.png", alt: "Visa" },
              { src: "/Mastercard.png", alt: "Mastercard" },
              { src: "/Apple-Pay.png", alt: "Apple Pay" },
              { src: "/Google-Pay.png", alt: "Google Pay" },
              { src: "/GLS.png", alt: "GLS" },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="border border-gray-200 rounded-md bg-white w-[62px] h-[36px] flex items-center justify-center shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={50}
                  height={26}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
