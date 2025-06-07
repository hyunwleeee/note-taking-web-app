import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';

import PageController from '@components/ui/page/PageController';

function PageLayout() {
  const outlet = useOutlet();

  return (
    <PageConatiner>
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
  `}
`;
