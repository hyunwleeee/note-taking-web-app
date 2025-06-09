import ModalProvider from '@contexts/modal.context';
import GlobalStyle from '@styles/globalStyle';
import '@styles/lightDark.css';
import Theme from '@styles/theme';
import { createPortal } from 'react-dom';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import AlertComponent from '@components/ui/toast/AlertComponent';

import LightDarkProvider from './contexts/light_dark.context';
import RootRouter from './router';

ReactModal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <LightDarkProvider>
        <GlobalStyle />
        <ModalProvider>
          <RootRouter />
          {/* react-toastify */}
          {createPortal(<AlertComponent />, document.getElementById('alert-root'))}
        </ModalProvider>
      </LightDarkProvider>
    </ThemeProvider>
  );
}

export default App;
