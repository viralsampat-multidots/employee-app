// lib/sanity-utils.ts
export function getSanityEditUrl(docType: string, docId: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'
    return `${baseUrl}/desk/${docType};${docId}`
  }
  