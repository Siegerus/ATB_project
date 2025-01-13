import { tns } from "tiny-slider";

window.addEventListener("DOMContentLoaded", function() {

    if(this.document.querySelector(".cards__spec")) {
        
        let hearts = document.querySelectorAll(".cards-item__icon");

        hearts.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                item.classList.toggle("cards-item__icon_active");
            });
        });
        
        let restSlider = tns({
            container: ".cards__wrapper_rest",
            slideBy: "page",
            items: 1,
            autoplay: false,
            controls: false,
            navPosition: "bottom",
            viewportMax: 341,
            edgePadding: 0,
            responsive: {
                768: {
                    items: 4,
                    disable: true,
                    
                }
            }
        });
    
        let hotelsSlider = tns({
            container: ".cards__wrapper_hotels",
            slideBy: "page",
            items: 1,
            autoplay: false,
            controls: false,
            navPosition: "bottom",
            edgePadding: 0,
            responsive: {
                768: {
                    items: 4,
                    disable: true
                }
            }
        });
    
        let gidsSlider = tns({
            container: ".cards__wrapper_gids",
            slideBy: "page",
            items: 1,
            autoplay: false,
            controls: false,
            navPosition: "bottom",
            edgePadding: 0,
            responsive: {
                768: {
                    items: 4,
                    disable: true
                }
            }
        });
    }
});




