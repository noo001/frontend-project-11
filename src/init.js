import * as yup from 'yup';
import { proxy } from 'valtio';
import i18next from 'i18next';
import watch from './view.js';
import validate from './validate.js';
import resources from './locales/index.js';
import loadRss from './loader.js';
import parseRss from './parser.js';
import updateFeeds from './updater.js';

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  });

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
  };

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
  };

  const state = proxy(initialState);

  yup.setLocale({
    mixed: {
      required: () => ({ key: 'form.errors.required' }),
      notOneOf: () => ({ key: 'form.errors.duplicate' }),
    },
    string: {
      url: () => ({ key: 'form.errors.invalid' }),
    },
  });

  const watchedState = watch(state, elements, i18nInstance);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    watchedState.form.state = 'sending';
    watchedState.form.errorCode = null;
    watchedState.form.data.url = url;

    validate(url, watchedState.feeds)
      .then(() => loadRss(url))
      .then((data) => {
        const { feed, posts } = parseRss(data, url);

        watchedState.feeds = [feed, ...watchedState.feeds];
        watchedState.posts = [...posts, ...watchedState.posts];
        watchedState.form.state = 'success';
        watchedState.form.errorCode = null;
        watchedState.form.data.url = '';
        elements.form.reset();
        elements.input.focus();
      })
      .catch((err) => {
        let errorCode;
        if (err.isAxiosError) {
          errorCode = 'form.errors.network';
        } else if (err.message && err.message.key) {
          errorCode = err.message.key;
        } else {
          errorCode = 'form.errors.invalidRss';
        }

        watchedState.form.state = 'error';
        watchedState.form.errorCode = errorCode;
      });
  });

  updateFeeds(watchedState);
};
