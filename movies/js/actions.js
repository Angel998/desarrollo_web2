async function getMovies(limit = 0) {
  const axiosResponse = await axios.get(
    `${config.api_url}/movie/now_playing?language=es-ES`
  );
  const movies = axiosResponse.data.results;
  if (limit > 0) return getMinifiedArray(movies, limit);
  return movies;
}

async function getMovie(id = 0) {
  const axiosResponse = await axios.get(
    `${config.api_url}/movie/${id}?language=es-ES`
  );
  return axiosResponse.data;
}

async function getMovieVideos(id = 0) {
  const axiosResponse = await axios.get(`${config.api_url}/movie/${id}/videos`);
  return axiosResponse.data.results;
}

async function getSeries(limit = 0) {
  const axiosResponse = await axios.get(
    `${config.api_url}/tv/popular?language=es-ES`
  );
  const series = axiosResponse.data.results;
  if (limit > 0) return getMinifiedArray(series, limit);
  return series;
}

function logError(error, text = null) {
  let log_text = "";
  let log_data = {};
  if (error && error.response) {
    const { status, data } = error.response;
    log_text = `${status}`;
    log_data = data;
  }

  if (text) {
    log_text = `${log_text} - ${text} `;
  }

  if (Object.keys(log_data).length > 0) {
    console.log(log_text, log_data);
  } else {
    console.log(log_text);
  }
}
