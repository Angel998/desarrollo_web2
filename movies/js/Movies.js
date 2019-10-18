class Movies {
  state = {
    loading: false,
    movies: [],
    autoload: true,
    count_movies_to_show: 12
  };
  modal_id = "modal_pelicula";
  div_movies_container = document.getElementById("movies_container");
  div_modal_content = document.getElementById("modal_pelicula_detalles");

  setState(state = {}) {
    if (isEmpty(state)) return;
    const oldState = this.state;
    const newState = { ...this.state, ...state };
    this.state = newState;
    if (oldState !== newState) {
      this.render();
    }
  }

  constructor(modal_id = null) {
    if (modal_id) {
      this.modal_id = modal_id;
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
      onclick="movies.onClickMovie(this)"
      class="movie" 
      movie_id="${id}"
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

  // Events

  async onClickMovie(movie_element) {
    const movie_id = movie_element.getAttribute("movie_id");
    const modal = this.getMovieModalInstance();
    modal.open();
    this.setMovieModalContent(getSpinner());
    try {
      const movie = await getMovie(movie_id);
      const videos = await getMovieVideos(movie_id);

      movie.production_companies = movie.production_companies.filter(
        pc => !isEmpty(pc.logo_path)
      );

      this.setMovieModalContent(`
        ${this.getMovieCardInfo(movie)}
        ${this.getMovieTrailersAndCompaniesHTML(
          videos,
          movie.production_companies
        )}
      `);
    } catch (err) {
      this.setMovieModalContent("");
    }
  }

  getMovieCardInfo(movie) {
    const {
      backdrop_path,
      title,
      overview,
      release_date,
      runtime,
      vote_count
    } = movie;
    return `
    <div class="card">
      <div class="card-image">
        <img
          src="${getPosterImageUrl(backdrop_path)}"
        />
        <span class="card-title">
          ${title}
        </span>
      </div>
      <div class="card-content">
        <p>${overview}</p>

        <div class="mb-1">
          <p>Duracion: ${runtime}</p>
          <p>Fecha: ${release_date}</p>
          <p class="valign-wrapper right">
            <span>${vote_count}</span>
            <i class="material-icons">
              favorite
            </i>
          </p>
        </div>
      </div>
    </div>
    `;
  }

  getMovieTrailersAndCompaniesHTML(trailers = [], companies = []) {
    let html_iframes = ``;
    let html_companies = ``;
    trailers.forEach(trailer => {
      html_iframes += `
      <div class="movie-trailer">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${trailer.key}"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      `;
    });
    companies.forEach(comp => {
      html_companies += `
      <div class="movie-production col s3">
        <img
          src="${getPosterImageUrl(comp.logo_path)}"
          alt=""
          class="responsive-img"
        />
      </div>
      `;
    });
    return `
    <div class="card">
      <div class="card-content no-padding">
        ${html_iframes}
        <div class="row valign-wrapper movie-productions">
          ${html_companies}
        </div>
      </div>
    </div>
    `;
  }

  onCloseMovieModal() {
    const modal = this.getMovieModalInstance();
    this.setMovieModalContent("");
    modal.close();
  }

  getMovieModalInstance() {
    return M.Modal.getInstance(document.getElementById(this.modal_id));
  }
  setMoviesContainerContent(html_code = "") {
    this.div_movies_container.innerHTML = html_code;
  }

  setMovieModalContent(html_code = "") {
    this.div_modal_content.innerHTML = html_code;
  }
}

const movies = new Movies();
addInitFunction(async () => {
  await movies.init();
});
