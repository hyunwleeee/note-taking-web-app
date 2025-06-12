import { useLayoutStore } from '@store/layoutStore';
import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';

import FlexBox from '@components/style/FlexBox';
import PageHeader from '@components/ui/page/PageHeader';
import Navigation from '@components/ui/side_bar/Navigation';

function PageLayout() {
  const { deviceType } = useLayoutStore();
  const outlet = useOutlet();
  const isLaptop = deviceType === 'laptop';

  return (
    <PageConatiner>
      {isLaptop && <Navigation />}
      <FlexBox j="start" a="stretch" d="column" style={{ width: '100%', height: '100%' }}>
        <PageHeader />
        <FlexBox j="start" a="stretch" d="row" style={{ width: '100%', height: '100%' }}>
          {outlet}
        </FlexBox>
      </FlexBox>
    </PageConatiner>
  );
}

export default PageLayout;

const PageConatiner = styled.div`
  height: calc(100 * var(--vh, 1vh) - 54px - 56px);

  ${({ theme }) => theme.media.tablet`
    height: calc(100 * var(--vh, 1vh) - 74px - 74px);
  `}

  ${({ theme }) => theme.media.laptop`
    height: calc(100 * var(--vh, 1vh));
    display: flex;
  `}
`;
