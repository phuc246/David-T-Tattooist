import { getTattooDesigns, getPageContent } from '../../../lib/queries'
import GalleryClient from './GalleryClient'

export const revalidate = 0;

export default async function GalleryPage() {
    // Fetch data on the server
    const [tattooData, galleryPageData] = await Promise.all([
        getTattooDesigns(),
        getPageContent('gallery')
    ])

    return (
        <GalleryClient
            initialProducts={tattooData}
            initialPageContent={galleryPageData}
        />
    )
}
