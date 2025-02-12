export function clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

export function isNaN(val: unknown) {
  return Number.isNaN(val);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function cached(fn: Function): Function {
  const cache = Object.create(null);

  return function cachedFn(str: string): string {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
