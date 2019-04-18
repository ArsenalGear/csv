//Функции инициализирующиеся или срабатывающие по document.ready
$(function () {

    // Убираем плейсхолдер у поля формы при фокусе на нем
    if ($('input, textarea').length > 0) {
        $('input, textarea').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    }

    // //Все инпуты с типом tel имеют маску +7 (999) 999 99 99
    // if ($('input[type=tel]').length > 0) {
    //     $('input[type=tel]').mask('+7 (999) 999 99 99');
    // }

    $('#menuBtn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('menu-btn_active');
        $('.drop-down').toggleClass('hidden');
    });

    $('.header__select').select2();

    $('#slider-main').slick({
        // autoplaySpeed: 2,
        // dots: true,
        speed: 300,
        infinite: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'linear'
    });

    $('#sale-slider').slick({
        // autoplaySpeed: 2,
        // dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 300,
        infinite: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'linear'
    });


});