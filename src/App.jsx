import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import RootRouter from './router';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RootRouter />
    </ThemeProvider>
  );
}

export default App;
