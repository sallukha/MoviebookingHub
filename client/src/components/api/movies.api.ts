import axios from "axios";
const api = axios.create({
  baseURL: " /api/v1/movies",
});
export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};
export const addMovie = async (data: FormData) => {
  const res = await api.post("/movies/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
