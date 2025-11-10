"use client"

import { useEffect, useState } from "react"

export default function ContinueCartModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // se om der findes en tidligere kurv
    const previousCart = localStorage.getItem("cartId")
    if (previousCart) {
      // men vis kun prompt hvis brugeren ikke allerede har lavet en ny kurv
      const hasSeenPrompt = sessionStorage.getItem("continuePromptSeen")
      if (!hasSeenPrompt) {
        setTimeout(() => setShow(true), 800) // lille delay for smooth effekt
      }
    }
  }, [])

  function handleContinue() {
    sessionStorage.setItem("continuePromptSeen", "true")
    window.dispatchEvent(new Event("openCart")) // åbner din CartDrawer
    setShow(false)
  }

  function handleDismiss() {
    sessionStorage.setItem("continuePromptSeen", "true")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-fadeIn">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vil du fortsætte, hvor du slap? 💤</h3>
        <p className="text-sm text-gray-600 mb-5">
          Vi har gemt din tidligere kurv – du kan åbne den igen og fortsætte dit køb.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleContinue}
            className="bg-brand-deep text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Ja, fortsæt
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Nej tak
          </button>
        </div>
      </div>
    </div>
  )
}