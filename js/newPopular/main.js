import { createPosters } from "./posters.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import {
  showInfo,
  showMovie,
  showTV,
  hoverItem,
} from "../mainPage/functions.js";

$("body").scroll(function () {
  if ($("body").scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
});

// $("#header").hide();
// $(".secondSection").hide();
// $("#footer").hide();

Header();
Footer();
Links();

createPosters();

$(document).on("click", "#playMovie", function () {
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showMovie(trailer);
});

$(document).on("click", "#playTV", function () {
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showTV(trailer);
});

$(document).on("click", "#more", function () {
  let [id, trailer, type] = $(this).parent().attr("value").split(",");
  showInfo(id, trailer, type, "secondSection");
});

$(".secondSection").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

$(document).on("click", "#fav", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let id = $(this).parent().attr("value").split(",")[0];
  let type = $(this).parent().attr("value").split(",")[2];

  if ($(this).html() == "add_circle_outline") {
    if (type == "M O V I E") users[user_id].favourites.push(id);
    else users[user_id].favouritesTV.push(id);
    $(this).html("check_circle");
  } else {
    if (type == "M O V I E") {
      let index = users[user_id].favourites.indexOf(id.toString());
      users[user_id].favourites.splice(index, 1);
    } else {
      let index = users[user_id].favouritesTV.indexOf(id.toString());
      users[user_id].favouritesTV.splice(index, 1);
    }
    $(this).html("add_circle_outline");
  }
  localStorage.setItem("users", JSON.stringify(users));
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});

$(".secondSection").on("mouseenter", ".item", function () {
  let [id, trailer, type] = $(this).attr("value").split(",");
  hoverItem(id, trailer, type);
  $(".hoverItem").css(
    "top",
    $(this).offset().top - $(".secondSection").offset().top - 20
  );
  $(".hoverItem").css(
    "left",
    $(this).offset().left - $(".secondSection").offset().left
  );
});

$(".secondSection").on("mouseleave", ".hoverItem", function () {
  $(".hoverItem").remove();
});
