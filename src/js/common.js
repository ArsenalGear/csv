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

    //меню
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

    //закрытие модалки по крестику
    $('.modal__close-modal').on('click', function(e) {

        $("#drop-down").animate({width:'1%'}, 300);

        setTimeout(function () {

            $('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
        }, 290);

        $('#menuBtn').toggleClass('menu-btn_active');
        $('header, main').toggleClass('opacity');
    });

    //json города в шапке
    var countryArray = [

        {id:0, text:'Москва', city: ['Апрелевка', 'Балашиха', 'Домодедово'] },
        {id:1, text:'Санкт - Петербург', city: ['Пушкин', 'Петергоф'] } ,
        {id:2, text:'Нижний - Новгород', city: ['Боровичи', 'Великий Новгород', 'Чудово'] }

    ];

    //выбор региона из селекта в шапке и добавление в textarea там же
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

    //вызов выбор региона из селекта в шапке и добавление в textarea там же
    $('#countrySelect').on('change', function() {
        changeSelect();
    });

    $("#goodSlider").slick({
        autoplay: false,
        dots: true,
        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).find('img');
            console.log(thumb);
            return '<a><img src="'+thumb[0].currentSrc+'"></a>';
        },
    });

    //многострадальный слайдер со ссылками на главной
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

    //слайдер со скидками на главной
    $('#sale-slider').slick({

        // autoplay: true,
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

    //оверлей на поиск в шапке
    $('#search-input').focus(function() {

        $('#overlay').show();
        $('.header__search').addClass('input-overlay');
    });

    //оверлей на поиск в шапке скрытие
    $('#overlay').on('click', function() {

        $(this).hide();
    });

    //вы успешно подписались на главной
    $('#subscribeForm').submit(function( e ) {

        e.preventDefault();
        $('#email, #sucsessBtn').hide();
        $('#subscrSuccsess').show();
    });

    //добавление магазина из субфутера
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

    //добавление магазина из блока поделиться
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

    //открытие модалки на выбор города
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

    //закрытие модалки после окончательного выбора региона из textarea в шапке селекта
    $('body').on('click', '.add-shop__close, .add-shop__region', function() {
        $.magnificPopup.close();
        $('input, textarea, select').val('');
    });

    //вы успешно добавили магазин, вызов второй модалки после заполнения полей в первой при подключении магазина
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