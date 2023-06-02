let users = JSON.parse(localStorage.getItem("users")) ?? [];

function isRegistered() {
  let signup = false;
  for (let user of users) {
    if (user["email"] === $("#email").val()) {
      if (user["plan"] && user["payMethod"]) {
        signup = true;
      }
    }
  }
  return signup;
}
$("#signUpBtn").on("click", function (e) {
  let registered = isRegistered();
  e.preventDefault();
  if ($("#email").val().length == 0) {
    $("#email").focus();
  } else if (registered) window.location.href = "../../html/signin.html";
  else {
    localStorage.setItem("email", $("#email").val());
    window.location.href = "../../html/signup.html";
  }
});

$("#email").on("keydown", () => {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if ($("#email").val().length == 0) $("#email").css("border-color", "white");
  if (!emailReg.test($("#email").val())) {
    $("#email").css("border-color", "red");
  } else $("#email").css("border-color", "green");
});
