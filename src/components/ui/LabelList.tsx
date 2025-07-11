
import { IssueType } from '@type/github';
import styled from 'styled-components';

function LabelList({ labelList }: { labelList?: IssueType['labels'] }) {
  // NOTE:
  // Archived가 아닌 label만 필터링하고
  // label이 객체일 때만 반환하는 안전한 타입 좁히기
  const filteredLabelList = labelList?.filter(
    (
      label
    ): label is { name: string; color: string } => {
      if (typeof label !== 'object' || label === null) return false;
      if (!('name' in label)) return false;
      return label.name !== 'Archived';
    }
  );

  return (
    <LabelLiistWrapper>
      {filteredLabelList?.map((item, idx) => {
        if (typeof item !== 'object') return null;
        if (typeof item.color !== 'string') return null;

        return (
          <LabelContainer
            key={idx}
            $color={item.color}
          >
            {item.name}
          </LabelContainer>
        );
      })}
    </LabelLiistWrapper>);
}

const LabelLiistWrapper = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing[50]};
`;

const LabelContainer = styled.li<{ $color: string }>`
  padding: ${({ theme }) => `${theme.spacing[25]} ${theme.spacing[75]}`};
  border-radius: ${({ theme }) => theme.radius[4]};
  ${({ theme }) => theme.typography.textPreset6};
  border: ${({ $color }) => `1px solid #${$color}`};
  position: relative;
  &::after {
    position: absolute;
    content: '';
    inset: 0;
    background: ${({ $color }) => `#${$color}50`};
  }
`;

export default LabelList;
