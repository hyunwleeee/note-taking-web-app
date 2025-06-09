import ModalProvider from '@contexts/modal.context';
import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import RootRouter from './router';

ReactModal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ModalProvider>
        <RootRouter />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
