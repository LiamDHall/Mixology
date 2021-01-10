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