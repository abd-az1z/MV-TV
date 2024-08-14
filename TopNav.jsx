import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/public/noimage.jpg";

function TopNav() {
  const [query, setquery] = useState("");

  const [searches, setsearches] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="w-full h-[8vh] relative flex justify-start pl-[15%] items-center ">
      <i className="ri-search-line text-3xl text-zinc-400"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search"
        className="bg-transparent text-zinc-400 w-[60%] mx-14 p-3 text-xl rounded outline-none  "
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="ri-close-fill text-3xl text-zinc-400"
        ></i>
      )}
      <div className="absolute overflow-auto rounded-md top-[80%] left-[23%] mx-auto z-50 w-[60%] max-h-[50vh] bg-zinc-200 ">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`} 
            key={i}
            className="p-4 w-full flex justify-between items-center border-b-2 border-zinc-100 text-zinc-700 font-semibold hover:text-black hover:bg-zinc-300 duration-200 "
          >
            <span>
              {s.title || s.original_title || s.name || s.original_name}
            </span>
            <img
              className="w-[8vh] h-[8vh] rounded object-cover overflow-hidden shadow-2xl "
              src={
                s.backdrop_path || s.profile_path || s.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path || s.poster_path
                    }`
                  : noimage
              }
              alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopNav;
