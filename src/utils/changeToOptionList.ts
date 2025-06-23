export function changeToOptionList<T>(list: T[], name: keyof T, key: keyof T) {
  return list.map((item) => {
    return {
      name: item[name],
      value: item[key],
    };
  });
}
