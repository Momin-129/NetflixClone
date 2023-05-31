$("#signUpBtn").on("click", function (e) {
  e.preventDefault();
  if ($("#email").val().length == 0) {
    $("#email").focus();
  } else {
    localStorage.setItem("email", $("#email").val());
    window.location.href = "../html/signup.html";
  }
});

$("#email").on("keydown", () => {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if ($("#email").val().length == 0) $("#email").css("border-color", "white");
  if (!emailReg.test($("#email").val())) {
    $("#email").css("border-color", "red");
  } else $("#email").css("border-color", "green");
});
