import styled from 'styled-components';

import mainLogoImg from '@assets/images/logo.svg';

function Logo({ ...restProps }) {
  return (
    <section {...restProps}>
      <SrOnlyHeading1>Note-taking web app</SrOnlyHeading1>
      <LogoImgWrapper>
        <img src={mainLogoImg} alt="note-taking" />
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
`;
