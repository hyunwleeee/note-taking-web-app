import { useId } from 'react';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';

interface IBaseCheckBoxProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  checked: boolean;
  disabled?: boolean;
};

interface ICheckBoxWrapperProps {
  $checked: boolean;
}

function BaseCheckBox({ name, value, onChange, checked, disabled }: IBaseCheckBoxProps) {
  const id = useId();

  return (
    <CheckBoxWrapper $checked={checked}>
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <label htmlFor={id}>
        <div className="checkmark_wrapper">
          <BaseIcon type="checkmark" />
        </div>
        <h4>{name}</h4>
      </label>
    </CheckBoxWrapper>
  );
}

const CheckBoxWrapper = styled.div<ICheckBoxWrapperProps>`
  input {
    ${({ theme }) => theme['sr-only']};
  }

  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[50]};
    ${({ theme }) => theme.typography.textPreset4};
    cursor: pointer;
    .checkmark_wrapper {
      position: relative;
      display: flex;
      justifyContent: center,
      align-items: center;
      width: 20px;
      > svg path {
        transition: 0.2s;
        fill: ${({ $checked, theme }) => ($checked ? theme.colors.blue500 : 'transparent')};
      }

      &::after {
        position: absolute;
        content: '';
        border-radius: ${({ theme }) => theme.radius.full};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border: ${({ $checked }) => !$checked && '1px solid var(--theme-border-color)'};
      }
    }
  }
`;

export default BaseCheckBox;


