import {
  fetchPopular,
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
  fetchPoster,
  fetchPopularTV,
  fetchPosterTV,
  fetchTrailer,
  fetchTrailerTV,
  fetchAnimeTV,
  fetchActionAdventure,
} from "../fetch/fetch.js";

let movies = await fetchPopular().then((data) => data.results);
let bollywood = await fetchBollyWood().then((data) => data.results);
let comedy = await fetchComedy().then((data) => data.results);
let anime = await fetchAnime().then((data) => data.results);
let tv = await fetchPopularTV().then((data) => data.results);
let animeTV = await fetchAnimeTV().then((data) => data.results);
let actionAdventure = await fetchActionAdventure().then((data) => data.results);

export function showPoster(item, section) {
  let genres = [];
  if (item.genre_ids) genres = item.genre_ids;
  else {
    for (let genre of item.genres) {
      genres.push(genre.id);
    }
  }
  let values = [item.id, item.trailer, item.type, genres.join("-")];
  if (item.trailer != undefined && item.poster != undefined) {
    $(`#section${section}`).append(
      `
      <div class="item" value="${values}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
      </div>
      `
    );
  }
}

export async function setTrailerPoster(item) {
  let trailers, trailer;
  let posters, poster;
  item.type = item.title ? "M O V I E" : "S E R I E S";
  if (item.type == "M O V I E") {
    trailers = await fetchTrailer(item.id).then((data) => data.results);
    posters = await fetchPoster(item.id).then((data) => data.backdrops);
  } else {
    trailers = await fetchTrailerTV(item.id).then((data) => data.results);
    posters = await fetchPosterTV(item.id).then((data) => data.backdrops);
  }

  if (trailers.length > 0) {
    let randomTrailer = trailers[Math.floor(Math.random() * trailers.length)];
    trailer = randomTrailer.key;
    for (let j of posters) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        poster = j.file_path;
        break;
      } else poster = j.file_path;
    }
  }
  return [trailer, poster];
}

for (let item of movies) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of anime) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of bollywood) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of comedy) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of actionAdventure) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of tv) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of animeTV) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}

export function createPosters() {
  for (let item of movies) {
    showPoster(item, 1);
  }

  for (let item of bollywood) {
    showPoster(item, 2);
  }

  for (let item of anime) {
    showPoster(item, 3);
  }

  for (let item of comedy) {
    showPoster(item, 4);
  }

  for (let item of tv) {
    showPoster(item, 5);
  }
  for (let item of animeTV) {
    showPoster(item, 6);
  }
  for (let item of actionAdventure) {
    showPoster(item, 7);
  }

  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      touchDrag: true,
      mouseDrag: true,
      navText: [
        "<i class='material-icons'>chevron_left</i>",
        "<i class='material-icons'>chevron_right</i>",
      ],
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5,
        },
      },
    });
  })(jQuery);
}
