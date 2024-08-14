import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="text-zinc-300 px-10 bg-[#1F1E24] flex flex-wrap w-full">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[40vh] mx-[2%] mb-[5%]"
          key={i}
        >
          <img
            className="w-[40vh] object-cover shadow-[#984D78] shadow-2xl"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            })`}
            alt=""
          />
          <div className="mt-3 flex items-center justify-between">
            <h1 className="font-medium text-sm">
              {c.original_title || c.title || c.name}
            </h1>
          </div>
          {(c.vote_average || c.popularity) && (
            <div className="absolute text-xs w-10 overflow-hidden object-contain rounded-full h-10 bg-yellow-600 -right-[7%] bottom-10 flex items-center justify-center">
              {c.vote_average ? (
                <h6>{Math.floor(c.vote_average)}/10</h6>
              ) : (
                <h6>{Math.floor(c.popularity)}</h6>
              )}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
