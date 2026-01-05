import { getBlogPosts, getPageContent } from '../../../lib/queries'
import BlogClient from './BlogClient'

export const revalidate = 0;

export default async function BlogPage() {
  // Fetch data on the server
  const [postsData, pageData] = await Promise.all([
    getBlogPosts(),
    getPageContent('blog')
  ])

  return (
    <BlogClient
      initialPosts={postsData}
      initialPageContent={pageData}
    />
  )
}
