/**
 * @package webenfoldtheme
 * JAVASCRIPT:  Lazy Loader
 * Description: Lazy Loader For Webmasters WebEnfolds Theme
 */


// =========================================================
// Important Variables
// =========================================================
// Common CDN Domains & URL
// ---------------------------------------------------------
var we_cdnjs          = 'https://cdnjs.cloudflare.com/ajax/libs/';
// ---------------------------------------------------------
// Standalone JS Scripts
// Smooth Scroll
var we_smooth         = false;
var we_smooth_url     = we_cdnjs+"smoothscroll/1.4.6/SmoothScroll.min.js";
// Share this JS
var we_sharethis      = false;
var we_sharethis_url  = 'https://platform-api.sharethis.com/js/sharethis.js'
                        +'#property=5a8acf65d57467001383cbc0&#038;'
                        +'product=inline-share-buttons-wp';
// ---------------------------------------------------------
// Sticky Kit
var we_sticky_kit     = false;
var we_sticky_kit_URL = we_cdnjs+"sticky-kit/1.1.3/sticky-kit.min.js";
// ---------------------------------------------------------
// Slick Slider
var we_carousal       = false;
var we_carousal_url   = we_cdnjs+"slick-carousel/1.8.1/slick.min.js";
// ---------------------------------------------------------
// Jarallax
var we_parallax       = false;
var we_jarallax       = false;
var we_jarallax_url   = we_cdnjs+"jarallax/1.9.3/jarallax.min.js";
// ---------------------------------------------------------
// Ace Code Editor
var we_ace_js         = we_cdnjs+"ace/1.3.1/ace.js";
var we_ace_js_loaded  = false;
// ---------------------------------------------------------
// Dynamic Background Image
const wc_dyn_back     = 'https://webenfold.github.io/WC-Dynamic-Background/images/';
// ---------------------------------------------------------


// =========================================================
// Load Dynamic Background
// =========================================================
function set_dynamic_back(obj)                              {

  // Round off to two digit
  function two_digit(number)                                {
    return (number < 10 ? '0' : '') + number
  }

  // Defining Variable
  var background_image  = '';
  var window_width      = Math.max(
                            document.documentElement.clientWidth,
                            window.innerWidth || 0
                          );
  var year              = (new Date()).getFullYear();

  // Getting Week Number
  Date.prototype.getWeek = function()                       {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
  var week_num  = (new Date()).getWeek();
  week_num      = two_digit(week_num);

  // Setting Wallpaper
  if(window_width <= 1366)                                  {
      background_image = wc_dyn_back + year + "/" +  week_num + "/hd.jpg";
    }
  else if(window_width > 1366)                              {
      background_image = wc_dyn_back + year + "/" +  week_num + "/fhd.jpg";
    }
  else if(window_width > 1920)                              {
    background_image = wc_dyn_back + year + "/" +  week_num + "/uhd.jpg";
  }

  // Setting Dynamic Background Details
  function get_dbg_details()                                {
    var dbg_down    = $('#dbg-dwn');
    var dgb_detail  = '';
    var details_loc = wc_dyn_back + year + "/" +  week_num + "/info.json";
    // Return if dynamic Background Download Button Not Found
    if(dbg_down.length == 0){return;}
    // Get The Wallpaper Details
    $.getJSON( details_loc, function( data )                {
      var source_url = "";
      // Creating Dynamic Background Details HTML
      $.each( data, function( key, val )                    {
        if(key == 'title')                                  {
          dgb_detail = dgb_detail + '<h4>' + val + '</h4>';
          }
        if(key == 'description')                            {
          dgb_detail = dgb_detail + '<p class="dbg-desc"><span>Description</span> ' + val + '</p>';
          }
        if(key == 'source-url')                             {
          source_url = val;
          }
        if(key == 'source')                                 {
          dgb_detail = dgb_detail + '<p class="dbg-source"><span>Source</span> <a href="'+ source_url +'">'+ val +' <i class="icon-link2"></i></a></p>';
          }
        if(key == 'license')                                {
          dgb_detail = dgb_detail + '<p class="dbg-license"><span>CC0 License</span> ' + val + '</p>';
          }
        if(key == 'download-url')                           {
          dgb_detail = dgb_detail + '<p class="dbg-download"><a href="' + val + '">Download <i class="icon-download"></i></a></p>';
          }
        });
      // Inserting generated HTML to DOM
      $( '<div id="dbg-details" class="dbg-details"><div><div><img class="first-img" src="' + background_image + '"></div>' + dgb_detail + '</div></div>' ).insertAfter( "#dynamic-bg" );
      // Setting Onclick Attribute to download wallpaper
      $('#dbg-details a').on('click', function (e)          {
        e.preventDefault();

        //Checking condition that button has href attribute
        if ($(this).attr('href'))                           {

            var link = $(this).attr('href');

            var home_link = window.location.protocol + '//' + window.location.hostname;
            link = home_link + '/outgoing-link-check/?url=' + link + '&auto_redirect=true';

            //Opening Link in new Window
            setTimeout(function ()                          {
              window.open(link, '_blank');
            },100);

          }
        });
      });
    // Setting Onclick Attribute to show DBG details
    dbg_down.on('click',function()                          {
      $('#dbg-details').addClass('shown');
      $('.dbg-overlay').one( "click", function()            {
        $('#dbg-details').removeClass('shown');
        });
      });
  }

  // After Loading Background Image setting it to DOM
  $.get(background_image).done(function()                   {
    // Load Dummy Image
    $('#plc').attr('src', background_image).on('load',function(){
      $(obj).css('background-image', 'url(' + background_image +')');
      $('#website-body').addClass('background-loaded');

      setTimeout(function(){
        $('.dbg-loading').css('opacity', '0');
      }, 800);

      setTimeout(function(){
        $('.dbg-loading').remove();
        $('.dbg-hover').css('opacity', '1');
        get_dbg_details();
      }, 1200);

      });
    });
  }
// =========================================================


// =========================================================
// Initiate Preload
// =========================================================
$('.slider-base').each(function(i)                          {
  $(this).find('.slide').css('display','none');
  }).addClass('lazy-loading');
$('.parallax, .preload, .featured-image-load').addClass(
  'lazy-loading'
  ).removeClass('hidden');
// =========================================================


// =========================================================
// Call [we_lazy_load] When you want to lazy load
// =========================================================
function we_lazy_load()                                     {
  // -------------------------------------------------------
  // Load Smooth Scroll
  // -------------------------------------------------------
  if(we_smooth === false)
    $.load_script(we_smooth_url, function(){we_smooth = true;});
  try                                                       {
    if(we_sharethis === false && we_sharethis_load)
      $.load_script(we_sharethis_url, function(){we_sharethis = true;});
  }catch(err){}
  // -------------------------------------------------------


  // Finish Pre-loading of image
  // --------------------------------------------------------
  try{
    $('.preload').each(function(i){
      $(this).find('img').attr('src',$(this).find('img').attr('src').replace("-150x150","")).load(function(){
        $(this).parent().removeClass('lazy-loading');
      })
    });
    $('.featured-image-load').each(function(i){
      $(this).find('img').attr('src',$(this).find('img').attr('src').replace("-300","-1500")).load(function(){
        $(this).parent().removeClass('lazy-loading');
      })
    });
  }catch(err){}
  // --------------------------------------------------------

  // Load Carousal JS
  // --------------------------------------------------------
  try{
  // Get all Carousal Sliders as an array
  var slider_base_array = $('.slider-base');

  // Load Carousal
  function load_carousal(){
    // Load Carousal Script
    if(we_carousal == false){
      $.load_script(we_carousal_url, function(){
        we_carousal = true;
        run_carousal();
      });
    }else{
      run_carousal();
    }
  }

  // Initialize & Render each Carousal Sliders
  if( slider_base_array.length > 0 )                      {
    // Loading Starts here
    slider_base_array.each(function(i)                    {

      var inner_html    = $(this).html();
      var temp_height   = $(this).height();

      $(this).html('<div class="smart-slider"></div>');
      $(this).find('.smart-slider').eq(0).html(inner_html);

      $(this).find('.slide').each(function(i){
        var cara_ele = $(this);

        // Load Dummy Image
        $('<img/>').attr(
          'src', cara_ele.data('background')
        ).on('load', function() {

          // On Dummy Image Load
          $(this).remove();

          // Create Parallax
          cara_ele.css({
            'background-image' : 'url(' + cara_ele.data('background') + ')'
          });
        });

        var temp_html = $(this).html();
        $(this).html('<div style="height: '+ temp_height +'px;">'+ temp_html +'</div>');
      });

      // Load Parallax
      if($(this).data('parallax') == "yes"){
        if(we_parallax == false){
          $.load_script(we_jarallax_url, function(){
            we_parallax = true;
            load_carousal();
          });
        }else{
          load_carousal();
        }
      }
    });

    // Setup and run carousal
    function run_carousal()                               {
      slider_base_array.each(function(i){
        var autoplay      = $(this).data('autoplay');
        (autoplay == 'yes') ? autoplay = true : autoplay = false;

        var sliding_delay = $(this).data('delay');
        var sliding_delay_type = typeof sliding_delay;
        if(sliding_delay_type == 'string') sliding_delay = sliding_delay.replace(/\D/g,'');
        (sliding_delay == '') ? sliding_delay = sliding_delay * 1000 : sliding_delay = 5000;

        var arrow         = $(this).data('arrow');
        (arrow == 'yes') ? arrow = true : arrow = false;

        var dots          = $(this).data('dots');
        (dots == 'yes') ? dots = true : dots = false;

        var temp_para     = $(this).data('parallax');
        (temp_para == 'yes') ? temp_para = true : temp_para = false;

        var infinite_opt  = $(this).data('infinite');
        (infinite_opt == 'yes' && !temp_para) ? infinite_opt = true : infinite_opt = false;

        var smart_slider  = $(this).find('.smart-slider').eq(0);

        $(smart_slider).slick({
          lazyLoad        : 'ondemand',
          slidesToShow    : 1,
          slidesToScroll  : 1,
          infinite        : infinite_opt,
          autoplay        : autoplay,
          autoplaySpeed   : sliding_delay,
          arrows          : arrow,
          dots            : dots
        });

        // Make Slides visible
        $(this).find('.slide').css('display','');

        $(this).find('.slide').eq(0).jarallax({
          noAndroid: true,
          noIos: true,
          elementInViewport: smart_slider
        });

        $(smart_slider).on('beforeChange', function(event, slick, currentSlide, nextSlide){
          if(temp_para){

            $(this).find('.slide').eq(nextSlide).jarallax({
              noAndroid: true,
              noIos: true,
              elementInViewport: smart_slider
            });

            $(this).find('.slide').eq(currentSlide).jarallax('destroy');
          }
        });
      }).removeClass('lazy-loading');
    }
    }
  }catch(err){}
  // -------------------------------------------------------

  // -------------------------------------------------------
  // Author Profile Menu Carousal
  // -------------------------------------------------------
  if($('.member-navigation .carousal-menu').length > 0)   {
      $.load_script(we_carousal_url, function(){
        $('.member-navigation .carousal-menu').slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          infinite: false,
          variableWidth: true,
          focusOnSelect: true,
          prevArrow: '<a class="slick-prev"><i class="icon-simple-left"></i></a>',
          nextArrow: '<a class="slick-next"><i class="icon-simple-left"></i></a>',
          responsive: [
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
        $('.member-navigation .carousal-menu.slide-to-2').slick('slickGoTo',1);
        $('.member-navigation .carousal-menu.slide-to-3').slick('slickGoTo',2);
        $('.member-navigation .carousal-menu.slide-to-4').slick('slickGoTo',3);
      });
    }
  // -------------------------------------------------------


  // Load Parallax JS
  // --------------------------------------------------------
  try{
  // Get all Carousal Sliders as an array
  var parallax_array = $('.parallax');
  // Render each Carousal Sliders
  if( parallax_array.length > 0 && we_tt == 0)            {
    function load_parallax()                              {
      $(parallax_array).each(function ()                  {
        var para_ele = $(this);
        var back_url = para_ele.data('background');

        // Load Dummy Image
        $('<img/>').attr(
          'src', back_url
        ).on('load', function() {

          // On Dummy Image Load
          $(this).remove();

          // Create Parallax
          para_ele.css({
            'background-image' : 'url(' + para_ele.data('background') + ')'
          }).jarallax({
            noAndroid: true,
            noIos: true,
          }).removeClass('lazy-loading');
        });
      });
      }
    if(we_parallax == false)                              {
      $.load_script(we_jarallax_url, function(){
        we_parallax = true;
        load_parallax();
      });
    }else{load_parallax();}
    }
  if( parallax_array.length > 0 && we_tt == 1)            {
    function load_parallax()                              {
      $(parallax_array).each(function ()                  {
        var para_ele = $(this);
        var back_url = para_ele.data('background');

        var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if(back_url == "dynamic"){
          if(window_width <= 1366)                {
            back_url = wc_dyn_back + "wc/update-1" + "/hd.jpg";
            }
          else if(window_width > 1366)            {
            back_url = wc_dyn_back + "wc/update-1" + "/fhd.jpg";
            }
          else if(window_width > 1920)            {
            back_url = wc_dyn_back + "wc/update-1" + "/uhd.jpg";
          }
        }

        // Load Dummy Image
        $('#plc').attr(
          'src', back_url
        ).on('load', function() {

          // On Dummy Image Load
          $(this).remove();

          // Create Parallax
          para_ele.css({
            'background-image' : 'url(' + back_url + ')'
          }).jarallax({
            noAndroid: true,
            noIos: true,
          }).removeClass('lazy-loading').delay(400).css('opacity', '1');

          setTimeout(function(){
            $('.dbg-loading').css('opacity', '0');
          }, 800);
          setTimeout(function(){
            $('.dbg-loading').remove();
          }, 1200);
        });
      });
      }
    if(we_parallax == false)                              {
      $.load_script(we_jarallax_url, function(){
        we_parallax = true;
        load_parallax();
      });
    }else{load_parallax();}
    }
  }catch(err){}
  // --------------------------------------------------------

  // --------------------------------------------------------
  // Loading ACE Code Editor
  // --------------------------------------------------------
  try                                                       {
    var ace_code_ele = $('.code-container');
    if(ace_code_ele.length > 0)                             {
      if(we_ace_js_loaded == false)                         {
        $.load_script(we_ace_js, function()                 {
          we_ace_js_loaded = true;
          render_code_2();
          });
        }
      }
    }
  catch(err){}
  // --------------------------------------------------------

  // --------------------------------------------------------
  // Load Sticky Sidebar for class floatOnTop
  // --------------------------------------------------------
  try                                                       {
    var wc_sticky_ele = $('.floatOnTop');
    function we_set_sticky()                                {
      $(".floatOnTop").stick_in_parent({
        offset_top: 60
        });
      $(window).on('resize-end', function(){
        $(".floatOnTop").stick_in_parent({
          offset_top: 60
          });
        });
      }
    if(wc_sticky_ele.length > 0)                            {
      if(we_sticky_kit == false)                            {
        $.load_script(we_sticky_kit_URL, function()         {
          we_sticky_kit = true;
          we_set_sticky();
          });
        }
      else                                                  {
        we_set_sticky();
        }
      }
    }
  catch(err){}
  // --------------------------------------------------------

  // Setting Dynamic background
  // --------------------------------------------------------
  try                                                       {
    var dynamic_ele = $('#dynamic-bg');
    if(dynamic_ele.length)                                  {
      set_dynamic_back(dynamic_ele);
      }
    }
  catch(err){}
  // --------------------------------------------------------
  }
// ==========================================================
