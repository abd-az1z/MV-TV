import axios from "../../utils/Axios";
import { loadtv } from "../reducers/TvSlice";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const reviews = await axios.get(`/tv/${id}/reviews`);
    const translations = await axios.get(`/tv/${id}/translations`);

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

    dispatch(loadtv(allDetails));
  } catch (error) {
    console.error(error);
  }
};
