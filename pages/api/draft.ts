import {setDraftMode} from 'next/headers'
import {redirect} from 'next/navigation'

// For Next.js Page Router, use res.setPreviewData()
export default function handler(req, res) {
  const {slug = ''} = req.query

  // Enable preview mode
  res.setPreviewData({})
  res.writeHead(307, {Location: `/${slug}`})
  res.end()
}
