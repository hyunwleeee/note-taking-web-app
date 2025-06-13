import ModalProvider from '@contexts/modal.context';
import GlobalStyle from '@styles/globalStyle';
import Theme from '@styles/theme';
import '@styles/variables.css';
import { createPortal } from 'react-dom';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import AlertComponent from '@components/ui/toast/AlertComponent';

import FontProvider from './contexts/font.context';
import LightDarkProvider from './contexts/light_dark.context';
import RootRouter from './router';

ReactModal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <LightDarkProvider>
        <FontProvider>
          <GlobalStyle />
          <ModalProvider>
            <RootRouter />
            {/* react-toastify */}
            {createPortal(<AlertComponent />, document.getElementById('alert-root'))}
          </ModalProvider>
        </FontProvider>
      </LightDarkProvider>
    </ThemeProvider>
  );
}

export default App;
