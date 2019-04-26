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

    //стрелка в фильтре
    $('.choose__arrow').on('click', function(e) {
        $(this).next('ul').slideToggle();
        $(this).toggleClass('rotate');
    });

    //стрелка в фильтре
    $('.ui-slider__arrow').on('click', function(e) {
        $(this).next('.ui-slider__amounts').slideToggle();
        $(this).toggleClass('rotate');
    });

    //показать еще в фильтре
    $('.show-more').on('click', function(e) {
        $(this).addClass('hide');
        $(this).closest('ul').find('li').removeClass('hide');
    });

    //все параметры в фильтре
    $('.selection__button').on('click', function(e) {
        $(this).addClass('hide');
        $(this).closest('.selection__wrapper').find('section').removeClass('hide');
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

    //слайдер цены в фильтре
    $("#slider").slider({
        range: true,
        min: 1000,
        max: 100000,
        values: [ 100, 66666 ],
        slide: function( event, ui ) {
            $( ".ui-slider__from-input" ).val(ui.values[0] );
            $( ".ui-slider__to-input" ).val(ui.values[1] );
        }
    });

    //начальное значение цены в слайдере цены
    $(".ui-slider__from-input").change(function () {
        var value = $(this).val();
        console.log(typeof(value));
        $("#slider").slider("values", 0, value);
    });

    //конечное значение цены в слайдере цены
    $(".ui-slider__to-input").change(function () {
        var value = $(this).val();
        console.log(typeof(value));
        $("#slider").slider("values", 1, value);
    });
});