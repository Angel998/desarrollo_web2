const div_movies_container = document.getElementById("movies_container");
const movies_state = {
  _loading: false,
  _movies: [],
  autoload: false,
  count_movies_to_show: 12,
  // Loading Events
  get loading() {
    return this._loading;
  },
  set loading(loading) {
    if (loading === this._loading) return;
    this._loading = loading;
    setMoviesContainerContent(getSpinner(true, this._loading));
  },
  get movies() {
    return this._movies;
  },
  set movies(newMovies) {
    if (!Array.isArray(newMovies)) return;
    this._loading = false;
    if (newMovies.length > this.count_movies_to_show) {
      const movies = [];
      for (let index = 0; index < this.count_movies_to_show; index++) {
        movies.push(newMovies[index]);
      }
      newMovies = movies;
    }
    this._movies = newMovies;
    onGetMovies(this._movies);
  }
};

async function initMoviesComponents() {
  if (!movies_state.autoload) return setMoviesContainerContent(getEmptyIcon());
  await loadMovies();
}

async function loadMovies() {
  movies_state.loading = true;
  try {
    const movies = await getMovies();
    movies_state.movies = movies;
  } catch (err) {
    console.log("movie.js - loadMovies", err);
    movies_state.loading = false;
  }
}

function onGetMovies(movies = []) {
  if (movies.length === 0) {
    return setMoviesContainerContent(getEmptyIcon());
  }
  let movies_html = ``;
  movies.forEach(movie => (movies_html += getMovieHtmlCode(movie)));
  return setMoviesContainerContent(`
  <div class="movies">
    ${movies_html}
  </div>
  `);
}

function getMovieHtmlCode(movie = {}) {
  if (isEmpty(movie)) return "";
  const { poster_path, overview, title, id } = movie;
  return `
  <div 
    class="movie" 
    id="movie_${id}"
    style="background: url('${getPosterImageUrl(
      poster_path
    )}') no-repeat center center / cover;">
    <div class="movie-content">
        <div class="movie-details text-center">
            <span class="movie-title">${title}</span>
            <span class="movie-overview truncate">${overview}</span>
        </div>
    </div>
  </div>
  `;
}

// ===== Helpers ====
function setMoviesContainerContent(html_code = "") {
  div_movies_container.innerHTML = html_code;
}

addInitFunction(initMoviesComponents);
