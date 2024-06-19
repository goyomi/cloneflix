import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearchData } from "../api";
import { ISearchData } from "../type";
import styled from "styled-components";
import SearchContent from "../components/SearchContent";

const SearchContainer = styled.div`
  margin-top: 8rem;
  width: 100%;
  padding: 0 2rem 2rem;
  & > section:nth-of-type(2) {
    margin-top: 0;
  }
`;

const SearchTitle = styled.h2`
  font-size: 2rem;
  strong {
    font-weight: bolder;
    text-decoration: underline;
  }
`;

function useSearchData(section: string, keyword: string) {
  return useQuery<ISearchData>({
    queryKey: [section, "search", keyword],
    queryFn: () => getSearchData(section, keyword),
  });
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(`${location.search}`).get("keyword") || "";
  const { data: movieSearchData } = useSearchData("movie", keyword);
  const { data: tvSearchData } = useSearchData("tv", keyword);
  const searchDataReady = (movieSearchData?.results?.length ?? 0) > 0 || (tvSearchData?.results?.length ?? 0) > 0;

  return (
    <SearchContainer>
      {searchDataReady ? (
        <>
          <SearchTitle>
            Here are the search results for <strong>'{keyword}'</strong>.
          </SearchTitle>
          {movieSearchData && <SearchContent movieSearchData={movieSearchData} section="movie" />}
          {tvSearchData && <SearchContent tvSearchData={tvSearchData} section="tv" />}
        </>
      ) : (
        <SearchTitle>
          Sorry There are no search results for <strong>'{keyword}'</strong>
          {" : ("}
        </SearchTitle>
      )}
    </SearchContainer>
  );
}

export default Search;
