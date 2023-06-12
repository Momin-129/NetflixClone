import { createPosters } from "./posters.js";
import { fetchTrendin } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import { showInfo, showMovie } from "./functions.js";

Header();
Footer();
Links();

$("#header").hide();
$(".secondSection").hide();
$("#footer").hide();

fetchTrendin().then((data) => console.log(data));

createPosters();

$(document).on("click", "#playMovie", function () {
  showMovie($(this));
});

$(document).on("click", "#fav", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let movie_id = $(this).parent().attr("value");
  if ($(this).html() == "add_circle_outline") {
    users[user_id].favourites.push(movie_id);
    $(`div[value="${movie_id}"] i[id='fav']`).html("check_circle");
  } else {
    let index = users[user_id].favourites.indexOf(movie_id.toString());
    users[user_id].favourites.splice(index, 1);
    $(`div[value="${movie_id}"] i[id='fav']`).html("add_circle_outline");
  }
  $("#myList").load(location.href + " #myList");
  localStorage.setItem("users", JSON.stringify(users));
});

$(document).on("click", "#more", function () {
  console.log("Hello");
  showInfo($(this), "secondSection");
});

$(".secondSection").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});

window.onscroll = function () {
  if ($(window).scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
};
