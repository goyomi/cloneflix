import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";
import Movie from "./routes/Movie";

function App() {
  return (
    <Router basename="/cloneflix">
      <Header />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/tv/:category/:tvId" element={<Tv />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie/:category/:movieId" element={<Movie />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv/trending/:tvId" element={<Home />} />
        <Route path="/movie/trending/:movieId" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
