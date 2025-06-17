import clsx from 'clsx';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function BaseButton({
  theme = 'primary',
  isDangerous = false,
  leftIcon,
  texture,
  rightIcon,
  size = 'normal',
  ...restProps
}) {
  return (
    <StyledButton
      $dangerous={isDangerous}
      $size={size}
      {...restProps}
      className={clsx(theme, restProps.className)}
    >
      {leftIcon && <span className="left">{leftIcon}</span>}
      {texture && <span className="text">{texture}</span>}
      {rightIcon && <span className="right">{rightIcon}</span>}
      {restProps.children}
    </StyledButton>
  );
}

const disabledStyles = css`
  &.primary:disabled,
  &.secondary:disabled,
  &.border:disabled {
    color: ${({ theme }) => theme.colors.neutral300};
    background: ${({ theme }) => theme.colors.neutral100};
    cursor: not-allowed;
    border: none;

    &:hover,
    &:active {
      background: ${({ theme }) => theme.colors.neutral100};
      outline: none;
    }

    svg path {
      fill: ${({ theme }) => theme.colors.neutral300};
    }
  }
`;

const StyledButton = styled.button`
  all: unset;
  width: ${({ $size }) => ($size === 'full' ? '100%' : 'auto')};
  text-align: ${({ $size }) => ($size === 'full' ? 'center' : 'auto')};
  height: 41px;
  text-align: ${({ $size }) => ($size === 'full' ? 'center' : 'auto')};
  ${({ theme }) => theme.typography.textPreset6};
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[200]}`};
  border-radius: ${({ theme }) => theme.radius[8]};
  box-sizing: border-box;

  cursor: pointer;

  .text,
  svg {
    vertical-align: middle;
  }

  span {
    &.left {
      margin-right: ${({ theme }) => theme.spacing[100]};
    }

    &.right {
      margin-left: ${({ theme }) => theme.spacing[100]};
    }
  }

  svg {
    width: 18px;
    height: 100%;
  }

  /* responsive tablet */
  ${({ theme }) => theme.media.tablet`
    ${({ theme }) => theme.typography.textPreset5};
    svg {
      width: 24px;
      height: 100%;
    }
  `}

  /* responsive laptop */
  ${({ theme }) => theme.media.laptop`
    ${({ theme }) => theme.typography.textPreset4};
  `}

  
  /* theme */
  &.primary {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ $dangerous, theme }) =>
      $dangerous ? theme.colors.red500 : theme.colors.blue500};

    &:hover {
      background: ${({ $dangerous, theme }) => ($dangerous ? 'red' : theme.colors.blue700)};
    }

    &:active {
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral400}`};
      background: ${({ $dangerous, theme }) =>
        $dangerous ? theme.colors.red500 : theme.colors.blue500};
      outline-offset: 2px;
    }

    ${disabledStyles}
  }

  &.secondary {
    color: ${({ theme }) => theme.colors.neutral600};
    background: ${({ theme }) => theme.colors.neutral100};

    &:hover {
      background: ${({ theme }) => theme.colors.white};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral300}`};
    }

    &:active {
      color: ${({ theme }) => theme.colors.neutral950};
      background: ${({ theme }) => theme.colors.white};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral950}`};
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral400}`};
      outline-offset: 2px;
    }

    ${disabledStyles}
  }

  &.border {
    color: var(--theme-text-color);
    border: 1px solid var(--theme-border-color);
    svg path {
      fill: ${({theme}) => theme.colors.white};
    }
    &:hover {
      color: var(--theme-text2-color);
      background: var(--theme-bg2-color);

      svg path {
        fill: ${({theme}) => theme.colors.neutral100};
      }
    }

    &:active {
      color: var(--theme-text-color);
      background: var(--theme-bg-color);
      border: 1px solid var(--theme-text2-color);
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral400}`};
      outline-offset: 2px;

      svg path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }

    ${disabledStyles}
  }

  &.ghost {
    height: auto;
    padding: ${({ theme }) => theme.spacing[25]};
    color: ${({ theme }) => theme.colors.neutral600};

    &:hover {
      color: var(--theme-button-hover-color);
      background: var(--theme-bg2-color);
      svg path {
        stroke: var(--theme-button-hover-color);
      }
    }

    &:active {
      color: ${({ theme }) => theme.colors.neutral600};
      svg path {
        stroke: ${({ theme }) => theme.colors.neutral600};
      }
    }

    &.svg_fill {
      &:hover {
        background: var(--theme-header-bg-color);
        svg path {
          stroke: transparent;
          fill: var(--theme-button-hover-color);
        }
      }

      &:active {
        svg path {
          stroke: transparent;
          fill: ${({ theme }) => theme.colors.neutral600};
        }
      }
    }

    &.text_blue {
      color: ${({ theme }) => theme.colors.blue500};
      &:hover {
        color: ${({ theme }) => theme.colors.blue700};
      }

      &:active {
        color: ${({ theme }) => theme.colors.blue500};
      }
    }
  }
`;
export default BaseButton;

BaseButton.propTypes = {
  theme: PropTypes.oneOf(['primary', 'secondary', 'border', 'ghost']),
  isDangerous: PropTypes.bool,
  leftIcon: PropTypes.element,
  texture: PropTypes.string,
  rightIcon: PropTypes.element,
  size: PropTypes.oneOf(['normal', 'full']),
};
