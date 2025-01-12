import { toFadeIn } from "../header/header.js";

let setTabs = function (contentIt, parentIt, tabsIt, tabsItClass, tabsItActClass) {
    let hideContent = function (b) {
        for (let a = b; a < contentIt.length; a++) {
            contentIt[a].style.display = "none";
        }
    };
    hideContent(1);
    let showContent = function (c) {
        if (contentIt[c].style.display == "none") {
            contentIt[c].style.display = "flex";
            toFadeIn(contentIt[c]);
        }
    };
    parentIt.addEventListener("click", (e) => {
        if (e.target || e.targer.classList.contains(tabsItClass)) {
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
                tabsIt[i].classList.remove(tabsItActClass);
                this.classList.add(tabsItActClass);
            }
        });
    });
};
export { setTabs };

window.addEventListener("DOMContentLoaded", function () {

    if(this.document.querySelector(".region")) {
        let parent = this.document.querySelector(".region__tabs"),
            tabs = this.document.querySelectorAll(".region__tab"),
            content = this.document.querySelectorAll(".region__content"),
            mapsAlm = this.document.querySelectorAll(".region__map_alm"),
            mapsReg = this.document.querySelectorAll(".region__map_reg"),
            buttonsReg= this.document.querySelectorAll(".region__button_reg"),
            buttonsAlm = this.document.querySelectorAll(".region__button_alm");
        
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

        setTabs(content, parent, tabs, (".region__tab"), ("region__tab_active"));
    }  
});



