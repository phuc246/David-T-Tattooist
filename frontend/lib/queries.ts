import { gql } from 'graphql-request'
import hygraphClient from './hygraph'

// ============================================
// ARTISTS QUERIES
// ============================================

const GET_ARTISTS = gql`
  query GetArtists {
    artists(where: { published: true }, orderBy: order_ASC) {
      id
      name
      role
      specialty
      experience
      description {
        html
      }
      image {
        url
      }
      instagram
      portfolio {
        url
      }
      achievements
      email
    }
  }
`

export async function getArtists() {
  try {
    const data: any = await hygraphClient.request(GET_ARTISTS)
    return data.artists || []
  } catch (error) {
    console.error('Error fetching artists:', error)
    return []
  }
}

// ============================================
// TATTOO DESIGNS (GALLERY) QUERIES
// ============================================

const GET_ALL_TATTOO_DESIGNS = gql`
  query GetAllTattooDesigns {
    tattooDesigns(
      where: { published: true }
      orderBy: createdAt_DESC
    ) {
      id
      name
      description
      type
      style
      image {
        url
      }
      images {
        url
      }
      artist {
        name
      }
    }
  }
`

const GET_TATTOO_DESIGNS_BY_TYPE = gql`
  query GetTattooDesignsByType($type: String!) {
    tattooDesigns(
      where: { published: true, type: $type }
      orderBy: createdAt_DESC
    ) {
      id
      name
      description
      type
      style
      image {
        url
      }
      images {
        url
      }
      artist {
        name
      }
    }
  }
`

const GET_FEATURED_TATTOOS = gql`
  query GetFeaturedTattoos {
    tattooDesigns(
      where: { published: true, featured: true }
      orderBy: order_ASC
      first: 8
    ) {
      id
      name
      type
      style
      image {
        url
      }
    }
  }
`

export async function getTattooDesigns(type?: string) {
  try {
    let data: any
    if (type) {
      // Fetch designs filtered by type
      data = await hygraphClient.request(GET_TATTOO_DESIGNS_BY_TYPE, { type })
    } else {
      // Fetch all designs
      data = await hygraphClient.request(GET_ALL_TATTOO_DESIGNS)
    }
    return data.tattooDesigns || []
  } catch (error) {
    console.error('Error fetching tattoo designs:', error)
    return []
  }
}

export async function getFeaturedTattoos() {
  try {
    const data: any = await hygraphClient.request(GET_FEATURED_TATTOOS)
    return data.tattooDesigns || []
  } catch (error) {
    console.error('Error fetching featured tattoos:', error)
    return []
  }
}

// ============================================
// COURSES QUERIES
// ============================================

const GET_COURSES = gql`
  query GetCourses {
    courses(where: { published: true }, orderBy: order_ASC) {
      id
      title
      duration
      description {
        html
      }
      features
      level
      image {
        url
        mimeType
      }
      videoUrl
    }
  }
`

export async function getCourses() {
  try {
    const data: any = await hygraphClient.request(GET_COURSES)
    return data.courses || []
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

// ============================================
// BLOG POSTS QUERIES
// ============================================

const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    blogPosts(where: { published: true }, orderBy: publicationDate_DESC) {
      id
      title
      slug
      excerpt
      content {
        html
      }
      image {
        url
      }
      tags
      artist {
        name
        instagram
      }
      publicationDate
      publishedAt
    }
  }
`

export async function getBlogPosts() {
  try {
    const data: any = await hygraphClient.request(GET_BLOG_POSTS)
    return data.blogPosts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// ============================================
// HOMEPAGE QUERIES
// ============================================

const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    homepages(first: 1) {
      heroVideo {
        url
      }
      welcomeImage {
        url
      }
      bookingVideo {
        url
      }
    }
  }
`

export async function getHomepageData() {
  try {
    const data: any = await hygraphClient.request(GET_HOMEPAGE_DATA)
    return data.homepages[0] || null
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

// ============================================
// PAGE CONTENT QUERIES
// ============================================

const GET_PAGE_CONTENT = gql`
  query GetPageContent($slug: String!) {
    page(where: { slug: $slug }) {
      heroImage {
        url
      }
      heroVideo {
        url
      }
      galleryMarqueeImages {
        url
      }
      bwStyleVideo {
        url
      }
      bwStyleImage {
        url
      }
      colorStyleVideo {
        url
      }
      colorStyleImage {
        url
      }
      studentWorkImages {
        url
      }
    }
  }
`

export async function getPageContent(slug: string) {
  try {
    const query = GET_PAGE_CONTENT
    const variables = { slug }
    const data: any = await hygraphClient.request(query, variables)
    return data.page || null
  } catch (error) {
    console.error(`Error fetching page content for slug "${slug}":`, error)
    return null
  }
}
