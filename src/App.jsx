import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <h1>hyunwlee</h1>
    </ThemeProvider>
  );
}

export default App;
