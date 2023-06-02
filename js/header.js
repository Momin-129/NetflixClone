base_url = localStorage.getItem("base_url");
console.log(base_url);
$("#header").append(`
      <nav class="navbar">
        <div class="container-fluid">
          <img id="logo" src="${base_url}/images/logo.png" />
          <div class="justify-content-end" id="mynavbar">
            <form class="d-flex">
              <button class="btn" id="signIn" type="button">Sign In</button>
            </form>
          </div>
        </div>
      </nav>
`);
