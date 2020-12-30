jQuery(document).ready(function () {

    jQuery("body").queryLoader2({
        barColor: '#b1b1b1',
       
        percentage: false,
        barHeight: 10,
        
        onComplete: function () {
            jQuery('.doc-loader').fadeOut('fast');
        }
    });

    //Disable niceScroll for Safari on Win
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1) || is_touch_device())
    {
        jQuery("html").css('overflow', 'auto');

        jQuery(".scroll-top").click(function () {
            jQuery('html, body').animate({scrollTop: 0}, 2000);
            return false;
        });

    } else
    {
        jQuery("html, #header-main-menu").niceScroll({cursorcolor: "#CDC8C1", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});

        //Scroll Top animation
        jQuery(".scroll-top").click(function () {
            jQuery("html").getNiceScroll(0).doScrollTop(0);
        });


        jQuery(".big-menu").mouseover(function () {
            jQuery("#header-main-menu").getNiceScroll().resize();
        });
    }


    //Placeholder show/hide
    jQuery('input, textarea').focus(function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').blur(function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });

});

jQuery(window).load(function () {

    if (jQuery(document).width() <= 755)
    {
        jQuery('#header-main-menu').removeClass('big-menu').addClass('small-menu');
    }


    jQuery(".image-slider").each(function () {

        var id = jQuery(this).attr('id');

        if (window[id + '_pagination'] == 'true')
        {
            var pagination_value = '.' + id + '_pagination';
        } else
        {
            var pagination_value = false;
        }

        var auto_value = window[id + '_auto'];
        if (auto_value == 'false')
        {
            auto_value = false;
        } else {
            auto_value = true;
        }

        var hover_pause = window[id + '_hover'];
        if (hover_pause == 'true')
        {
            hover_pause = 'resume';
        } else {
            hover_pause = false;
        }

        var speed_value = window[id + '_speed'];

        jQuery('#' + id).carouFredSel({
            responsive: true,
            width: 'variable',
            auto: {
                play: auto_value,
                pauseOnHover: hover_pause
            },
            pagination: pagination_value,
            scroll: {
                fx: 'crossfade',
                duration: parseFloat(speed_value)
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            items: {
                height: 'variable'
            }
        });
    });



    //Fix for post title position
    jQuery('.blog-holder').find('article').each(function () {
        if (jQuery(this).find('.post-thumb').length)
        {
            jQuery(this).find('.entry-title').css('margin-top', (jQuery(this).height() - jQuery(this).find('.entry-title').height()) / 2 - 20);
        }
    });

    //Fix for page header title position
    jQuery('.page .header-image h1.entry-title').css('left', (jQuery('.page .header-image').width() - jQuery(".page .header-image h1.entry-title").width()) / 2);

    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });


    jQuery('#toggle, #header-main-menu').on('click', multiClickFunctionStop);
    jQuery('.main-menu').click(function (e) {
        e.stopPropagation();
    });


    contactFormWidthFix();

    //Team member hover
    jQuery('.team-holder .member').hover(function () {
        jQuery(this).find('.member-info').fadeIn();
    }, function () {
        jQuery(this).find('.member-info').fadeOut();
    });

});


jQuery(window).resize(function () {

    contactFormWidthFix();

    if (jQuery(document).width() <= 755)
    {
        jQuery('#header-main-menu').removeClass('big-menu').addClass('small-menu');
    } else
    {
        jQuery('#header-main-menu').addClass('big-menu').removeClass('small-menu');
    }

//Fix for post title position
    jQuery('.blog-holder').find('article').each(function () {
        if (jQuery(this).find('.post-thumb').length)
        {
            jQuery(this).find('.entry-title').css('margin-top', (jQuery(this).height() - jQuery(this).find('.entry-title').height()) / 2 - 20);
        }
    });

    //Fix for page header title position
    jQuery('.page .header-image h1.entry-title').css('left', (jQuery('.page .header-image').width() - jQuery(".page .header-image h1.entry-title").width()) / 2);

});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var contactFormWidthFix = function () {
    jQuery('.contact-form input[type=text], .contact-form input[type=email], .contact-form textarea').outerWidth(jQuery('.contact-form').width());
};

var multiClickFunctionStop = function (e) {
    if (jQuery(e.target).is('.big-menu') || jQuery(e.target).is('#toggle') || jQuery(e.target).is('#toggle div'))
    {
        jQuery('#toggle, .big-menu').off("click");
        jQuery('#toggle').toggleClass("on");
        if (jQuery('#toggle').hasClass("on"))
        {
            jQuery('#header-main-menu').fadeIn(function () {
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").getNiceScroll().remove();
                        jQuery("html").css("cssText", "overflow: hidden !important");
                    }
                }
                jQuery('#toggle, .big-menu').on("click", multiClickFunctionStop);
            });
        } else
        {
            jQuery('#header-main-menu').fadeOut(function () {
                jQuery('#toggle, .big-menu').on("click", multiClickFunctionStop);
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").niceScroll({cursorcolor: "#CDC8C1", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});
                    }
                }
            });
        }
    }
};

jQuery(window).bind("scroll", function () {
    if (jQuery(this).scrollTop() > 700) {
        jQuery('.scroll-top').fadeIn(500);
    } else
    {
        jQuery('.scroll-top').fadeOut(500);
    }
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}


var SendMail = function () {

    var emailVal = jQuery('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
        jQuery.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = jQuery.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}


// For Auto Typing

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 200;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
 
TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
 
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
 
  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

   
  var that = this;
  var delta = 300 - Math.random() * 100;
 
  if (this.isDeleting) { delta /= 2; }
 
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 250;
  }
 
  setTimeout(function() {
    that.tick();
  }, delta);
};
 
window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



// First Auto Typing JS

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove characters
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add charaters
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 300;
  
      if (this.isDeleting) {
        // Increase speed by half when deleting
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init On DOM Load
  document.addEventListener("DOMContentLoaded", init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector(".txt-type");
    // const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
  

// Preloader

$(window).on('load', function() { // makes sure the whole site is loaded 
    $('#status').fadeOut(4000); // will first fade out the loading animation 
    $('#preloader').delay(4000).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(2000).css({'overflow':'visible'});
  })


  $(document).ready(function () {
    var owl = $(".timeline-carousel");
  
    owl.owlCarousel({
      itemsCustom: [
        [0, 1],
        [500, 2],
        [768, 3],
        [1024, 4],
        [1350, 5],
        [2000, 6]
      ],
      navigation: true
    });
  });
  




const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 60;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});
