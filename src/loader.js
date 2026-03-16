import axios from 'axios'

const loadRss = (url) => {
  const proxyUrl = 'https://allorigins.hexlet.app/get'
  const params = new URLSearchParams({
    disableCache: true,
    url,
  })

  return axios.get(`${proxyUrl}?${params}`)
    .then((response) => {
      if (response.data?.contents) {
        return response.data.contents
      }
      throw new Error('form.errors.invalidRss')
    })
}

export default loadRss
