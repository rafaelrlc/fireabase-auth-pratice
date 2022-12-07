import styled from "styled-components";

const StyledInvalidPage = styled.h1`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InvalidPage = () => {
  return (
    <div>
      <StyledInvalidPage>Page Not Found</StyledInvalidPage>;
      <StyledInvalidPage>404</StyledInvalidPage>;
    </div>
  );
};

export default InvalidPage;
