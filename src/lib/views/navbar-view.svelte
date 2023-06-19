<script lang="ts">
   document.addEventListener('click', function(event: MouseEvent) {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse && event.target !== navbarToggler && !navbarToggler.contains(event.target as Element)) {
      // Clicked outside the navbar toggler, close the menu
      navbarCollapse.classList.remove('show');
    }
  });
</script>
<body>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
   
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
                 <!-- svelte-ignore a11y-invalid-attribute -->
                 <a class="navbar-brand " href="#">Note Book</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active " aria-current="page" href="/">My books</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/settings">Settings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/privacy policy">Privacy Policy</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/terms & conditions">Terms & Conditions</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
</body>

<style>
.navbar-toggler{
   font-size: 16px;
  margin-left: 0px;
}
.navbar-brand{
  margin-right: 158px;
}
</style>