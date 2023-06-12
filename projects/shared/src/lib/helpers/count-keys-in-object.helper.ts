export function countKeysInObject<T>(obj: { [key: string]: T } | undefined): number {
  return obj ? Object.keys(obj).length : 0;
}
