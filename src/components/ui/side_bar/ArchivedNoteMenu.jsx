import { makeSlugByTitle } from '@utils/makeSlug';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import data from '/data.json';

function ArchivedNoteMenu({ isLaptop }) {
  const changeToOptionList = (list) => {
    return list.map(({ title, tags, lastEdited }) => ({
      name: title,
      value: title,
      tags,
      lastEdited,
      path: '/archived/' + makeSlugByTitle(title),
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

ArchivedNoteMenu.propTypes = {
  isLaptop: PropTypes.bool,
};
