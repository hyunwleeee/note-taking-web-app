import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '@components/ui/side_bar/Navigation';
import { useLayoutStore } from '@store/layoutStore';

import PageController from '@components/ui/page/PageController';

function PageLayout() {
  const { deviceType } = useLayoutStore();
  const outlet = useOutlet();
  const isLaptop = deviceType === 'laptop';

  return (
    <PageConatiner>
      {isLaptop && <Navigation />}
      <PageController />
      {outlet}
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
