import { css } from 'styled-components';

import Spacing from './spacing';

const BREAK_POINTS = Object.freeze({
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
});

const Media = Object.keys(BREAK_POINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${BREAK_POINTS[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const Inner = css`
  padding: ${Spacing[200]};

  ${Media.tablet`
    padding: ${Spacing[200]} ${Spacing[400]};
  `}
`;

export { BREAK_POINTS, Media, Inner };
