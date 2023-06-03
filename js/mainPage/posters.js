import { fetchPopular } from "../fetch/fetch.js";

let movies = await fetchPopular().then((data) => {
  return data.results;
});

for (let item of movies) {
  $("#section1").append(
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
    responsive: {
      0: {
        items: 1,
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
