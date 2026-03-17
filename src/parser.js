const parseRss = (data, feedUrl) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    const error = new Error()
    error.message = { key: 'form.errors.invalidRss' }
    throw error
  }

  const feed = {
    id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    url: feedUrl,
    title: doc.querySelector('channel > title')?.textContent || 'Без названия',
    description: doc.querySelector('channel > description')?.textContent || 'Без описания',
  }
  const items = doc.querySelectorAll('item')

  const posts = Array.from(items).map((item) => ({
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    feedId: feed.id,
    title: item.querySelector('title')?.textContent || 'Без названия',
    description: item.querySelector('description')?.textContent || 'Без описания',
    link: item.querySelector('link')?.textContent || '#',
    pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
  }))

  return { feed, posts }
}

export default parseRss
