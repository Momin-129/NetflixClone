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
let poster = "";

function showPoster(item, section) {
  let values = [item.id, item.trailer, item.type];
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

function setTrailerPoster(item) {
  (async function () {
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
  })();
}

for (let item of movies) {
  setTrailerPoster(item);
}
for (let item of anime) {
  setTrailerPoster(item);
}
for (let item of bollywood) {
  setTrailerPoster(item);
}
for (let item of comedy) {
  setTrailerPoster(item);
}
for (let item of actionAdventure) {
  setTrailerPoster(item);
}
for (let item of tv) {
  let trailer = await fetchTrailerTV(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randommovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randommovie.key;
    item.type = "s e r i e s";
    poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
    for (let j of poster) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        item.poster = j.file_path;
        break;
      } else item.poster = j.file_path;
    }
  }
}
for (let item of animeTV) {
  let trailer = await fetchTrailerTV(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randommovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randommovie.key;
    item.type = "s e r i e s";
    poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
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
