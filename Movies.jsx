import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Movies = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MV-TV | Movie " + category.toLocaleUpperCase();

  const getMovie = async () => {
    try {
      const response = await axios.get(`/movie/${category}?page=${page}`);
      const { data } = response;

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const pageHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    pageHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-full h-screen bg-[#1F1E24]">
      <div className="w-full flex p-[2%] items-center">
        <h1 className="text-3xl font-semibold text-zinc-200">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
          ></i>
          Movie
        </h1>
        <h5 className="ml-1 mt-2 text-zinc-500 text-sm capitalize font-semibold">{category}</h5>
        <TopNav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        />
        <div className="w-10"></div>
      </div>
      {/* Trending content */}
      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
