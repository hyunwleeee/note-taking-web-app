import { makeSlugByTitle } from '@utils/makeSlug';
import MenuItem from './MenuItem';
import { type IssueType } from '@type/github';

function AllNotesMenu({ noteList }: { noteList?: IssueType[] }) {
  return (
    <ul className="top_list">
      {noteList?.map((item) => (
        <MenuItem
          key={item.id}
          type="note"
          title={item.title}
          path={`/notes/${makeSlugByTitle(item.title)}`}
          labels={item.labels}
          updated_at={item.updated_at}
        />
      ))}
    </ul>
  );
}

export default AllNotesMenu;
