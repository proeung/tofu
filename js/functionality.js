(function ($, Drupal, drupalSettings, window, document, undefined) {

    /********************
     ** Global Variables
     ********************/

    var mq = jQuery('#js-mediaQueryReference')[0],
        mqSupport = Modernizr.mq('only all'),
        prevDevice = '',
        device = '',
        $body = $("body"),
        $page = $("#page"),
        activeClass = 'is-active',
        stickyClass = 'is-sticky',
        staticClass = 'is-static',
        $mobileBtn = $('.menu-toggle');

    /********************
    ** Blazy
    ********************/

    function initBLazy() {
      var bLazy = new Blazy({
        offset: 0,
        success: function(element, context) {
            // console.log('Blazy - Success');
            setTimeout(function(){
            }, 100);
        },
        error: function(element, context) {
            // console.log('Blazy - Error');
        }
      });
    }


    //Function to reset any styles that may have been changed on screen resize
    function resetStyles() {
        if (device == 'desktop') {
            $body.removeClass('mobile');
            // console.log('desktop');
        }
        else {
            $body.addClass('mobile');
            // console.log('mobile');
        }
    }

    //Create an event checker function that grabs the current value of the after pseudo class of the #js-mediaquery-reference <div>
    //Based on: http://seesparkbox.com/demos/css-content-check/index.html
    function checkMediaQuery() {
        if (mqSupport) {
            prevDevice = device;
            device = window.getComputedStyle(mq, ':after').getPropertyValue('content').replace(/"/g, '');
            resetStyles();
        }
        else {
            device = 'desktop';
        }
    }

    function checkDevice() {
        //Set up event listeners tied to media queries
        mq.addEventListener('webkitTransitionEnd', checkMediaQuery, true);
        mq.addEventListener('MSTransitionEnd', checkMediaQuery, true);
        mq.addEventListener('oTransitionEnd', checkMediaQuery, true);
        mq.addEventListener('transitionend', checkMediaQuery, true);
        checkMediaQuery();
    }

    /********************
     ** jQuery Window Load
     ********************/

    jQuery(window).load(function () {
    });

    jQuery(window).scroll(function () {
    });

    /********************
     ** jQuery DOM Ready
     ********************/

    jQuery(document).ready(function () {
        //If the browser supports media queries
        if (mqSupport) {
            //Check what device we're on
            checkDevice();
        }
    });

    //To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.nasm_behavior = {
        attach: function(context, settings) {
            initBLazy();
    
            $('.view').bind("ajaxStart", function(){
                // console.log("Ajax START!");
            }).bind("ajaxSuccess", function(){
                initBLazy();
                // console.log("Ajax Success!");
            });
        }
    };

})(jQuery, Drupal, drupalSettings, this, this.document);
