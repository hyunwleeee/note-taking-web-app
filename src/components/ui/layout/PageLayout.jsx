import { useLayoutStore } from '@store/layoutStore';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import TransitionWrapper from '@components/animation/TransitionWrapper';
import FlexBox from '@components/style/FlexBox';
import PageHeader from '@components/ui/page/PageHeader';
import Menulist from '@components/ui/side_bar/MenuList';
import Navigation from '@components/ui/side_bar/Navigation';

function PageLayout() {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';

  return (
    <PageWrapper>
      {isLaptop && <Navigation />}
      <TransitionWrapper>
        <PageContainer $needMinHeight={location.pathname.split('/').length > 2}>
          <FlexBox j="start" a="stretch" d="column">
            <PageHeader isLaptop={isLaptop} />
            <FlexBox
              j="start"
              a="stretch"
              d={isLaptop ? 'row' : 'column'}
              style={{ width: '100%', height: '100%' }}
            >
              <div className="menu_list_wrapper">
                <Menulist />
              </div>
              <Outlet />
            </FlexBox>
          </FlexBox>
        </PageContainer>
      </TransitionWrapper>
    </PageWrapper>
  );
}

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

const PageContainer = styled.div`
  border-radius: ${({ theme }) => theme.radius[16]};
  background-color: var(--theme-bg-color);
  min-height: calc(100 * var(--vh, 1vh));
  ${({ theme }) => theme.media.laptop`
    border-radius: ${({ theme }) => theme.radius[0]};
  `}

  .menu_list_wrapper {
    min-width: 290px;
    height: ${({ $needMinHeight }) =>
      !$needMinHeight ? 'calc(100 * var(--vh, 1vh) - 54px - 54px - 66px)' : 'auto'};
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    ${({ theme }) => theme.media.tablet`
      height: ${({ $needMinHeight }) => (!$needMinHeight ? 'calc(100 * var(--vh, 1vh) - 74px - 74px - 74px)' : 'auto')};
   `}

    ${({ theme }) => theme.media.laptop`
     display: flex;
     height: calc(100 * var(--vh, 1vh) - 77px);
     border-right: 1px solid var(--theme-divider2-color);
   `}
  }
`;

export default PageLayout;
