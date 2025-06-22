import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseCheckBox from './BaseCheckBox';

function BaseCheckBoxGroup({ value, onChange, options }) {
  const handleChange = (target) => {
    const arr = value.includes(target) ? value.filter((v) => v !== target) : [...value, target];
    onChange(arr);
  };

  return (
    <CheckBoxGroupContainer>
      {options.map((option, idx) => (
        <BaseCheckBox
          key={idx}
          name={option.name}
          value={option.value}
          checked={value.includes(option.value)}
          onChange={handleChange}
        />
      ))}
    </CheckBoxGroupContainer>
  );
}

const CheckBoxGroupContainer = styled.ul`
  display: flex;
  row-gap: ${({ theme }) => theme.spacing[100]};
  column-gap: ${({ theme }) => theme.spacing[200]};
`;

export default BaseCheckBoxGroup;

BaseCheckBoxGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.object,
};
