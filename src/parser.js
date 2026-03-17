const parseRss = (data, feedUrl) => {
  console.log('=== PARSE RSS CALLED ===')
  console.log('feedUrl:', feedUrl)
  console.log('data length:', data?.length)

  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    console.log('=== PARSE ERROR ===')
    console.log('parseError:', parseError.textContent)
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
  console.log('=== FEED PARSED ===')
  console.log('feed title:', feed.title)
  console.log('feed description:', feed.description)

  const items = doc.querySelectorAll('item')
  console.log('items count:', items.length)

  const posts = Array.from(items).map((item) => ({
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    feedId: feed.id,
    title: item.querySelector('title')?.textContent || 'Без названия',
    description: item.querySelector('description')?.textContent || 'Без описания',
    link: item.querySelector('link')?.textContent || '#',
    pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
  }))

  console.log('=== POSTS PARSED ===')
  console.log('first post title:', posts[0]?.title)

  return { feed, posts }
}

export default parseRss
