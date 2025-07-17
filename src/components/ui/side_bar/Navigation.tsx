import { NAV_LIST } from '@constants/menu';
import styled from 'styled-components';

import FlexBox from '@components/style/FlexBox';
import Logo from '@components/ui/header/Logo';
import { useLabelStore } from '@store/labelStore';

import MenuItem from './MenuItem';
import { useEffect } from 'react';

function Navigation() {
  const { labelList, fetchLabelList } = useLabelStore();

  useEffect(() => {
    fetchLabelList();
  }, [])

  return (
    <NavigationContainer>
      <FlexBox j="start" a="stretch" d="column" g="16px" className="logo_wrapper">
        <Logo />
      </FlexBox>
      <nav>
        <ul className="nav_list">
          {NAV_LIST.map((item, idx) => (
            <MenuItem
              key={idx}
              iconType={item.icon}
              title={item.title}
              path={item.path}
              isHighlightIcon
            />
          ))}
        </ul>
        {<ul className="tag_list">
          <h3>Tags</h3>
          {labelList?.map((item, idx) => (
            <MenuItem
              key={`item_${idx}`}
              iconType="tag"
              title={item.name}
              isHighlightIcon
            />
          ))}
        </ul>}
      </nav>
    </NavigationContainer>
  );
}

export default Navigation;

const NavigationContainer = styled.div`
  background-color: var(--theme-bg-color);
  min-width: 272px;
  padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[200]}`};
  border-right: 1px solid var(--theme-divider2-color);

  .logo_wrapper {
    height: 52px;
    display: flex;
    justify-content: center;
    > section {
      width: 100%;
    }
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }

  .nav_list {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 4px;
    padding-bottom: ${({ theme }) => theme.spacing[100]};
    border-bottom: 1px solid var(--theme-divider2-color);
    margin-bottom: ${({ theme }) => theme.spacing[100]};
  }

  .tag_list {
    h3 {
      color: ${({ theme }) => theme.colors.neutral500};
      height: 20px;
      padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[100]}`};
      margin-bottom: ${({ theme }) => theme.spacing[100]};
    }
  }
`;
