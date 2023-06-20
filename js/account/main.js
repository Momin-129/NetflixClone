import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";

Header();
Footer();
Links();

$("#searchBtn").hide();

let users = JSON.parse(localStorage.getItem("users"));
let user_id = sessionStorage.getItem("user_id");

let email = users[user_id]["email"];
let pass = users[user_id]["pass"];
let payment = users[user_id]["payMethod"];
let plan = users[user_id]["plan"];

$("#email").html(email);
$("#pass").html(pass);
$("#pass").css("-webkit-text-security", "square");
$("#payment").html(payment.toUpperCase());
$("#plan").html(plan.toUpperCase());
$("#plan").css({ "font-size": "16px", "font-weight": "bold" });
