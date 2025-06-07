import clsx from "clsx";
import PropTypes from "prop-types";
import styled, { css } from 'styled-components';

function BaseButton({
  theme = 'primary',
  leftIcon,
  texture,
  rightIcon,
  ...restProps
}) {
  return (
    <StyledButton
      {...restProps}
      className={clsx(theme, restProps.className)}
    >
      {leftIcon && <span className='left'>{leftIcon}</span>}
      {texture && <span className='text'>{texture}</span>}
      {rightIcon && <span className='right'>{rightIcon}</span>}
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

  ${({ theme }) => theme.typography.textPreset6};
  padding: ${({ theme }) => `${theme.spacing[150]} ${theme.spacing[200]}`};
  border-radius: ${({ theme }) => theme.radius[8]};

  cursor: pointer;

  .text, svg {
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
    background: ${({ theme }) => theme.colors.blue500};
    
    &:hover {
      background: ${({ theme }) => theme.colors.blue700};
    }

    &:active {
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral400}`};
      background: ${({ theme }) => theme.colors.blue500};
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
    color: ${({ theme }) => theme.colors.neutral950};
    border: ${({ theme }) => `1px solid ${theme.colors.neutral300}`};

    &:hover {
      color: ${({ theme }) => theme.colors.neutral600};
      background: ${({ theme }) => theme.colors.neutral100};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral100}`};

      svg path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }

    &:active {
      color: ${({ theme }) => theme.colors.neutral950};
      background: ${({ theme }) => theme.colors.white};
      border: ${({ theme }) => `1px solid ${theme.colors.neutral950}`};
      outline: ${({ theme }) => `2px solid ${theme.colors.neutral400}`};
      outline-offset: 2px;

      svg path {
        fill: ${({ theme }) => theme.colors.neutral950};
      }
    }

    ${disabledStyles}
  }

  &.ghost {
    padding: ${({ theme }) => theme.spacing[25]};
    color: ${({ theme }) => theme.colors.neutral600};

    &:hover {
      color: ${({ theme }) => theme.colors.neutral950};
      background: ${({ theme }) => theme.colors.neutral100};
      svg path {
        stroke: ${({ theme }) => theme.colors.neutral950};
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
        background: ${({ theme }) => theme.colors.neutral100};
        svg path {
          stroke: transparent;
          fill: ${({ theme }) => theme.colors.neutral950};
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
  leftIcon: PropTypes.element,
  texture: PropTypes.string,
  rightIcon: PropTypes.element,
};

