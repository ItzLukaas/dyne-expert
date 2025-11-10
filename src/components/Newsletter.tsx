// src/components/Newsletter.tsx
export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14 text-center bg-white">
      <h3 className="text-2xl font-bold">Få gode tilbud & senge-tips</h3>
      <p className="text-gray-600 mt-2">Tilmeld dig nyhedsbrevet – ingen spam, kun kvalitet.</p>
      <form className="mt-6 flex max-w-md mx-auto gap-2">
        <input type="email" required placeholder="Din e-mail"
               className="flex-1 rounded-full border bg-gray-50 px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-black" />
        <button className="rounded-full bg-black text-white px-6">Tilmeld</button>
      </form>
    </section>
  )
}