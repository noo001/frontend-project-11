import validate from '../src/validate.js';

describe('validate', () => {
  const feeds = [
    { url: 'https://existing-feed.com/rss' },
    { url: 'https://another-feed.com/feed' },
  ];

  test('should validate correct url', () => {
    const url = 'https://lorem-rss.hexlet.app/feed';
    return validate(url, feeds).then((result) => {
      expect(result).toBe(url);
    });
  });

  test('should reject empty string', () => {
    const url = '';
    return validate(url, feeds).catch((error) => {
      expect(error.message).toBe('Не должно быть пустым');
    });
  });

  test('should reject invalid url', () => {
    const url = 'not-a-url';
    return validate(url, feeds).catch((error) => {
      expect(error.message).toBe('Ссылка должна быть валидным URL');
    });
  });

  test('should reject duplicate url', () => {
    const url = 'https://existing-feed.com/rss';
    return validate(url, feeds).catch((error) => {
      expect(error.message).toBe('RSS уже существует');
    });
  });
});
