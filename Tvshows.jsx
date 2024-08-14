import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MV-TV | Tv Shows " + category.toLocaleUpperCase();

  const getTv = async () => {
    try {
      const response = await axios.get(`/tv/${category}?page=${page}`);
      const { data } = response;

      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const pageHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    pageHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-full h-screen bg-[#1F1E24]">
      <div className="w-full flex p-[2%] items-center">
        <div className="flex items-center">
          <h1 className="text-3xl w-48 font-semibold text-zinc-200">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
            ></i>
            TV Shows
          </h1>
          <h5 className="mt-2 text-zinc-500 text-sm capitalize font-semibold">
            {category}
          </h5>
        </div>
        <TopNav />
        <Dropdown
          title="Category"
          options={["top_rated", "on_the_air", "popular", "airing_today"]}
          func={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        />
        <div className="w-10"></div>
      </div>
      {/* Trending content */}
      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
