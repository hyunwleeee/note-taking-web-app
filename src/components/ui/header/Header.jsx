import styled from 'styled-components';

import FlexBox from '@components/style/FlexBox';
import { useLayoutStore } from '@store/layoutStore';
import Logo from '@components/ui/header/Logo';

function Header() {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';

  if (isLaptop) return null;

  return (
    <header>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    </header>
  );
}

export default Header;

const HeaderContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.colors.neutral100};
  height: 54px;
  padding: ${({ theme }) => `0 ${theme.spacing[200]}`};

  ${({ theme }) => theme.media.tablet`
    height: 74px; 
    align-items: center;
    padding: ${({ theme }) => `0 ${theme.spacing[400]}`};
    background: ${({ theme }) => theme.colors.neutral100};
  `}

  ${({ theme }) => theme.media.laptop`
    display: none;
  `}
`;
