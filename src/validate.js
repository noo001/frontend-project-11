import * as yup from 'yup'

export default (url, feeds) => {
  console.log('=== VALIDATE CALLED ===')
  console.log('url:', url)
  console.log('feeds:', feeds)

  const urls = feeds.map((feed) => feed.url)
  console.log('existing urls:', urls)

  const schema = yup.string().required().url().notOneOf(urls)

  return schema.validate(url)
    .then((result) => {
      console.log('validation success:', result)
      return result
    })
    .catch((err) => {
      console.log('validation error:', err)
      throw err
    })
}
