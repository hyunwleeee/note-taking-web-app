import { useLayoutStore } from '@store/layoutStore';
import { useLocation } from 'react-router-dom';

import AllNotesMenu from './AllNotesMenu';
import ArchivedNoteMenu from './ArchivedNoteMenu';
import SettingMenu from './SettingMenu';

function Menulist() {
  const location = useLocation();
  const { deviceType } = useLayoutStore();

  const isLaptop = deviceType === 'laptop';

  switch (true) {
    case location.pathname.includes('archived'):
      return <ArchivedNoteMenu isLaptop={isLaptop} />;
    case location.pathname.includes('settings'):
      return <SettingMenu />;
    default:
      return <AllNotesMenu isLaptop={isLaptop} />;
  }
}

export default Menulist;
