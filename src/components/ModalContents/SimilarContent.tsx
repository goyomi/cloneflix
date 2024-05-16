import styled from "styled-components";
import { ISimilar } from "../../type";
import { makeImagePath } from "../../utils";
import { CreditWrapper, MemberCard, MemberWrapper } from "./CastMember";

const SimilarWrapper = styled(CreditWrapper)``;

function SimilarContent({ similarData, section }: { similarData: ISimilar; section: string }) {
  return (
    <SimilarWrapper>
      <h2 className="title">Similar {section}</h2>
      <MemberWrapper>
        {similarData.results.slice(0, 6).map((data, idx) => (
          <MemberCard key={idx}>
            <div className="member_image" style={{ backgroundImage: `url(${makeImagePath(data.poster_path)})` }}>
              {!data.poster_path && "No Image"}
            </div>
            <span>{data.name || data.title}</span>
            <span>(★ {data.vote_average})</span>
          </MemberCard>
        ))}
      </MemberWrapper>
    </SimilarWrapper>
  );
}

export default SimilarContent;
