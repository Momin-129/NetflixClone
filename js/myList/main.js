import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import { favMovies } from "./functions.js";
import { showInfo, showMovie, showTV } from "../mainPage/functions.js";

Header();
Footer();
Links();

favMovies();

$(document).on("click", "#more", function () {
  showInfo($(this), "myList");
});

$(document).on("click", "#playMovie", function () {
  showMovie($(this));
});

$(document).on("click", "#playTV", function () {
  showTV($(this));
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
  $(".row").remove();
  localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
});

$(document).on("click", "#favTV", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let tv_id = $(this).parent().attr("value");

  if ($(this).html() == "add_circle_outline") {
    users[user_id].favouritesTV.push(tv_id);
    $(`div[value="${tv_id}"] i[id='fav']`).html("check_circle");
  } else {
    let index = users[user_id].favouritesTV.indexOf(tv_id.toString());
    users[user_id].favouritesTV.splice(index, 1);
    $(`div[value="${tv_id}"] i[id='fav']`).html("add_circle_outline");
  }
  $(".row").remove();
  localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
});

$(".myList").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});
