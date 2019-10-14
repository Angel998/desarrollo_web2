async function getMovies(limit = 0) {
  const axiosResponse = await axios.get(
    `${config.api_url}/movie/now_playing?language=es-ES`
  );
  const movies = axiosResponse.data.results;
  if (limit > 0 && movies.length > limit) {
    const shortResults = [];
    for (let index = 0; index < limit; index++) {
      shortResults.push(movies[index]);
    }
    return shortResults;
  }
  return movies;
}

async function getMovie(id = 0) {
  const axiosResponse = await axios.get(`${config.api_url}/movie/${id}`);
  return axiosResponse.data;
}

async function getSeries(limit = 0) {
  const axiosResponse = await axios.get(
    `${config.api_url}/tv/popular?language=es-ES`
  );
  const series = axiosResponse.data.results;
  if (limit > 0 && series.length > limit) {
    const shortResults = [];
    for (let index = 0; index < limit; index++) {
      shortResults.push(series[index]);
    }
    return shortResults;
  }
  return series;
}
