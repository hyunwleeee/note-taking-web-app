import { makeSlugByTitle } from '@utils/makeSlug';

import MenuItem from './MenuItem';
import data from '/data.json';

function ArchivedNoteMenu() {
  const changeToOptionList = (list) => {
    return list
      .filter(({ isArchived }) => isArchived)
      .map(({ title, tags, lastEdited }) => ({
        name: title,
        value: title,
        tags,
        path: '/archived/' + makeSlugByTitle(title),
        lastEdited,
      }));
  };

  const settingList = changeToOptionList(data.notes);

  return (
    <ul className="top_list">
      {settingList.map((item, idx) => (
        <MenuItem
          key={idx}
          type="note"
          iconType={item.icon}
          name={item.name}
          path={item.path}
          tags={item.tags}
          isArchived
          lastEdited={item.lastEdited}
        />
      ))}
    </ul>
  );
}

export default ArchivedNoteMenu;
