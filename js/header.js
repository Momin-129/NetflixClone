console.log(window.location.href);

// if (!localStorage.getItem("base_url"))
//   localStorage.setItem("base_url", window.location.origin);

$("#header").append(`
      <nav class="navbar">
        <div class="container-fluid">
          <img id="logo" src="../images/logo.png" />
          <div class="justify-content-end" id="mynavbar">
            <form class="d-flex">
              <button class="btn" id="signIn" type="button">Sign In</button>
            </form>
          </div>
        </div>
      </nav>
`);
