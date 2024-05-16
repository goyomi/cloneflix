import styled from "styled-components";
import { ICredits } from "../../type";
import { makeImagePath } from "../../utils";

export const CreditWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  .title {
    font-size: 2.3rem;
  }
`;

export const MemberWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 7.35vw);
  gap: 1rem;
`;

export const MemberCard = styled.span`
  .member_image {
    margin-bottom: 1rem;
    aspect-ratio: 1 / 1.5;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: currentColor;
  }
  span {
    display: block;
    margin-bottom: 1rem;
    font-size: 1.7rem;
  }
  span:nth-child(2) {
    font-weight: bold;
  }
`;

function CastMember({ creditsData }: { creditsData: ICredits }) {
  return (
    <CreditWrapper>
      <h2 className="title">Cast Members</h2>
      <MemberWrapper>
        {creditsData.cast.map((member, idx) => (
          <MemberCard key={idx}>
            <div className="member_image" style={{ backgroundImage: `url(${makeImagePath(member.profile_path)})` }}>
              {!member.profile_path && "No Image"}
            </div>
            <span>{member.name}</span>
            <span>{member.character}</span>
          </MemberCard>
        ))}
      </MemberWrapper>
    </CreditWrapper>
  );
}

export default CastMember;
