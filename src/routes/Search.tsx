import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearchData } from "../api";
import { ISearchData } from "../type";
import { makeImagePath } from "../utils";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-top: 8rem;
  width: 100%;
  padding: 0 2rem 2rem;

  .search-title {
    font-size: 2rem;
    strong {
      font-weight: bolder;
    }
  }
`;

const SearchContent = styled.section`
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(`${location.search}`).get("keyword") || "";
  const { data: movieSearchData } = useQuery<ISearchData>({
    queryKey: ["movie", "search", keyword],
    queryFn: () => getSearchData("movie", keyword),
  });
  const { data: tvSearchData } = useQuery<ISearchData>({
    queryKey: ["tv", "search", keyword],
    queryFn: () => getSearchData("tv", keyword),
  });

  return (
    <SearchContainer>
      <h2 className="search-title">
        Here are the search results for <strong>'{keyword}'</strong>.
      </h2>
      <SearchContent>
        <h3 className="section-title">Movie</h3>
        {movieSearchData ? (
          <ContentCardList>
            {movieSearchData.results.map((movie, idx) => (
              <ContentCard key={idx}>
                {movie.backdrop_path ? (
                  <img
                    className="content_image"
                    src={makeImagePath(movie.backdrop_path)}
                    alt={movie.name || movie.title}
                  />
                ) : (
                  <div className="content_image">"No Image"</div>
                )}
                <span className="content_title">{movie.name || movie.title}</span>
              </ContentCard>
            ))}
          </ContentCardList>
        ) : (
          <div>Sorry There are no search results for '{keyword}'.</div>
        )}
      </SearchContent>
      {/* <SearchContent>
        <h3 className="section-title">TV Show</h3>
        {tvSearchData ? (
          <ul className={styles["card-list"]}>
            {tvSearchData.results.map((tv, idx) => (
              <li key={idx} className={styles["card"]}>
                {tv.backdrop_path ? (
                  <img className={styles["image"]} src={makeImagePath(tv.backdrop_path)} alt={tv.name || tv.title} />
                ) : (
                  <div className={styles["image"]}>"No Image"</div>
                )}
                <span className={styles["name"]}>{tv.name || tv.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>Sorry There are no search results for '{keyword}'.</div>
        )}
      </SearchContent> */}
    </SearchContainer>
  );
}

export default Search;
