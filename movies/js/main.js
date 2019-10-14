const config = {
  api_header_token: "Authorization",
  api_url: "https://api.themoviedb.org/3",
  api_token: "Bearer TOKEN_AQUI", // <----------
  poster_url: "https://image.tmdb.org/t/p/w500"
};
const initFunctions = [];

document.addEventListener("DOMContentLoaded", async () => {
  M.Sidenav.init(document.querySelectorAll(".sidenav"), {});
  configAxios();

  await loadScript("js/actions.js");
  await loadScript("js/Movies.js");
  await loadScript("js/Series.js");
  initFunctions.forEach(customFunction => customFunction());
});

function addInitFunction(customFunction) {
  if (typeof customFunction !== "function") return;
  initFunctions.push(customFunction);
}

function configAxios() {
  axios.defaults.headers.common[config.api_header_token] = config.api_token;
}

async function loadScript(url) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

function getPosterImageUrl(file = "") {
  return `${config.poster_url}${file}`;
}

function getSpinner(center = true) {
  const spinner_html = `
    <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
    `;
  return center
    ? `
    <div class="minw-100 center">
    ${spinner_html}
    </div>
    `
    : spinner_html;
}

function getEmptyIcon(message = "") {
  return `
    <div class="text-center w-100 minw-100">
      <img src="img/icon/empty.png" alt="Icono Vacio" />
      <h4>${message}</h4>
    </div>
  `;
}

function isEmpty(value) {
  return (
    value === undefined ||
    value === "undefined" ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

function sleep(seconds = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}
