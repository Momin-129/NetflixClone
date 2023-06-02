let users = JSON.parse(localStorage.getItem("users")) ?? [];
let valid = false;

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
$(".signUpBtn").on("click", function (e) {
  let registered = isRegistered();
  e.preventDefault();

  let email = $(this).parent().find(".email");
  if ($(email).val().length == 0 || !valid) {
    $(email).focus();
  } else if (registered) window.location.href = "html/signin.html";
  else {
    localStorage.setItem("email", $(email).val());
    window.location.href = "html/signup.html";
  }
});

$(".email").on("keydown", function () {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if ($(this).val().length == 0) $(this).css("border-color", "white");
  else if (!emailReg.test($(this).val())) {
    valid = false;
    $(this).css("border-color", "red");
  } else {
    $(this).css("border-color", "green");
    valid = true;
  }
});
