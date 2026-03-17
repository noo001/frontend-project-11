import loadRss from './loader.js'
import parseRss from './parser.js'

const updateFeed = (state, feed) => {
  loadRss(feed.url)
    .then((data) => {
      const { posts: newPosts } = parseRss(data, feed.url)

      const existingPostsUrls = state.posts
        .filter((post) => post.feedId === feed.id)
        .map((post) => post.link)

      const freshPosts = newPosts.filter((post) => !existingPostsUrls.includes(post.link))

      if (freshPosts.length > 0) {
        state.posts = [...freshPosts, ...state.posts]
      }
    })
    .catch((err) => {
      throw err
    })
    .finally(() => {
      setTimeout(() => updateFeed(state, feed), 5000)
    })
}

const updateFeeds = (state) => {
  state.feeds.forEach((feed) => {
    setTimeout(() => updateFeed(state, feed), 5000)
  })
}

export default updateFeeds
