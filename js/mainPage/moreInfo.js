import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

export function moreInfo(movie, key) {
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
          <p class="overview">${movie.overview}</p>
        </div>
      </div>
`);
  onYouTubeIframeAPIReady("trailerVideo", key);
}
