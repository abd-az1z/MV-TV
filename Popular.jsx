import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MV-TV | Popular " + category.toLocaleUpperCase();


  const getPopular = async () => {
    try {
      const response = await axios.get(`${category}/popular?page=${page}`);
      const { data } = response;

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const pageHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    pageHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-screen bg-[#1F1E24]">
      <div className="w-full flex p-[2%] items-center">
        <h1 className="text-3xl font-semibold text-zinc-200">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
          ></i>
          Popular
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        />
        <div className="w-10"></div>
      </div>
      {/* Trending content */}
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
