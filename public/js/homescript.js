const homebutton = document.getElementById("homemessage");
homebutton.addEventListener("click", (() => {
    window.location.href = "profile"
}));
document.getElementById("homepage").classList.add("active");