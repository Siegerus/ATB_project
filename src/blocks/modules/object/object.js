import { tns } from "tiny-slider";
import { setTabs, setScroll } from "../catalog/catalog";

window.addEventListener("DOMContentLoaded" , function() {

    let parent = this.document.querySelector(".object__tabs"),
        tabs = this.document.querySelectorAll(".object__tab"),
        content = this.document.querySelectorAll(".object__content"),
        hearts = this.document.querySelectorAll(".cards-item__icon"),
        next = this.document.querySelector(".object__arrow_next"),
        prev = this.document.querySelector(".object__arrow_prev"),
        focusBox = this.document.querySelector(".object__focus-box"),
        slider = this.document.querySelector(".object-slider"),

        selectHeadline = this.document.querySelector(".catalog-select-headline"),
        selectText = selectHeadline.querySelector(".catalog-select-text"),
        selectArrow = selectHeadline.querySelector(".catalog-select-icon"),
        radio = parent.querySelectorAll("input[type='radio']"),

        scrollNext = this.document.querySelector(".catalog-arrow_obj_next"),
        scrollPrev = this.document.querySelector(".catalog-arrow_obj_prev"),
        scrollBlock = this.document.querySelector(".object__tabs-wrapper");

    hearts.forEach((item) => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            item.classList.toggle("cards-item__icon_active");
        });
    });  

    

    let setSlider = () => {

        slider = tns({
            container: ".object-slider",
            items: 3,
            /* axis: "vertical", */
            axis: "horizontal",
            swipeAngle: false,
            speed: 400,
            nav: false,
            controls: false,
            gutter: 5,
            responsive: {
                577: {
                    items: 4,
                    gutter: 9,
                },

                993: {
                    items: 4,
                },

                1200: {
                    items: 3,
                },
            }
        });
    
        next.addEventListener("click", function () {
            slider.goTo("next");
        });
    
        prev.addEventListener("click", function () {
            slider.goTo("prev");
        });

        let toFocusIn = () => {
            let slide = this.document.querySelectorAll(".tns-item");

            slide.forEach((item) => {
                item.addEventListener("click", () => {
                    focusBox.innerHTML = item.innerHTML;
                });
            });
        };

        toFocusIn();
    };

    setSlider();

    setTabs(content, parent, tabs, radio, selectText, selectArrow, selectHeadline);
    setScroll(parent, scrollBlock, scrollNext, scrollPrev, tabs);
});