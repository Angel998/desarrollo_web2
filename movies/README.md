## Aplicacion WEB

[https://angel2h.com/web/movies/](https://angel2h.com/web/movies/)

Para ajustar la app a tu configuracion solo es necesario reemplazar "TOKEN_AQUI" con tu token el cual lo puedes obtener en [TheMovieDB](https://www.themoviedb.org/settings/api)

```
// js/main.js
const config = {
  api_header_token: "Authorization",
  api_url: "https://api.themoviedb.org/3",
  api_token: "Bearer TOKEN_AQUI", // <----------
  poster_url: "https://image.tmdb.org/t/p/w500"
};
```

### Vista Previa

![A2H Movies Header](https://i.imgur.com/l8lSaz0.jpg)

![A2H Movies](https://i.imgur.com/6DuIoO5.jpg)
