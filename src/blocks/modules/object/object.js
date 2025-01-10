import { tns } from "tiny-slider";

window.addEventListener("DOMContentLoaded" , function() {

    let slider = this.document.querySelector(".object-slider");
        
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

    let next = this.document.querySelector(".object__arrow_next"),
        prev = this.document.querySelector(".object__arrow_prev"),
        focusBox = this.document.querySelector(".object__focus-box"),
        slide = this.document.querySelectorAll(".tns-item"),
        heart = this.document.querySelector(".cards-item__icon");

    heart.addEventListener("click", function() {
        this.classList.toggle("cards-item__icon_active");
    });

    slide.forEach((item) => {
        item.addEventListener("click", () => {
            focusBox.innerHTML = item.innerHTML;
        });
    });

    next.addEventListener("click", function () {
        slider.goTo("next");
    });

    prev.addEventListener("click", function () {
        slider.goTo("prev");
    });

});