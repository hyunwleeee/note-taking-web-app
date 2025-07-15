import useNavigation from '@hooks/useNavigation';
import { checkIsDetailDepth } from '@utils/path';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import { PropsWithChildren } from 'react';

interface IMenuWrapperProps {
  $needMinHeight: boolean;
}

function MenuLayout({ children, isLaptop }: PropsWithChildren<{ isLaptop: boolean }>) {
  const { move } = useNavigation();
  if (!isLaptop && checkIsDetailDepth()) {
    return <></>;
  }
  const description = location.pathname.includes('archived')
    ? 'All your archived notes are stored here. You can restore or delete them anytime.'
    : location.pathname.includes('tags')
      ? 'All notes with the ”Dev” tag are shown here.'
      : '';

  return (
    <MenuWrapper $needMinHeight={checkIsDetailDepth()}>
      {!location.pathname.includes('settings') && <ButtonWrapper className="button_wrapper">
        <BaseButton
          texture={isLaptop ? '+ Create New Note' : ''}
          size={isLaptop ? 'full' : 'normal'}
          onClick={() => {
            move('/notes/create');
          }}
        >
          {!isLaptop && <BaseIcon type="plus" color="#fff" />}
        </BaseButton>
      </ButtonWrapper>}
      {description && <p>{description}</p>}
      {children}
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div<IMenuWrapperProps>`
  height: ${({ $needMinHeight }) =>
    !$needMinHeight ? 'calc(100 * var(--vh, 1vh) - 54px - 54px - 66px)' : 'auto'};

  // TODO: global css
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  padding-top: 0;
  ${({ theme }) => theme.inner};
  > p {
    padding: ${({ theme }) => `0 ${theme.spacing[200]} ${theme.spacing[200]} 0`};
    ${({ theme }) => theme.typography.textPreset5};
    color: var(--theme-text3-color);
    margin: 0;
  }

  
  ${({ $needMinHeight, theme }) => theme.media.tablet`
    padding-top: 0;
    height: ${!$needMinHeight ? 'calc(100 * var(--vh, 1vh) - 74px - 74px - 74px)' : 'auto'};
  `}


  ${({ theme }) => theme.media.laptop`
    padding: 0;
    width: 290px;
    min-width: 290px;
    height: calc(100 * var(--vh, 1vh) - 77px);
    border-right: 1px solid var(--theme-divider2-color);
    > p {
       padding: ${({ theme }) => `0 ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
      ${({ theme }) => theme.typography.textPreset5};
    }

    .top_list {
      padding: ${({ theme }) =>
      `0 ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
      display: flex;
      flex-flow: column nowrap;
      gap: 4px;
    }
  `}
}
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 72px;
  right: 16px;
  > button {
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.radius.full};
    text-align: center;
    padding: 0;
    svg {
      width: 32px;
    }
  }

  ${({ theme }) => theme.media.tablet`
    bottom: 106px;
    right: 36px;
    > button {
      width: 64px;
      height: 64px;
    }
  `}

  ${({ theme }) => theme.media.laptop`
    position: sticky;
    top: 0;
    padding: ${({ theme }) =>
      `${theme.spacing[250]} ${theme.spacing[200]} ${theme.spacing[200]} ${theme.spacing[400]}`};
    display: inline-block;
    width: 100%;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    > button {
      width: 100%;
      height: 40px;
      border-radius: ${({ theme }) => theme.radius[8]};
     }
  `}
`;

export default MenuLayout;
