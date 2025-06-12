import useNavigation from '@hooks/useNavigation';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';

function MenuItem({ path, iconType = 'home', name }) {
  const isActive = () => location.pathname === path;

  /* Setting Menu icon highlighting 없음 */
  const isHighlightIcon = () => location.pathname.includes('settings');

  const { Navigate } = useNavigation();

  const handleClick = () => {
    Navigate.move(path);
  };

  return (
    <Menu
      $icon={iconType}
      $active={isActive()}
      $highlightIcon={isHighlightIcon()}
      onClick={handleClick}
    >
      <FlexBox a="center" style={{ height: '100%' }}>
        <FlexBox j="start" g="8px">
          <BaseIcon type={iconType} />
          {name}
        </FlexBox>
        <div className="arrow_icon_wrapper">
          <BaseIcon type="arrow-left" />
        </div>
      </FlexBox>
    </Menu>
  );
}

export default MenuItem;

const Menu = styled.li`
  ${({ theme }) => theme.typography.textPreset4};
  height: 40px;
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[150]}`};
  border-radius: ${({ theme }) => theme.radius[8]};
  text-transform: capitalize;
  background:  ${({ $active }) => ($active ? 'var(--theme-bg2-color)' : '')};
  cursor: pointer;
  svg path {
    ${({ $icon }) =>
      $icon === 'home' || $icon === 'font'
        ? css`
            fill: var(--theme-text-color);
          `
        : css`
            stroke: var(--theme-text-color);
          `};
  }
  svg path {
    fill: ${({ $active, $highlightIcon, $icon, theme }) =>
      $active && !$highlightIcon && $icon === 'home' ? theme.colors.blue500 : ''};
    stroke: ${({ $active, $highlightIcon, $icon, theme }) =>
      $active && !$highlightIcon && $icon !== 'home' ? theme.colors.blue500 : ''};
  }

  &:hover {
    background: var(--theme-bg2-color);
  }

  .arrow_icon_wrapper {
    visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
    svg {
      vertical-align: middle;
      transform: rotate(180deg);
      width: 100%;
      height: 12px;
      path {
        stroke: var(--theme-text-color)};
      }
    }
  }
`;

MenuItem.propTypes = {
  path: PropTypes.string,
  iconType: PropTypes.oneOf(['home', 'archive', 'tags']),
  name: PropTypes.string,
};
