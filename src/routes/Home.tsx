import { useQuery } from "react-query";
import { getMovies } from "../api";
import { IGetMovies } from "../type";

function Home() {
  const { data, isLoading } = useQuery<IGetMovies>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>Home</div>;
}

export default Home;
