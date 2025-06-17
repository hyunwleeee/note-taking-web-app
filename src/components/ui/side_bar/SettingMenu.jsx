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
        <ul className="bottom_list">
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
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing[200]}`};
  ${({ theme }) => theme.inner};
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
    border-bottom: 1px solid var(--theme-divider2-color);
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }

  ${({ theme }) => theme.media.tablet`
    height: calc(100% - 74px);
  `}

  ${({ theme }) => theme.media.laptop`
    width: 290px;
    height: calc(100% - 80px);
    border-right: 1px solid var(--theme-divider2-color);
    padding: ${({ theme }) =>
      `${theme.spacing[250]} ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
   
  `}
`;
