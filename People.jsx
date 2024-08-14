import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MV-TV | People " + category.toLocaleUpperCase();

  const getPerson = async () => {
    try {
      const response = await axios.get(`/person/${category}?page=${page}`);
      const { data } = response;
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const pageHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };
  useEffect(() => {
    pageHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full h-screen bg-[#1F1E24]">
      <div className="w-full flex p-[2%] items-center">
        <h1 className="text-3xl font-semibold text-zinc-200">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
          ></i>
          People
        </h1>
        <h5 className="ml-1 mt-2 text-zinc-500 text-sm capitalize font-semibold">
          {category}
        </h5>
        <TopNav />
      </div>
      {/* Trending content */}
      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
