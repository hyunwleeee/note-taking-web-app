import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

/* 
  sans-serif: inter, 
  serif: noto-serif,
  monospace: source-code-pro 
*/
type FontState = 'sans-serif' | 'serif' | 'monospace';

type FontAction = { type: 'set-font', font: FontState }

const FontContext = createContext<FontState>('sans-serif');
const FontDispatchContext = createContext<Dispatch<FontAction> | null>(null);

function fontReducer(font: FontState, action: FontAction) {
  switch (action.type) {
    case 'set-font':
      return action.font;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

function FontProvider({ children }: { children: ReactNode }) {
  const [font, dispatch] = useReducer(
    fontReducer,
    null,
    () => window.localStorage.getItem('font') as FontState || 'sans-serif'
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.remove('sans-serif', 'serif', 'monospace');
    htmlElement.classList.add(font);

    window.localStorage.setItem('font', font);
  }, [font]);

  return (
    <FontContext.Provider value={font}>
      <FontDispatchContext.Provider value={dispatch}>{children}</FontDispatchContext.Provider>
    </FontContext.Provider>
  );
}


export function useFont() {
  return useContext(FontContext);
}

export function useFontDispatch() {
  return useContext(FontDispatchContext);
}

export default FontProvider;
