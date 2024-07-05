import styled from "styled-components";
import { ISearchData } from "../type";
import ContentWithImage from "./ContentWithImage";

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

const customImageStyle = `
  margin-bottom: 0;
  aspect-ratio: 16 / 9;
`;

const customNoImageStyle = `
  aspect-ratio: 16 / 9;
  margin-bottom: 0;
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
            <ContentWithImage
              imagePath={content.backdrop_path}
              customImageStyle={customImageStyle}
              customNoImageStyle={customNoImageStyle}
            />
            <ContentTitle>{content.name || content.title}</ContentTitle>
          </ContentCard>
        ))}
      </ContentCardList>
    </SearchContentWrapper>
  );
}

export default SearchContent;
