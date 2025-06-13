import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useReducer } from 'react';

const FontContext = createContext('sans-serif');
const FontDispatchContext = createContext(null);

/* 
  sans-serif: inter, 
  serif: noto-serif,
  monospace: source-code-pro 
*/

function FontProvider({ children }) {
  const [font, dispatch] = useReducer(
    fontReducer,
    null,
    () => window.localStorage.getItem('font') || 'sans-serif'
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.remove('sans-serif', 'serif', 'monospace');
    htmlElement.classList.add(font);

    window.localStorage.setItem('font', font);
  }, [font]);

  return (
    <FontContext.Provider value={font}>
      <FontDispatchContext.Provider value={dispatch}>
        {children}
      </FontDispatchContext.Provider>
    </FontContext.Provider>
  );
}

function fontReducer(_, action) {
  switch (action.type) {
    case 'set-font':
      return action.font;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

export function useFont() {
  return useContext(FontContext);
}

export function useFontDispatch() {
  return useContext(FontDispatchContext);
}

FontProvider.propTypes = {
  children: PropTypes.node,
};

export default FontProvider;
