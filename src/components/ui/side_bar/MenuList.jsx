import { useLocation } from 'react-router-dom';

import AllNotesMenu from './AllNotesMenu';
import SettingMenu from './SettingMenu';

function Menulist() {
  const location = useLocation();

  switch (true) {
    case location.pathname.includes('settings'):
      return <SettingMenu />;
    default:
      return <AllNotesMenu />;
  }
}

export default Menulist;
