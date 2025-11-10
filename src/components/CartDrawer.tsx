"use client"

import { useEffect, useState, useCallback } from "react"
import { X, Trash2, Truck } from "lucide-react"
import Image from "next/image"
import { shopifyFetch } from "@/lib/shopify"

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [reached, setReached] = useState(false)
  const freeShippingLimit = 600

  async function fetchCart() {
    const cartId = localStorage.getItem("cartId")
    if (!cartId) return

    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount { amount currencyCode }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      images(first: 1) { edges { node { url altText } } }
                    }
                  }
                }
                cost { totalAmount { amount currencyCode } }
              }
            }
          }
        }
      }
    `
    setLoading(true)
    const { data } = await shopifyFetch(query, { id: cartId })
    setCart(data.cart)
    setLoading(false)
  }

  // Fjern produktlinje
  async function removeLine(lineId: string) {
    const cartId = localStorage.getItem("cartId")
    const mutation = `
      mutation removeLine($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { id totalQuantity }
        }
      }
    `
    await shopifyFetch(mutation, { cartId, lineIds: [lineId] })
    fetchCart() // Hent ny kurv
    window.dispatchEvent(new Event("cartUpdated")) // Notify kurv opdateret
  }

  // Ændr antal
  async function updateQuantity(lineId: string, newQty: number) {
    if (newQty < 1) return removeLine(lineId) // Hvis antallet er mindre end 1, fjern produktet

    const cartId = localStorage.getItem("cartId")
    const mutation = `
      mutation updateQty($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { id totalQuantity }
        }
      }
    `
    await shopifyFetch(mutation, {
      cartId,
      lines: [{ id: lineId, quantity: newQty }],
    })
    fetchCart() // Hent ny kurv
    window.dispatchEvent(new Event("cartUpdated")) // Notify kurv opdateret
  }

  useEffect(() => {
    if (open) fetchCart()
    const handleUpdate = () => fetchCart()
    const handleOpen = () => fetchCart()

    window.addEventListener("cartUpdated", handleUpdate)
    window.addEventListener("openCart", handleOpen)

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate)
      window.removeEventListener("openCart", handleOpen)
    }
  }, [open])

  // Progress beregning
  const total = cart?.cost?.totalAmount?.amount ? parseFloat(cart.cost.totalAmount.amount) : 0
  useEffect(() => {
    const percentage = Math.min((total / freeShippingLimit) * 100, 100)
    setProgress(percentage)
    setReached(total >= freeShippingLimit)
  }, [total])
  const remaining = Math.max(0, freeShippingLimit - total)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition">
      <div className="bg-white w-full sm:w-[400px] h-full shadow-2xl p-6 relative flex flex-col animate-slideIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-brand-deep mb-4">Din kurv</h2>

        {/* Gratis fragt progress bar */}
        <div className="mb-5 bg-[#F7F3EF] border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={18} className={reached ? "text-green-600" : "text-brand-deep"} />
            {reached ? (
              <p className="text-sm font-medium text-green-700">
                ✅ Du har opnået gratis fragt!
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                Du mangler <span className="font-semibold">{remaining.toFixed(0)} kr</span> for gratis fragt
              </p>
            )}
          </div>

          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-300 ease-out ${
                reached ? "bg-green-600" : "bg-brand-deep"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 kr</span>
            <span>600 kr</span>
          </div>
        </div>

        {/* Kurvindhold */}
        {loading ? (
          <p className="text-gray-500 text-sm">Henter kurv...</p>
        ) : !cart || cart.totalQuantity === 0 ? (
          <p className="text-gray-500 text-sm">Din kurv er tom 💤</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.lines.edges.map((line: any) => {
              const item = line.node
              const product = item.merchandise.product
              const image = product.images.edges[0]?.node?.url
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg transition"
                >
                  {image && (
                    <Image
                      src={image}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="rounded-md border object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{product.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border px-2 py-1 rounded-md text-xs hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border px-2 py-1 rounded-md text-xs hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold text-gray-700">
                      {parseFloat(item.cost.totalAmount.amount).toFixed(2)}{" "}
                      {item.cost.totalAmount.currencyCode}
                    </p>
                    <button onClick={() => removeLine(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Checkout-knap */}
        {cart && cart.totalQuantity > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">
                {parseFloat(cart.cost.totalAmount.amount).toFixed(2)} {cart.cost.totalAmount.currencyCode}
              </span>
            </div>

            <a
              href={cart.checkoutUrl}
              className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-200 shadow-md ${
                reached
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-brand-deep hover:opacity-90 text-white"
              }`}
            >
              Gå til betaling
            </a>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Gratis fragt ved køb over 600 DKK
            </p>
          </div>
        )}
      </div>
    </div>
  )
}