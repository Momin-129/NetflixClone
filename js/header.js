export function Header() {
  let base_url = localStorage.getItem("base_url");
  $("#header").append(`
      <nav class="navbar">
        <div class="container-fluid">
          <img id="logo" src="${base_url}/images/logo.png" onclick="window.location.href='${base_url}';" />
          <div class="justify-content-end" id="mynavbar">
            <form class="d-flex">
              <button class="btn" id="signIn" type="button" onclick="window.location.href='html/signin.html';">Sign In</button>
            </form>
          </div>
        </div>
      </nav>
`);
}
