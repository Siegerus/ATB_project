import { tns } from "tiny-slider";

window.addEventListener("DOMContentLoaded", function () {

    let slider = tns({
        container: ".slider__wrapper",
        items: 1,
        gutter: 34,
        fixedWidth: 174,
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

            800: {             /* w1000 */
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

    let rotated = this.document.querySelectorAll(".slider__rotate ");

    rotated.forEach((item) => {
        item.addEventListener("click", function() {
            for(let i = 0; i < rotated.length; i++) {
                rotated[i].classList.remove("slider__rotate_active");
                this.classList.add("slider__rotate_active");
            }
        });
    });

    let consoleFn = function() {
        console.log("test");
    };

    slider.events.on("indexChanged", consoleFn);

});
