// ---------------------------- PRE LOADER ----------------------------

var PreLoader = document.getElementById("pre-loader");

window.addEventListener("load", function () {
    this.setTimeout(function () {
        PreLoader.style.display = "none";
    }, 1500);
});

//  ---------------------- RESPONISVE HAMBURGER NAVBAR ----------
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('open');
    });
});