//hamburger responsive
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}\

//click img
$(document).ready(function() {
    $('img.thumbnail').click(function() {
        window.location.href = this.id + '.html';
    });
});