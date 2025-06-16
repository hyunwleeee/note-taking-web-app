import useNavigation from '@hooks/useNavigation';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';
import PageHeaderSearch from './PageHeaderSearch';

function PageHeader() {
  const { Navigate } = useNavigation();
  const location = useLocation();

  const header = location.pathname;

  const renderHeader = () => {
    switch (true) {
      case header === '/' || header.includes('/notes'):
        return 'All Notes';
      case header.includes('archived'):
        return 'Archived Notes';
      case header.includes('tags'):
        return (
          <>
            <span>'Notes Tagged: </span>location.pathname.split('/')[2]
          </>
        );
      case header.includes('settings'):
        return 'Settings';
      default:
        return '';
    }
  };

  return (
    <PageHeaderContainer>
      <h3>{renderHeader()}</h3>
      <FlexBox g="16px">
        <PageHeaderSearch/>
        <BaseButton
          theme="ghost"
          className="svg_fill"
          onClick={() => {
            Navigate.move('/settings');
          }}
        >
          <BaseIcon type="settings" color="#525866" />
        </BaseButton>
      </FlexBox>
    </PageHeaderContainer>
  );
}

const PageHeaderContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing[200]} ${theme.spacing[400]}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typography.textPreset1};
  border-bottom: 1px solid var(--theme-divider2-color);
  background-color: var(--theme-bg-color);
`;

export default PageHeader;
