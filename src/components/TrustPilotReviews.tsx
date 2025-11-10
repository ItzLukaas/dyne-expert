import Image from "next/image"

export default function TrustPilotReviews() {
  const reviews = [
    {
      id: 1,
      name: "Claus Knudsen",
      stars: 5,
      review: "Super god service. God kvalitet til billige penge",
      date: "Dec 5, 2024",
      verified: true, // True for verificeret anmeldelse
    },
    {
      id: 2,
      name: "Anette Nielsen",
      stars: 5,
      review: "Overskuelig hjemmeside. Jeg modtog mine dejlige puder og dyner allerede dagen efter bestillingen. Vil helt klart anbefale til andre",
      date: "Dec 4, 2024",
      verified: true, // True for verificeret anmeldelse
    },
    {
      id: 3,
      name: "Casper Daae Odén",
      stars: 5,
      review: "God kvalitet til billige priser",
      date: "Dec 5, 2024",
      verified: true, // True for verificeret anmeldelse
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-brand-deep mb-6">Hvad vores kunder siger</h2>
      {/* Grid Layout med 3 kolonner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {/* Kunde information + stjerner */}
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold text-gray-900">{review.name}</span>
              <div className="flex ml-2">
                <Image
                  src="/stars-5-1.svg" // Brug 5-stjernes billede
                  alt="Trustpilot stars"
                  width={90}
                  height={18}
                />
              </div>
            </div>

            {/* Anmeldelsestekst */}
            <p className="text-sm text-gray-600">{review.review}</p>

            {/* Dato + Verificeret Badge */}
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <span>{review.date}</span>
              {review.verified && (
                <a
                  href="https://www.trustpilot.com/review/dyne-expert.dk" // Link til TrustPilot anmeldelsen
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  | Verificeret anmeldelse
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}