const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

export async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  const json = await res.json()

  if (json.errors) {
    console.error("⚠️ Shopify GraphQL-fejl:", json.errors)
  }

  return json
}

// --- CUSTOMER LOGIN ---
export async function shopifyLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { message }
      }
    }
  `
  return shopifyFetch(query, { input: { email, password } })
}

// --- REGISTER ---
export async function shopifyRegister(email: string, password: string, firstName: string, lastName: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors { message }
      }
    }
  `
  return shopifyFetch(query, { input: { email, password, firstName, lastName } })
}

// --- GET CUSTOMER DATA ---
export async function shopifyGetCustomer(accessToken: string) {
  const query = `
    query getCustomer($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        firstName
        lastName
        email
        orders(first: 10) {
          edges {
            node {
              id
              name
              totalPrice { amount currencyCode }
              processedAt
              fulfillmentStatus
            }
          }
        }
      }
    }
  `
  return shopifyFetch(query, { accessToken })
}