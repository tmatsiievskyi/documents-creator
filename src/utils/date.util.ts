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
