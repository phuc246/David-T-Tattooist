import { getArtists, getPageContent } from '../../../lib/queries'
import ArtistsClient from './ArtistsClient'

export const revalidate = 0;

export default async function ArtistsPage() {
  // Fetch data on the server
  const [artistsData, pageData] = await Promise.all([
    getArtists(),
    getPageContent('artists')
  ])

  return (
    <ArtistsClient
      initialArtists={artistsData}
      initialPageContent={pageData}
    />
  )
}
