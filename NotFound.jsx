import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="relative w-full h-full flex justify-center opacity-80 text-white items-center bg-black" >
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:bg-[#6556cd] text-3xl text-[#6556cd] hover:rounded-md duration-[.5s] hover:text-white right-[5%] top-[5%] ri-close-line"
      ></Link>
      <div className="card flex items-center justify-center flex-col">
        <h1 className="text-9xl text-zinc-400 font-semibold font-mono ">4 0 4</h1>
        <h3 className="text-4xl absolute z-[998] font-semibold font-mono">Not Found</h3>
      </div>
      <div className="card1"></div>
    </div>
  );
};

export default NotFound;
