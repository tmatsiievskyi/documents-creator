export const getNestedValue = <T extends object>(obj: T, path: string) => {
  if (!path || !obj) {
    return null;
  }
  const keys = path.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any = obj;

  for (const key of keys) {
    if (res === null || res === undefined || typeof res !== 'object') {
      return null;
    }

    res = res[key];
  }

  return res;
};
