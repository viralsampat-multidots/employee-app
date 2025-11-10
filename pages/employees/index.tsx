import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity.client'
import { Employee } from '@/lib/types/employee'

const employeeQuery = `*[_type == "employee"]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  author->{
    name
  },
  publishedAt
} | order(publishedAt desc)`

interface Props {
  employees: Employee[]
}

export default function Employees({ employees }: Props) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Employee Listing</h1>
      <ul
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {employees.map((emp) => (
          <li
            key={emp._id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h2>{emp.title}</h2>
            <p>By: {emp.author?.name}</p>
            <p>{emp.publishedAt?.toString()}</p>
            <Link href={`/employees/${emp.slug.current}`} style={{ color: 'blue' }}>
              View Employee Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const employees = await client.fetch(employeeQuery)
  return {
    props: { employees },
  }
}
