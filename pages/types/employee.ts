// types/employee.ts
export interface Employee {
  _id: string
  title: string
  slug: { current: string }
  author?: {
    name: string
  }
  publishedAt?: string
  body?: any
}
