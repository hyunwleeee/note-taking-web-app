import useNavigation from '@hooks/useNavigation';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';
import Icon from '@type/icon';
import { IssueType } from '@type/github';
import LabelList from '@components/ui/LabelList';

interface IMenuItemProps extends Pick<IssueType, 'title'> {
  labels?: IssueType['labels'];
  updated_at?: IssueType['updated_at'];
  type?: 'normal' | 'note';
  iconType?: Icon;
  isHighlightIcon?: boolean;
  path?: string;
  onClick?: () => void;
};

interface IStyleMenuProps {
  $note: boolean;
  $icon?: Icon;
  $active: boolean;
  $highlightIcon?: boolean;
}

function MenuItem({
  type = 'normal',
  path,
  iconType,
  title,
  labels,
  isHighlightIcon = false,
  updated_at,
  onClick,
}: IMenuItemProps) {
  const location = useLocation();
  const { move } = useNavigation();

  const pathname = location.pathname;

  const handleClick = () => {
    if (path) {
      move(path);
      return;
    }
    onClick && onClick();
  };

  const getIsActive = () => {
    if (path === '/' && pathname.includes('notes')) return true;
    return pathname === path;
  };

  const filteredLabelList = (labels as { name: string }[])?.filter(
    (label) => label.name !== 'Archived'
  );

  return (
    <Menu
      $note={type === 'note'}
      $icon={iconType}
      $active={getIsActive()}
      $highlightIcon={isHighlightIcon}
      onClick={handleClick}
    >
      <FlexBox a="center" style={{ height: '100%', marginBottom: '12px' }}>
        <FlexBox j="start" g="8px">
          {iconType && <BaseIcon type={iconType} />}
          {title}
        </FlexBox>
        {type === 'normal' && (
          <div className="arrow_icon_wrapper">
            <BaseIcon type="arrow-left" />
          </div>
        )}
      </FlexBox>
      <LabelList labelList={filteredLabelList} />
      {updated_at && <div className="date">{dayjs(updated_at).format('DD MMM YYYY')}</div>}
    </Menu>
  );
}

const Menu = styled.li<IStyleMenuProps>`
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

  .date {
    margin-top: ${({ theme }) => theme.spacing[150]};
    ${({ theme }) => theme.typography.textPreset6};
    color: var(--theme-text3-color);
  }
`;

export default MenuItem;
