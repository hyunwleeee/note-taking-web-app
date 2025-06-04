import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import BaseButton from './BaseButton';
import BaseIcon from '@components/base/BaseIcon';

export default {
  component: BaseButton,
  title: 'Components/BaseButton',
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'border'],
    },
    texture: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => (
  <ThemeProvider theme={Theme}>
    <BaseButton {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  theme: 'primary',
  texture: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: 'secondary',
  texture: 'Secondary Button',
};

export const Border = Template.bind({});
Border.args = {
  theme: 'border',
  texture: 'Border Button',
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  theme: 'border',
  texture: 'Restore',
  leftIcon: <BaseIcon type='restore' />
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  theme: 'border',
  texture: 'Restore',
  rightIcon: <BaseIcon type='restore' />
};

export const Disabled = Template.bind({});
Disabled.args = {
  theme: 'primary',
  texture: 'Disabled',
  disabled: true,
};
