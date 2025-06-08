import FlexBox from '@components/style/FlexBox';
import styled from 'styled-components';
import useNavigation from '@hooks/useNavigation';

import BaseIcon from '@components/base/BaseIcon';
import PropTypes from 'prop-types';

function MenuItem({
  path,
  iconType = 'home',
  name,
}) {
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
      <FlexBox a='center' style={{ height: '100%' }}>
        <FlexBox j='start' g='8px'>
          <BaseIcon type={iconType} />
          {name}
        </FlexBox>
        <div className='arrow_icon_wrapper'>
          <BaseIcon type='arrow-left' />
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
  background: ${({ $active, theme }) => $active ? theme.colors.neutral100 : 'inherit'};
  cursor: pointer;
  svg path {
    fill: ${({ $active, $highlightIcon, $icon, theme }) => $active && !$highlightIcon && $icon === 'home' ? theme.colors.blue500 : ''};
    stroke: ${({ $active, $highlightIcon, $icon, theme }) => $active && !$highlightIcon && $icon !== 'home' ? theme.colors.blue500 : ''};
  }

  &:hover  {
    background: ${({ theme }) => theme.colors.neutral100};
  }

  .arrow_icon_wrapper {
    visibility: ${({ $active }) => $active ? 'visible' : 'hidden'};
    svg {
      vertical-align: middle;
      transform: rotate(180deg);
      width: 100%;
      height: 12px;
      path {
        stroke: ${({ theme }) => theme.colors.neutral950};
      }
    }
  }
`;

MenuItem.propTypes = {
  path: PropTypes.string,
  iconType: PropTypes.oneOf(['home', 'archive', 'tags']),
  name: PropTypes.string,
};
