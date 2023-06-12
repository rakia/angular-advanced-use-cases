export function snakeCaseToCamelCase(str: string): string {
  if (!str.includes('_@')) {
    return str
      .split('_')
      .reduce(
        (res, word, i) =>
          i === 0 ? word.toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`,
        ''
      );
  }
  return str;
}
