import { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import Header from "./templates/Header";
import HorizontalCard from "./templates/HorizontalCard";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";

const Home = () => {
  document.title = "Home";

  const [trending, setTrending] = useState(null);
  const [wallpaper, setWallpaper] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const response = await axios.get(`/trending/all/day`);
      const { data } = response;
      let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getTrending = async () => {
    try {
      const response = await axios.get(`/trending/${category}/day`);
      const { data } = response;
      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (!wallpaper) getHeaderWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <div className="text-white flex ">
        <SideNav />
        <div className="w-full lg:w-[80%] h-screen overflow-hidden overflow-x-auto">
          <TopNav />
          <Header data={wallpaper} />
          <div className="flex justify-between items-center my-3 px-4">
            <h1 className="text-3xl font-semibold text-zinc-300">Trending</h1>
            <Dropdown
              func={(e) => setCategory(e.target.value)}
              title="Filter"
              options={["Movie", "TV", "All"]}
            />
          </div>
          <HorizontalCard data={trending} />
        </div>
      </div>
    </>
  ) : (
    <Loading/>
  );
};

export default Home;