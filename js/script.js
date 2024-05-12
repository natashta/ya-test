function handleMarquee() {
  const marquee = document.querySelectorAll(".marque");
  let speed = 4;
  let lastScrollPos = 0;
  let timer;

  marquee.forEach(function (el) {
    const container = el.querySelector(".marque__text");
    const content = el.querySelector(".marque__text > *");

    const elWidth = content.offsetWidth;

    let clone = content.cloneNode(true);
    container.appendChild(clone);

    let progress = 1;
    function loop() {
      progress = progress - speed;
      if (progress <= elWidth * -1) {
        progress = 0;
      }
      container.style.transform = "translateX(" + progress + "px)";
      container.style.transform += "skewX(" + speed * 0.4 + "deg)";

      window.requestAnimationFrame(loop);
    }
    loop();
  });

  window.addEventListener("scroll", function () {
    const maxScrollValue = 12;
    const newScrollPos = window.scrollY;
    let scrollValue = newScrollPos - lastScrollPos;

    if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
    else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;

    speed = scrollValue;

    clearTimeout(timer);
    timer = setTimeout(handleSpeedClear, 10);
  });

  function handleSpeedClear() {
    speed = 2;
  }
}

handleMarquee();

/*включаем анимацию самолета */
let block = document.querySelector(".stage__slider-wrapper");

document.addEventListener("scroll", function () {
  const posTop = block.getBoundingClientRect().top;

  if (
    block.classList.toggle(
      "visible",
      posTop + block.clientHeight <= window.innerHeight && posTop >= 0
    )
  ) {
    block.classList.add("animate");
    console.log(block);
  }
});

/*сдайдер этапов */
const sliderStage = document.querySelector(".stage__slider-wrapper");
sliderStage.classList.remove("slider-wrapper");

if (document.documentElement.clientWidth <= 767) {
  sliderStage.classList.add("slider-wrapper");

  const prevButton = sliderStage.querySelector(".slider-button-prev--s");
  const nextButton = sliderStage.querySelector(".slider-button-next--s");
  const slides = Array.from(sliderStage.querySelectorAll(".stage__slide"));
  const pagination = Array.from(
    sliderStage.querySelectorAll(".stage__pagination svg")
  );
  let slideIndex = 0;
  prevButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  function showPreviousSlide() {
    if (slideIndex === 0) {
      prevButton.classList.add("disabled");
      return;
    } else {
      slideIndex = slideIndex - 1;
      updateSlider();
    }
  }

  function showNextSlide() {
    if (slideIndex === slides.length - 1) {
      nextButton.classList.add("disabled");
      return;
    }
    slideIndex = slideIndex + 1;
    updateSlider();
  }

  function updateSlider() {
    prevButton.classList.remove("disabled");
    nextButton.classList.remove("disabled");
    pagination.forEach((item) => {
      item.classList.remove("active");
    });
    slides.forEach((slide, index) => {
      slide.setAttribute("style", "transition:all 0.3s ease;");
      if (index === slideIndex) {
        slide.style.display = "flex";
        pagination[index].classList.add("active");
      } else {
        slide.style.display = "none";
      }
    });
  }

  updateSlider();
}

/*слайдер игроков */
const sliderMembers = document.querySelector(".members__slider-wrapper");

const prevButtonM = sliderMembers.querySelector(".slider-button-prev--m");
const nextButtonM = sliderMembers.querySelector(".slider-button-next--m");
const paginatonNumM = sliderMembers.querySelector(".slider-pagination__num");
let slideIndexM = 0;
let slideIndexD = 0;

if (document.documentElement.clientWidth <= 1024) {
  const slidesM = Array.from(sliderMembers.querySelectorAll(".members__card"));

  prevButtonM.addEventListener("click", showPreviousSlideM);
  nextButtonM.addEventListener("click", showNextSlideM);

  function showPreviousSlideM() {
    if (slideIndexM === 0) {
      slideIndexM = 6;
    }
    slideIndexM = slideIndexM - 1;
    updateSliderM();
  }

  function showNextSlideM() {
    if (slideIndexM === slidesM.length) {
      slideIndexM = 0;
    }
    slideIndexM = slideIndexM + 1;
    updateSliderM();
  }

  function updateSliderM() {
    slidesM.forEach((slide, index) => {
      if (slideIndexM === slidesM.length) {
        slideIndexM = 0;
      }
      if (index === slideIndexM) {
        slide.style.display = "flex";
        paginatonNumM.textContent = index + 1;
      } else {
        slide.style.display = "none";
      }
    });
  }

  window.onload = () => {
    setInterval(function () {
      updateSliderM();
      slideIndexM++;
    }, 4000);
  };
} else if (document.documentElement.clientWidth > 1024) {
  const slidesD = Array.from(
    sliderMembers.querySelectorAll(".members__card--dt")
  );

  prevButtonM.addEventListener("click", showPreviousSlideD);
  nextButtonM.addEventListener("click", showNextSlideD);

  function showPreviousSlideD() {
    if (slideIndexD === 0) {
      slideIndexD = 2;
    }
    slideIndexD = slideIndexD - 1;
    updateSliderD();
  }

  function showNextSlideD() {
    if (slideIndexD === slidesD.length) {
      slideIndexD = 0;
    }
    slideIndexD = slideIndexD + 1;
    updateSliderD();
  }

  function updateSliderD() {
    slidesD.forEach((slide, index) => {
      if (slideIndexD === slidesD.length) {
        slideIndexD = 0;
        paginatonNumM.textContent = 3;
      }

      if (index === slideIndexD) {
        slide.style.display = "flex";
        if (index === 0) {
          paginatonNumM.textContent = 3;
        } else if (index === 1) {
          paginatonNumM.textContent = 6;
        }
      } else {
        slide.style.display = "none";
      }
    });
  }

  window.onload = () => {
    setInterval(function () {
      updateSliderD();
      slideIndexD++;
    }, 4000);
  };
}
