export const generateSeed = (): number => {
  return Math.round((Math.random() * 2 - 1) * Math.pow(2, 32));
}

export const Compare = <T extends Date | number | string>(a: T, b: T): number => {
  return a < b ? -1 : a > b ? 1 : 0;
};
export const rangeSign = <T extends Date | number | string>(
  which: T,
  min?: T | null,
  max?: T | null,
  strict?: boolean
): number => {
  let isOutMin = false;
  let isOutMax = false;
  if (min) {
    isOutMin = strict ? Compare(which, min) < 1 : Compare(which, min) === -1;
  }
  if (max) {
    isOutMax = strict ? Compare(which, max) > -1 : Compare(which, max) === 1;
  }
  return !(isOutMin || isOutMax) ? 0 : isOutMin ? -1 : isOutMax ? 1 : 0;
};
export const setInRange = (value: number, min?: number, max?: number): number => {
  if (typeof min !== 'undefined' && value < min) {
    return min;
  }
  if (typeof max !== 'undefined' && value > max) {
    return max;
  }
  return value;
};
export const LoopInRange = (value: number, min: number, max: number): number => {
  if (value < min) {
    return max;
  }
  if (value > max) {
    return min;
  }
  return value;
};

export const Increment = (
  value: number,
  n: number,
  min?: number,
  max?: number,
  loop?: boolean
): number => {
  const result = value + n;
  if (loop && typeof max === 'number' && typeof min === 'number') {
    return LoopInRange(result, min, max);
  }
  if (typeof min === 'number' && result < min) {
    return min;
  }
  if (typeof max === 'number' && result > max) {
    return max;
  }
  return result;
};
export const Round = (n: number, precision: number): number => {
  return Math.round(n * precision) / precision;
};
export const Pad = (n: number, width: number, insert: string = '0'): string => {
  const str = n.toString(10);
  return str.length >= width ? str : new Array(width - str.length + 1).join(insert) + str;
};
