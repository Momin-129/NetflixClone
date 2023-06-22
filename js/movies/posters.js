import {
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
  fetchTrending,
  fetchHorror,
  fetchSciFantasy,
} from "../fetch/fetch.js";
import { showPoster, setTrailerPoster } from "../mainPage/posters.js";

// fetching different movies
let movies = await fetchTrending().then((data) => data.results);
let bollywood = await fetchBollyWood().then((data) => data.results);
let comedy = await fetchComedy().then((data) => data.results);
let anime = await fetchAnime().then((data) => data.results);
let horror = await fetchHorror().then((data) => data.results);
let scifi = await fetchSciFantasy().then((data) => data.results);

// for loops to call for each individual item to set their trailer poster and gneres
for (let item of movies) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of anime) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of bollywood) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of horror) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of scifi) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of comedy) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

// function to create posters for each indiviual item
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

  // owl-carousel handler
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
