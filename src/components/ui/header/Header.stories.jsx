import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

import Header from './Header';

export default {
  component: Header,
  title: 'Components/Header',
};

const Template = () => (
  <ThemeProvider theme={Theme}>
    <Header />
    <em>responsive (mobile / tablet) 환경에서만 나타납니다.</em>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
