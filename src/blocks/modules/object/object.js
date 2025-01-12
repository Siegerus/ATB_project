import { tns } from "tiny-slider";
import { setTabs } from "../region/region";
import { setScroll } from "../catalog/catalog";

window.addEventListener("DOMContentLoaded" , function() {

    let parent = this.document.querySelector(".object__tabs"),
        tabs = this.document.querySelectorAll(".object__tab"),
        content = this.document.querySelectorAll(".object__content"),
        heart = this.document.querySelector(".cards-item__icon"),
        next = this.document.querySelector(".object__arrow_next"),
        prev = this.document.querySelector(".object__arrow_prev"),
        focusBox = this.document.querySelector(".object__focus-box"),
        slider = this.document.querySelector(".object-slider"),

        scrollNext = this.document.querySelector(".catalog-arrow_obj_next"),
        scrollPrev = this.document.querySelector(".catalog-arrow_obj_prev"),
        scrollBlock = this.document.querySelector(".object__tabs-wrapper");

    console.log(scrollNext, scrollPrev, scrollBlock);

    heart.addEventListener("click", function() {
        this.classList.toggle("cards-item__icon_active");
    });

    let setSlider = () => {

        slider = tns({
            container: ".object-slider",
            items: 3,
            axis: "vertical",
            swipeAngle: false,
            speed: 400,
            nav: false,
            controls: false,
            gutter: 9
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
    setTabs(content, parent, tabs, (".object__tab"), ("object__tab_active"));
    setScroll(parent, scrollBlock, scrollNext, scrollPrev, tabs);

});