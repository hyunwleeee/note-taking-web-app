import useNavigation from '@hooks/useNavigation';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';

function MenuItem({
  type = 'normal',
  path,
  iconType,
  name,
  tags,
  isHighlightIcon = false,
  lastEdited,
}) {
  const location = useLocation();
  const { Navigate } = useNavigation();

  const pathname = location.pathname;

  const handleClick = () => {
    Navigate.move(path);
  };
  const getIsActive = () => {
    if (path === '/' && pathname.includes('notes')) return true;
    return pathname === path;
  };

  return (
    <Menu
      $note={type === 'note'}
      $icon={iconType}
      $active={getIsActive()}
      $highlightIcon={isHighlightIcon}
      onClick={handleClick}
    >
      <FlexBox a="center" style={{ height: '100%' }}>
        <FlexBox j="start" g="8px">
          {iconType && <BaseIcon type={iconType} />}
          {name}
        </FlexBox>
        {type === 'normal' && (
          <div className="arrow_icon_wrapper">
            <BaseIcon type="arrow-left" />
          </div>
        )}
      </FlexBox>
      {tags && (
        <ul className="tags">
          {tags.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {lastEdited && <div className="date">{dayjs(lastEdited).format('DD MMM YYYY')}</div>}
    </Menu>
  );
}

export default MenuItem;

const Menu = styled.li`
  ${({ $note, theme }) => ($note ? theme.typography.textPreset3 : theme.typography.textPreset4)};
  height: ${({ $note }) => ($note ? 'auto' : '40px')};
  padding: ${({ $note, theme }) => ($note ? theme.spacing[100] : `${theme.spacing[0]} ${theme.spacing[150]}`)};
  text-transform: capitalize;
  background:  ${({ $active }) => ($active ? 'var(--theme-bg2-color)' : '')};
  border-radius: ${({ $active, theme }) => ($active ? theme.radius[8] : 0)};
  cursor: pointer;
  border-bottom: ${({ $active, $note }) => !$active && $note && `1px solid var(--theme-divider2-color)`};
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
      $active && $highlightIcon && $icon === 'home' ? theme.colors.blue500 : ''};
    stroke: ${({ $active, $highlightIcon, $icon, theme }) =>
      $active && $highlightIcon && $icon !== 'home' ? theme.colors.blue500 : ''};
  }

  &:hover {
    background: var(--theme-bg2-color);
    border-radius: ${({ theme }) => theme.radius[8]};
    border-bottom: none;
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

  .tags {
    display: flex;
    margin-top: ${({ theme }) => theme.spacing[150]};
    gap: ${({ theme }) => theme.spacing[50]};
    > li {
      padding: ${({ theme }) => `${theme.spacing[25]} ${theme.spacing[75]}`};
      background: var(--theme-bg3-color);
      border-radius: ${({ theme }) => theme.radius[4]};
      ${({ theme }) => theme.typography.textPreset6};
    }
  }

  .date {
    margin-top: ${({ theme }) => theme.spacing[150]};
    ${({ theme }) => theme.typography.textPreset6};
    color: var(--theme-text3-color);
  }
`;

MenuItem.propTypes = {
  type: PropTypes.oneOf(['normal', 'note']),
  path: PropTypes.string,
  iconType: PropTypes.oneOf(['home', 'archive', 'tags']),
  name: PropTypes.string,
  tags: PropTypes.array,
  isHighlightIcon: PropTypes.bool,
  lastEdited: PropTypes.string,
};
