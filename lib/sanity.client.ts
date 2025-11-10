import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '5yd58tvu',     // 🔹 replace with your actual Sanity project ID
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
})
