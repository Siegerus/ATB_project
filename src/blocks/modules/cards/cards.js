import { tns } from "tiny-slider";

window.addEventListener("DOMContentLoaded", function() {
    
    let restSlider = tns({
        container: ".cards__wrapper_rest",
        slideBy: "page",
        items: 1,
        autoplay: false,
        controls: false,
        navPosition: "bottom",
        autoHeight: true,
        viewportMax: 341,
        edgePadding: 0,
        responsive: {
            768: {
                disable: true
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
                disable: true
            }
        }
    });
});




