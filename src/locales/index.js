export default {
  ru: {
    translation: {
      languages: {
        ru: 'Русский',
      },
      header: {
        title: 'RSS агрегатор',
        subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
      },
      form: {
        label: 'Ссылка RSS',
        placeholder: 'https://example.com/rss',
        example: 'Пример: https://lorem-rss.hexlet.app/feed',
        button: 'Добавить',
        feedback: {
          success: 'RSS успешно загружен',
        },
        errors: {
          required: 'Не должно быть пустым',
          invalid: 'Ссылка должна быть валидным URL',
          duplicate: 'RSS уже существует',
          network: 'Ошибка сети',
          invalidRss: 'Ресурс не содержит валидный RSS',
        },
      },
      posts: {
        title: 'Посты',
        view: 'Просмотр',
      },
      feeds: {
        title: 'Фиды',
      },
    },
  },
};
