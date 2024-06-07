import { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 5rem;
  }
`;

function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        } else {
          return "";
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      <span>Loading{dots}</span>
    </Container>
  );
}

export default Loading;
