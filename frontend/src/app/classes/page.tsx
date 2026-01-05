import { getCourses, getPageContent } from '../../../lib/queries'
import ClassesClient from './ClassesClient'

export const revalidate = 0;

export default async function ClassesPage() {
    // Fetch data on the server
    const [coursesData, classesPageData] = await Promise.all([
        getCourses(),
        getPageContent('classes')
    ])

    return (
        <ClassesClient
            initialCourses={coursesData}
            initialPageContent={classesPageData}
        />
    )
}
