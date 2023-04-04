const array = localStorage.getItem("myArray"),
    interestarray = JSON.parse(array),
    interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];
interests.forEach((e => {
    1 == interestarray.includes(e) ? document.getElementById(e).checked = !0 : document.getElementById(e).checked = !1
})), document.getElementById("profilepage").classList.add("active");