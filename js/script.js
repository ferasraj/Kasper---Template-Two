//! النقر على الزر toggle-btn
// لإظهار وإخفاء المنيو
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

//!التأشيرات
// إضافة كلاس active للرابط النشط
const links = document.querySelectorAll("#menu li a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active from all
    links.forEach((el) => el.classList.remove("active"));

    // Add active to clicked one
    this.classList.add("active");
  });
});

//!change-backgrounds
//يدوي
// الحصول على العناصر
const imageLis = document.querySelectorAll("#slider-images li");
const landing = document.querySelector(".landing");
const leftArrow = document.querySelector(".fa-angle-left");
const rightArrow = document.querySelector(".fa-angle-right");

// حفظ الصور في مصفوفة
const imageList = Array.from(imageLis).map((li) => li.dataset.img);

//!تعديل ال li بحسب الصور
const sliderImages = document.querySelectorAll("#slider-images li");
const bulletsContainer = document.querySelector(".bullets");

// نحذف أي عناصر موجودة من قبل
bulletsContainer.innerHTML = "";

// نولّد العناصر الجديدة بناءً على عدد الصور
sliderImages.forEach((_, index) => {
  const bullet = document.createElement("li");
  if (index === 0) bullet.classList.add("active-bullet"); // أول عنصر مفعّل
  bulletsContainer.appendChild(bullet);
});
// نحصل على النقاط بعد ما تم إنشاؤهم فعليًا
let bullets = document.querySelectorAll(".bullets li");

// المتغير لتتبع الصورة الحالية
let currentIndex = 0;

// دالة لتغيير الخلفية
function updateBackground() {
  landing.style.backgroundImage = `url("${imageList[currentIndex]}")`;
  // تحديث الـ bullets
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle("active-bullet", index === currentIndex);
  });
}
// السماح للمستخدم يضغط على النقاط للتنقل
bullets.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    currentIndex = index;
    updateBackground();
    updateBullets();
  });
});

// زر اليسار
leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  updateBackground();
});

// زر اليمين
rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  updateBackground();
});

// تعيين الصورة الأولى عند التحميل
updateBackground();

// تغيير الصورة عشوائيًا كل 5 ثواني
setInterval(() => {
  currentIndex = Math.floor(Math.random() * imageList.length); // اختيار فهرس عشوائي
  updateBackground(currentIndex);
}, 5000); // 5000 مللي ثانية = 5 ثواني

// دعم السحب بالإصبع على الجوال
let touchStartX = 0;
let touchEndX = 0;

landing.addEventListener("touchstart", (e) => {
  // إذا كانت اللمسة على العنصر النصي، لا تكمل
  if (e.target.closest(".text")) return;

  touchStartX = e.changedTouches[0].screenX;
});

landing.addEventListener("touchend", (e) => {
  if (e.target.closest(".text")) return;

  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  const threshold = 50; // أقل مسافة تحسب كـ swipe

  if (swipeDistance > threshold) {
    // سحب لليسار => صورة جديدة
    currentIndex = (currentIndex + 1) % imageList.length;
    updateBackground();
  } else if (swipeDistance < -threshold) {
    // سحب لليمين => صورة سابقة
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    updateBackground();
  }
}
