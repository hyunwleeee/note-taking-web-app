import { useLayoutStore } from '@store/layoutStore';
import { checkIsDetailDepth } from '@utils/path';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import TransitionWrapper from '@components/animation/TransitionWrapper';
import FlexBox from '@components/style/FlexBox';
import PageHeader from '@components/ui/page/PageHeader';
import Menulist from '@components/ui/side_bar/MenuList';
import Navigation from '@components/ui/side_bar/Navigation';

import MenuLayout from './MenuLayout';
import { ReactNode } from 'react';

function PageLayout({ children }: { children: ReactNode }) {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';

  const OutletContent = isLaptop ? (
    <TransitionWrapper>
      <Outlet />
    </TransitionWrapper>
  ) : (
    <Outlet />
  );

  const Content = (
    <PageContainer $needMinHeight={checkIsDetailDepth()}>
      <FlexBox j="start" a="stretch" d="column" style={{ width: '100%' }}>
        <PageHeader isLaptop={isLaptop} />
        <FlexBox
          j="start"
          a="stretch"
          d={isLaptop ? 'row' : 'column'}
          style={{ width: '100%', height: '100%' }}
        >
          <MenuLayout isLaptop={isLaptop}>
            <Menulist />
          </MenuLayout>
          {OutletContent}
        </FlexBox>
      </FlexBox>
    </PageContainer>
  );

  return (
    <PageWrapper>
      {isLaptop && <Navigation />}
      {isLaptop ? Content : <TransitionWrapper>{Content}</TransitionWrapper>}
    </PageWrapper>
  );
}

const PageContainer = styled.div<{ $needMinHeight: boolean }>`
  border-radius: ${({ theme }) => theme.radius[16]};
  background-color: var(--theme-bg-color);
  min-height: calc(100 * var(--vh, 1vh));
  width: 100%;
  ${({ theme }) => theme.media.laptop`
    border-radius: ${({ theme }) => theme.radius[0]};
  `}
`;

const PageWrapper = styled.div`
  overflow: hidden;
  height: calc(100 * var(--vh, 1vh) - 54px - 56px);

  ${({ theme }) => theme.media.tablet`
    height: calc(100 * var(--vh, 1vh) - 74px - 74px);
  `}

  ${({ theme }) => theme.media.laptop`
    display: flex;
    height: calc(100 * var(--vh, 1vh));
  `}
`;

export default PageLayout; 
