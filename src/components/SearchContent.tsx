import styled from "styled-components";
import { ISearchData } from "../type";
import { makeImagePath } from "../utils";

const SearchContentWrapper = styled.section`
  width: 100%;
  margin: 2rem 0 4rem;
`;

const SectionTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContentCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const ContentCard = styled.li`
  overflow: hidden;
`;

const ContentImage = styled.div<{ $backgroundPath: string }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: url(${(props) => props.$backgroundPath}) no-repeat center / cover;
`;

const NoImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: currentColor;
`;

const ContentTitle = styled.span`
  display: block;
  width: 100%;
  height: 5rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  background-color: #2f2f2f;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface ISearchContentProps {
  movieSearchData?: ISearchData;
  tvSearchData?: ISearchData;
  section: string;
}

function SearchContent({ movieSearchData, tvSearchData, section }: ISearchContentProps) {
  const selectData = section === "movie" ? movieSearchData : tvSearchData;
  return (
    <SearchContentWrapper>
      <SectionTitle>{section === "movie" ? "Movie" : "TV Show"}</SectionTitle>
      <ContentCardList>
        {selectData?.results.map((content, idx) => (
          <ContentCard key={idx}>
            {content.backdrop_path ? (
              <ContentImage $backgroundPath={makeImagePath(content.backdrop_path)} />
            ) : (
              <NoImage>"No Image"</NoImage>
            )}
            <ContentTitle>{content.name || content.title}</ContentTitle>
          </ContentCard>
        ))}
      </ContentCardList>
    </SearchContentWrapper>
  );
}

export default SearchContent;
