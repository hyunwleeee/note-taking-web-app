import styled from 'styled-components';

function PageHeader() {
  const header = 'Settings';
  return (
    <PageHeaderContainer>
      <h3>{header}</h3>
    </PageHeaderContainer>
  );
}

const PageHeaderContainer = styled.div`
  border: 2px solid red;
`;

export default PageHeader;
