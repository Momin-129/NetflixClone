import {
  fetchPopular,
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
  fetchPoster,
} from "../fetch/fetch.js";

let movies = await fetchPopular().then((data) => data.results);
let bollywood = await fetchBollyWood().then((data) => data.results);
let comedy = await fetchComedy().then((data) => data.results);
let anime = await fetchAnime().then((data) => data.results);
let poster = "";

for (let item of movies) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of anime) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of bollywood) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of comedy) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}

export function createPosters() {
  for (let item of movies) {
    $("#section1").append(
      `
      <div class="item" value="${item.id}">
           <img id="movieImg" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="play" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites"
           >add_circle_outline</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of bollywood) {
    $("#section2").append(
      `
      <div class="item" value="${item.id}">
           <img id="movieImg" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="play" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites"
           >add_circle_outline</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of anime) {
    $("#section3").append(
      `
      <div class="item" value="${item.id}">
           <img id="movieImg" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="play" data-toggle="tooltip" title="Play"
          >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites"
           >add_circle_outline</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of comedy) {
    $("#section4").append(
      `
      <div class="item" value="${item.id}">
           <img id="movieImg" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="play" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites"
           >add_circle_outline</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
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
}
