import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useReducer } from 'react';

const LightDarkContext = createContext('light');
const LightDarkDispatchContext = createContext(null);

function LightDarkProvider({ children }) {
  const [theme, dispatch] = useReducer(lightDarkReducer, 'light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme === 'dark') {
      dispatch({ type: 'toggle' });
    } else if (!localTheme && prefersDark) {
      dispatch({ type: 'toggle' });
    }
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlElement = window.document.documentElement;

    const addThemeClass = (theme) => {
      htmlElement.classList.remove('light', 'dark');
      htmlElement.classList.add(theme);
    };

    if (theme === 'light') {
      addThemeClass('light');
    } else if (theme === 'dark') {
      addThemeClass('dark');
    }

    if (theme === 'system') {
      if (prefersDark) {
        addThemeClass('dark');
      } else {
        addThemeClass('light');
      }
    }

    if (window.localStorage.getItem('theme') === 'system') {
      window.localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
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
