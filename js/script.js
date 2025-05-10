const menu = document.getElementById("menu");
const toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// إغلاق عند الضغط خارج المنيو
document.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// إغلاق عند الضغط على أي رابط داخل المنيو
const menuLinks = menu.querySelectorAll("a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});
