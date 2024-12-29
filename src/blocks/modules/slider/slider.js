import { tns } from "tiny-slider";

window.addEventListener("DOMContentLoaded", function () {

    let slider = tns({
        container: ".slider__wrapper",
        items: 1,
        gutter: 34,
        slideBy: "page",
        autoplay: false,
        controls: false,
        navPosition: "bottom",
        edgePadding: 0,
        autoHeight: true,
        responsive: {
            310: {               /* w388 */
                gutter: 17,
                fixedWidth: false
            },

            500: {              /* w625 */
                items: 2
            },

            794: {             /* w993 */
                items: 4,
            },

            985: {             /* w1232 */
                items: 4,
            },

            1153: {              /* w1442 */
                items: 5,
                gutter: 55,
            },

            1400: {              /* w1442 */
                items: 6,
            }
        }
    });

    let prev = this.document.querySelector(".slider__arrow-prev"),
        next = this.document.querySelector(".slider__arrow-next");

    next.addEventListener("click", function () {
        slider.goTo("next");
    });

    prev.addEventListener("click", function () {
        slider.goTo("prev");
    });

    let sliderItem = this.document.querySelectorAll(".slider__item "),
        ariaImg = this.document.querySelectorAll(".cards-item__img"),
        ariaBody = this.document.querySelectorAll(".cards-item__body"),
        ariaIcon = this.document.querySelectorAll(".cards-item__icon"),
        rotated = this.document.querySelectorAll(".slider__rotate ");

    let ariaBlur = function(ariaItem) {
        ariaItem.forEach((item) => {
            item.addEventListener("click", (e) => {
                if (e.target == item) {
                    item.blur();
                }
            });
        });
    };

    ariaBlur(ariaImg);
    ariaBlur(ariaBody);
    ariaBlur(ariaIcon);

    

    

    sliderItem.forEach((item) => {
        item.addEventListener("click", function (e) {
            if (e.target.closest(".slider__item ")) {
                for (let i = 0; i < sliderItem.length; i++) {
                    sliderItem[i].classList.remove("slider__item_active");
                    this.classList.add("slider__item_active");
                    if (sliderItem[i].classList.contains("slider__item_active")) {
                        rotated[i].classList.add("slider__rotate_active");
                    } else {
                        rotated[i].classList.remove("slider__rotate_active");
                    }
                }
            }
        });
    });
});
