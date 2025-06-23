import { css } from 'styled-components';
import Spacing from './spacing';

const BREAK_POINTS = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;

type BreakPoint = keyof typeof BREAK_POINTS;

type Callback = (...args: Parameters<typeof css>) => ReturnType<typeof css>;

type Media = {
  [key in BreakPoint]: Callback;
};

const Media = (Object.keys(BREAK_POINTS) as BreakPoint[]).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${BREAK_POINTS[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {} as Media);

const Inner = css`
  padding: ${Spacing[200]};

  ${Media.tablet`
    padding: ${Spacing[200]} ${Spacing[400]};
  `}
`;

export { BREAK_POINTS, Media, Inner };
