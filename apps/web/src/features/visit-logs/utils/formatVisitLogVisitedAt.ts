const formatVisitLogVisitedAt = (
  visitedAt: string,
  language: string | undefined,
) => {
  const locale = language === 'ko' ? 'ko-KR' : 'en-CA';

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(visitedAt));
};

export { formatVisitLogVisitedAt };
