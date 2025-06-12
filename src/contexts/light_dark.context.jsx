import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useReducer } from 'react';

const LightDarkContext = createContext('light');
const LightDarkDispatchContext = createContext(null);

function LightDarkProvider({ children }) {
  const [theme, dispatch] = useReducer(lightDarkReducer, 'light');

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'dark') {
      dispatch({ type: 'toggle' });
    } else if (!localTheme && isDark) {
      dispatch({ type: 'toggle' });
    }
  }, []);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlElement = window.document.documentElement;
    if (htmlElement) {
      if (theme === 'light') {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
      } else if (theme === 'dark') {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
      } else {
        if (isDark) {
          htmlElement.classList.remove('light');
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
          htmlElement.classList.add('light');
        }
      }
    }
    if (window.localStorage.getItem('theme') === 'system') {
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } else {
      window.localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
    }
  }, [theme]);

  return (
    <LightDarkContext.Provider value={theme}>
      <LightDarkDispatchContext.Provider value={dispatch}>
        {children}
      </LightDarkDispatchContext.Provider>
    </LightDarkContext.Provider>
  );
}

export default LightDarkProvider;

LightDarkProvider.propTypes = {
  children: PropTypes.node,
};

export function useLightDark() {
  return useContext(LightDarkContext);
}

export function useLightDarkDispatch() {
  return useContext(LightDarkDispatchContext);
}

function lightDarkReducer(theme, action) {
  switch (action.type) {
    case 'toggle':
      return theme === 'light' ? 'dark' : 'light';
    case 'set-theme':
      return action.theme;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}
