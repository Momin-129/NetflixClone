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

let users = JSON.parse(localStorage.getItem("users"));
base_url = localStorage.getItem("base_url");

let user_id = "";

$("#signIn").hide();

$("#signup").on("click", () => {
  window.location.href = base_url;
});

$("#signInPage").on("click", () => {
  let valid = false;
  if (users != null) {
    let email = $("#email").val();
    let password = $("#password").val();
    for (let user of users) {
      let savedPass = crypt.decrypt(user["pass"]);
      if (user["email"] == email && savedPass == password) {
        valid = true;
        user_id = user.user_id;
        break;
      }
    }
  }

  if (valid) {
    sessionStorage.setItem("user_id", user_id);
    window.location.href = base_url + "html/showMovies.html";
  } else {
    $(".error").show();
    $("#password").val("");
  }
});
