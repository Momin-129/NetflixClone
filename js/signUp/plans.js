let users = JSON.parse(localStorage.getItem("users")) ?? [];
let user_id = localStorage.getItem("user_id") ?? 0;

for (let user of users) {
  if (user["email"] == email) {
    user_id = user["user_id"];
  }
}

for (let user of users) {
  if (user["plan"]) {
    $(".page2").hide();
    break;
  }
}

if ($(".page2").css("display") == "block") $(".page3").hide();
let plan = "mobile";

$("#mobile").addClass("activeBack");
$(".mobile").addClass("activeColor");

$(".planBtn").on("click", function () {
  $(".activeBack").removeClass("activeBack");
  $(".activeColor").removeClass("activeColor");
  let id = $(this).attr("id");
  $(`#${id}`).addClass("activeBack");
  $(`.${id}`).addClass("activeColor");
});

$("#savePlan").on("click", function () {
  let id = $(".activeBack").attr("id");
  plan = id;
  for (let user of users) {
    if (user["user_id"] == user_id) {
      user.plan = plan;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  $(".page2").hide();
  $(".page3").show();
});

$(".pay").on("click", function () {
  let payMethod = $(this).attr("id");
  for (let user of users) {
    if (user["user_id"] == user_id) {
      user.payMethod = payMethod;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "signin.html";
});
