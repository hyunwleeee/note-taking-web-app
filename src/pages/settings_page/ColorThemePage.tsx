import { useLightDark, useLightDarkDispatch } from '@contexts/light_dark.context';
import styled from 'styled-components';

import BaseRadioGroup from '@components/base/BaseRadioGroup';

function ColorThemePage() {
  const theme = useLightDark();
  const diapatch = useLightDarkDispatch();
  return (
    <PageWrapper>
      <h3>Color Theme</h3>
      <p>Choose your color theme:</p>
      <BaseRadioGroup
        name="theme"
        list={[
          {
            label: 'Light Mode',
            sub: 'Pick a clean and classic light theme',
            value: 'light',
            iconType: 'sun',
          },
          {
            label: 'Dark Mode',
            sub: 'Select a sleek and modern dark theme',
            value: 'dark',
            iconType: 'moon',
          },
          {
            label: 'System',
            sub: "Adapts to your device's theme",
            value: 'system',
            iconType: 'settings',
          },
        ]}
        selected={theme}
        onChange={(_, value) => {
          diapatch({ type: 'set-theme', theme: value });
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

export default ColorThemePage;
