import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { useEffect, useState } from "react";
import { client } from '../../lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { Employee } from '@/lib/types/employee'
import { enableVisualEditing } from '@sanity/visual-editing'
import { getSanityEditUrl } from '../../lib/sanity-utils'
import EditInSanityButton from '../../components/EditInSanityButton'

enableVisualEditing()

const employeeDetailQuery = `*[_type == "employee" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  author->{ name },
  publishedAt,
  body
}`

interface Props {
  employee: Employee | null
}

export default function EmployeePage({ employee }: Props) {

  // Get published date in a readable format
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(new Date(employee?.publishedAt || '').toLocaleDateString());
  }, []);


  if (!employee) {
    return <div>Employee not found.</div>
  }

  const editUrl = getSanityEditUrl('employee', employee._id)

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 data-sanity-edit-target={`employee.${employee._id}.title`}>
          {employee.title}
        </h1>
      </div>

      {employee.author?.name && (
        <p data-sanity-edit-target={`employee.${employee._id}.author`}>
          By {employee.author.name}
        </p>
      )}

      {employee.publishedAt && (
        <p data-sanity-edit-target={`employee.${employee._id}.publishedAt`}>
          Published on {time}
        </p>
      )}

      <div data-sanity-edit-target={`employee.${employee._id}.body`}>
        <PortableText value={employee.body} />
        <EditInSanityButton id={employee._id} field="body" label="Edit Body" />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "employee"]{ slug }`
  const employees = await client.fetch(query)

  const paths = employees
    .filter((e: any) => e.slug?.current)
    .map((e: any) => ({
      params: { slug: e.slug.current },
    }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string
  const employee = await client.fetch(employeeDetailQuery, { slug })

  return {
    props: { employee: employee || null },
    revalidate: 60,
  }
}
