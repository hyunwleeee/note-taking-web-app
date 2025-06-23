import 'styled-components';
import type { Theme } from './theme.type';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}
