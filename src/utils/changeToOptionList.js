import { makeSlugByTitle } from '@utils/makeSlug';

function changeToOptionList(list, name, key) {
  return list.map((item) => {
    return {
      name: item[name],
      value: item[key],
    };
  });
}



