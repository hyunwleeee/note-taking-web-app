import BaseIcon from './BaseIcon';

export default {
  title: 'Components/BaseIcon',
  component: BaseIcon,
  argTypes: {
    type: {
      control: 'select',
      options: [
        'archive',
        'arrow-left',
        'checkmark',
        'chevron-right',
        'clock',
        'cross',
        'delete',
        'font-monospace',
        'font-sans-serif',
        'font-serif',
        'font',
        'google',
        'hide-password',
        'home',
        'info',
        'lock',
        'logout',
        'menu',
        'moon',
        'plus',
        'restore',
        'search',
        'settings',
        'show-password',
        'status',
        'sun',
        'system-theme',
        'tag',
      ],
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

const Template = (args) => <BaseIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'archive',
  size: 24,
  color: '#0E121B',
};
