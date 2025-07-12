import GlobalStyle from '@assets/styles/globalStyle';
import Theme from '@assets/styles/theme';
import '@styles/variables.css';
import { createPortal } from 'react-dom';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import AlertComponent from '@components/ui/toast/AlertComponent';

import FontProvider from './contexts/font.context';
import LightDarkProvider from './contexts/light_dark.context';
import RootRouter from './router';
import { ModalProvider } from './contexts/modal.context';
import FirebaseAuthProvider from '@contexts/auth.context';
import Modals from '@components/ui/modal/Modals';

ReactModal.setAppElement('#root');

function App() {
  return (
    <FirebaseAuthProvider>
      <ThemeProvider theme={Theme}>
        <LightDarkProvider>
          <FontProvider>
            <GlobalStyle />
            <ModalProvider>
              <RootRouter />
              <Modals />
              {/* react-toastify */}
              {createPortal(<AlertComponent />, document.getElementById('alert-root')!)}
            </ModalProvider>
          </FontProvider>
        </LightDarkProvider>
      </ThemeProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
