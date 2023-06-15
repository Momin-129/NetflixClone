$("#header").on("click", ".nav-link", function () {
  $(".active").removeClass("active");
  $(this).addClass("active");
  let value = $(this).attr("value");
  if (value != "profile" && value != "logout" && value != "profileBtn") {
    window.location.href = value;
  } else if (value == "logout") {
    sessionStorage.removeItem("user_id");
    window.location.href = "/";
  }
});

if (sessionStorage.getItem("user_id") == null) window.location.href = "/";

export function Header() {
  let base_url = localStorage.getItem("base_url");
  $("#header").append(`
 <nav class="navbar navbar-fixed-top  navbar-expand-sm">
  <div class="container-fluid">
          <img id="logo" src="${base_url}/images/logo.png" onclick="window.location.href='${base_url}';" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon" style="color:white"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" value="showMovies.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="tvShows.html">TV Shows</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="movies.html">Movies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="newPopular.html">New & Popular</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="myList.html">My List</a>
        </li>
      </ul>
      </div>
      <div class="collapse navbar-collapse rightLink" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="material-icons" style="font-size:24px">notifications_none</i>
          </a>    
          </li>
          <li class="nav-item">
            <div class="dropdown dropstart" >
                <button type="button" data-bs-toggle="dropdown" style="padding:0;background:transparent;outline:none;border:none;">
                    <a class="nav-link" value="profileBtn">
                      <i class="material-icons" style="font-size:24px;color:white;">account_circle</i>
                    </a>    
                </button>
                <ul class="dropdown-menu bg-dark">
                  <li><a class="dropdown-item text-white nav-link" value="profile">Profile</a></li>

                  <li><a class="dropdown-item text-white nav-link" value="logout">Logout</a></li>
                </ul>
              </div>
          </li>
        </ul>
      </div>
  </div>
</nav> `);
}
