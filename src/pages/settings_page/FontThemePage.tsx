import { useFont, useFontDispatch } from '@contexts/font.context';
import styled from 'styled-components';

import BaseRadioGroup from '@components/base/BaseRadioGroup';

function FontThemePage() {
  const font = useFont();
  const diapatch = useFontDispatch();

  return (
    <PageWrapper>
      <h3>Font Theme</h3>
      <p>Choose your font theme:</p>
      <BaseRadioGroup
        name="font"
        list={[
          {
            label: 'Sans-serif',
            sub: 'Clean and modern, easy to read.',
            value: 'sans-serif',
            iconType: 'font-sans-serif',
          },
          {
            label: 'Serif',
            sub: 'Classic and elegant for a timeless feel.',
            value: 'serif',
            iconType: 'font-serif',
          },
          {
            label: 'Monospace',
            sub: 'Code-like, great for a technical vibe.',
            value: 'monospace',
            iconType: 'font-monospace',
          },
        ]}
        selected={font}
        onChange={(_, value) => {
          diapatch({ type: 'set-font', font: value });
        }}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  ${({ theme }) => theme.inner};
  h3 {
    ${({ theme }) => theme.typography.textPreset3};
    margin-bottom: ${({ theme }) => theme.spacing[50]}};
  }
  p {
    ${({ theme }) => theme.typography.textPreset5};
    margin-bottom: ${({ theme }) => theme.spacing[300]}};
  }
`;

export default FontThemePage;
