import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-left: -1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const Page = styled.div<{ $key: number; $index: number }>`
  width: 3rem;
  height: 1.5rem;
  background-color: ${(props) => (props.$key === props.$index ? "rgb(96, 96, 96, 1)" : "rgb(96, 96, 96, 0.4)")};
  border-radius: 0.5rem;
`;

function SliderPagination({ maxIndex, currentPage }: { maxIndex: number; currentPage: number }) {
  return (
    <Wrapper>
      {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
        <Page $key={idx} $index={currentPage} />
      ))}
    </Wrapper>
  );
}

export default SliderPagination;
