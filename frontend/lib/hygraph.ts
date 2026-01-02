import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || 'https://us-west-2.cdn.hygraph.com/content/cmi4jm2tg04t307wejissatkg/master'

export const hygraphClient = new GraphQLClient(endpoint, {
    headers: {
        // Add authorization if needed for preview content
    },
})

export default hygraphClient
