import { faq } from "./faq.js";
import { Header } from "../header.js";
import { Footer } from "../footer.js";
import { Links } from "../links.js";

Header();
Footer();
Links();

for (let i = 0; i < faq.length; i++) {
  let item = faq[i];
  $("#faq").append(`        
         <button class="accordion mt-3" id="${i}">
          ${item.ques}
          <span id="sign" style="float: right; font-size: 24px">+</span>
        </button>
        <div class="panel" id="p${i}">
          <p>
            ${item.ans}
          </p>
        </div>

`);
}

$("#faq").append(`
        <div class="signUp mt-5">
          Ready to watch? Enter your email to create or restart your membership.
          <br />
          <form>
          <input
            type="email"
            class="form-control email"
            name="email"
            placeholder="Email address"
          />
          <button  type="button" class="btn btn-danger signUpBtn">Get Started ></button>
          </form>
        </div>
`);

$(".panel").hide();

$(".accordion").on("click", function () {
  let id = $(this).attr("id");

  if ($(".active").length == 0) {
    $(`#p${id}`).addClass("active");
    $(`#p${id}`).toggle();
    $(`#${id} span`).text("x");
  } else if ($(`#p${id}`).hasClass("active")) {
    $(`#p${id}`).removeClass("active");
    $(`#p${id}`).toggle();
    $(`#${id} span`).text("+");
  } else {
    $(".active").toggle();
    let closeId = $(".active").attr("id").substr(-1);
    let openBtn = $(".active").siblings(`button#${closeId}`);
    openBtn.children().text("+");
    $(".active").removeClass("active");
    $(`#p${id}`).addClass("active");
    $(`#p${id}`).toggle();
    $(`#${id} span`).text("x");
  }
});
