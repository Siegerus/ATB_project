const toFadeIn = function(element) {
    if(element.classList.contains("animation__type_fadeOut")) {
        element.classList.remove("animation__type_fadeOut");
    }
    element.classList.add("animation__type_fadeIn");
};
export {toFadeIn};

const toFadeOut = function(element, activeClass) {
    element.classList.remove("animation__type_fadeIn");
    element.classList.add("animation__type_fadeOut");
    element.addEventListener("animationend", (e) => {
        if (e.target.classList.contains("animation__type_fadeOut")) {
            element.classList.remove(activeClass);
        }
    });
};
export {toFadeOut};

window.addEventListener("DOMContentLoaded", function () {

    let menuSet = function () {

        let menu = document.querySelector(".header__nav"),
            menuText = document.querySelector(".header__text"),
            hamburger = document.querySelector(".header__hamburger"),
            dropdown = document.querySelector(".header-dropdown");
        
        let menuClose = function (e) {
            if (e.target.closest(".header__nav")) {
                return;
            }
            menu.classList.remove("header__nav_active");
            menuText.classList.remove("header__text_active");
            hamburger.classList.remove("header__hamburger_active");
            document.removeEventListener("click", menuClose);
            toFadeOut(dropdown, "header-dropdown_active");
        };

        menu.addEventListener("click", function (e) {
            if (e.target.closest(".header-dropdown")) {
                return;
            }
            this.classList.toggle("header__nav_active");
            menuText.classList.toggle("header__text_active");
            hamburger.classList.toggle("header__hamburger_active");
            dropdown.classList.add("header-dropdown_active");


            if (this.classList.contains("header__nav_active")) {
                document.addEventListener("click", menuClose);
                toFadeIn(dropdown);
            } else {
                document.removeEventListener("click", menuClose);
                toFadeOut(dropdown, "header-dropdown_active");
            }
        });
    };

    menuSet();

    let langDropdownSet = function () {

        let menu = document.querySelector(".header__langWrapper"),
            arrow = document.querySelector(".header__arrow"),
            liHidden  = document.querySelectorAll(".header__lang-hidden"),
            list = document.querySelector(".header__lang-dropdown");

        let langMenuClose = function (e) {
            if (e.target.closest(".header__langWrapper")) return;

            menu.classList.remove("header__langWrapper_active");
            list.classList.remove("header__lang-dropdown_active");
            arrow.classList.remove("header__arrow_active");
            document.removeEventListener("click", langMenuClose);
            toFadeOut(list, "header__lang-dropdown_active");
        };

        menu.addEventListener("click", (e) => {
            if (e.target.closest(".header__langWrapper")) {
                /* if (e.target.closest(".header__lang-dropdown")) return; */

                menu.classList.toggle("header__langWrapper_active");
                list.classList.add("header__lang-dropdown_active");
                arrow.classList.toggle("header__arrow_active");

                if (menu.classList.contains("header__langWrapper_active")) {
                    document.addEventListener("click", langMenuClose
                    );
                    liHidden.forEach((item) => item.style.display = "block");
                    toFadeIn(list);
                } else {
                    document.removeEventListener("click", langMenuClose
                    );
                    liHidden.forEach((item) => item.style.display = "none");
                    toFadeOut(list, "header__lang-dropdown_active");
                }
            }
        });
    };

    langDropdownSet();

    let setTextContent = function() {

        let lang = document.querySelectorAll(".header__lang-dropdown li"),
            langPlace = document.querySelector(".header__lang-place");

        lang.forEach((item) => {
            item.addEventListener("click", () => {
                langPlace.textContent = item.textContent;
            });
        });
    };

    setTextContent();

    let modalSet = function () {
        let modal = document.querySelector(".header__overlay"),
            hamburger = document.querySelector(".header__hamburger_m-visible"),
            close = document.querySelector(".header__close");

        hamburger.addEventListener("click", (e) => {
            if (e.target.closest(".header__hamburger_m-visible")) {
                modal.classList.toggle("header__overlay_active");
                toFadeIn(modal);
            }
        });

        close.addEventListener("click", () => {
            toFadeOut(modal, "header__overlay_active");
        });

        modal.addEventListener("click", function (e) {
            if (e.target.closest(".header__nav-mobile")) return;
            toFadeOut(modal, "header__overlay_active");
        });
    };

    modalSet();
    
});









/* window.addEventListener("DOMContentLoaded", function() {

    let menuSet = function() {
        let menu = document.querySelector(".header__nav"),
            menuText = document.querySelector(".header__text"),
            hamburger = document.querySelector(".header__hamburger"),
            dropdown = document.querySelector(".header-dropdown");

        let menuClose = function(e) {
            if (e.target.closest(".header__nav")) return;

            menu.classList.remove("header__nav_active");
            menuText.classList.remove("header__text_active");
            hamburger.classList.remove("header__hamburger_active");
            dropdown.classList.remove("header-dropdown_active");
            document.removeEventListener("click", menuClose);
        };

        menu.addEventListener("click", function(e) {
            if (e.target.closest(".header-dropdown")) return;

            this.classList.toggle("header__nav_active");
            menuText.classList.toggle("header__text_active");
            hamburger.classList.toggle("header__hamburger_active");
            dropdown.classList.toggle("header-dropdown_active");

            if (menu.classList.contains("header__nav_active")) 
                document.addEventListener("click", menuClose);
            else 
                document.removeEventListener("click", menuClose);
        });
    };

    menuSet();

}); */

/* window.addEventListener("DOMContentLoaded", function() {
    const menu = this.document.querySelector(".header__nav"),
        wrapper = this.document.querySelector(".header__wrap"),
        menuText = this.document.querySelector(".header__text"),
        hamburger = this.document.querySelector(".header__hamburger"),
        dropdown = this.document.querySelector(".header-dropdown");

    const menuClose = function(e) {
        if (e.target.closest(".header__nav")) return;

        menu.classList.remove("header__nav_active");
        menuText.classList.remove("header__text_active");
        hamburger.classList.remove("header__hamburger_active");
        dropdown.classList.remove("header-dropdown_active");
        document.removeEventListener("click", menuClose);
    };

    menu.addEventListener("click", function(e) {
        if (e.target.closest(".header-dropdown")) return;

        this.classList.toggle("header__nav_active");
        menuText.classList.toggle("header__text_active");
        hamburger.classList.toggle("header__hamburger_active");
        dropdown.classList.toggle("header-dropdown_active");

        if (menu.classList.contains("header__nav_active")) 
            setTimeout(_ => document.addEventListener("click", menuClose));
        else 
            document.removeEventListener("click", menuClose);
    });
}); */