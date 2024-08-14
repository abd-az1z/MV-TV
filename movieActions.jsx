import axios from "../../utils/Axios";
import { loadmovie } from "../reducers/MovieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const reviews = await axios.get(`/movie/${id}/reviews`);
    const translations = await axios.get(`/movie/${id}/translations`);

    let allDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((v) => v.type === "Trailer"),
      watchProviders: watchProviders.data.results.US,
      reviews: reviews.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
    };

    dispatch(loadmovie(allDetails));
  } catch (error) {
    console.error(error);
  }
};
