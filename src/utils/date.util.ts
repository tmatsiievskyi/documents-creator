export const toUTC = (date: Date): Date => {
  return new Date(date.toISOString());
};

export const timeUTC = (): Date => {
  return toUTC(new Date());
};

export const localDateFromUTC = (utcDate: string | Date) => {
  const date = new Date(utcDate);
  return date.toLocaleDateString();
};

export const formatUTCtoLocalDate = (
  utcDate: string | Date,
  locale: string = 'uk-UA',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
): string | null => {
  if (!utcDate) return null;
  const date = new Date(utcDate);

  if (isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatUTCtoLocalDateTime = (
  utcDate: string | Date,
  locale: string = 'uk-UA',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
) => {
  return formatUTCtoLocalDate(utcDate, locale, options);
};

export const formatRelativeTime = (utcDate: string | Date): string | null => {
  const date = new Date(utcDate);
  if (isNaN(date.getTime())) return null;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 7) return `${diffDay} days ago`;

  return formatUTCtoLocalDate(date);
};
