class Series {
  state = {
    loading: false,
    series: [],
    autoload: true,
    count_to_show: 12
  };
  div_series_container = document.getElementById("series_container");

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
    const { loading, series } = this.state;
    if (loading) {
      this.setSeriesContent(getSpinner());
    } else if (!loading && series.length > 0) {
      this.showSeries(series);
    } else {
      this.setSeriesContent(getEmptyIcon());
    }
  }

  constructor() {
    this.init();
  }

  async init() {
    if (this.state.autoload) {
      await this.getSeries();
    }
  }

  async getSeries() {
    this.setState({ loading: true });
    try {
      const series = await getSeries(this.state.count_to_show);
      await sleep(2);
      this.setState({ series, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log("Error obteniendo series", err);
    }
  }

  showSeries(series = []) {
    let series_html = ``;
    series.forEach(serie => {
      series_html += this.getSerieHTML(serie);
    });
    this.setSeriesContent(`
        <div class="series">
        ${series_html}
        </div>
        `);
  }

  getSerieHTML(serie = {}) {
    if (isEmpty(serie)) return "";
    const { id, name, overview, poster_path } = serie;
    return `
    <div 
        class="serie" 
        id="serie_${id}"
        style="background: url('${getPosterImageUrl(
          poster_path
        )}') no-repeat center center / cover;">
        <div class="content">
            <div class="details">
                <span class="title">${name}</span>
                <span class="overview">${overview}</span>
            </div>
        </div>
    </div>
      `;
  }

  setSeriesContent(html_code = "") {
    this.div_series_container.innerHTML = html_code;
  }
}

addInitFunction(async () => {
  new Series();
});
