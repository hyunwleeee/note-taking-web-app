import { useLocation } from 'react-router-dom';

import AllNotesMenu from './AllNotesMenu';
import ArchivedNoteMenu from './ArchivedNoteMenu';
import SettingMenu from './SettingMenu';
import { useEffect } from 'react';
import { useIssueStore } from '@store/issueStore';

function Menulist() {
  const { issueList, fetchIssueList } = useIssueStore();
  const location = useLocation();

  useEffect(() => {
    const fetch = async () => {
      await fetchIssueList();
    };
    fetch();
  }, [fetchIssueList]);

  switch (true) {
    case location.pathname.includes('archived'):
      return <ArchivedNoteMenu />;
    case location.pathname.includes('settings'):
      return <SettingMenu />;
    default:
      return <AllNotesMenu noteList={issueList} />;
  }
}

export default Menulist;
