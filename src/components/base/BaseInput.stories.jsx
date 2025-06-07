import Theme from '@styles/theme';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import BaseIcon from '@components/base/BaseIcon';

import BaseInput from './BaseInput';

export default {
  title: 'Components/BaseInput',
  component: BaseInput,
  argTypes: {
    theme: {
      control: 'select',
      options: ['normal', 'disabled', 'error'],
    },
    type: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (_, val) => {
    setValue(val);
  };

  return (
    <ThemeProvider theme={Theme}>
      <BaseInput {...args} value={value} onChange={handleChange} />
    </ThemeProvider>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  theme: 'normal',
  placeholder: '이름을 입력해주세요.',
  label: '이름',
  description: '필수 입력 항목입니다.',
  name: 'name',
  leftIcon: <BaseIcon type="show-password" color={'#717784'} />,
  rightIcon: <BaseIcon type="show-password" color={'#717784'} />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Normal.args,
  theme: 'disabled',
};

export const Error = Template.bind({});
Error.args = {
  ...Normal.args,
  theme: 'error',
  description: '입력값이 유효하지 않습니다.',
};
