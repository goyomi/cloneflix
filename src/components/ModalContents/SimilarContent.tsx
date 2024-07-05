import styled from "styled-components";
import { ISimilar } from "../../type";
import ContentWithImage from "../ContentWithImage";

const SimilarWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2.3rem;
  text-transform: capitalize;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ContentCard = styled.span`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem; // 배경과 컨텐츠 차이나게 하기
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  font-size: 1.7rem;
  line-height: calc(1.7rem * 1.2);
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextCommon = styled.span`
  font-size: 1.4rem;
`;

const VoteAverage = styled(TextCommon)`
  color: gold;
`;

function SimilarContent({ similarData, section }: { similarData: ISimilar; section: string }) {
  return (
    <SimilarWrapper>
      <Title>Similar {section}</Title>
      <ContentWrapper>
        {similarData.results.slice(0, 6).map((data, idx) => (
          <ContentCard key={idx}>
            <ContentWithImage imagePath={data.poster_path} />
            <BoldText>{data.name || data.title}</BoldText>
            <TextWrapper>
              <TextCommon>{data.release_date || data.first_air_date}</TextCommon>
              <VoteAverage>★ {data.vote_average}</VoteAverage>
            </TextWrapper>
          </ContentCard>
        ))}
      </ContentWrapper>
    </SimilarWrapper>
  );
}

export default SimilarContent;
