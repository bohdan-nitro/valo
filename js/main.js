$(document).ready(function () {

    //  VIEWPORT CHECKER
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var displayDelta = $(window).height() / 3;

        var viewportTop = $(window).scrollTop() - displayDelta;
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll DOMContentLoaded', function() {
        $('.section').each(function() {
            if ($(this).isInViewport()) {
                $(this).addClass('inviewport')
            } else {
                $(this).removeClass('inviewport')
            }
        });
    });

    //  SECTION THIRD SLIDER

    var thirdSectionSlider = '.third-section .slider .swiper-container';
    var thirdSlideSpeed = 600;
    var thirdSlideAutoplayDelay = 4000;
    var thirdSectionSliderSwiper = new Swiper(thirdSectionSlider, {
        speed: thirdSlideSpeed,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: thirdSlideAutoplayDelay,
            stopOnLastSlide: false
        },
        pagination: {
            el: '.third-section .swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.third-section .swiper-nav-button-next',
            prevEl: '.third-section .swiper-nav-button-prev'
        },
        on: {
            init: function () {
                $('circle.progress-ring-line').attr('style', 'animation-duration: ' + ( thirdSlideAutoplayDelay + thirdSlideSpeed ) / 1000 + 's;' );
                $('circle.progress-ring-line').addClass('animated');
            }
        }
    });

    thirdSectionSliderSwiper.on('slideChangeTransitionEnd', function() {
        $('circle.progress-ring-line').addClass('animated');
    });

    thirdSectionSliderSwiper.on('slideChangeTransitionStart', function() {
        $('circle.progress-ring-line').removeClass('animated');
    });

    //  MOBILE SECTION FOUR SLIDER

    if ($(document).width() <= 760) {
        var fourSectionSlider = '.four-section .swiper-container';
        var fourdSlideSpeed = 600;
        var fourSectionSliderSwiper = new Swiper(fourSectionSlider, {
            speed: fourdSlideSpeed,
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.mobile.slider-counter',
                type: 'custom',
                renderCustom: function (swiper, current, total) {

                    if (current <= 9) {
                        current = '0' + current;
                    } else {
                        current = current;
                    }

                    if (total <= 9) {
                        total = '0' + total;
                    } else {
                        total = total;
                    }

                    return '<span class="from">' + current + '</span>' +
                        '<span class="separator">/</span>' +
                        '<span class="to">' + total + '</span>';
                }
            }
        });
    }

    //  CONTACN FORM ICON SWITCHER

    $('#contact-select').on('change', function (e) {
        e.preventDefault();
        var index = $('#contact-select').find(":selected").index();

        $('.select-icon .icon').removeClass('active');
        $('.select-icon .icon').eq(index).addClass('active');

        var name = this.value;
        $("#communication-method-input").attr("placeholder", name);
    });

    //  SMOOTH SCROLL

    var scroll = new SmoothScroll('a[href*="#"]', {
        offset: 50,
        speed: 800,
        easing: 'easeInOutCubic'
    });

    //  CONTACT FOTM FORM

    function PathLoader(el) {
        this.el = el;
        this.strokeLength = el.getTotalLength();

        // set dash offset to 0
        this.el.style.strokeDasharray =
            this.el.style.strokeDashoffset = this.strokeLength;
    }

    PathLoader.prototype._draw = function (val) {
        this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
    };

    PathLoader.prototype.setProgress = function (val, cb) {
        this._draw(val);
        if (cb && typeof cb === 'function') cb();
    };

    PathLoader.prototype.setProgressFn = function (fn) {
        if (typeof fn === 'function') fn(this);
    };

    var body = document.body,
        svg = document.querySelector('svg path');

    $('#mainForm').submit(function () {

        var $form = $(this);
        $.ajax({
            url: $form.attr('action'),
            method: $form.attr('method'),
            data: $form.serialize()
        }).done(function (data) {});

        $(this).parents('.form').addClass('hide-form');
        if (svg !== null) {
            svg = new PathLoader(svg);

            setTimeout(function () {
                document.body.classList.add('active');
                svg.setProgress(1);
            }, 500);
        }
        return false;
    });

});