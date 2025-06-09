import styled from 'styled-components';

import MenuItem from './MenuItem';

function SettingMenu() {
  const settingList = [
    { name: 'color theme', path: '/settings/color-theme', icon: 'sun' },
    { name: 'font theme', path: '/settings/font-theme', icon: 'font' },
    { name: 'change password', path: '/settings/change-password', icon: 'lock' },
  ];

  const logoutData = { name: 'logout', path: '/logout', icon: 'logout' };

  return (
    <SettingContainer>
      <nav>
        <ul className="top_list">
          {settingList.map((item, idx) => (
            <MenuItem key={idx} iconType={item.icon} name={item.name} path={item.path} />
          ))}
        </ul>
        <ul>
          <MenuItem iconType={logoutData.icon} name={logoutData.name} path={logoutData.path} />
        </ul>
      </nav>
    </SettingContainer>
  );
}

export default SettingMenu;

const SettingContainer = styled.div`
  width: 272px;
  padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[200]}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};

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
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }
`;
