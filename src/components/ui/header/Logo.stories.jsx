import Logo from './Logo';
import styled from 'styled-components';

export default {
  component: Logo,
  title: 'Components/Logo',
  argTypes: {
    className: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
};

const Wrapper = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  padding: 16px;
  display: inline-block;
`;

const Template = (args) => (
  <Wrapper backgroundColor={args.backgroundColor}>
    <Logo {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  className: '',
  backgroundColor: 'transparent',
};

export const LightGrayBackground = Template.bind({});
LightGrayBackground.args = {
  ...Default.args,
  backgroundColor: 'lightgray',
};

