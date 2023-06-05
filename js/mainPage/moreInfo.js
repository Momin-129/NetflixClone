export function moreInfo(movie, key) {
  console.log(movie);
  $(".secondSection").append(`      
      <div class="container moreInfo">
        <div class="trailer">
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
          </div>
          <iframe
            id="backVideo"
            src="https://www.youtube.com/embed/${key}?autoplay=1&loop=1&rel=0&playlist=${key}"
          ></iframe>
          <p class="overview">${movie.overview}</p>
        </div>
      </div>
`);
}
