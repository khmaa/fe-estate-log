import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './i18n/resources';

const storageKey = 'fe-estate-log-language';

type LanguageRuntime = {
  localStorage?: Pick<Storage, 'getItem' | 'setItem'>;
  navigator?: Pick<Navigator, 'language'>;
};

const detectLanguage = (runtime?: LanguageRuntime) => {
  const localStorage =
    runtime?.localStorage ??
    (typeof window !== 'undefined' ? window.localStorage : undefined);
  const navigator =
    runtime?.navigator ??
    (typeof window !== 'undefined' ? window.navigator : undefined);

  if (!localStorage || !navigator) {
    return 'en';
  }

  const storedLanguage = localStorage.getItem(storageKey);

  if (storedLanguage === 'en' || storedLanguage === 'ko') {
    return storedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase();

  if (browserLanguage.startsWith('ko')) {
    return 'ko';
  }

  return 'en';
};

const persistLanguage = (
  language: string,
  localStorage?: Pick<Storage, 'setItem'>,
) => {
  const targetStorage =
    localStorage ??
    (typeof window !== 'undefined' ? window.localStorage : undefined);

  if (!targetStorage) {
    return;
  }

  targetStorage.setItem(storageKey, language);
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.on('languageChanged', (language) => {
    persistLanguage(language);
  });
}

export { detectLanguage, i18n, persistLanguage };
