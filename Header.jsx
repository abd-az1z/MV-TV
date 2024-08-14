import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  const imagePath = data.backdrop_path || data.profile_path || data.poster_path;
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original/${
          imagePath ||
          data.backdrop_path ||
          data.profile_path ||
          data.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top 10%",
      }}
      className="w-[97%] rounded-lg mx-auto h-[42vh] relative"
    >
      <div className="w-[80%] ml-10 p-2 rounded absolute bottom-3 ">
        <h2 className="text-2xl text-zinc-300 font-semibold ">
          {data.original_title || data.title || data.name}
        </h2>
        <p className="text-xs my-1 text-zinc-500 italic overflow-hidden ">
          {data.overview.slice(0, 200)}
          ...<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-300">Know More</Link>
        </p>
        <div className="text-xs mb-2 flex gap-2 text-zinc-300 capitalize">
          <p>
            <i className="text-purple-500 ri-megaphone-fill mr-1 "></i>
            {data.release_date}{" "}
          </p>
          <p>
            <i className="text-purple-500 ri-album-fill mr-1 "></i>
            {data.media_type}{" "}
          </p>
        </div>
        <Link className="text-xs text-blue-400 rounded-full px-3 py-2 font-semibold hover:bg-blue-400 hover:text-zinc-800 duration-300 bg-zinc-800 ">
          <i className="ri-play-circle-fill mr-1 "></i>Watch Now
        </Link>
      </div>
    </div>
  );
}

export default Header;
