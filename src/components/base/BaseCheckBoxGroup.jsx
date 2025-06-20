import PropTypes from 'prop-types';

import BaseCheckBox from './BaseCheckBox';

function BaseCheckBoxGroup({ value, onChange, options }) {
  const handleChange = (target) => {
    const arr = value.includes(target) ? value.filter((v) => v !== target) : [...value, target];
    onChange(arr);
  };

  return (
    <ul>
      {options.map((option, idx) => (
        <BaseCheckBox
          key={idx}
          name={option.name}
          value={option.value}
          checked={value.includes(option.value)}
          onChange={handleChange}
        />
      ))}
    </ul>
  );
}

export default BaseCheckBoxGroup;

BaseCheckBoxGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.object,
};
