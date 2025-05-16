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

//!الهوفر ع ناف بار
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

//!touch-swipe
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

//!scroll-to-top
// إنشاء الزر
const scrollTopBtn = document.getElementById("scrollTopBtn");

// إظهار الزر عند التمرير
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// عند الضغط يرجع لأعلى الصفحة
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//!portfolio
const filterLinks = document.querySelectorAll("#design-content li a"); // روابط الفلاتر (تصنيفات الصور)
const boxes = document.querySelectorAll(".portfolio-imgs .box"); // كل صور البورتفوليو
const moreBtn = document.querySelector(".more"); // زر "Show More" / "Show Less"

let currentFilter = "all"; // الفلتر الحالي، "all" يعني عرض كل الصور
let shownCount = 0; // عدد الصور المعروضة حاليا
const showStep = 4; // عدد الصور التي تظهر أو تُخفى عند الضغط على زر المزيد
let isExpanded = false; // حالة الزر، هل كل الصور معروضة (true يعني "Show Less")

// دالة تعرض الصور المصفاة بحسب العدد الحالي (shownCount)
// تضيف كلاس "show" للصور التي تريد عرضها، وتزيله عن الباق

function showFilteredBoxes(filtered) {
  filtered.forEach((box, index) => {
    if (index < shownCount) {
      box.classList.remove("show");
      void box.offsetWidth; // إجبار إعادة الرسم

      setTimeout(() => {
        box.classList.add("show");
      }, index * 200); // كل عنصر يظهر بعد اللي قبله بـ 100ms
    } else {
      box.classList.remove("show");
    }
  });
}
// دالة ترجع الصور التي تطابق الفلتر الحالي (currentFilter)
// إذا كان الفلتر "all" ترجع كل الصور، وإلا ترجع الصور التي تحتوي على كلاس الفلتر
function getFilteredBoxes() {
  return Array.from(boxes).filter((box) => {
    return currentFilter === "all" || box.classList.contains(currentFilter);
  });
}

// دالة تحديث عرض الصور عند تغيير الفلتر
// تزيل العرض عن كل الصور، ثم تعرض أول عدد محدد (showStep) من الصور المصفاة
// تعيد ضبط حالة الزر (isExpanded = false) لأننا بدأنا عرض جديد
function filterBoxes() {
  boxes.forEach((box) => {
    box.classList.remove("show");
  });
  const filtered = getFilteredBoxes();

  shownCount = showStep; // نبدأ بعرض أول 4 صور (أو حسب showStep)
  isExpanded = false; // نعيد الزر لحالة "Show More"

  showFilteredBoxes(filtered);

  updateMoreButton(filtered.length); // تحديث نص الزر حسب عدد الصور المتاحة
}

// إضافة مستمعات الأحداث على أزرار الفلترة (تصنيفات الصور)
// عند الضغط على زر فلتر، يعيد ضبط الحالة ويعرض الصور المناسبة
filterLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // إزالة تفعيل الفلتر القديم وإضافة تفعيل الفلتر الجديد
    filterLinks.forEach((el) => el.classList.remove("active"));
    this.classList.add("active");

    currentFilter = this.textContent.toLowerCase(); // تحديث الفلتر الحالي
    isExpanded = false; // إعادة تعيين حالة الزر
    filterBoxes(); // تحديث عرض الصور حسب الفلتر الجديد
  });
});

// دالة تحديث نص زر More/Less حسب عدد الصور الظاهرة والمتوفرة
function updateMoreButton(total) {
  if (total <= showStep) {
    // لو عدد الصور الكلي أقل أو يساوي عدد الصور التي تظهر دفعة واحدة
    moreBtn.textContent = "No More Items"; // نعرض رسالة لا يوجد المزيد
    moreBtn.disabled = true; // نوقف الزر
    moreBtn.classList.add("disabled"); // نضيف كلاس للتنسيق
  } else {
    // لو الصور أكثر من showStep
    moreBtn.disabled = false;
    moreBtn.classList.remove("disabled");

    if (shownCount >= total) {
      moreBtn.textContent = "Show Less"; // إذا عرضنا كل الصور نغير النص لـ Show Less
      isExpanded = true; // حالة العرض كاملة
    } else {
      moreBtn.textContent = "Show More"; // غير ذلك نعرض Show More
      isExpanded = false;
    }
  }
}

// عند الضغط على زر Show More / Show Less
moreBtn.addEventListener("click", () => {
  const filtered = getFilteredBoxes();
  if (isExpanded) {
    filtered.forEach((box, index) => {
      if (index >= showStep) {
        box.classList.add("fade-out");
      }
    });

    // ننتظر التلاشي ينتهي، بعدها نغير العرض
    setTimeout(() => {
      filtered.forEach((box, index) => {
        if (index >= showStep) {
          box.classList.remove("show");
          box.classList.remove("fade-out");
        }
      }, 400);

      shownCount = showStep;
      isExpanded = false;

      updateMoreButton(filtered.length);
    }, 400); // ← هنا نعطي فرصة للأنيميشن يشتغل
  } else {
    shownCount += showStep;
    if (shownCount >= filtered.length) {
      shownCount = filtered.length;
      isExpanded = true;
    }

    showFilteredBoxes(filtered); // ← فقط في Show More
    updateMoreButton(filtered.length);
  }
  // نضيف تمرير للزر بحيث يبقى ظاهرًا دائماً في الشاشة بعد التغيير
  const delay = Math.min(shownCount, filtered.length) * 100; // 100ms لكل عنصر
  setTimeout(() => {
    moreBtn.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, delay + 400); // نضيف 300ms احتياط
});

// عند تحميل الصفحة لأول مرة، نعرض الصور بشكل افتراضي (كل الصور حسب الفلتر الافتراضي "all")
filterBoxes();

//!test-content
const testContents = document.querySelectorAll(".test-content");
const testimonialBulletsContainer = document.querySelector(".bullets-te");

let testimonialCurrentIndex = 0;
const itemsPerPage = 2;
const totalItems = testContents.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
let testimonialAutoSlideInterval;

function createTestimonialBullets() {
  testimonialBulletsContainer.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const li = document.createElement("li");
    if (i === 0) li.classList.add("active-bullet1");
    testimonialBulletsContainer.appendChild(li);

    li.addEventListener("click", () => {
      testimonialCurrentIndex = i;
      showCurrentTestimonialPage();
      resetTestimonialAutoSlide();
    });
  }
}

function showCurrentTestimonialPage() {
  testContents.forEach((el, i) => {
    el.style.display =
      i >= testimonialCurrentIndex * itemsPerPage &&
      i < (testimonialCurrentIndex + 1) * itemsPerPage
        ? "flex"
        : "none";
  });

  const bullets = testimonialBulletsContainer.querySelectorAll("li");
  bullets.forEach((b, i) => {
    b.classList.toggle("active-bullet1", i === testimonialCurrentIndex);
  });
}

function autoTestimonialSlide() {
  testimonialCurrentIndex++;
  if (testimonialCurrentIndex >= totalPages) testimonialCurrentIndex = 0;
  showCurrentTestimonialPage();
}

function resetTestimonialAutoSlide() {
  clearInterval(testimonialAutoSlideInterval);
  testimonialAutoSlideInterval = setInterval(autoTestimonialSlide, 4000);
}

function initTestimonialSlider() {
  createTestimonialBullets();
  showCurrentTestimonialPage();
  testimonialAutoSlideInterval = setInterval(autoTestimonialSlide, 4000);
}

initTestimonialSlider();

// //!skills-content .prog
window.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".our-skills");
  const progressSpans = document.querySelectorAll(".prog span");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // نضيف التأخير (stagger)
          progressSpans.forEach((span, index) => {
            const value = span.getAttribute("data-progress");
            setTimeout(() => {
              span.style.width = value;
            }, index * 300); // تأخير 300ms بين كل bar والثاني
          });
        } else {
          // نرجعهم للصفر لما يخرج القسم
          progressSpans.forEach((span) => {
            span.style.width = "0";
          });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(section);
});
