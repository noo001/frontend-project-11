import axios from 'axios'

const loadRss = (url) => {
  console.log('=== LOAD RSS CALLED ===')
  console.log('url:', url)

  const proxyUrl = 'https://allorigins.hexlet.app/get'
  const params = new URLSearchParams({
    disableCache: true,
    url,
  })

  return axios.get(`${proxyUrl}?${params}`)
    .then((response) => {
      console.log('=== LOAD RSS RESPONSE ===')
      console.log('response status:', response.status)
      console.log('response data keys:', Object.keys(response.data))

      if (response.data?.contents) {
        console.log('contents preview:', response.data.contents.substring(0, 200))
        console.log('contents length:', response.data.contents.length)
        return response.data.contents
      }
      throw new Error('form.errors.invalidRss')
    })
    .catch((err) => {
      console.log('=== LOAD RSS ERROR ===')
      console.log('err:', err)
      throw err
    })
}

export default loadRss
