let upBtn = document.getElementById("upBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
}

upBtn.addEventListener('click', ()=> {
    document.body.scrollTop.animate({scrollTop:0}, slow)
    return false;
})

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

