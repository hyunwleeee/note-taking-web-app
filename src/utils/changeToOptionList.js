export function changeToOptionList(list, name, key) {
  return list.map((item) => {
    return {
      name: item[name],
      value: item[key],
    };
  });
}
