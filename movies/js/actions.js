async function getMovies() {
  const axiosResponse = await axios.get(
    `${config.api_url}/movie/now_playing?language=es-ES`
  );
  return axiosResponse.data.results;
}

async function getMovie(id = 0) {
  const axiosResponse = await axios.get(`${config.api_url}/movie/${id}`);
  return axiosResponse.data;
}
