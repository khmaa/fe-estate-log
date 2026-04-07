import enMessages from './locales/en/messages.json';
import koMessages from './locales/ko/messages.json';

const resources = {
  en: {
    translation: enMessages,
  },
  ko: {
    translation: koMessages,
  },
} as const;

export { resources };
