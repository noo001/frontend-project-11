import * as yup from 'yup'
import { proxy } from 'valtio'
import i18next from 'i18next'
import watch, {renderFeeds, renderPosts} from './view.js'
import validate from './validate.js'
import resources from './locales/index.js'
import loadRss from './loader.js'
import parseRss from './parser.js'
import updateFeeds from './updater.js'

export default () => {
  const i18nInstance = i18next.createInstance()
  i18nInstance.init({
    lng: 'ru',
    resources,
  })

  const elements = {
    form: document.querySelector('[data-form="rss"]'),
    input: document.querySelector('[data-input="url"]'),
    button: document.querySelector('[data-button="add"]'),
    feedback: document.querySelector('[data-feedback]'),
    feedsList: document.querySelector('[data-feeds-list]'),
    postsList: document.querySelector('[data-posts-list]'),
    headerTitle: document.querySelector('[data-header-title]'),
    headerSubtitle: document.querySelector('[data-header-subtitle]'),
    formLabel: document.querySelector('[data-form-label]'),
    formPlaceholder: document.querySelector('[data-form-placeholder]'),
    formExample: document.querySelector('[data-form-example]'),
    formButton: document.querySelector('[data-form-button]'),
    postsTitle: document.querySelector('[data-posts-title]'),
    feedsTitle: document.querySelector('[data-feeds-title]'),
    modal: document.getElementById('postModal'),
    modalTitle: document.getElementById('postModalLabel'),
    modalBody: document.querySelector('[data-modal-body]'),
    modalLink: document.querySelector('[data-modal-link]'),
    modalClose: document.querySelector('[data-modal-close]'),
  }

  const initialState = {
    form: {
      state: 'filling',
      errorCode: null,
      data: {
        url: '',
      },
    },
    feeds: [],
    posts: [],
    ui: {
      visitedPosts: new Set(),
    },
  }

  const state = proxy(initialState)

  yup.setLocale({
    mixed: {
      required: () => ({ key: 'form.errors.required' }),
      notOneOf: () => ({ key: 'form.errors.duplicate' }),
    },
    string: {
      url: () => ({ key: 'form.errors.invalid' }),
    },
  })

  const watchedState = watch(state, elements, i18nInstance)

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('=== FORM SUBMITTED ===')

    const formData = new FormData(e.target)
    const url = formData.get('url')
    console.log('url:', url)

    watchedState.form.state = 'sending'
    watchedState.form.errorCode = null
    watchedState.form.data.url = url

    validate(url, watchedState.feeds)
      .then(() => loadRss(url))
      .then((data) => {
        const { feed, posts } = parseRss(data, url)

        watchedState.feeds = [feed, ...watchedState.feeds]
        watchedState.posts = [...posts, ...watchedState.posts]
        watchedState.form.state = 'success'
        watchedState.form.errorCode = null
        watchedState.form.data.url = ''
        elements.form.reset()
        elements.input.focus()

        renderPosts(watchedState.posts, elements, watchedState, i18nInstance)
        renderFeeds(watchedState.feeds, elements)

        console.log('=== POSTS UPDATED ===')
        console.log('new posts count:', watchedState.posts.length)
        console.log('new posts:', watchedState.posts)
      })
      .catch((err) => {
        console.log('=== ERROR CATCH ===')
        console.log('err:', err)
        console.log('err.isAxiosError:', err.isAxiosError)
        console.log('err.message:', err.message)
        console.log('err.message.key:', err.message?.key)

        let errorCode
        if (err.isAxiosError) {
          errorCode = 'form.errors.network'
        } else if (err.message && err.message.key) {
          errorCode = err.message.key
        } else {
          errorCode = 'form.errors.invalidRss'
        }

        console.log('errorCode:', errorCode)

        watchedState.form.state = 'error'
        watchedState.form.errorCode = errorCode
      })
  })

  updateFeeds(watchedState)
}
