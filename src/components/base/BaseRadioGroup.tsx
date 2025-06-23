import styled from 'styled-components';

import BaseRadioButton from '@components/base/BaseRadioButton.jsx';
import { CSSProperties } from 'react';
import Icon from '@type/icon';

interface IBaseRadioGroup {
  list: { label: string, sub: string, value: string, disabled?: boolean, iconType: Icon }[];
  name: string;
  onChange: () => void;
  selected: string;
  style?: CSSProperties;
};

function BaseRadioGroup({ list, name, onChange, selected, style }: IBaseRadioGroup) {
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
  width: 100%;
  ${({ theme }) => theme.media.laptop`
    width: 528px;
  `}
`;
