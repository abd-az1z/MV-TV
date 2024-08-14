import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import NotFound from "./NotFound";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  return (
    <div className="text-white top-0 left-0 z-[999] absolute w-full h-screen bg-[#000001ad] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:bg-[#6556cd] text-3xl text-[#6556cd] hover:rounded-md duration-[.5s] hover:text-white right-[5%] top-[5%] ri-close-line"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          width={1200}
          height={600}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
