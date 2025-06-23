import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

type LightDarkState = 'light' | 'dark' | 'system';

type LightDarkAction =
  | { type: 'toggle' }
  | { type: 'set-theme', theme: LightDarkState }

function lightDarkReducer(theme: LightDarkState, action: LightDarkAction) {
  switch (action.type) {
    case 'toggle':
      return theme === 'light' ? 'dark' : 'light';
    case 'set-theme':
      return action.theme;
    default:
      throw new Error('Unknown action');
  }
}

const LightDarkContext = createContext<LightDarkState>('light');
const LightDarkDispatchContext = createContext<Dispatch<LightDarkAction> | null>(null);

function LightDarkProvider({ children }: { children: ReactNode }) {
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

    const addThemeClass = (theme: LightDarkState) => {
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

    if (theme === 'system') {
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

export function useLightDark() {
  return useContext(LightDarkContext);
}

export function useLightDarkDispatch() {
  return useContext(LightDarkDispatchContext);
}
