import styles from "./styles/modal.module.scss";

export function makeImagePath(id: string, width?: string) {
  return `https://image.tmdb.org/t/p/${width ? width : "original"}/${id}`;
}

export function starRating(vote_average: number) {
  const fullStar = Math.floor(vote_average / 2);
  const halfStar = vote_average % 2 >= 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar - halfStar;

  return (
    <>
      {Array(fullStar)
        .fill(0)
        .map((_, idx) => (
          <span key={idx} className={styles.full}>
            ★
          </span>
        ))}
      {halfStar > 0 && <span className={styles.half}>★</span>}
      {Array(emptyStar)
        .fill(0)
        .map((_, idx) => (
          <span key={idx}>★</span>
        ))}
    </>
  );
}
