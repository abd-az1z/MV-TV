import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removemovie } from "../store/reducers/MovieSlice";
import Loading from "./templates/Loading";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removemovie());
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
      className="relative w-full h-[170vh] px-[10%]  "
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
          <h1 className="font-bold text-5xl ">{info.detail.title}</h1>
          <h3 className="font-medium text-3xl mt-3">{info.detail.tagline}</h3>
          <div className="flex justify-between opacity-90 ">
            <h3 className="font-semibold text-sm">
              Release Date: <span>{info.detail.release_date}</span>
            </h3>
            <h3 className="font-semibold text-sm ">
              Rating: <span>{info.detail.vote_average}</span>{" "}
            </h3>
            <h3 className="font-semibold text-sm ">
              Duration: <span>{info.detail.runtime}min</span>{" "}
            </h3>
          </div>
          <div className=" flex items-center gap-20 mt-3">
            <div>
              <h3 className="font-semibold text-white text-lg ">Genres:</h3>
              <h5 className="text-sm italic">
                {info.detail.genres.map((g) => g.name).join(",")}
              </h5>
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg ">
                Spoken Languages:
              </h3>
              <h5 className="italic text-sm ">
                {info.detail.spoken_languages
                  .map((l) => l.english_name)
                  .join(",")}
              </h5>
            </div>
          </div>
          <p className="opacity-90 text-zinc-100 font-light my-3 italic">
            {info.detail.overview}
          </p>
          <h3 className="font-semibold text-white">Translations Available:</h3>
          <p className="text-sm mb-5">{info.translations.join(", ")}</p>
          <Link
            to={`${pathname}/trailer`}
            className="px-5 py-3 rounded-full bg-[#6556CD] text-sm"
          >
            Watch Trailer
          </Link>
        </div>
      </div>
      {/* buy rent etc */}
      <div className=" w-full items-center text-zinc-200">
        {info.watchProviders && info.watchProviders.flarate && (
          <div className="flex gap-x-10 items-center">
            <h4 className="text-sm px-5 py-1 rounded-full text-white font-medium bg-red-600">
              Flatrate
            </h4>
            {info.watchProviders.flarate.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex my-5 gap-x-10 items-center">
            <h4 className="text-sm px-5 py-1 rounded-full text-white font-medium bg-yellow-600 ">
              Rent
            </h4>
            {info.watchProviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-10 items-center">
            <h4 className="text-sm px-5 py-1 mr-2 rounded-full text-white font-medium bg-green-600">
              Buy
            </h4>
            {info.watchProviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      {/* recommendations and similarity */}
      <div className="w-full h-[2px] my-10 bg-zinc-500"></div>
      <div className="w-full min-h-[40vh]">
        <h2 className="font-bold text-3xl mb-5 text-zinc-200 mt-10">
          Recommended
        </h2>
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
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
