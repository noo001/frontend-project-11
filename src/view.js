import { subscribe } from 'valtio'

const renderForm = (state, elements, i18n) => {
  const { input, button, feedback } = elements

  switch (state.form.state) {
    case 'sending':
      input.setAttribute('readonly', true)
      button.setAttribute('disabled', true)
      feedback.textContent = ''
      feedback.classList.remove('text-danger', 'text-success')
      break

    case 'error':
      input.removeAttribute('readonly')
      button.removeAttribute('disabled')
      input.classList.add('is-invalid')
      feedback.textContent = i18n.t(state.form.errorCode)
      feedback.classList.add('text-danger')
      feedback.classList.remove('text-success')
      break

    case 'success':
      input.removeAttribute('readonly')
      button.removeAttribute('disabled')
      input.classList.remove('is-invalid')
      input.value = ''
      feedback.textContent = i18n.t('form.feedback.success')
      feedback.classList.add('text-success')
      feedback.classList.remove('text-danger')
      break

    default:
      input.removeAttribute('readonly')
      button.removeAttribute('disabled')
      input.classList.remove('is-invalid')
      feedback.textContent = ''
      feedback.classList.remove('text-danger', 'text-success')
  }
}

const renderStaticTexts = (elements, i18n) => {
  const {
    headerTitle,
    headerSubtitle,
    formLabel,
    formPlaceholder,
    formExample,
    formButton,
    postsTitle,
    feedsTitle,
  } = elements

  headerTitle.textContent = i18n.t('header.title')
  headerSubtitle.textContent = i18n.t('header.subtitle')
  formLabel.textContent = i18n.t('form.label')
  formPlaceholder.placeholder = i18n.t('form.placeholder')
  formExample.textContent = i18n.t('form.example')
  formButton.textContent = i18n.t('form.button')
  postsTitle.textContent = i18n.t('posts.title')
  feedsTitle.textContent = i18n.t('feeds.title')
}

const renderFeeds = (feeds, elements) => {
  const { feedsList } = elements

  if (feeds.length === 0) {
    feedsList.innerHTML = ''
    return
  }

  const feedsHtml = feeds.map((feed) => `
    <li class="list-group-item">
      <h3 class="h6 mb-1">${feed.title}</h3>
      <p class="small text-muted mb-0">${feed.description}</p>
    </li>
  `).join('')

  feedsList.innerHTML = feedsHtml
}

const renderPosts = (posts, elements, state, i18n) => {
  const { postsList } = elements

  if (posts.length === 0) {
    postsList.innerHTML = ''
    return
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pubDate && b.pubDate) {
      return new Date(b.pubDate) - new Date(a.pubDate)
    }
    return 0
  })

  const postsHtml = sortedPosts.map((post) => {
    const isVisited = state.ui.visitedPosts.has(post.id)
    return `
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <a 
          href="${post.link}" 
          class="${isVisited ? 'fw-normal' : 'fw-bold'}" 
          target="_blank" 
          rel="noopener noreferrer"
          data-post-id="${post.id}"
          data-post-link
        >
          ${post.title}
        </a>
        <button 
          type="button" 
          class="btn btn-outline-primary btn-sm" 
          data-post-id="${post.id}"
          data-post-preview
          data-bs-toggle="modal" 
          data-bs-target="#postModal"
        >
          ${i18n.t('posts.view')}
        </button>
      </li>
    `
  }).join('')

  postsList.innerHTML = postsHtml

  postsList.querySelectorAll('[data-post-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const { postId } = link.dataset
      state.ui.visitedPosts.add(postId)

      const post = state.posts.find((p) => p.id === postId)
      if (post) {
        window.open(post.link, '_blank')
      }

      renderPosts(state.posts, elements, state, i18n)
    })
  })

  postsList.querySelectorAll('[data-post-preview]').forEach((button) => {
    button.addEventListener('click', () => {
      const { postId } = button.dataset
      const post = state.posts.find((p) => p.id === postId)

      if (post) {
        state.ui.visitedPosts.add(postId)

        elements.modalTitle.textContent = post.title
        elements.modalBody.textContent = post.description
        elements.modalLink.href = post.link

        renderPosts(state.posts, elements, state, i18n)
      }
    })
  })
}

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n)

  subscribe(state, () => renderForm(state, elements, i18n))
  subscribe(state.feeds, () => renderFeeds(state.feeds, elements))
  subscribe(state.posts, () => renderPosts(state.posts, elements, state, i18n))

  return state
}
