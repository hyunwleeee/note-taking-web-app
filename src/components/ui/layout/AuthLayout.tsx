import { Suspense, useEffect } from 'react';
import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@components/ui/header/Logo';

function AuthLayout() {
  const outlet = useOutlet();

  /* 전체 프로젝트에 우 클릭 막음 */
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <OverLay>
      <div className="auth_wrapper">
        <div className="logo_wrapper">
          <Logo />
        </div>
        <Suspense>{outlet}</Suspense>
      </div>
    </OverLay>
  );
}

const OverLay = styled.div`
  height: calc(100 * var(--vh, 1vh));
  display: flex;
  justify-content: center;
  align-items: center;

  .logo_wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing[200]};
  }

  .auth_wrapper {
    padding: ${({ theme }) => theme.spacing[600]};
    width: ${({ theme }) => `calc(100% - 2 * ${theme.spacing[200]})`};
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: ${({ theme }) => theme.radius[8]};
    background: var(--theme-bg-color);
    /* responsive tablet */
    ${({ theme }) => theme.media.tablet`
      width: 522px;
    `}

    /* responsive laptop */
    ${({ theme }) => theme.media.laptop`
      width: 540px;
    `}
  }
`;

export default AuthLayout;
