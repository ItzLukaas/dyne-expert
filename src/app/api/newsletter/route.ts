import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  try {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          mutation CreateCustomer($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                id
                email
                acceptsMarketing
              }
              customerUserErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            email,
            password: Math.random().toString(36).slice(2, 10), // tilfældigt password
            acceptsMarketing: true,
          },
        },
      }),
    })

    const data = await res.json()
    console.log("Shopify response:", data)

    if (data.data?.customerCreate?.customerUserErrors?.length) {
      console.error("Shopify user errors:", data.data.customerCreate.customerUserErrors)
      return NextResponse.json({ success: false }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Newsletter API error:", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}