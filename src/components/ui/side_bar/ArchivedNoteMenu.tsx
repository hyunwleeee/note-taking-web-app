import { makeSlugByTitle } from '@utils/makeSlug';

import MenuItem from './MenuItem';
import { Note } from '@type/note';
import data from '@assets/data';

function ArchivedNoteMenu() {
  const changeToOptionList = (list: Note[]) => {
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
          name={item.name}
          path={item.path}
          tags={item.tags}
          lastEdited={item.lastEdited}
        />
      ))}
    </ul>
  );
}

export default ArchivedNoteMenu;
