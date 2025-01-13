import SimpleBar from "simplebar";
import ResizeObserver from "resize-observer-polyfill";

import { toFadeIn } from "../header/header.js";
import { toFadeOut } from "../header/header.js";

let setScroll = (parentIt, scrollBlockIt, arrowNextIt, arrowPrevIt, tabsIt) => {
    let scrollRight = () => {
        let x = parentIt.offsetWidth - scrollBlockIt.offsetWidth;
        scrollBlockIt.scrollLeft = -(x);
    };
    arrowNextIt.addEventListener("click", () => {
        scrollBlockIt.scrollLeft += 160;
    });
    arrowPrevIt.addEventListener("click", scrollRight);
    tabsIt.forEach((item) => {
        item.addEventListener("click", () => {
            item.scrollIntoView(
                { 
                    behavior: "smooth", 
                    inline: "center" ,
                    block: "nearest" 
                }
            );
        });
    });
};

let setTabs = function (contentIt, parentIt, tabsIt, radioIt, selectTextIt, selectArrowIt, selectHeadlineIt) {
    let hideContent = function (b) {
        for (let a = b; a < contentIt.length; a++) {
            contentIt[a].style.display = "none";
        }
    };
    hideContent(1);
    let showContent = function (c) {
        if (contentIt[c].style.display == "none") {
            contentIt[c].style.display = "grid";
            toFadeIn(contentIt[c]);
        }
    };
    parentIt.addEventListener("click", (e) => {
        if (e.target || e.target.classList.closest(".catalog-tab")) {
            for (let i = 0; i < tabsIt.length; i++) {
                if (e.target == tabsIt[i]) {
                    hideContent(0);
                    showContent(i);
                }
            }
        }
    });
    tabsIt.forEach((item) => {
        item.addEventListener("click", function () {
            for (let i = 0; i < tabsIt.length; i++) {
                tabsIt[i].classList.remove("catalog-tab_active");
                this.classList.add("catalog-tab_active");
                if (tabsIt[i].classList.contains("catalog-tab_active")) {
                    radioIt[i].checked = true;
                    selectTextIt.textContent = tabsIt[i].textContent;
                }
            }
        });
    });
    let setSelect = () => {
        let showSelect = function () {
            parentIt.classList.add("catalog-tabs_active");
            selectArrowIt.style.transform = "rotate(180deg)";
            toFadeIn(parentIt);
        };
        let hideSelect = function () {
            selectArrowIt.style.transform = "rotate(0deg)";
            toFadeOut(parentIt, "catalog-tabs_active");
        };
        let hideByOverclick = function (e) {
            if (e.target.closest(".catalog-tabs") || e.target.closest(".catalog-select-headline")) {
                return;
            }
            hideSelect();
            selectHeadlineIt.classList.remove("catalog-select-headline_active");
            document.removeEventListener("click", hideByOverclick);
        };
        selectHeadlineIt.addEventListener("click", function (e) {
            if (e.target.closest(".catalog-select-headline")) {
                this.classList.toggle("catalog-select-headline_active");
            }
            if (selectHeadlineIt.classList.contains("catalog-select-headline_active")) {
                showSelect();
                setTimeout(() => document.addEventListener("click", hideByOverclick));
            } else {
                hideSelect();
                document.removeEventListener("click", hideByOverclick);
            }
        });
    };
    setSelect();
};
export { setScroll };
export { setTabs };

window.addEventListener("DOMContentLoaded", function () {
    if (this.document.querySelector(".catalog")) {
        
        let hearts = this.document.querySelectorAll(".cards-item__icon"),
            parent = this.document.querySelector(".catalog__tabs"),
            tabs = this.document.querySelectorAll(".catalog__tab"),
            content = this.document.querySelectorAll(".cards__wrapper_ctg"),
            radio = parent.querySelectorAll("input[type='radio']"),

            selectHeadline = this.document.querySelector(".catalog-select-headline"),
            selectText = selectHeadline.querySelector(".catalog-select-text"),
            selectArrow = selectHeadline.querySelector(".catalog-select-icon"),

            arrowNext = this.document.querySelector(".catalog__arrow_next"),
            arrowPrev = this.document.querySelector(".catalog__arrow_prev"),
            scrollBlock = this.document.querySelector(".catalog__tabs-wrapper"),

            accordItem = this.document.querySelectorAll(".catalog-accord"),
            accordContent = this.document.querySelectorAll(".catalog-accord__content"),
            scrollBox = this.document.querySelectorAll(".catalog-accord__scroll-box"),
            accordImg = this.document.querySelectorAll(".catalog-accord__icon");

        hearts.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                item.classList.toggle("cards-item__icon_active");
            });
        });

        let setScrollBar  = () => {
            window.ResizeObserver = ResizeObserver;

            Array.prototype.forEach.call(
                document.querySelectorAll(".catalog-accord__scroll-box"),
                (el) => {
                    new SimpleBar(el, {
                        autoHide: false,
                    });
                }
            );
    
            SimpleBar.removeObserver();
        };

        setScrollBar();
        
        let setAccordeon = () => {
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
                        }
                    }
                });
            });
        };

        setAccordeon();

        setTabs(content, parent, tabs, radio, selectText, selectArrow, selectHeadline);
        setScroll(parent, scrollBlock, arrowNext, arrowPrev, tabs);
    }
});