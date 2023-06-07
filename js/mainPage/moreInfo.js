import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

export function moreInfo(movie, key, similar) {
  $(".secondSection").append(`      
      <div class="container moreInfo">
        <div class="trailer">
          <div id="trailerVideo"></div>
          <i class="material-icons" id="closeInfo" >close</i>
          <div class="options">
            <p class="title">${movie.title}</p>
            <button type="button" class="btn play mt-2">
              <i class="material-icons">play_arrow</i>
              <span>Play</span>
            </button>
            <button type="button" class="btn mt-2">
            <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites"
             style="font-size:30px">add_circle_outline</i>
            </button>
            <button type="button" class="btn mt-2">
            <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
             style="font-size:30px">thumb_up</i>
            </button>
            <i class="material-icons volume"  data-toggle="tooltip" title="Like"
             style="font-size:30px;float:right">volume_off</i>
          </div>
          <div class="container similar">
              <p class="overview">${movie.overview}</p>
              More Like This
              <br><br>
              <div class="row  text-white">
              </div>
          </div>
        </div>
      </div>
`);
  onYouTubeIframeAPIReady("trailerVideo", key);

  for (let item of similar) {
    console.log(item);
    $(".moreInfo .row").append(`
        <div class="col-md-4 col-sm-12 mt-4">
            <div class="similarMovie">
              <img src="https://image.tmdb.org/t/p/original/${item.backdrop_path}"/>
                <b>${item.title}             
                <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites" style="font-size:24px">add_circle_outline</i>
                </b>
              <div class="description">
                ${item.overview}
              </div>
            </div>
        </div>
      `);
  }
}
