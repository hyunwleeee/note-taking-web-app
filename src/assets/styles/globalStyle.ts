import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'inter';
    src: url('/assets/fonts/inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'inter';
    src: url('/assets/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'noto-serif';
    src: url('/assets/fonts/noto-serif/NotoSerif-VariableFont_wdth,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'noto-serif';
    src: url('/assets/fonts/noto-serif/NotoSerif-Italic-VariableFont_wdth,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'source-code-pro';
    src: url('/assets/fonts/source-code-pro/SourceCodePro-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'source-code-pro';
    src: url('/assets/fonts/source-code-pro/SourceCodePro-Italic-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    font-size: 16px;
    overflow-x: hidden;
    background-color: var(--theme-bg2-color);
    color: var(--theme-text-color);
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox  */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  /* react-modal */
  .modal_overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  ul, ol, li {
    list-style: none;
  }
`;

export default GlobalStyle;
