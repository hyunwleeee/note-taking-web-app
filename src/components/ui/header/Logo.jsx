import { useLightDark } from '@contexts/light_dark.context';
import styled from 'styled-components';

import mainLogoImg from '@assets/images/logo.svg';
import darkLogoImg from '@assets/images/logo_dark.svg';

function Logo({ ...restProps }) {
  const theme = useLightDark();
  const isDark = theme === 'dark';

  return (
    <section {...restProps}>
      <SrOnlyHeading1>Note-taking web app</SrOnlyHeading1>
      <LogoImgWrapper>
        <img src={!isDark ? mainLogoImg : darkLogoImg} alt="note-taking" />
      </LogoImgWrapper>
    </section>
  );
}

export default Logo;

const SrOnlyHeading1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  border: 0;
  clip: rect(0 0 0 0);
`;

export const LogoImgWrapper = styled.div`
  width: 100%; /* fulid */
  height: 28px;
  path {
    stroke: white;
  }
`;
