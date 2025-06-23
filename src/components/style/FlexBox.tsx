import { CSSProperties, forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

import Spacing from '@assets/styles/spacing';

type FlexJustifyContent = 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'end';
type FlexAlignItems = 'stretch' | 'center' | 'start' | 'end';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';


interface IFlexBoxProps {
  j?: FlexJustifyContent;
  a?: FlexAlignItems;
  d?: FlexDirection;
  g?: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

interface IFlexBoxContainerProps {
  $j: FlexJustifyContent;
  $a: FlexAlignItems;
  $d: FlexDirection;
  $g: string;
}

const FlexBox = forwardRef<HTMLDivElement, IFlexBoxProps>(
  (
    {
      j = 'space-between',
      a = 'center',
      d = 'row',
      g = Spacing[100],
      style,
      className,
      children,
      onClick,
    },
    ref
  ) => {
    return (
      <FlexBoxContainer
        ref={ref}
        style={style}
        className={className}
        $j={j}
        $a={a}
        $d={d}
        $g={g}
        onClick={onClick}
      >
        {children}
      </FlexBoxContainer>
    );
  }
);

const FlexBoxContainer = styled.div<IFlexBoxContainerProps>`
  display: flex;
  justify-content: ${(props) => props.$j};
  align-items: ${(props) => props.$a};
  flex-direction: ${(props) => props.$d};
  gap: ${(props) => props.$g};
`;

export default FlexBox;


FlexBox.displayName = 'FlexBox';
