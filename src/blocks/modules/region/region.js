import { toFadeIn } from "../header/header.js";

window.addEventListener("DOMContentLoaded", function () {

    if(this.document.querySelector(".regon")) {
        let parent = this.document.querySelector(".region__tabs"),
            tabs = this.document.querySelectorAll(".region__tab"),
            content = this.document.querySelectorAll(".region__content"),
            mapsAlm = this.document.querySelectorAll(".region__map_alm"),
            mapsReg = this.document.querySelectorAll(".region__map_reg"),
            buttonsReg= this.document.querySelectorAll(".region__button_reg"),
            buttonsAlm = this.document.querySelectorAll(".region__button_alm");

        let hideContent = function (b) {
            for (let a = b; a < content.length; a++) {
                content[a].style.display = "none";
            }
        };

        hideContent(1);

        let showContent = function (c) {
            if (content[c].style.display == "none") {
                content[c].style.display = "flex";
                toFadeIn(content[c]);
            }
        };

        let setTabs = function () {
            parent.addEventListener("click", (e) => {
                if (e.target || e.targer.classList.contains("region__tab")) {
                    for (let i = 0; i < tabs.length; i++) {
                        if (e.target == tabs[i]) {
                            hideContent(0);
                            showContent(i);
                        }
                    }
                }
            });
        };

        tabs.forEach((item) => {
            item.addEventListener("click", function () {
                for (let i = 0; i < tabs.length; i++) {
                    tabs[i].classList.remove("region__tab_active");
                    this.classList.add("region__tab_active");
                }
            });
        });

        setTabs();
        

        let setButtons = function(contentBtn, contentMap) {

            let hideMaps = function(b){
                for(let a = b; a < contentMap.length; a++) {
                    contentMap[a].style.display = "none";
                }
            };

            hideMaps(1);

            let showMaps = function(c) {
                if(contentMap[c].style.display == "none") {
                    contentMap[c].style.display = "block";
                    toFadeIn(contentMap[c]);
                }
            };

            contentBtn.forEach((item, i) => {
                item.addEventListener("click", function(e) {
                    for(let i = 0; i < contentBtn.length; i++) {
                        contentBtn[i].classList.remove("region__button_active");
                        this.classList.add("region__button_active"); 
                    }
                    if(e.target == item) {
                        hideMaps(0);
                        showMaps(i);
                    }
                });
            });
        };

        setButtons(buttonsAlm, mapsAlm);
        setButtons(buttonsReg, mapsReg); 
    }  
});



