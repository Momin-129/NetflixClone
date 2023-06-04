import {
  fetchPopular,
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
} from "../fetch/fetch.js";

let movies = await fetchPopular().then((data) => data.results);

let bollywood = await fetchBollyWood().then((data) => data.results);

let anime = await fetchAnime().then((data) => data.results);

let comedy = await fetchComedy().then((data) => data.results);

for (let item of movies) {
  $("#section1").append(
    `<img src="https://image.tmdb.org/t/p/original${item.backdrop_path}"/>`
  );
}

for (let item of bollywood) {
  $("#section2").append(
    `<img src="https://image.tmdb.org/t/p/original${item.backdrop_path}"/>`
  );
}

for (let item of anime) {
  $("#section3").append(
    `<img src="https://image.tmdb.org/t/p/original${item.backdrop_path}"/>`
  );
}

for (let item of comedy) {
  $("#section4").append(
    `<img src="https://image.tmdb.org/t/p/original${item.backdrop_path}"/>`
  );
}

(function ($) {
  "use strict";
  $(".owl-carousel").owlCarousel({
    loop: false,
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
