import { subscribe } from 'valtio';

const renderForm = (state, elements, i18n) => {
  const { form, input, button, feedback } = elements;

  switch (state.form.state) {
    case 'sending':
      input.setAttribute('readonly', true);
      button.setAttribute('disabled', true);
      feedback.textContent = '';
      feedback.classList.remove('text-danger', 'text-success');
      break;

    case 'error':
      input.removeAttribute('readonly');
      button.removeAttribute('disabled');
      input.classList.add('is-invalid');
      feedback.textContent = i18n.t(state.form.errorCode);
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;

    case 'success':
      input.removeAttribute('readonly');
      button.removeAttribute('disabled');
      input.classList.remove('is-invalid');
      input.value = '';
      feedback.textContent = i18n.t('form.feedback.success');
      feedback.classList.add('text-success');
      feedback.classList.remove('text-danger');
      break;

    default:
      input.removeAttribute('readonly');
      button.removeAttribute('disabled');
      input.classList.remove('is-invalid');
      feedback.textContent = '';
      feedback.classList.remove('text-danger', 'text-success');
  }
};

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
  } = elements;

  headerTitle.textContent = i18n.t('header.title');
  headerSubtitle.textContent = i18n.t('header.subtitle');
  formLabel.textContent = i18n.t('form.label');
  formPlaceholder.placeholder = i18n.t('form.placeholder');
  formExample.textContent = i18n.t('form.example');
  formButton.textContent = i18n.t('form.button');
  postsTitle.textContent = i18n.t('posts.title');
  feedsTitle.textContent = i18n.t('feeds.title');
};

const renderFeeds = (state, elements) => {
  console.log('Feeds updated:', state.feeds);
};

const renderPosts = (state, elements) => {
  console.log('Posts updated:', state.posts);
};

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n);

  const formState = subscribe(state, () => renderForm(state, elements, i18n));
  const feedsState = subscribe(state, () => renderFeeds(state, elements));
  const postsState = subscribe(state, () => renderPosts(state, elements));

  return state;
};
