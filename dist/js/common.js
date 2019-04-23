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
    if ($('input[type=tel]').length > 0) {
        $('input[type=tel]').mask('+7 (999) 999 99 99');
    }

    $('#menuBtn').on('click', function(e) {

        e.preventDefault();

        if ($(window).width() <= 991) {

            $(this).toggleClass('menu-btn_active');
            $('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
            $("#drop-down").animate({width:'100%'}, 300);
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

    //json города
    var countryArray = [

        {id:0, text:'Москва', city: ['Апрелевка', 'Балашиха', 'Домодедово'] },
        {id:1, text:'Питер', city: ['Пушкин', 'Петергоф'] } ,
        {id:2, text:'Новгород', city: ['Боровичи', 'Великий Новгород', 'Чудово'] }

    ];

    function changeSelect() {
        switchCity = $("#countrySelect").val();

        var tempCity = countryArray[switchCity].city;

        $('.add-shop__regions-block').html('');

        for (i=0; i<tempCity.length; i++) {
            console.log(tempCity[i]);

            var transferInput = '<a class="add-shop__region" href="#" title="#">' + tempCity[i] + '</a>';

            $('.add-shop__regions-block').append(transferInput);
        }
    }

    $('#countrySelect').on('change', function() {
        changeSelect();
    });

    $('#slider-main').slick({

        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        fade: true,
        cssEase: 'linear',

    });

    $('#sale-slider').slick({

        autoplay: true,
        autoplaySpeed: 3000,
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

    $('#subscribeForm').submit(function( e ) {

        e.preventDefault();
        $('#email, #sucsessBtn').hide();
        $('#subscrSuccsess').show();
    });

    $('.sub-footer__add-shop').magnificPopup({
        // type: 'inline',
        preloader: true,
        focus: '#fio',
        // closeBtnInside: true,

        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    $('.shop-add__shop-card-no-border').magnificPopup({

        preloader: true,
        focus: '#fio',

        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    //открытие модалки на выбо города
    $('.header__select-block').magnificPopup({

        preloader: true,

        callbacks: {
            beforeOpen: function() {

                $('#countrySelect').select2({
                    data: countryArray,
                });

                changeSelect();

                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    //передача города в шапку
    $('body').on('click', '.add-shop__region', function() {
        var region = $(this).text();
        $('.header__select').text(region);
    });

    $('body').on('click', '.add-shop__close, .add-shop__region', function() {
        $.magnificPopup.close();
        $('input, textarea, select').val('');
    });

    $('#addShop').submit(function( e ) {

        e.preventDefault();

        // $.ajax({
        //     type: "POST",
        //     url: "mail",
        //     data: $(this).serialize()
        // }).done();

        $.magnificPopup.close();
        $('input, textarea').val('');
        $.magnificPopup.open({
            items: {
                src: '#thanks'
            },
            // type: 'inline'
        });
    });

});