import { createPosters } from "./poster.js";

createPosters();

$(document).on("click", "#fav", function () {
  console.log($(this).html());
  if ($(this).html() == "add_circle_outline") {
    window.location.reload();
  }
});
