import BaseButton from '@components/base/BaseButton';
import BaseIcon from '@components/base/BaseIcon';
import FlexBox from '@components/style/FlexBox';
import styled from 'styled-components';
import { useLayoutStore } from "@store/layoutStore";

function PageController() {
  const { deviceType } = useLayoutStore();

  const isResponsiveLaptop = deviceType === 'laptop';

  if (isResponsiveLaptop) return null;

  return (
    <PageControllerContainer>
      <FlexBox g={'4px'}>
        <BaseButton theme="ghost" className='svg_fill'>
          <BaseIcon type='arrow-left' color='#525866' size={18} />
          <span className='text'>Go Back</span>
        </BaseButton>
      </FlexBox>
      <FlexBox g={'16px'}>
        <BaseButton
          theme="ghost"
        >
          <BaseIcon type='delete' color='#525866' />
        </BaseButton>

        <BaseButton
          theme="ghost"
          className='svg_fill'
        >
          <BaseIcon
            type='restore'
            color='#525866'
          />
        </BaseButton>

        <BaseButton
          theme='ghost'
          texture='Cancel'
        />

        <BaseButton
          theme='ghost'
          texture='Save Note'
          className='text_blue'
        />
      </FlexBox>
    </PageControllerContainer>
  )
}

export default PageController;

const PageControllerContainer = styled(FlexBox)`
  height: 50px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
`;
