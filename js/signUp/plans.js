$("#mobile").addClass("activeBack");
$(".mobile").addClass("activeColor");

$(".planBtn").on("click", function () {
  $(".activeBack").removeClass("activeBack");
  $(".activeColor").removeClass("activeColor");
  let id = $(this).attr("id");
  $(`#${id}`).addClass("activeBack");
  $(`.${id}`).addClass("activeColor");
});
