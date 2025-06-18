import { useLayoutStore } from '@store/layoutStore';
import { useLocation } from 'react-router-dom';

import AllNotesMenu from './AllNotesMenu';
import SettingMenu from './SettingMenu';

function Menulist() {
  const location = useLocation();
  const { deviceType } = useLayoutStore();

  const isLaptop = deviceType === 'laptop';

  /* desktop이고, pathname depth > 2이면 */
  if (!isLaptop && location.pathname.split('/').length > 2) {
    return <></>;
  }

  switch (true) {
    case location.pathname.includes('settings'):
      return <SettingMenu />;
    default:
      return <AllNotesMenu isLaptop={isLaptop} />;
  }
}

export default Menulist;
