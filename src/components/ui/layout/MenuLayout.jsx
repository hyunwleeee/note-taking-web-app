import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import { checkIsDetailDepth } from '@utils/path';
function MenuLayout({ children, isLaptop }) {

  // TODO: util func
  /* desktop이고, pathname depth > 2이면 */
  if (!isLaptop && checkIsDetailDepth()) {
    return <></>;
  }

  const description = location.pathname.includes('archived') ? 'All your archived notes are stored here. You can restore or delete them anytime.' :
    location.pathname.includes('tags') ? 'All notes with the ”Dev” tag are shown here.' : '';

  return (
    <MenuWrapper $needMinHeight={checkIsDetailDepth()}>
      <ButtonWrapper className="button_wrapper">
        <BaseButton
          texture={isLaptop && '+ Create New Note'}
          size={isLaptop && 'full'}
          onClick={() => { }}
        >
          {!isLaptop && <BaseIcon type="plus" color="#fff" />}
        </BaseButton>
      </ButtonWrapper>
      {description && <p>{description}</p>}
      {children}
    </MenuWrapper>
  );
}

export default MenuLayout;

const MenuWrapper = styled.div`
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
  }

  
  ${({ theme }) => theme.media.tablet`
    padding-top: 0;
    height: ${({ $needMinHeight }) =>
      !$needMinHeight ? 'calc(100 * var(--vh, 1vh) - 74px - 74px - 74px)' : 'auto'};
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

MenuLayout.propTypes = {
  children: PropTypes.node,
  isLaptop: PropTypes.bool,
};
