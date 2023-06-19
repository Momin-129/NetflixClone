import {
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
  fetchPoster,
  fetchTrailer,
  fetchTrending,
  fetchHorror,
  fetchSciFantasy,
} from "../fetch/fetch.js";
import { showPoster, setTrailerPoster } from "../mainPage/posters.js";

let movies = await fetchTrending().then((data) => data.results);
let bollywood = await fetchBollyWood().then((data) => data.results);
let comedy = await fetchComedy().then((data) => data.results);
let anime = await fetchAnime().then((data) => data.results);
let horror = await fetchHorror().then((data) => data.results);
let scifi = await fetchSciFantasy().then((data) => data.results);
let poster = "";

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
for (let item of horror) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of scifi) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of comedy) {
  let trailer = await fetchTrailer(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randomMovie.key;
    item.type = "M O V I E";
    poster = await fetchPoster(item.id).then((data) => data.backdrops);
    for (let j of poster) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        item.poster = j.file_path;
        break;
      } else item.poster = j.file_path;
    }
  }
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
  for (let item of horror) {
    showPoster(item, 5);
  }
  for (let item of scifi) {
    showPoster(item, 6);
  }

  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
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
          items: 6,
        },
      },
    });
  })(jQuery);
}
