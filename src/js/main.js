// "use strict";
(() => {
  const scrollController = {
    disabledScroll() {
      document.body.style.cssText = `overflow: hidden`;
    },
    enableScroll() {
      document.body.style.cssText = "";
    },
  };

  let burger = document.querySelector(".burger");
  let menu = document.querySelector(".nav__list");
  let menuLinks = menu.querySelectorAll(".list__link");

  burger.addEventListener("click", function () {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("nav__list--active");
    document.body.classList.toggle("stop-scroll");
  });

  menuLinks.forEach(function (el) {
    el.addEventListener("click", function () {
      burger.classList.remove("burger--active");
      menu.classList.remove("nav__list--active");
      document.body.classList.remove("stop-scroll");
    });
  });

  const navItem = document.querySelectorAll(".nav__select");
  navItem.forEach((el) => {
    el.addEventListener("mouseover", () => {
      document.querySelector(`.${el.id}`).classList.add("nav__select--active");
    });
  });

  navItem.forEach((el) => {
    el.addEventListener("mouseout", () => {
      document
        .querySelector(`.${el.id}`)
        .classList.remove("nav__select--active");
    });
  });

  const mainSite = document.querySelector(".main-site");
  if (mainSite) {
    new Swiper(".slider-main", {
      navigation: {
        nextEl: ".s-button-next",
        prevEl: ".s-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      loop: true,
      a11y: {
        paginationBulletMessage: "Тут название слайда {{index}}",
      },
      grabCursor: true,
      autoplay: {
        delay: 2000,
        stopOnlastSlide: false,
        disableOnInteraction: false,
      },
      effect: "flip",
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
      mousewheel: {
        sensititvity: 1,
      },
      // autoHeight: true,
      speed: 3000,
    });

    gsap.from(".anime-block", {
      delay: 0.3,
      duration: 1,
      opacity: 0,
      scale: 0.5,
    });

    gsap.from(".anime", { opacity: 0, delay: 1, duration: 1, y: 270 });
  }

  const sliderAll = document.querySelector(".slider-all");
  if (sliderAll) {
    new Swiper(".slider-all", {
      navigation: {
        nextEl: ".s-button-next",
        prevEl: ".s-button-prev",
      },
      thumbs: {
        swiper: {
          el: ".image-mini-slider",
        },
      },
      loop: true,
      a11y: {
        paginationBulletMessage: "Тут название слада {{index}}",
      },
      grabCursor: true,
      direction: "vertical",
      // autoplay: {
      //   delay: 1000,
      //   stopOnlastSlide: false,
      //   disableOnInteraction: false,
      // },
      speed: 2000,
    });
  }

  const form = document.getElementById("form");
  if (form) {
    var tel = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7 (999)-999-99-99");
    im.mask(tel);

    const formInput = document.querySelectorAll(".form__input");
    formInput.forEach((el) => {
      el.addEventListener("focus", () => {
        document.querySelector(`.${el.id}`).classList.add("new__input--active");
      });
    });

    formInput.forEach((el) => {
      el.addEventListener("focus", () => {
        document.querySelector(`.${el.id}`).classList.add("new__input--active");
      });
    });

    form.addEventListener("submit", formSend);

    async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);
      let background = document.querySelector(".background");
      let formData = new FormData(form);

      if (error === 0) {
        background.classList.add("_sending");
        let response = await fetch("sendmail.php", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          let sentBlock = document.querySelector(".sent");
          let sentClose = document.querySelector(".sent--close");

          form.reset();
          background.classList.remove("_sending");
          sentBlock.classList.add("sent--active");
          sentClose.addEventListener("click", function () {
            sentBlock.classList.remove("sent--active");
          });
        } else {
          alert("Ошибка!!!");
          background.classList.remove("_sending");
        }
      } else {
        console.log("111");
        let errorBlock = document.querySelector(".error");
        let errorClose = document.querySelector(".error--close");

        errorBlock.classList.add("error--active");
        errorClose.addEventListener("click", function () {
          errorBlock.classList.remove("error--active");
        });
      }
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll("._req");

      for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);
        if (input.classList.contains("_email")) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          }
        } else if (
          input.getAttribute("type") === "checkbox" &&
          input.checked === false
        ) {
          formAddError(input);
          error++;
        } else {
          if (input.value === "") {
            formAddError(input);
            error++;
          }
        }
      }

      return error;
    }

    function formAddError(input) {
      input.parentElement.classList.add("_error");
      input.classList.add("_error");
    }

    function formRemoveError(input) {
      input.parentElement.classList.remove("_error");
      input.classList.remove("_error");
    }

    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  }
})();
