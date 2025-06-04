import { css } from 'styled-components';

const commonFontStyle = css`
  line-height: 120%;
`;

const Typography = {
  textPreset1: css`
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    ${commonFontStyle}
  `,
  textPreset2: css`
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.5px;
    ${commonFontStyle}
  `,
  textPreset3: css`
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.3px;
    ${commonFontStyle}
  `,
  textPreset4: css`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.2px;
    ${commonFontStyle}
  `,
  textPreset5: css`
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.2px;
    ${commonFontStyle}
  `,
  textPreset6: css`
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.2px;
    ${commonFontStyle}
  `,
};

export default Typography;
