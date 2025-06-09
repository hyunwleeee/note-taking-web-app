import ModalProvider from '@contexts/modal.context';
import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import AlertComponent from '@components/ui/toast/AlertComponent';

import RootRouter from './router';
import { createPortal } from 'react-dom';

ReactModal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <ModalProvider>
        <RootRouter />

        {/* react-toastify */}
        {createPortal(<AlertComponent />, document.getElementById('alert-root'))}
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
