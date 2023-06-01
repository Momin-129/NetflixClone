let users = JSON.parse(localStorage.getItem("users")) ?? [];
let email = localStorage.getItem("email");
let user_id = localStorage.getItem("user_id") ?? 0;

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
  } else $("#password").css("border", "2px solid green");
});

$("#saveUser").on("click", function () {
  console.log($("#password").css("border"));
  if ($("#password").css("border") === "2px solid rgb(0, 128, 0)") {
    let email = $("#email").val();
    let pass = $("#password").val();
    let obj = {};
    obj.user_id = user_id;
    obj.email = email;
    obj.pass = pass;
    users.push(obj);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user_id", user_id + 1);
    $(".page1").hide();
    $(".page2").show();
  } else $("#password").focus();
});
