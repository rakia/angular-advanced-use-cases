export function convertKeyValuesIntoJson(keyValueItems: string[]): { [key: string]: string }[] {
  let jsonItems: { [key: string]: string }[] = [];

  jsonItems = keyValueItems.map((keyValueItem: string) => {
    const [itemKey, itemValue] = keyValueItem.split(':');
    return { [itemKey]: itemValue };
  });
  return jsonItems;
}

export function convertKeyValueIntoJson(keyValueItem: string): { [key: string]: string } | Error {
  if (!keyValueItem.includes(':')) {
    return new Error(`${keyValueItem} doesn't contain :`);
  }
  const [itemKey, itemValue] = keyValueItem.split(':');
  return { [itemKey]: itemValue };
}
