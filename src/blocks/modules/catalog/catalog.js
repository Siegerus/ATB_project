import SimpleBar from "simplebar";
import ResizeObserver from "resize-observer-polyfill";

import { toFadeIn } from "../header/header.js";

window.addEventListener("DOMContentLoaded", function () {
    window.ResizeObserver = ResizeObserver;

    Array.prototype.forEach.call(
        document.querySelectorAll(".catalog-accord__scroll-box"),
        (el) => {
            new SimpleBar(el, {
                autoHide: false,
                /* forceVisible: true|"x"|"y", */
                direction: "rtl",

            });
        }
    );

    SimpleBar.removeObserver();

    let hearts = this.document.querySelectorAll(".cards-item__icon"),
        parent = this.document.querySelector(".catalog__tabs"),
        tabs = this.document.querySelectorAll(".catalog__tab"),
        content = this.document.querySelectorAll(".cards__wrapper_ctg"),

        accordItem = this.document.querySelectorAll(".catalog-accord"),
        accordContent = this.document.querySelectorAll(".catalog-accord__content"),
        scrollBox = this.document.querySelectorAll(".catalog-accord__scroll-box"),
        accordImg = this.document.querySelectorAll(".catalog-accord__icon");

    hearts.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("cards-item__icon_active");
        });
    });

    let hideContent = function (b) {
        for (let a = b; a < content.length; a++) {
            content[a].style.display = "none";
        }
    };

    hideContent(1);

    let showContent = function (c) {
        if (content[c].style.display == "none") {
            content[c].style.display = "grid";
            toFadeIn(content[c]);
        }
    };

    let setTabs = function () {
        parent.addEventListener("click", (e) => {
            if (e.target || e.target.classList.contains("catalog__tab")) {
                for (let i = 0; i < tabs.length; i++) {
                    if (e.target == tabs[i]) {
                        hideContent(0);
                        showContent(i);
                    }
                }
            }
        });

        tabs.forEach((item) => {
            item.addEventListener("click", function () {
                for (let i = 0; i < tabs.length; i++) {
                    tabs[i].classList.remove("catalog__tab_active");
                    this.classList.add("catalog__tab_active");
                }
            });
        });
    };

    setTabs();

    let setAccordeon = function () {
        function showContent(a) {
            accordImg[a].style.transform = "rotate(180deg)";
            scrollBox[a].style.display = "block";
            accordItem[a].style.minHeight = accordContent[a].clientHeight + "px";
        }

        function hideContent(a) {
            accordImg[a].style.transform = "rotate(360deg)";
            scrollBox[a].style.display = "none";
            accordItem[a].style.minHeight = 0;
        }

        function hideByDocClick(e) {
            if (e.target.closest(".catalog-accord") || e.target.closest(".catalog__tabs-wrapper") || e.target.closest(".cards__wrapper_ctg")) {
                return;
            } 
            for (let i = 0; i < accordItem.length; i++) {
                accordItem[i].classList.remove("catalog-accord_active");
                hideContent(i);
                document.removeEventListener("click", hideByDocClick);
            }
        }

        accordItem.forEach((item) => {
            item.addEventListener("click", function (e) {
                if (e.target.closest(".catalog-accord__special")) {
                    return;
                }

                if (e.target.closest(".catalog-accord")) {
                    for (let i = 0; i < accordItem.length; i++) {
                        accordItem[i].classList.remove("catalog-accord_active");
                        this.classList.add("catalog-accord_active");
                        
                        if (accordItem[i].classList.contains("catalog-accord_active")) {
                            setTimeout(() => document.addEventListener("click", hideByDocClick));
                            showContent(i);
                        } else {
                            document.removeEventListener("click", hideByDocClick);
                            hideContent(i);
                        }
                        /* accordItem[i].classList.contains("catalog-accord_active")? showContent(i) :
                            hideContent(i); */
                    }
                }
            });
        });
    };

    setAccordeon();
});