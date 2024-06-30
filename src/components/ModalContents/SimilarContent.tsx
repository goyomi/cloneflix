import styled from "styled-components";
import { ISimilar } from "../../type";
import { makeImagePath } from "../../utils";
import { CreditWrapper, MemberCard, MemberWrapper } from "./CastMember";

const SimilarWrapper = styled(CreditWrapper)``;
const ContentWrapper = styled(MemberWrapper)`
  grid-template-columns: repeat(4, 1fr);
`;
const ContentCard = styled(MemberCard)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  .title {
    font-size: 1.7rem;
  }
  .text_wrapper {
    display: flex;
    justify-content: space-between;
    .date,
    .vote_average {
      font-size: 1.4rem;
    }
    .vote_average {
      color: gold;
    }
  }
`;

const ContentImage = styled.div`
  margin-bottom: 1rem;
  aspect-ratio: 1 / 1.5;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: black;
`;

const NoImage = styled(ContentImage)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: currentColor;
`;

function SimilarContent({ similarData, section }: { similarData: ISimilar; section: string }) {
  return (
    <SimilarWrapper>
      <h2 className="title">Similar {section}</h2>
      <ContentWrapper>
        {similarData.results.slice(0, 6).map((data, idx) => (
          <ContentCard key={idx}>
            {data.poster_path ? (
              <ContentImage style={{ backgroundImage: `url(${makeImagePath(data.poster_path)})` }} />
            ) : (
              <NoImage>"No Image"</NoImage>
            )}
            <span className="title">{data.name || data.title}</span>
            <div className="text_wrapper">
              <span className="date">{data.release_date || data.first_air_date}</span>
              <span className="vote_average">★ {data.vote_average}</span>
            </div>
          </ContentCard>
        ))}
      </ContentWrapper>
    </SimilarWrapper>
  );
}

export default SimilarContent;
