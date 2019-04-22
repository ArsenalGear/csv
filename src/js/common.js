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
        if ($(window).width() <= 991) {
            $(this).toggleClass('menu-btn_active');
            $('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
            $("#drop-down").animate({width:'100%'}, 300);
            // $("#drop-down").show('slide', {direction: 'right'}, 2000);
            // $(".drop-down").show('slide', {direction: 'right'}, 2000);
            $('header, main').toggleClass('opacity');
        }
        else {
            $(this).toggleClass('menu-btn_active');
            $('.drop-down').toggleClass('hidden');
        }
    });

    $('.modal__close-modal').on('click', function(e) {
        $("#drop-down").animate({width:'1%'}, 300);
        setTimeout(function () {
            $('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
        }, 290);
        $('#menuBtn').toggleClass('menu-btn_active');
        $('header, main').toggleClass('opacity');
    });

    // $('.header__select').select2();

    $('#slider-main').slick({
        // autoplaySpeed: 2,
        // dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        fade: true,
        // adaptiveHeight: true,
        cssEase: 'linear',

    });

    $('#sale-slider').slick({
        // autoplaySpeed: 2,
        // dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        // centerMode: true,
        // centerPadding: '10px',
        // customPaging: '50px',
        // variableWidth: true,

        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1000,
        infinite: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'linear',

        responsive: [
            {
                breakpoint: 991,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 568,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    });

    $('#search-input').focus(function() {
        $('#overlay').show();
        $('.header__search').addClass('input-overlay');
    });

    $('#overlay').on('click', function() {
        $(this).hide();
    });
});