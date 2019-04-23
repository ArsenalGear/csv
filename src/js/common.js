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

    var countryArray = [

        {id:0, text:'Москва', city: ['Москва1', 'Москва2'] },
        {id:1, text:'Питер', city: ['Питер1', 'Питер2'] } ,
        {id:2, text:'Новгород', city: ['Новгород1', 'Новгород2'] }

    ];

    $('#countrySelect').select2({data: countryArray});

    $('#countrySelect').on('change', function() {

        switch ( $("#countrySelect").val() ) {

            case "0":
                return console.log( countryArray[0].city );
                break;

            case "1":
                return console.log( countryArray[1].city );
                break;

            case "2":
                return console.log( countryArray[2].city );
                break;
        }

        // console.log( $("#countrySelect").val() );
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

    $('.header__select-block').magnificPopup({

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

    $('.add-shop__close').on('click', function() {
        $.magnificPopup.close();
        $('input, textarea').val('');
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