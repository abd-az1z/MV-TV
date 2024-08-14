import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="w-[20%] h-screen border-r-2 border-zinc-400 p-3 ">
      <div className="flex items-center mt-5 gap-5 ml-8 ">
        <i className="ri-tv-fill text-3xl  text-[#6556cd]"></i>
        <h1
          onClick={handleHomeClick}
          className=" cursor-pointer font-bold text-2xl"
        >
          MV-TV
        </h1>
      </div>
      <nav className="flex flex-col text-zinc-400">
        <h1 className="font-semibold text-white text-2xl mt-8 ml-8">
          New Feed
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5"
        >
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5"
        >
          <i className="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link
          to="/movies"
          className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5"
        >
          <i className="ri-film-fill mr-2"></i>Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5">
          <i className="ri-movie-2-fill mr-2"></i>TV Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5">
          <i className="ri-team-fill mr-2"></i>People
        </Link>
      </nav>
      <nav className="flex flex-col text-zinc-400">
        <h1 className="font-semibold text-white text-2xl mt-5 ml-8">
          Know More
        </h1>
        <Link className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5">
          <i className="ri-information-fill mr-2"></i>About Us
        </Link>
        <Link className="hover:bg-[#6556cd] rounded-lg duration-300 hover:text-white p-5">
          <i className="ri-phone-fill mr-2"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
