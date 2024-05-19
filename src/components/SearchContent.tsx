import styled from "styled-components";
import { ISearchData } from "../type";
import { makeImagePath } from "../utils";

const SearchContentWrapper = styled.section`
  width: 100%;
  margin-top: 2rem;
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const ContentCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 20rem;
  gap: 1rem;
`;

const ContentCard = styled.li`
  .content_image {
    width: 100%;
    height: 15rem;
    object-fit: cover;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: currentColor;
  }
  .content_title {
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
  }
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
      <h3 className="section-title">{section === "movie" ? "Movie" : "TV Show"}</h3>
      <ContentCardList>
        {selectData?.results.map((content, idx) => (
          <ContentCard key={idx}>
            {content.backdrop_path ? (
              <img
                className="content_image"
                src={makeImagePath(content.backdrop_path)}
                alt={content.name || content.title}
              />
            ) : (
              <div className="content_image">"No Image"</div>
            )}
            <span className="content_title">{content.name || content.title}</span>
          </ContentCard>
        ))}
      </ContentCardList>
    </SearchContentWrapper>
  );
}

export default SearchContent;
