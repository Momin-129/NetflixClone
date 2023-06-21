import { Header } from "../header.js";
import { Footer } from "../footer.js";
import { Links } from "../links.js";

Header();
Footer();
Links();

var crypt = {
  secret: "THESECRET",
  encrypt: function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },

  decrypt: function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },
};

let users = JSON.parse(localStorage.getItem("users")) ?? [];
let email = localStorage.getItem("email");
let user_id = localStorage.getItem("user_id") ?? 0;
let valid = false;

for (let user of users) {
  if (user["email"] == email) {
    $(".page1").hide();
    break;
  }
}

if ($(".page1").css("display") == "block") {
  $(".page2").hide();
  $(".page3").hide();
}

$("#email").val(email);

$("#password").on("keyup", () => {
  let passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (!passCheck.test($("#password").val())) {
    $("#password").css("border", "2px solid red");
    valid = false;
  } else {
    $("#password").css("border", "2px solid green");
    valid = true;
  }
});

$("#saveUser").on("click", function () {
  if (valid) {
    let email = $("#email").val();
    let pass = $("#password").val();
    pass = crypt.encrypt(pass);
    let obj = {};
    obj.user_id = user_id;
    obj.email = email;
    obj.pass = pass;
    obj.favourites = [];
    obj.favouritesTV = [];
    obj.liked = [];
    users.push(obj);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user_id", user_id + 1);
    $(".page1").hide();
    $(".page2").show();
  } else $("#password").focus();
});
