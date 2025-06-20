import PropTypes from 'prop-types';
import { useId } from 'react';
import styled from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';

function BaseCheckBox({ name, value, onChange, checked, disabled }) {
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
        <div>
          <BaseIcon type="checkmark" />
        </div>
        <h4>{name}</h4>
      </label>
    </CheckBoxWrapper>
  );
}

const CheckBoxWrapper = styled.div`
  input {
    ${({ theme }) => theme['sr-only']};
  }

  label {
    display: flex;
    align-items: center;
    ${({ theme }) => theme.typography.textPreset4};
    div {
      width: 16px;
      height: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--theme-border2-color);
      border-radius: ${({ theme }) => theme.radius.full};
      svg path {
        transition: 0.2s;
        fill: ${({ $checked, theme }) => ($checked ? theme.colors.blue500 : 'transparent')};
      }
    }
  }
`;

export default BaseCheckBox;

BaseCheckBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.func,
};
