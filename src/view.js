import { subscribe } from 'valtio';

const renderForm = (state, elements) => {
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
      feedback.textContent = state.form.error;
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;

    case 'success':
      input.removeAttribute('readonly');
      button.removeAttribute('disabled');
      input.classList.remove('is-invalid');
      input.value = '';
      feedback.textContent = 'RSS успешно загружен';
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

const renderFeeds = (state, elements) => {
  // Пока просто заглушка, позже реализуем отображение фидов
  console.log('Feeds updated:', state.feeds);
};

const renderPosts = (state, elements) => {
  // Пока просто заглушка, позже реализуем отображение постов
  console.log('Posts updated:', state.posts);
};

export default (state, elements) => {
  const formState = subscribe(state, () => renderForm(state, elements));
  const feedsState = subscribe(state, () => renderFeeds(state, elements));
  const postsState = subscribe(state, () => renderPosts(state, elements));

  return state;
};
