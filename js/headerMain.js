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
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">TV Shows</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Movies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">New & Popular</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My List</a>
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
          <a class="nav-link" href="#">
            <i class="material-icons" style="font-size:24px">account_circle</i>
          </a>    
          </li>
        </ul>
      </div>
  </div>
</nav> `);
}
