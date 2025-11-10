"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function Cart({ cart, onClose }: { cart: any; onClose: () => void }) {
  const [progress, setProgress] = useState(0)
  const freeShippingLimit = 600

  // Beregn totalpris
  const total = cart?.lines?.reduce((sum: number, line: any) => {
    return sum + line.node.cost.totalAmount.amount * line.node.quantity
  }, 0) || 0

  useEffect(() => {
    const percentage = Math.min((total / freeShippingLimit) * 100, 100)
    setProgress(percentage)
  }, [total])

  const remaining = Math.max(0, freeShippingLimit - total)

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-[999] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Din kurv</h2>
        <button onClick={onClose}>
          <X size={20} className="text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Progress bar sektion */}
      <div className="px-6 py-4">
        {total >= freeShippingLimit ? (
          <p className="text-sm font-medium text-green-700 mb-2">
            ✅ Du har opnået gratis fragt!
          </p>
        ) : (
          <p className="text-sm text-gray-700 mb-2">
            Du mangler <span className="font-semibold">{remaining.toFixed(0)} kr</span> for gratis fragt
          </p>
        )}

        {/* Progress bar */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-500 ${
              total >= freeShippingLimit ? "bg-green-600" : "bg-brand-deep"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Markører */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 kr</span>
          <span>600 kr</span>
        </div>
      </div>

      {/* Produkter i kurven */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {cart?.lines?.length ? (
          cart.lines.map((line: any, i: number) => (
            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{line.node.merchandise.product.title}</p>
                <p className="text-xs text-gray-500">
                  {line.node.merchandise.title} – {line.node.quantity} stk
                </p>
              </div>
              <p className="text-sm text-gray-800">
                {(line.node.cost.totalAmount.amount * line.node.quantity).toFixed(2)}{" "}
                {line.node.cost.totalAmount.currencyCode}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">Din kurv er tom 💤</p>
        )}
      </div>

      {/* Total + checkout */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between mb-3">
          <span className="text-gray-700 font-medium">Total</span>
          <span className="text-gray-900 font-semibold">{total.toFixed(2)} DKK</span>
        </div>
        <button
          className="w-full bg-brand-deep text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-md"
          onClick={() => window.location.href = cart?.checkoutUrl}
        >
          Gå til betaling
        </button>
      </div>
    </div>
  )
}