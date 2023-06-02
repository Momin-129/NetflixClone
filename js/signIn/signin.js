let users = JSON.parse(localStorage.getItem("users"));
let base_url = localStorage.getItem("base_url");
$("#signIn").hide();

$("#signup").on("click", () => {
  window.location.href = base_url;
});

$("#signInPage").on("click", () => {
  let email = $("#email").val();
  let password = $("#password").val();
  let valid = false;
  for (user of users) {
    if (user["email"] == email && user["pass"] == password) {
      valid = true;
      break;
    }
  }

  if (valid) console.log("Signed In Succesfully.");
  else console.log("Ivalid email or password.");
});
