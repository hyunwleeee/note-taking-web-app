import SettingMenu from "@components/ui/side_bar/SettingMenu";
import { useOutlet } from "react-router-dom";

function SettingsLayout() {
  const outlet = useOutlet()
  return (
    <>
      <SettingMenu />
      {outlet}
    </>
  );
}

export default SettingsLayout;
