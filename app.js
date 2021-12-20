const carouselSlide = document.querySelector(".carousel-slide");
const carouselImageWrappers = document.querySelectorAll(
  ".carousel-slide .carousel-image-wrapper"
);
const carouselDots = document.querySelectorAll(".carousel-dots .carousel-dot");
const carouselMiniImages = document.querySelectorAll(
  ".carousel-mImages .carousel-mImage"
);

// Buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Dane wejściowe
// -- Czas jaki slide będzie aktywny
const timeActiveSlide = 30;

// Counter
let counter = 1;
const size = carouselImageWrappers[0].clientWidth;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

const handleImageDotRemoveActive = () => {
  carouselDots[counter - 1].classList.remove("carousel-dot-active");
};

const handleImageDotAddActive = () => {
  if (carouselImageWrappers[counter].id === "lastClone") {
    carouselDots[carouselImageWrappers.length - 3].classList.add(
      "carousel-dot-active"
    );
  } else if (carouselImageWrappers[counter].id === "firstClone") {
    carouselDots[carouselImageWrappers.length - counter - 1].classList.add(
      "carousel-dot-active"
    );
  } else {
    carouselDots[counter - 1].classList.add("carousel-dot-active");
  }
};

// Buttons Listeners
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImageWrappers.length - 1) return;
  handleImageDotRemoveActive();
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  handleImageDotAddActive();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  handleImageDotRemoveActive();
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  handleImageDotAddActive();
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImageWrappers[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImageWrappers.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }

  if (carouselImageWrappers[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImageWrappers.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

function changeImageAfterClickInDot() {
  carouselDots.forEach((carouselDot) => {
    carouselDot.classList.remove("carousel-dot-active");
  });
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter = parseInt(this.dataset.id);
  this.classList.add("carousel-dot-active");
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
}

function changeImageAfterClickInMiniImage() {
  carouselDots.forEach((carouselDot) => {
    carouselDot.classList.remove("carousel-dot-active");
  });
  carouselMiniImages.forEach((miniImage) => {
    miniImage.classList.remove("carousel-mImage-active");
  });

  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter = parseInt(this.dataset.id);
  //   this.classList.add("carousel-dot-active");
  this.classList.add("carousel-mImage-active");
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

  moveProgressBar();
}

// Funkcja zarządzająca progress barem
const moveProgressBar = () => {
  const activeMiniImage = document.querySelector(
    ".carousel-mImage-active .carousel-mImage-bar"
  );
  let width = 0;

  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      activeMiniImage.style.width = width + "%";
    }
  }

  let id = setInterval(frame, timeActiveSlide);
};

// Obsługa slidera za pomocą kropek
carouselDots.forEach((carouselDot) => {
  carouselDot.addEventListener("click", changeImageAfterClickInDot);
});

// Obsługa slidera za pomocą małych zdjęć
carouselMiniImages.forEach((miniImage) => {
  miniImage.addEventListener("mouseover", changeImageAfterClickInMiniImage);
});

moveProgressBar();
