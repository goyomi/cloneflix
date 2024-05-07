import styles from "../styles/modal.module.scss";
import { IData, IDetailData } from "../type";
import { makeImagePath, starRating } from "../utils";

function ModalContent({ clickedCard, detailData }: { clickedCard: IData; detailData: IDetailData }) {
  return (
    <section className={styles.content_part}>
      <div
        className={styles.poster_image}
        style={{ backgroundImage: `url(${makeImagePath(clickedCard.poster_path)})` }}
      />
      <div className={styles.text_wrapper}>
        <h2 className={styles.title}>{clickedCard.title || clickedCard.name}</h2>
        <h3 className={styles.original_title}>{clickedCard.original_name}</h3>
        <ul className={styles.detail_info_list}>
          <li>
            <h4>{clickedCard.release_date || clickedCard.first_air_date}</h4>
          </li>
          <li>
            <h4>{detailData.episode_run_time || detailData.runtime} min</h4>
          </li>
          <li>
            <div className={styles.vote_average}>{starRating(clickedCard.vote_average)}</div>
          </li>
        </ul>
        <ul className={styles.genre_list}>
          {detailData.genres.map((val, idx) => (
            <li>
              <h4 key={idx}>{val.name}</h4>
            </li>
          ))}
        </ul>
        <p className={styles.content_overview}>{clickedCard.overview}</p>
      </div>
    </section>
  );
}

export default ModalContent;
