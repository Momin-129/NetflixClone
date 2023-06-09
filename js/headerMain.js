export function Header() {
  let base_url = localStorage.getItem("base_url");
  $("#header").append(`
 <nav class="navbar navbar-fixed-top  navbar-expand-sm">
  <div class="container-fluid">
          <img id="logo" src="${base_url}/images/logo.png" onclick="window.location.href='${base_url}';" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="showMovies.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="tvShows.html">TV Shows</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="movies.html">Movies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">New & Popular</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="myList.html">My List</a>
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
                    <a class="nav-link" href="#">
                      <i class="material-icons" style="font-size:24px;color:white;">account_circle</i>
                    </a>    
                </button>
                <ul class="dropdown-menu bg-dark">
                  <li><a class="dropdown-item text-white" href="#">Profile</a></li>
                  <li><a class="dropdown-item text-white" href="#"></a></li>
                  <li><a class="dropdown-item text-white" href="#">Logout</a></li>
                </ul>
              </div>
          </li>
        </ul>
      </div>
  </div>
</nav> `);
}
