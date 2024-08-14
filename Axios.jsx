import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmE5NzhmYWNkY2Q0OWUzMDRmZDFmNzZiMDc4YmJlNSIsIm5iZiI6MTcyMjQ1NDU2My43MTAxMTIsInN1YiI6IjY2YWE5MDI0NGZlNDIxMzEwY2QyYTIwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0WvTRq2JXhbS_wsk8-qIN5PZdt3GtofgiCgV_WDs52o",
  },
});

export default instance;
