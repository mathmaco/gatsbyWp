const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client')
const fetch = require('cross-fetch')
// Execute the query
exports.handler = async function (event) {
 const { queryStringParameters } = event
 const pageId = queryStringParameters?.pageId
 // Set up an HttpLink with fetch
 const httpLink = new HttpLink({
  uri: process.env.WPGRAPHQL_URL,
  fetch: fetch,
  headers: {
   Authorization: `Bearer ${process.env.PREVIEW_SECRET}`
  }
 })

 // Set up Apollo Client
 const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
 })

 // GraphQL query
 const query = gql`
        {
            page(idType: DATABASE_ID, id: ${pageId}) {
                databaseId
                title
                slug
                content
            }
        }
    `
 try {
  const response = await client.query({ query })
  return {
   statusCode: 200,
   body: JSON.stringify(response.data),
   headers: {
    'Content-Type': 'application/json'
   }
  }
 } catch (error) {
  return {
   statusCode: 500,
   body: JSON.stringify(error)
  }
 }
}
