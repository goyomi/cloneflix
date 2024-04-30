import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearchData } from "../api";
import { ISearchData } from "../type";
import { makeImagePath } from "../utils";
import styles from "../styles/search.module.scss";

function Search() {
  const { data: movieSearchData } = useQuery<ISearchData>({
    queryKey: ["movie", "search"],
    queryFn: () => getSearchData("movie", keyword),
  });
  const { data: tvSearchData } = useQuery<ISearchData>({
    queryKey: ["tv", "search"],
    queryFn: () => getSearchData("tv", keyword),
  });
  const location = useLocation();
  const keyword = new URLSearchParams(`${location.search}`).get("keyword") || "";

  return (
    <div className={styles["search-container"]}>
      <h2 className={styles["search-title"]}>
        Here are the search results for <strong>'{keyword}'</strong>.
      </h2>
      <section className={styles["movie-search-part"]}>
        <h3 className={styles["section-title"]}>Movie</h3>
        {movieSearchData ? (
          <ul className={styles["card-list"]}>
            {movieSearchData.results.map((movie, idx) => (
              <li key={idx} className={styles["card"]}>
                {movie.backdrop_path ? (
                  <img
                    className={styles["image"]}
                    src={makeImagePath(movie.backdrop_path)}
                    alt={movie.name || movie.title}
                  />
                ) : (
                  <div className={styles["image"]}>"No Image"</div>
                )}
                <span className={styles["name"]}>{movie.name || movie.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>Sorry There are no search results for '{keyword}'.</div>
        )}
      </section>
      <section className={styles["movie-search-part"]}>
        <h3 className={styles["section-title"]}>TV Show</h3>
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
      </section>
    </div>
  );
}

export default Search;
