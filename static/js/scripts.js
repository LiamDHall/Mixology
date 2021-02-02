//  Swiper JS
var mySwiper = new Swiper('.swiper-container', {
    // Optional Parameters
    slidesPerView: 6.5,
    spaceBetween: 10,
    slidesPerGroup: 6,
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
})

//  Navbar Active Link Toggler
$('.nav-item').click(function() {
    $('.nav-item').removeClass('active');               //  Remove active class off the one that has it
    currentPage = `#${this.id}`;                        //  Set page/link ID
    localStorage.setItem('currentPageId', currentPage); //  Add it to local storage to be called by function below
});

$( document ).ready(function() {
    var storeId = localStorage.getItem('currentPageId'); //  Retrieve page/link ID from local storage 
    if(storeId == '#logo') {                             //  Puts acitve class on home if logo is clicked
        $('#home').addClass('active')
    }
    else if(storeId == '#') {                            //  If an item not in the navbar is clicked
        return
    }
    else {                                               //  Adds the active class onto the click link after page re-load
        $(storeId).addClass('active')
    };
});


//  Cocktail Checkbox Toggler
$('.cocktail__checkbox').click(function() {
    checkboxStatus = $(this).html();
    if(checkboxStatus == '<i class=\"far fa-square\"></i>') {
        $(this).html('<i class=\"fas fa-check\"></i>').css('color', 'limegreen');
    }
    else {
        $(this).html('<i class=\"far fa-square\"></i>').css('color', 'inherit');
    }                                 
});

/* 
Keeps scroll position in place on page reload 
Source: https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position#:~:text=Usually%20reload()%20restores%20the,scrollY%20%3D%3D%3D%200.&text=This%20might%20be%20useful%20for,click%20on%20a%20same%20position
(Adapted To My Needs): By adding condition that the function only works if the url is same after load
*/
document.addEventListener("DOMContentLoaded", function () {
        var currentPage = sessionStorage.getItem('currentpage');
        var scrollPos = sessionStorage.getItem('scrollpos');
        if (currentPage == window.location.href) {
            if (scrollPos) {
                window.scrollTo(0, scrollPos);
                sessionStorage.removeItem('scrollpos');
            }
        }
    });

window.addEventListener("beforeunload", function () {
    sessionStorage.setItem('scrollpos', window.scrollY);
    sessionStorage.setItem('currentpage', window.location.href);
});