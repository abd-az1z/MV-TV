import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./templates/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "MV-TV | Trending " + category.toLocaleUpperCase();

  const getTrending = async () => {
    try {
      const response = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      const { data } = response;

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const pageHandler = ()=>{
    if (trending.length === 0) {
      getTrending();
    }else{
      setPage(1);
      setTrending([]);
      getTrending();
    }
  }

  useEffect(() => {
    pageHandler();
  }, [category, duration]);

  
  return trending.length > 0 ? (
    <div className="w-full h-screen bg-[#1F1E24]">
      <div className="w-full flex p-[2%] items-center">
        <h1 className="text-3xl font-semibold text-zinc-200">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
          ></i>
          Trending
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={["movie", "person", "tv", "all"]}
          func={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        />
        <div className="w-10"></div>
        <Dropdown
          title="Duration"
          options={["day", "week"]}
          func={(e) => {
            setDuration(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {/* Trending content */}
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;