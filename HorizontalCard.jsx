import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

function HorizontalCard({ data }) {
  return (
    <div className="w-full h-[60vh] px-5 ">
      <div className="w-[100%] flex overflow-y-hidden pb-2">
        {data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className=" min-w-[20%] shadow-black shadow-lg bg-zinc-900 mr-2"
          >
            <img
              className="w-full h-[40%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.imagePath ||
                d.backdrop_path ||
                d.profile_path ||
                d.poster_path
              }`}
              alt=""
            />
            <div className="p-2 h-[60%] ">
              <h2 className="text-lg mt-2 text-zinc-300 font-semibold ">
                {d.original_title || d.title || d.name}
              </h2>
              <p className="text-xs text-zinc-500 italic ">
                {d.overview.slice(0, 70)}
                <span className="text-slate-300">...More</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalCard;
