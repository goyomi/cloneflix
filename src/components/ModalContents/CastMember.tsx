import styled from "styled-components";
import { ICredits } from "../../type";
import { useState } from "react";
import ContentWithImage from "../ContentWithImage";

const CreditWrapper = styled.section`
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

const MemberWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 7.35vw);
  gap: 1rem;
`;

const MemberCard = styled.span`
  display: block;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  line-height: calc(1.7rem * 1.2);
`;

const BoldText = styled.span`
  font-weight: bold;
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

  return (
    <CreditWrapper>
      <Title>Cast Members</Title>
      <MemberWrapper>
        {visibleCard.map((member, idx) => (
          <MemberCard key={idx}>
            <ContentWithImage imagePath={member.profile_path} />
            <BoldText>{member.name}</BoldText>
            <span>{member.character}</span>
          </MemberCard>
        ))}
      </MemberWrapper>
      <AccordionButton onClick={toggleAccordion}>{isExpanded ? "▲ Close" : "▼ More"}</AccordionButton>
    </CreditWrapper>
  );
}

export default CastMember;
