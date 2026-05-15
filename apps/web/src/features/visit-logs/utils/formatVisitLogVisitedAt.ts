const formatVisitLogVisitedAt = (visitedAt: string) => {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(visitedAt));
};

export { formatVisitLogVisitedAt };
