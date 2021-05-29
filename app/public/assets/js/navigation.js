//  Menu click
let topMenuIcon = document.getElementById("top-menu-icon"),
    topMenuCloseBtn = document.getElementById("top-menu-close-btn"),
    topMenuReponsive = document.getElementById("top-menu-reponsive");

topMenuIcon.addEventListener("click",()=> {
    // topMenuReponsive.style.display = "block";
    topMenuReponsive.classList.add("move");
})

topMenuCloseBtn.addEventListener("click",()=>{
    topMenuReponsive.classList.remove("move");
})