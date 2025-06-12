import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseRadioButton from '@components/base/BaseRadioButton.jsx';

const BaseRadioGroup = ({ list, name, onChange, selected, style }) => {
  return (
    <BaseRadioWrapper style={style}>
      {list.map((item, index) => (
        <BaseRadioButton
          key={index}
          name={name}
          label={item.label}
          sub={item.sub}
          onChange={onChange}
          value={item.value}
          selected={selected}
          disabled={item.disabled}
          iconType={item.iconType}
        />
      ))}
    </BaseRadioWrapper>
  );
};

export default BaseRadioGroup;

const BaseRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[200]};
  width: 528px;
`;

BaseRadioGroup.propTypes = {
  list: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.string,
  style: PropTypes.element,
};
