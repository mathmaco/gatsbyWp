// expose query and headers in order to provide the correct request context
const Preview = ({ serverData }) => (
 <>
  {serverData?.content && (
   <div>
    <h1>
     <span dangerouslySetInnerHTML={{ __html: serverData?.title }} />
    </h1>
    <div dangerouslySetInnerHTML={{ __html: serverData?.content }}
    />
   </div>
  )}
 </>
)

export default Preview
export async function getServerData({ query }) {
 // get the page/post ID from the url
 // preview page URL will look like this: https://mysite/preview?p=789&&page_id=13&preview=true...

 const pageId = query.p || query.preview_id
 const res = await fetch(
  `https://mysite/.netlify/functions/preview?pageId=${pageId}`
 )
 const result = await res.json()
 return {
  props: result
 }
}
