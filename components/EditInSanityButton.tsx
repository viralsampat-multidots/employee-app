import React from "react"

interface Props {
  id: string
  field?: string
  label?: string
}

export default function EditInSanityButton({ id, field, label }: Props) {
  const studioBaseUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333"

  // This is the target URL for the Sanity studio
  const target = `${studioBaseUrl}/desk/employee;${id}`

  // If a field is specified, append it to the target URL
  const editUrl = field ? `${target}?field=${field}` : target

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        backgroundColor: "#0070f3",
        color: "white",
        padding: "6px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "14px",
        marginTop: "14px",
      }}
    >
      ✏️ {label || "Edit in Sanity"}
    </a>
  )
}
