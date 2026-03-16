import * as yup from 'yup';
import { proxy, subscribe } from 'valtio';
import watch from './view.js';
import validate from './validate.js';

export default () => {
  const elements = {
    form: document.querySelector('[data-form="rss"]'),
    input: document.querySelector('[data-input="url"]'),
    button: document.querySelector('[data-button="add"]'),
    feedback: document.querySelector('[data-feedback]'),
    postsContainer: document.querySelector('[data-posts-container]'),
    postsList: document.querySelector('[data-posts-list]'),
  };

  const initialState = {
    form: {
      state: 'filling', // filling, sending, success, error
      error: null,
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

  const watchedState = watch(state, elements);

  yup.setLocale({
    mixed: {
      required: 'Не должно быть пустым',
      notOneOf: 'RSS уже существует',
    },
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    watchedState.form.state = 'sending';
    watchedState.form.data.url = url;

    validate(url, watchedState.feeds)
      .then(() => {
        watchedState.form.state = 'success';
        watchedState.form.error = null;
        watchedState.form.data.url = '';
        elements.form.reset();
        elements.input.focus();
      })
      .catch((err) => {
        watchedState.form.state = 'error';
        watchedState.form.error = err.message;
      });
  });
};
