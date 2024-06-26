import styled from "styled-components";
import { ICredits } from "../../type";
import { makeImagePath } from "../../utils";
import { useState } from "react";

export const CreditWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2.3rem;
`;

export const MemberWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 7.35vw);
  gap: 1rem;
`;

export const MemberCard = styled.span`
  span {
    display: block;
    margin-bottom: 1rem;
    font-size: 1.7rem;
  }
  span:nth-child(2) {
    font-weight: bold;
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

const AccordionButton = styled.button`
  margin: 0 auto;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

function CastMember({ creditsData }: { creditsData: ICredits }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleAccordion = () => setIsExpanded((prev) => !prev);
  const visibleCard = isExpanded ? creditsData.cast : creditsData.cast.slice(0, 6);

  console.log(isExpanded);
  return (
    <CreditWrapper>
      <Title>Cast Members</Title>
      <MemberWrapper>
        {visibleCard.map((member, idx) => (
          <MemberCard key={idx}>
            {member.profile_path ? (
              <ContentImage style={{ backgroundImage: `url(${makeImagePath(member.profile_path)})` }} />
            ) : (
              <NoImage>"No Image"</NoImage>
            )}
            <span>{member.name}</span>
            <span>{member.character}</span>
          </MemberCard>
        ))}
      </MemberWrapper>
      <AccordionButton onClick={toggleAccordion}>{isExpanded ? "▲ Close" : "▼ More"}</AccordionButton>
    </CreditWrapper>
  );
}

export default CastMember;
