import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removetv } from "../store/reducers/TvSlice";
import Loading from "./templates/Loading";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path ||
          info.detail.profile_path ||
          info.detail.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full h-[200vh] px-[10%]  "
    >
      <nav className="w-full h-[10vh] flex items-center gap-10 text-2xl text-zinc-200">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-fill font-normal mr-3 hover:text-[#6556CD]"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-global-line hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.detail.imdb_id}/`}
        >
          <i className="ri-star-half-s-fill hover:text-yellow-400"></i>
        </a>
      </nav>
      <div className="flex items-center gap-10 w-full">
        <div className="w-[35%]">
          <img
            to=""
            className="w-[40vh] object-cover rounded-xl shadow-[#E1F6FC] shadow-2xl"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            })`}
            alt=""
          />
        </div>
        {/* details */}
        <div className="w-[65%] text-zinc-200 bg-zinc-800 p-3 bg-opacity-50 rounded ">
          <h1 className="font-bold text-5xl mb-1 ">
            {info.detail.title || info.detail.name || info.original_name}
          </h1>
          {info.detail.tagline && (
            <h3 className="font-medium text-2xl mb-1 ">
              {info.detail.tagline}
            </h3>
          )}
          <div className="flex items-center gap-20 mb-1 opacity-90 ">
            {info.detail.first_air_date && (
              <h3 className="font-semibold text-sm">
                Release Date:{" "}
                <span className="text-xs">{info.detail.first_air_date}</span>
              </h3>
            )}
            {info.detail.vote_average && (
              <h3 className="font-semibold text-sm ">
                Rating:{" "}
                <span className="text-xs">{info.detail.vote_average}</span>
              </h3>
            )}
          </div>
          {/* Genres */}
          {info.detail.genres && info.detail.genres.length > 0 && (
            <div>
              <h3 className="font-semibold text-white">
                Genres:{" "}
                <span className="text-zinc-300 text-sm italic">
                  {info.detail.genres.map((g) => g.name).join(", ")}
                </span>
              </h3>
            </div>
          )}
          {/* Spoken Languages */}
          {info.detail.spoken_languages &&
            info.detail.spoken_languages.length > 0 && (
              <div className="flex items-center mb-1 gap-20">
                <h3 className="font-semibold text-white  ">
                  Spoken Languages:
                </h3>
                <p className="italic text-sm ">
                  {info.detail.spoken_languages
                    .map((l) => l.english_name)
                    .join(", ")}
                </p>
              </div>
            )}
          {/* Translations Available */}
          {info.translations && info.translations.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold text-white">
                Translations Available:
              </h3>
              <p className="text-sm">{info.translations.join(", ")}</p>
            </div>
          )}
          {/* Overview */}
          {info.detail.overview && (
            <p className="text-xs my-2 mb-4 italic">{info.detail.overview}</p>
          )}
          {/* Watch Now Button */}
          <Link
            to={`${pathname}/trailer`}
            className="px-5 py-3 mt-2 rounded-full bg-[#6556CD] text-sm"
          >
            Watch Trailer
          </Link>
        </div>
      </div>
      {/* seasons and episodes */}
      <h1 className="mt-5 text-3xl font-semibold text-white">Seasons</h1>
      <div className="w-full min-h-[30vh]  ">
        <div className="w-full pb-2 flex overflow-x-scroll">
          {info.detail.seasons.length > 0 ? (
            info.detail.seasons.map((s, i) => (
              <div
                key={i}
                className="mr-2 rounded-lg bg-zinc-900 p-2 flex-shrink-0"
              >
                <div className="w-[20vh] h-[30vh] overflow-hidden rounded-lg ">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      s.imagePath ||
                      s.backdrop_path ||
                      s.profile_path ||
                      s.poster_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.imagePath ||
                            s.backdrop_path ||
                            s.profile_path ||
                            s.poster_path
                          }`
                        : "/public/noimage.jpg"
                    }
                    alt={s.title || s.name}
                  />
                </div>
                <div className="text-center mt-2 text-white">
                  <h3 className=" font-semibold">Season {s.season_number}</h3>
                  <p className="text-sm">Total Episodes: {s.episode_count}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black">No seasons available</p>
          )}
        </div>
      </div>
      {/* buy rent etc */}
      <div className="w-full mt-3 items-center text-zinc-200">
        {info.watchProviders?.flarate &&
          info.watchProviders.flarate.length > 0 && (
            <div className="flex gap-x-10 items-center">
              <h4 className="text-sm px-5 py-1 rounded-full text-white font-medium bg-red-600">
                Flatrate
              </h4>
              {info.watchProviders.flarate.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

        {info.watchProviders?.rent && info.watchProviders.rent.length > 0 && (
          <div className="flex my-5 gap-x-10 items-center">
            <h4 className="text-sm px-5 py-1 rounded-full text-white font-medium bg-yellow-600">
              Rent
            </h4>
            {info.watchProviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchProviders?.buy && info.watchProviders.buy.length > 0 && (
          <div className="flex gap-x-10 items-center">
            <h4 className="text-sm px-5 py-1 mr-2 rounded-full text-white font-medium bg-green-600">
              Buy
            </h4>
            {info.watchProviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      {/* recommendations and similarity */}
      <div className="w-full h-[2px] my-10 bg-zinc-500"></div>
      <h1 className="font-bold text-3xl mb-2 tracking-wider text-zinc-200 mt-10">
        Recommendations
      </h1>
      {info.recommendations && info.recommendations.length > 0 && (
        <div className="w-full min-h-[40vh]">
          <div className="w-full">
            <div className="w-[100%] pb-2 flex overflow-y-hidden">
              {info.recommendations.length > 0
                ? info.recommendations.map((r, i) => (
                    <Link
                      to={`/${r.media_type}/details/${r.id}`}
                      key={i}
                      className="min-w-[20%] bg-zinc-900 mr-4 rounded-lg p-3"
                    >
                      <img
                        className="w-full object-cover"
                        src={
                          r.imagePath ||
                          r.backdrop_path ||
                          r.profile_path ||
                          r.poster_path
                            ? `https://image.tmdb.org/t/p/original/${
                                r.imagePath ||
                                r.backdrop_path ||
                                r.profile_path ||
                                r.poster_path
                              }`
                            : "/public/noimage.jpg"
                        }
                        alt={r.title || r.name}
                      />
                      <div className="p-2 min-h-fit">
                        <h2 className="text-lg text-slate-100 font-semibold">
                          {r.original_title || r.title || r.name}
                        </h2>
                        <p className="text-xs text-zinc-300 italic">
                          {r.overview.slice(0, 170)}
                          <span className="text-slate-100">...More</span>
                        </p>
                      </div>
                    </Link>
                  ))
                : info.similar.map((sim, index) => (
                    <Link
                      to={`/${sim.media_type}/details/${sim.id}`}
                      key={index}
                      className="min-w-[20%] bg-zinc-900 mr-4 rounded-lg p-3"
                    >
                      <img
                        className="w-full object-cover"
                        src={
                          sim.imagePath ||
                          sim.backdrop_path ||
                          sim.profile_path ||
                          sim.poster_path
                            ? `https://image.tmdb.org/t/p/original/${
                                sim.imagePath ||
                                sim.backdrop_path ||
                                sim.profile_path ||
                                sim.poster_path
                              }`
                            : "/public/noimage.jpg"
                        }
                        alt={sim.title || sim.name}
                      />
                      <div className="p-2 min-h-fit">
                        <h2 className="text-lg text-slate-100 font-semibold">
                          {sim.original_title || sim.title || sim.name}
                        </h2>
                        <p className="text-xs text-zinc-300 italic">
                          {sim.overview.slice(0, 170)}
                          <span className="text-slate-100">...More</span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
            <Outlet />
          </div>
        </div>
      )}{" "}
      : <h1 className="text-white text-4xl italic">Not Available</h1>
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
