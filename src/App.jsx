import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import Logo from './components/ui/header/Logo';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Logo />
      <h1>hyunwlee</h1>
    </ThemeProvider>
  );
}

export default App;
