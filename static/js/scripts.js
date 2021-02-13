//Set inital value for Swiper JS
$(document).ready(function() {
    var width = $(window).width();
    if (width > 1440) {
        noSlides = 6;
    }

    else if (width > 768) {
        noSlides = 5
    }

    else if (width > 425) {
        noSlides = 4
    }

    else {
        noSlides = 3;
    }

    console.log(width)
    console.log(noSlides)

    //  Swiper JS
    var mySwiper = new Swiper('.swiper-container', {

        // Optional Parameters
        slidesPerView: noSlides,
        slidesPerGroup: noSlides,
        
        spaceBetween: 10,
        direction: 'horizontal',
        loop: false,

        //  Navigation Arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        //  Pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });
});

//Set dynamic value for Swiper JS
var noSlides = 3;
window.addEventListener('resize', function(){
    var width = $(window).width();
    if (width > 1440) {
        noSlides = 6;
    }

    else if (width > 768) {
        noSlides = 5
    }

    else if (width > 425) {
        noSlides = 4
    }

    else {
        noSlides = 3;
    }

    console.log(width)
    console.log(noSlides)

    //  Swiper JS
    var mySwiper = new Swiper('.swiper-container', {

        // Optional Parameters
        slidesPerView: noSlides,
        slidesPerGroup: noSlides,
        
        spaceBetween: 10,
        direction: 'horizontal',
        loop: false,

        //  Navigation Arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        //  Pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });
});

/* Image Preview
Source https://stackoverflow.com/questions/20820705/render-preview-image-from-url-input
*/
$('[name="cocktail-img-url"]').on('change', function() {
     $('img.cocktail__img').prop('src', this.value);
});
// (END OF NOT ALL MY OWN CODE)

//  Navbar Active Link Toggler
$(document).ready(function() {
    var currentPage = window.location.href;                                 //  Get current page url
    var pageTitle = currentPage.substr(currentPage.lastIndexOf('/') + 1);   //  Get page title after domain "/"
    $('.nav-item').removeClass('active');                                   //  Remove active class off old nav link
    var pageTitleLower = pageTitle.toLowerCase()                            //  Convert page title to lowercase to match nav ids
    $(`#${pageTitleLower}`).addClass('active');                             //  Add active class to nav link
});

//  Cocktail Checkbox Toggler
$('.cocktail__checkbox').click(function() {
    checkboxStatus = $(this).html();
    if(checkboxStatus == '<i class=\"far fa-square\"></i>') {
        $(this).html('<i class=\"fas fa-check\"></i>').css('color', 'limegreen');
        $(this).closest("li").css("color", "limegreen");
    }
    else {
        $(this).html('<i class=\"far fa-square\"></i>').css('color', 'inherit');
        $(this).closest("li").css("color", "black");
    }                                 
});

// Rate Cocktail Button Style Toggle
$(document).on('click', '.cocktail-header__form-btn', function() {
    collapseState = $(this).attr('aria-expanded')
    console.log("click check")
    console.log(collapseState)
    if (collapseState == "true") {
        $(this).addClass("cta--delete form-btn-align").html("Cancel");
        console.log("if ran")
    }

    else {
        $(this).removeClass("cta--delete form-btn-align").html("Rate This Cocktail");
        console.log("else ran")
    }
});

/* 
Keeps scroll position in place on page reload 
Source: https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position#:~:text=Usually%20reload()%20restores%20the,scrollY%20%3D%3D%3D%200.&text=This%20might%20be%20useful%20for,click%20on%20a%20same%20position
(Adapted To My Needs): By adding condition that the function only works if the url is same after load
*/
document.addEventListener('DOMContentLoaded', function () {
        var currentPage = sessionStorage.getItem('currentpage');
        var scrollPos = sessionStorage.getItem('scrollpos');
        if (currentPage == window.location.href) {
            if (scrollPos) {
                window.scrollTo(0, scrollPos);
                sessionStorage.removeItem('scrollpos');
            }
        }
    });

window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollpos', window.scrollY);
    sessionStorage.setItem('currentpage', window.location.href);
});
// (END OF NOT ALL MY OWN CODE)