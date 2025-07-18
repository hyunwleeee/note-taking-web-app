import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';
import Icon from '@type/icon';

interface IBaseRadioButtonProps {
  name: string;
  value: string | number;
  selected: string | number;
  label: string;
  sub: string;
  iconType: Icon;
  onChange: (name: string, value: string | number) => void,
  disabled?: boolean;
};

interface IRadioLabelProps {
  $isChecked: boolean;
  $isFocused: boolean;
}

function BaseRadioButton({
  name,
  value,
  selected,
  label,
  sub,
  iconType,
  onChange,
  disabled = false,
}: IBaseRadioButtonProps) {
  const checked = selected === value;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <RadioButtonWrapper>
      <input
        type="radio"
        id={`${name}_${value}`}
        name={name}
        value={value}
        onChange={() => onChange(name, value)}
        checked={checked}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <RadioLabel htmlFor={`${name}_${value}`} $isChecked={checked} $isFocused={isFocused}>
        <FlexBox j="stretch" g="16px">
          {iconType && (
            <div className={clsx('icon_wrapper', iconType)}>
              <BaseIcon type={iconType} />
            </div>
          )}
          <div className={'label_wrapper'}>
            <h4>{label && label}</h4>
            <p>{sub && sub}</p>
          </div>
        </FlexBox>
        <div className="circle_wrapper">
          <div className="circle_inner" />
        </div>
      </RadioLabel>
    </RadioButtonWrapper>
  );
}

const RadioButtonWrapper = styled.div`
  input {
    ${({ theme }) => theme['sr-only']};
  }

  .icon_wrapper {
    display: flex;
    border: 1px solid var(--theme-border-color);
    padding: ${({ theme }) => theme.spacing[100]};
    border-radius: ${({ theme }) => theme.radius[12]};
    background-color: var(--theme-bg-color)};
    svg path {
      fill: var(--theme-text-color);
    }
    .sun {
      svg path {
        fill: transparent;
        stroke: var(--theme-text-color);
      }
    }
  }

  .label_wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[75]};
    > h4 {
      ${({ theme }) => theme.typography.textPreset4};
    }
    > p {
      ${({ theme }) => theme.typography.textPreset6};
      color: var(--theme-text2-color);
      margin: 0;
    }
  }
`;

const RadioLabel = styled.label<IRadioLabelProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[200]};
  border: 1px solid var(--theme-border-color);
  border-radius: ${({ theme }) => theme.radius[8]};
  background-color: ${({ $isChecked }) =>
    $isChecked ? 'var(--theme-bg2-color)' : 'var(--theme-bg-color)'};
  &:hover {
    background-color: var(--theme-bg2-color);
  }

  .circle_wrapper {
    flex-shrink: 0;
    transition: 0.2s;
    width: 16px;
    height: 16px;
    background-color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.colors.blue500 : theme.colors.neutral200};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.radius.full};

    > .circle_inner {
      transition: 0.2s;
      width: ${({ $isChecked }) => ($isChecked ? '8px' : '12px')};
      height: ${({ $isChecked }) => ($isChecked ? '8px' : '12px')};
      border-radius: ${({ theme }) => theme.radius.full};
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default BaseRadioButton;
