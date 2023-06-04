import { createPosters } from "./posters.js";

$(".secondSection").on("mouseover", "#movieImg", function () {
  let id = $(this).attr("value");
  console.log(id);
});

window.onscroll = function () {
  if ($(window).scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
};

createPosters();
