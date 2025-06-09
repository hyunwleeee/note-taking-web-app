import useNavigation from '@hooks/useNavigation';
import { useLayoutStore } from '@store/layoutStore';
import clsx from 'clsx';
import { Fragment } from 'react';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';

function MenuBar() {
  const { Navigate } = useNavigation();
  const { deviceType } = useLayoutStore();
  const isTablet = deviceType === 'tablet';
  const navList = [
    { name: 'home', path: '/', icon: 'home' },
    { name: 'search', path: '/search', icon: 'search' },
    { name: 'archived', path: '/archived', icon: 'archive' },
    { name: 'tags', path: '/tags', icon: 'tag' },
    { name: 'settings', path: '/settings', icon: 'settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const isVisibleDivider = (idx) => isTablet && idx < navList.length - 1;

  const handleMove = (path) => {
    Navigate.move(path);
  };

  return (
    <MenuBarContainer>
      <ul>
        {navList.map((item, idx) => (
          <Fragment key={idx}>
            <li
              className={clsx(item.name, isActive(item.path) && 'active')}
              onClick={() => handleMove(item.path)}
            >
              <FlexBox d="column" g={'4px'}>
                <BaseIcon type={item.icon} />
                {isTablet && item.name}
              </FlexBox>
            </li>
            {isVisibleDivider(idx) && <Divider />}
          </Fragment>
        ))}
      </ul>
    </MenuBarContainer>
  );
}

export default MenuBar;

const MenuBarContainer = styled.nav`
  box-shadow: ${({ theme }) => theme.shadow};
  background: var(--theme-bg-color);
  color: var(--theme-text-color);

  ul,
  li {
    list-style: none;
  }

  > ul {
    height: 56px;
    width: 100%;
    padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[250]}`};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    > li {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: ${({ theme }) => theme.radius[8]};
      ${({ theme }) => theme.typography.textPreset6};
      flex: 0 1 100%;
      height: 32px;
      text-transform: capitalize;
      svg path {
        stroke: var(--theme-text-color);
      }
      &.home,
      &.search,
      &.settings {
        svg path {
          stroke: transparent;
          fill: var(--theme-text-color);
        }
      }

      &.active,
      &:hover {
        background: ${({ theme }) => theme.colors.blue50};
        color: ${({ theme }) => theme.colors.blue500};
        svg path {
          stroke: ${({ theme }) => theme.colors.blue500};
        }
      }

      &.home,
      &.search,
      &.settings {
        &.active,
        &:hover {
          svg path {
            stroke: transparent;
            fill: ${({ theme }) => theme.colors.blue500};
          }
        }
      }
    }
  }

  ${({ theme }) => theme.media.tablet`
    > ul {
      height: 74px;
      gap: ${({ theme }) => theme.spacing[400]};
      padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[400]}`};
      > li {
        height: 50px;
      }
    }
  `}

  ${({ theme }) => theme.media.laptop`
    display: none;
  `}
`;

const Divider = styled.div`
  width: 1px;
  background: var(--theme-divider-color);
`;
