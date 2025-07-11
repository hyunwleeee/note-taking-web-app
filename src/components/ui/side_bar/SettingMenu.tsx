import { LOGOUT_MENU_DATA, SETTING_MENU_LIST } from '@constants/menu';
import styled from 'styled-components';

import MenuItem from './MenuItem';
import { logout } from '@firebase_/auth';
import useNavigation from '@hooks/useNavigation';
import useAlert from '@hooks/useAlert';

function SettingMenu() {
  const alert = useAlert();
  const { Navigate } = useNavigation();

  const handleLogout = async () => {
    try {
      logout();
      alert('정상적으로 로그아웃 되었습니다.');
      Navigate.move('/');
    } catch (error) {
    }
  }

  return (
    <SettingContainer>
      <nav>
        <ul className="top_list">
          {SETTING_MENU_LIST.map((menu, idx) => (
            <MenuItem
              key={idx}
              iconType={menu.icon}
              title={menu.title}
              path={menu.path}
            />
          ))}
        </ul>
        <ul className="bottom_list">
          <MenuItem
            iconType={LOGOUT_MENU_DATA.icon}
            title={LOGOUT_MENU_DATA.title}
            onClick={handleLogout}
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
    flex-flow: column;
    padding-bottom: ${({ theme }) => theme.spacing[100]};
  }

  .bottom_list {
    border-top: 1px solid var(--theme-divider-color);
    padding-top: ${({ theme }) => theme.spacing[100]};
  }

  ${({ theme }) => theme.media.tablet`
    height: calc(100% - 74px);
  `}

  ${({ theme }) => theme.media.laptop`
    width: 290px;
    height: calc(100% - 80px);
    .bottom_list {
      margin: ${({ theme }) => `0 ${theme.spacing[200]} 0 ${theme.spacing[400]}`};
    }
  `}
`;
