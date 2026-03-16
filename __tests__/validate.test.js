import * as yup from 'yup';
import validate from '../src/validate.js';

describe('validate', () => {
  beforeAll(() => {
    yup.setLocale({
      mixed: {
        required: () => ({ key: 'form.errors.required' }),
        notOneOf: () => ({ key: 'form.errors.duplicate' }),
      },
      string: {
        url: () => ({ key: 'form.errors.invalid' }),
      },
    });
  });

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
      expect(error.message.key).toBe('form.errors.required');
    });
  });

  test('should reject invalid url', () => {
    const url = 'not-a-url';
    return validate(url, feeds).catch((error) => {
      expect(error.message.key).toBe('form.errors.invalid');
    });
  });

  test('should reject duplicate url', () => {
    const url = 'https://existing-feed.com/rss';
    return validate(url, feeds).catch((error) => {
      expect(error.message.key).toBe('form.errors.duplicate');
    });
  });
});
