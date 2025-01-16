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

        let initSlider = ({container : val}) => {
            let slider = tns({
                container: val,
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
        };
        
        initSlider({container : ".cards__wrapper_rest"});
        initSlider({container : ".cards__wrapper_hotels"});
        initSlider({container : ".cards__wrapper_gids"});
    }
});




