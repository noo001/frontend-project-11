import loadRss from './loader.js'
import parseRss from './parser.js'

const updateFeed = (state, feed) => {
  loadRss(feed.url)
    .then((data) => {
      const { posts: newPosts } = parseRss(data, feed.url)

      const existingPostsUrls = state.posts
        .filter((post) => {
          return post.feedId === feed.id
        })
        .map((post) => {
          return post.link
        })

      const freshPosts = newPosts.filter((post) => {
        return !existingPostsUrls.includes(post.link)
      })

      if (freshPosts.length > 0) {
        state.posts = [...freshPosts, ...state.posts]
      }
    })
    .catch((err) => {
      console.error('Update error for feed', feed.url, err)
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
