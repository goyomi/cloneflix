import styled from "styled-components";
import { Container } from "./Loading";

const ErrorContainer = styled(Container)`
  flex-direction: column;
  gap: 1rem;
`;

function Error() {
  return (
    <ErrorContainer>
      <span>Oops! The page you are looking for does not exist.</span>
      <span>Please check the URL and try again🚀.</span>
    </ErrorContainer>
  );
}

export default Error;
