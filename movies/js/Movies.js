class Movies {
  state = {
    loading: false,
    movies: [],
    autoload: true,
    count_movies_to_show: 12
  };
  div_movies_container = document.getElementById("movies_container");

  setState(state = {}) {
    if (isEmpty(state)) return;
    const oldState = this.state;
    const newState = { ...this.state, ...state };
    this.state = newState;
    if (oldState !== newState) {
      this.render();
    }
  }

  render() {
    const { loading, movies } = this.state;
    if (loading) {
      this.setMoviesContainerContent(getSpinner(true));
    } else if (!loading && movies.length > 0) {
      this.showMovies(movies);
    } else {
      this.setMoviesContainerContent(getEmptyIcon());
    }
  }

  constructor() {
    this.init();
  }

  async init() {
    if (!this.state.autoload)
      return this.setMoviesContainerContent(getEmptyIcon());
    await this.loadMovies();
  }

  async loadMovies() {
    this.setState({ loading: true });
    try {
      const movies = await getMovies(this.state.count_movies_to_show);
      await sleep(2);
      this.setState({ movies, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      logError(err, "Error obteniendo Peliculas");
    }
  }

  showMovies(movies = []) {
    if (movies.length === 0) return this.setMoviesContainerContent("");
    let movies_html = ``;
    movies.forEach(movie => (movies_html += this.getMovieHtmlCode(movie)));
    return this.setMoviesContainerContent(`
    <div class="movies">
      ${movies_html}
    </div>
    `);
  }

  getMovieHtmlCode(movie = {}) {
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

  setMoviesContainerContent(html_code = "") {
    this.div_movies_container.innerHTML = html_code;
  }
}

addInitFunction(async () => {
  new Movies();
});
