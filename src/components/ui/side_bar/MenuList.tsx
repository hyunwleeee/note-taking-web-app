import { useLocation } from 'react-router-dom';

import AllNotesMenu from './AllNotesMenu';
import ArchivedNoteMenu from './ArchivedNoteMenu';
import SettingMenu from './SettingMenu';
import { getRepoIssues } from '@apis/github';
import { info } from '@constants/info';
import { IssueType } from '@type/github';

function Menulist() {
  const location = useLocation();

  const { data: noteList } = getRepoIssues<IssueType[]>(info.username, info.repo, 1, 10);

  switch (true) {
    case location.pathname.includes('archived'):
      return <ArchivedNoteMenu />;
    case location.pathname.includes('settings'):
      return <SettingMenu />;
    default:
      return <AllNotesMenu noteList={noteList ?? []} />;
  }
}

export default Menulist;
