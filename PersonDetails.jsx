import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removeperson } from "../store/reducers/PersonSilce";
import { asyncLoadperson } from "../store/actions/personAction";
import Loading from "./templates/Loading";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("movie");
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        backgroundImage: "url('/public/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="px-[13%] w-full h-[200vh] flex flex-col"
    >
      {/* part-1 */}
      <nav className="w-full h-[10vh] flex items-center gap-10 text-2xl text-zinc-200">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
        ></Link>
      </nav>
      {/* Part-2 */}
      <div className="w-full flex gap-10 items-center">
        <div className="w-[30%]">
          <img
            to=""
            className="w-[40vh] object-cover rounded-xl shadow-[#E1F6FC] shadow-2xl"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path ||
              info.detail.backdrop_path ||
              info.detail.profile_path
            }`}
            alt=""
          />
        </div>
        <div className="w-[65%] text-white mt-5">
          <h1 className="font-bold tracking-wider text-5xl ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
          </h1>
          <h3 className="text-2xl font-semibold mt-2 tracking-wider">
            Biography
          </h3>
          <p className="opacity-80 mt-2 italic">{info.detail.biography}</p>
        </div>
      </div>
      {/* details */}
      <div className="text-white p-3 mt-5 tracking-wide ">
        {info.detail.also_known_as.length > 0 && (
          <h3 className="font-semibold text-lg my-2">
            Popularly Known As:{" "}
            <span className="text-zinc-400">
              {info.detail.also_known_as.join(", ")}
            </span>
          </h3>
        )}
        <div>
          <h3 className="font-semibold">
            Birth Date:{" "}
            <span className="text-zinc-400">{info.detail.birthday}</span>
          </h3>
          <h3 className="font-semibold my-2 ">
            Gender:{" "}
            <span className="text-zinc-400">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </span>{" "}
          </h3>
          <h3 className="font-semibold my-2 ">
            Resembles:{" "}
            <span className="text-zinc-400">
              {info.detail.known_for_department}
            </span>{" "}
          </h3>
          <h3 className="font-semibold ">
            Birth Place:{" "}
            <span className="text-zinc-400">{info.detail.place_of_birth}</span>{" "}
          </h3>
        </div>
        <div className="flex gap-x-5 items-center text-zinc-200 text-xl mt-3">
          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-external-link-line mr-2 hover:text-[#6556CD]"></i>
            <span>Check out on:</span>
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalId.facebook_id}/`}
          >
            <i className="ri-facebook-circle-fill hover:text-[#6556CD]"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalId.instagram_id}/?hl=en`}
          >
            <i className="ri-instagram-fill hover:text-[#6556CD]"></i>
          </a>
          <a
            target="_blank"
            href={`https://x.com/${info.externalId.twitter_id}`}
          >
            <i className="ri-twitter-x-line hover:text-[#6556CD]"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          >
            <i className="ri-global-line hover:text-[#6556CD]"></i>
          </a>
        </div>
      </div>
      {/* part-3 || Movie and TV Credits */}
      <div className="mt-5 flex justify-between">
        <h1 className="text-2xl font-semibold text-white items-center">Acting</h1>
        <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
      </div>
      <div className="list-disc  text-zinc-400 w-full mt-5 shadow-[#6556cd] h-[50vh] overflow-x-hidden p-5 overflow-y-auto shadow-lg border-[1px] border-zinc-500 ">
        <ul>
          {category === "movie" &&
            info.movie_credits.cast.map((movie, i) => (
              <li
                key={i}
                className="hover:text-white cursor-pointer duration-300"
              >
                <Link className="flex items-center" to={`/movie/${movie.id}`}>
                  <span className="text-xl"> {movie.title || movie.original_title} : </span>
                  <span className="block ">
                    - {movie.character && ` Character: ${movie.character}`}
                  </span>
                </Link>
              </li>
            ))}
          {category === "tv" &&
            info.tv_credits.cast.map((tvShow, i) => (
              <li
                key={i}
                className="hover:text-white cursor-pointer duration-300"
              >
                <Link className="flex" to={`/tv/${tvShow.id}`}>
                  <span  className="text-xl"> {tvShow.name || tvShow.original_name} : </span>
                  <span className="block ">
                    - {tvShow.character && ` Character: ${tvShow.character}`}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;