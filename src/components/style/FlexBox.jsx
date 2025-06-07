import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

import Spacing from '@assets/styles/spacing';

const FlexBox = forwardRef(
  (
    { j = 'space-between', a = 'center', d = 'row', g = Spacing.s, className, children, onClick },
    ref
  ) => {
    return (
      <FlexBoxContainer
        ref={ref}
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

const FlexBoxContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.$j};
  align-items: ${(props) => props.$a};
  flex-direction: ${(props) => props.$d};
  gap: ${(props) => props.$g};
`;

export default FlexBox;

FlexBox.propTypes = {
  j: PropTypes.oneOf(['start', 'center', 'space-between', 'space-around', 'space-evenly']),
  a: PropTypes.oneOf(['stretch', 'center', 'start', 'end']),
  d: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  g: PropTypes.oneOf(Object.values(Spacing)),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

FlexBox.displayName = 'FlexBox';
