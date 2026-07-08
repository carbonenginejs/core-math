export function toArray<T>(value: T | T[] | null | undefined): T[];

export function copyArrayLike<T extends { length: number }>(
  target: T,
  value: ArrayLike<unknown>,
): T;

export function fillArrayLike<T extends { length: number }>(
  target: T,
  value: number,
): T;
