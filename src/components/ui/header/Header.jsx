import { useLightDark, useLightDarkDispatch } from '@contexts/light_dark.context';
import { useLayoutStore } from '@store/layoutStore';
import styled from 'styled-components';

import FlexBox from '@components/style/FlexBox';
import Logo from '@components/ui/header/Logo';

function Header() {
  const { deviceType } = useLayoutStore();
  const isLaptop = deviceType === 'laptop';
  const theme = useLightDark();
  const dispatch = useLightDarkDispatch();

  if (isLaptop) return null;

  return (
    <header>
      <HeaderContainer $isDark={theme === 'dark'}>
        <Logo />
        <button onClick={() => dispatch({ type: 'toggle' })}>toggle</button>
      </HeaderContainer>
    </header>
  );
}

export default Header;

const HeaderContainer = styled(FlexBox)`
  background: var(--theme-header-bg-color);
  height: 54px;
  padding: ${({ theme }) => `0 ${theme.spacing[200]}`};

  ${({ theme }) => theme.media.tablet`
    height: 74px; 
    align-items: center;
    padding: ${({ theme }) => `0 ${theme.spacing[400]}`};
  `}

  ${({ theme }) => theme.media.laptop`
    display: none;
  `}
`;
