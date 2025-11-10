import {createClient} from '@sanity/client'

export const previewClient = createClient({
  projectId: '5yd58tvu',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // must be added to .env.local
  perspective: 'previewDrafts',
})
