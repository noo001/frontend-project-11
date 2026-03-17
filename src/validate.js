import * as yup from 'yup'

export default (url, feeds) => {
  const urls = feeds.map((feed) => {
    return feed.url
  })

  const schema = yup.string().required().url().notOneOf(urls)

  return schema.validate(url)
}
