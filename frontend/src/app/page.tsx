import { getArtists, getFeaturedTattoos, getHomepageData } from '../../lib/queries'
import HomeClient from './HomeClient'

export default async function Home() {
    // Fetch data on the server - these will run in parallel
    // This ensures video URLs are in the initial HTML for immediate preloading
    const [artists, featuredTattoos, homepageData] = await Promise.all([
        getArtists(),
        getFeaturedTattoos(),
        getHomepageData()
    ])

    return (
        <HomeClient
            initialArtists={artists}
            initialFeaturedTattoos={featuredTattoos}
            initialHomepageData={homepageData}
        />
    )
}
