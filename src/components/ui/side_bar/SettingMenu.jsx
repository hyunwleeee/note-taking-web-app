import { LOGOUT_MENU_DATA, SETTING_MENU_LIST } from '@constants/MenuConstants';
import styled from 'styled-components';

import MenuItem from './MenuItem';

function SettingMenu() {
  return (
    <SettingContainer>
      <nav>
        <ul className="top_list">
          {SETTING_MENU_LIST.map((menu, idx) => (
            <MenuItem key={idx} iconType={menu.icon} name={menu.name} path={menu.path} />
          ))}
        </ul>
        <ul>
          <MenuItem
            iconType={LOGOUT_MENU_DATA.icon}
            name={LOGOUT_MENU_DATA.name}
            path={LOGOUT_MENU_DATA.path}
          />
        </ul>
      </nav>
    </SettingContainer>
  );
}

export default SettingMenu;

const SettingContainer = styled.div`
  min-width: 258px;
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing[250]} ${theme.spacing[200]} 0 ${theme.spacing[400]}`};
  border-right: 1px solid var(--theme-divider-color);

  .logo_wrapper {
    height: 52px;
    display: flex;
    justify-content: center;
    > section {
      width: 100%;
    }
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }

  .top_list {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 4px;
    padding-bottom: ${({ theme }) => theme.spacing[100]};
    border-bottom: 1px solid var(--theme-divider-color);
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }
`;
