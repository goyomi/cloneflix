import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function App() {
  return (
    <Router basename="/cloneflix">
      <Header />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie/:movieId" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
