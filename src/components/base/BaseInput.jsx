import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';

const BaseInput = forwardRef(
  (
    {
      theme = 'normal',
      type = 'text',
      value,
      placeholder,
      onChange,
      leftIcon,
      rightIcon,
      label,
      name,
      max,
      onEnterDown,
      description,
      ...restProps
    },
    ref
  ) => {
    const [isComposing, setIsComposing] = useState(false);

    const handleChange = (value) => {
      const _value = type !== 'number' || value === '' ? value : Number(value);

      if (name) onChange(name, _value);
      else onChange(_value);
    };

    const handleMouseWheel = (e) => {
      if (type === 'number') {
        e.target.blur();
        e.stopPropagation();

        setTimeout(() => {
          e.target.focus();
        }, 0);
      }
    };

    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (isComposing) return;

      if (onEnterDown && e.key === 'Enter') onEnterDown(e, name);
    };

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
    };

    return (
      <InputContainer $theme={theme}>
        {label && (
          <div className="label_wrapper">
            <label htmlFor={`${name}_${value}`}>{label}</label>
          </div>
        )}

        <div className="input_wrapper">
          {leftIcon && leftIcon}
          <input
            type={type}
            value={value}
            name={name}
            id={`${name}_${value}`}
            placeholder={placeholder}
            disabled={theme === 'disabled'}
            onChange={(e) => handleChange(e.target.value)}
            min={0}
            max={max}
            onKeyDown={handleKeyDown}
            ref={ref}
            onWheel={handleMouseWheel}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            {...restProps}
          />
          {rightIcon && rightIcon}
        </div>

        {description && (
          <div className="description_wrapper">
            <BaseIcon size={16} type="info" color="#525866" />
            {description}
          </div>
        )}
      </InputContainer>
    );
  }
);

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.spacing[75]};

  .label_wrapper {
    ${({ theme }) => theme.typography.textPreset4};
  }

  .input_wrapper {
    display: flex;
    border: 1px solid var(--theme-border-color);
    border-radius: ${({ theme }) => theme.radius[8]};
    align-items: center;
    gap: ${({ theme }) => theme.spacing[100]};
    height: 44px;
    padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[200]}`};

    > input {
      all: unset;

      ${({ theme }) => theme.typography.textPreset5};
      width: 100%;
      height: 100%;
      flex: 0 1 auto;
      border: none;
      &::placeholder {
        color: ${({ theme }) => theme.colors.neutral500};
      }
    }
  }

  .description_wrapper {
    ${({ theme }) => theme.typography.textPreset6};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[100]};
    color: ${({ theme }) => theme.colors.neutral600};
  }

  ${({ $theme }) => getInputTheme($theme)};
`;

const getInputTheme = (theme) => {
  switch (theme) {
    case 'normal':
      return css`
        .input_wrapper {
          &:hover {
            background: var(--theme-input-hover-color);
          }
          &:active {
          outline: ${({ theme }) => `2px solid ${theme.colors.neutral500}`};
          outline-offset: 2px;
        }
      `;

    case 'disabled':
      return css`
        .input_wrapper {
          background: ${({ theme }) => theme.colors.neutral50};
          > input {
            cursor: not-allowed;
            &::placeholder {
              color: ${({ theme }) => theme.colors.neutral300};
            }
          }
          > svg path {
            fill: ${({ theme }) => theme.colors.neutral300};
          }
        }

        .description_wrapper {
          color: ${({ theme }) => theme.colors.neutral300};
          > svg path {
            stroke: ${({ theme }) => theme.colors.neutral300};
          }
        }
      `;

    case 'error':
      return css`
        .input_wrapper {
          border: ${({ theme }) => `1px solid ${theme.colors.red500}`};
        }

        .description_wrapper {
          color: ${({ theme }) => theme.colors.red500};
          > svg path {
            stroke: ${({ theme }) => theme.colors.red500};
          }
        }
      `;
  }
};

export default BaseInput;

BaseInput.propTypes = {
  theme: PropTypes.oneOf(['normal', 'disabled', 'error']),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,

  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,

  maxLength: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  max: PropTypes.number,
  onEnterDown: PropTypes.func,

  description: PropTypes.string,
};

BaseInput.displayName = 'BaseInput';
