import useNavigation from '@hooks/useNavigation';
import { useLayoutStore } from '@store/layoutStore';
import styled from 'styled-components';

import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';

function PageController() {
  const { deviceType } = useLayoutStore();

  const { Navigate } = useNavigation();

  const isResponsiveLaptop = deviceType === 'laptop';

  if (isResponsiveLaptop) return null;

  return (
    <PageControllerContainer>
      <FlexBox g={'4px'}>
        <BaseButton theme="ghost" className="svg_fill" onClick={() => Navigate.goBack()}>
          <BaseIcon type="arrow-left" color="#525866" />
          <span className="text">Go Back</span>
        </BaseButton>
      </FlexBox>
      <FlexBox g={'16px'}>
        <BaseButton theme="ghost">
          <BaseIcon type="delete" color="#525866" />
        </BaseButton>

        <BaseButton theme="ghost" className="svg_fill">
          <BaseIcon type="restore" color="#525866" />
        </BaseButton>

        <BaseButton theme="ghost" texture="Cancel" />

        <BaseButton theme="ghost" texture="Save Note" className="text_blue" />
      </FlexBox>
    </PageControllerContainer>
  );
}

export default PageController;

const PageControllerContainer = styled(FlexBox)`
  height: 50px;
  border-bottom: 1px solid var(--theme-divider2-color);
  background: var(--theme-bg-color);
  color: var(--theme-text-color);
  > div:first-child button svg {
    width: 16px;
  }
`;
