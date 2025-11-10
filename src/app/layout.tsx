import "./globals.css"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://dyne-expert.dk"),
  title: "Dyne Expert – Dyner, puder og sengetøj",
  description:
    "Dansk webshop med kvalitetsdyner, puder og sengetøj. Hurtig levering 1–3 hverdage og 30 dages retur.",
  openGraph: {
    title: "Dyne Expert – Dyner, puder og sengetøj",
    description:
      "Oplev drømmesøvnen med vores kvalitetsdyner og puder – designet til en bedre nattesøvn.",
    url: "https://dyne-expert.dk",
    siteName: "Dyne Expert",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/hero-dyne.png", // <-- dit lokale billede bruges her
        width: 1200,
        height: 630,
        alt: "Dyne Expert – Kvalitetsdyner & puder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dyne Expert – Dyner, puder og sengetøj",
    description:
      "Kvalitetsdyner og puder med hurtig levering – dansk webshop.",
    images: ["/hero-dyne.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body
        className={`${montserrat.className} bg-white text-gray-900 antialiased`}
        style={{ fontFamily: `${montserrat.style.fontFamily}, sans-serif` }}
      >
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  )
}