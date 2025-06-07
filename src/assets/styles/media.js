import { css } from 'styled-components';

export const BREAK_POINTS = Object.freeze({
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

export default Media;
