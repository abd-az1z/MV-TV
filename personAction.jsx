import axios from "../../utils/Axios";
import { loadperson } from "../reducers/PersonSilce";

export const asyncLoadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combined_credits = await axios.get(`/person/${id}/combined_credits`);
    const movie_credits = await axios.get(`/person/${id}/movie_credits`);
    const tv_credits = await axios.get(`/person/${id}/tv_credits`);

    let allDetails = {
      detail: detail.data,
      externalId: externalId.data,
      combined_credits: combined_credits.data,
      movie_credits: movie_credits.data,
      tv_credits: tv_credits.data
    };

    dispatch(loadperson(allDetails));
  } catch (error) {
    console.error(error);
  }
};
