import { useOutlet } from 'react-router-dom';

import SettingMenu from '@components/ui/side_bar/SettingMenu';

function SettingsLayout() {
  const outlet = useOutlet();
  return (
    <>
      <SettingMenu />
      {outlet}
    </>
  );
}

export default SettingsLayout;
