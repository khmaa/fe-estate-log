import enCommon from './locales/en/common.json';
import enRoutes from './locales/en/routes.json';
import enShowcase from './locales/en/showcase.json';
import enVisitLogs from './locales/en/visitLogs.json';
import koCommon from './locales/ko/common.json';
import koRoutes from './locales/ko/routes.json';
import koShowcase from './locales/ko/showcase.json';
import koVisitLogs from './locales/ko/visitLogs.json';

const enMessages = {
  ...enCommon,
  ...enRoutes,
  ...enShowcase,
  ...enVisitLogs,
};

const koMessages = {
  ...koCommon,
  ...koRoutes,
  ...koShowcase,
  ...koVisitLogs,
};

const resources = {
  en: {
    translation: enMessages,
  },
  ko: {
    translation: koMessages,
  },
} as const;

export { resources };
