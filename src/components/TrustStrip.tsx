// src/components/TrustStrip.tsx
export default function TrustStrip() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-center">
        <div><div className="text-2xl font-bold">4.8 ★</div><div className="text-gray-600">Trustpilot – Høj kundetilfredshed</div></div>
        <div><div className="text-2xl font-bold">1-2 dage</div><div className="text-gray-600">Hurtig levering i hele DK</div></div>
        <div><div className="text-2xl font-bold">E-mærket</div><div className="text-gray-600">Sikker handel</div></div>
      </div>
    </section>
  )
}