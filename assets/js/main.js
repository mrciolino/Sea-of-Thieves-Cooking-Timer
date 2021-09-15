food_cooking_times_sea_of_thieves = {
    "fish": { "cooked": 40, "burnt": 40 },
    "chicken": { "cooked": 60, "burnt": 60 },
    "snake": { "cooked": 60, "burnt": 60 },
    "pork": { "cooked": 60, "burnt": 60 },
    "shark": { "cooked": 60, "burnt": 60 },
    "trophy": { "cooked": 90, "burnt": 90 },
    "kraken": { "cooked": 120, "burnt": 120 },
    "meg": { "cooked": 120, "burnt": 120 }
}

active_timers = {};

function fetch_new_timer(cooking_time) {
    let timer = new easytimer.Timer({
        precision: 'secondTenths'
    });
    timer.start({
        countdown: true,
        startValues: {
            seconds: cooking_time
        },

    });
    return timer;
}

function reset_element(food) {
    document.getElementById(food).classList.add("notransition")
    document.getElementById(food).style.backgroundPosition = "0px 0%";
    document.getElementById(food).classList.remove("pulse") // remove burn timer pulse
    document.getElementById(food).offsetHeight; // Trigger a reflow, flushing the CSS changes
    document.getElementById(food).classList.remove("notransition")
}

function start_timer(food) {

    // overlay the food picture with the timer
    let cooking_time = food_cooking_times_sea_of_thieves[food]["cooked"];
    let timer = fetch_new_timer(cooking_time);

    // logic for if active timer already
    if (active_timers[food] != undefined) {
        active_timers[food].reset();
        reset_element(food);
    } else {
        active_timers[food] = timer;
        // add callbacks for event
        $('#countdown' + food + ' .values').html(timer.getTimeValues().toString().slice(-4));
        timer.addEventListener('secondsUpdated', function(e) {
            $('#countdown' + food + ' .values').html(timer.getTimeValues().toString().slice(-4));
        });
        timer.addEventListener('targetAchieved', function(e) {
            // if data timer-active is false, then don't start call burn timer
            if (document.getElementById(food).getAttribute("timer-active") == 'true') {
                start_burnt_timer(food);
            }
        });
    }

    // print timers to console
    console.log(active_timers);

    // transition background position
    document.getElementById(food).style.cssText = `
    -webkit-transition: background-position ` + String(cooking_time) + `s linear; 
    -moz-transition: background-position ` + String(cooking_time) + `s linear;
    transition:  background-position ` + String(cooking_time) + `s linear;`;
    document.getElementById(food).style.backgroundPosition = "0px -50%";

    // add a data tag to the food element
    document.getElementById(food).setAttribute("timer-active", true);
}

function start_burnt_timer(food) {

    // transition background to red + pulse red
    document.getElementById(food).style.backgroundPosition = "0px -99.9%";
    document.getElementById(food).classList.add("pulse");

    // start burnt timer to cooking timer and add events
    let cooking_time = food_cooking_times_sea_of_thieves[food]["burnt"];
    let timer = fetch_new_timer(cooking_time);
    active_timers[food] = timer;
    $('#countdown' + food + ' .values').html(timer.getTimeValues().toString().slice(-4));
    timer.addEventListener('secondsUpdated', function(e) {
        $('#countdown' + food + ' .values').html(timer.getTimeValues().toString().slice(-4));
    });
    timer.addEventListener('targetAchieved', function(e) {
        $('#countdown' + food + ' .values').html("🔥");
    });
}

var double = function() {
        reset_element(this.id);
        if (active_timers[this.id]) {
            active_timers[this.id].stop(); // stop timer
            delete active_timers[this.id]; // delete timer
        }
        $('#countdown' + this.id + ' .values')[0].innerHTML = ""; // remove timer text
    },
    single = function() {
        start_timer(this.id);
    };

jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
    return this.each(function() {
        var clicks = 0,
            self = this;
        jQuery(this).click(function(event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function() {
                    if (clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}

// for food type in dict add the double click detector
for (let food in food_cooking_times_sea_of_thieves) {
    $('#' + food).single_double_click(single, double);
};

(function($) {
    $.fn.nodoubletapzoom = function() {
        $(this).bind('touchstart', function preventZoom(e) {
            var t2 = e.timeStamp,
                t1 = $(this).data('lastTouch') || t2,
                dt = t2 - t1,
                fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 500 || fingers > 1) return; // not double-tap

            e.preventDefault(); // double tap - prevent the zoom
            // also synthesize click events we just swallowed up
            $(this).trigger('click').trigger('click');
        });
    };
})(jQuery);

(function($) {
    var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
    $.fn.nodoubletapzoom = function() {
        if (IS_IOS)
            $(this).bind('touchstart', function preventZoom(e) {
                var t2 = e.timeStamp,
                    t1 = $(this).data('lastTouch') || t2,
                    dt = t2 - t1,
                    fingers = e.originalEvent.touches.length;
                $(this).data('lastTouch', t2);
                if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                e.preventDefault(); // double tap - prevent the zoom
                // also synthesize click events we just swallowed up
                $(this).trigger('click').trigger('click');
            });
    };
})(jQuery);

/**
 * Template Name: OnePage - v4.3.0
 * Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Initiate glightbox 
     */
    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

})()