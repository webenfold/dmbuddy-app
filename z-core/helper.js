/**
 * @package webenfoldtheme
 * JAVASCRIPT:  WebEnfold Helper functions
 */

// ================================================================
// Helper Functions
// ================================================================
// Loading spinner - Add loadingWheel class
function loadingSpinner(object)                             {
  $(object).attr('class', 'loadingWheel');
  return;
  }
// ----------------------------------------------------------------
// Load script function
jQuery.load_script = function (url, callback)               {
  jQuery.ajax({
      url: url,
      dataType: 'script',
      success: callback,
      async: true
    });
  }
// ----------------------------------------------------------------
// Function on Resize End - Use [ resize_end ]
$(function(){var resize_end;
  $(window).on('resize', function() {
      clearTimeout(resize_end);
      resize_end = setTimeout(function() {
          $(window).trigger('resize-end');
      }, 100);
    });
  });
// ----------------------------------------------------------------
// Javascript Get Windows Current URL - Location
// (gurlpbyn "Get URL parameter by name")
function gurlpbyn(name, url)                                {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
// ----------------------------------------------------------------

// ================================================================
// Theme Helper Function
// ================================================================
// Section Navigation
function section_nav()                                      {
  var section_ele, section_dots, section_link, section_title;

  // Creating Section Navigation
  // ------------------------------------------------------------
  try                                                         {
      section_ele = document.getElementsByTagName('section');

      // Creating Navigation Element
      for (i = 0; i < section_ele.length; i++)                {
          // Check section title - don't do anything if no title found
          if (section_ele[i].getAttribute("name"))            {
              // Check section setting
              if (section_ele[i].id === null)                  {
                  // Setting section id in ascending order
                  section_ele[i].id = 'section' + i;
                  // Setting section Link
                  section_link = 'section' + i;
                  }
              else{
                  section_link = section_ele[i].id;
                  }
              // Reading section title
              section_title = section_ele[i].getAttribute("name");
              // Creating section navigation bar
              section_dots = section_dots + '<a class="dot scroll" title="' + section_title + '" href="#' + section_link + '"><span class="doticon"></span></a>';
          }
      }

      // Inserting Navigation Element to DOM
      document.getElementById('section_nav').innerHTML = section_dots;
      // Setting Section Navigation to middle of screen
      var sectionNavHeight = parseInt(document.getElementById('section_nav').offsetHeight, 10);
      document.getElementById('section_nav').style.marginTop = '-' + (sectionNavHeight / 2) + 'px';
      }
  catch (err) {}
  // ------------------------------------------------------------

  // Initializing Section Navigation
  // ------------------------------------------------------------
  setTimeout(function()                                       {
      try                                                     {
          document.getElementById('section_nav').style.right = '-2px';
          }
      catch (err){}
      try                                                     {
          tippy('.dot', {
              position: 'right',
              animation: 'shift',
              sticky: true,
              performance: true,
              duration: 400,
              delay: [200, 10],
              arrow: false
          });
          }
      catch (err){}
  },1000);
  // ------------------------------------------------------------
  }
// ----------------------------------------------------------------
// Modern Ripple Effect
function ripple_effect()                                    {
  var ripple_ele = $('.button, .ripple, .navLinks, .action-button');

  // Setting up ripple effect
  // ------------------------------------------------------------
  ripple_ele.click(function (e)                               {
      e.preventDefault;
      var parent, ink, d, x, y, inkSize, inkFlow;
      parent = $(this);

      // Create .ink element if it doesn't exist
      if (parent.find(".ink").length === 0) parent.prepend("<span class='ink'></span>");
      ink = parent.find(".ink");

      // Incase of quick double clicks stop the previous animation
      ink.removeClass("animate");

      // Set size of .ink
      if (!ink.height() && !ink.width()) {
          // Use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
          d = Math.max(parent.outerWidth(), parent.outerHeight());
          ink.css({
              height: d,
              width: d
          });
      }

      // Get click coordinates
      x = e.pageX - parent.offset().left - ink.width() / 2;
      y = e.pageY - parent.offset().top - ink.height() / 2;

      // Conditionally set radius of ink based on height and width
      if ($(this).height() > $(this).width()) {
          inkSize = $(this).height();
      } else {
          inkSize = $(this).width();
      }

      // Conditionally resize radius of ink based on height and width
      if (inkSize < 150) {
          inkSize = 0.01 * Math.round($(this).width() / 2);
      } else if (inkSize > 150 && inkSize < 200) {
          inkSize = 0.01 * Math.round($(this).width() / 2.4);
      } else if (inkSize > 200 && inkSize < 250) {
          inkSize = 0.01 * Math.round($(this).width() / 2.8);
      } else if (inkSize > 250 && inkSize < 300) {
          inkSize = 0.01 * Math.round($(this).width() / 3.2);
      } else {
          inkSize = 0.01 * Math.round($(this).width() / 4);
      }
      if (inkSize < 0.5) {
          inkSize = 0.5;
      }

      // Set ink flow animation duration in seconds' based on it's radius
      inkFlow = inkSize + "s";

      // Set the position and add class .animate
      ink.css({
          'top': y + 'px',
          'left': x + 'px',
          '-webkit-animation-duration': inkFlow,
          'animation-duration': inkFlow
      }).addClass("animate").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
          $(this).remove();
      });

      });
  // ------------------------------------------------------------
  }
// ----------------------------------------------------------------
// Delay Links
function delay_links()                                      {
  // Delay links for button class elements
  // Ignoring buttons with scroll class
  $('.button').not('.scroll, .external, .event, .input-type').on('click', function (e) {
      e.preventDefault();

      // Checking condition that button has href attribute
      if ($(this).attr('href')) {

          var link = $(this).attr('href');

          // Navigating window to link after 0.5 miliseconds
          setTimeout(function () {
              window.location.href = link;
          }, 500);
      }
  });

  $('.button.external').not('.scroll').on('click', function (e) {
      e.preventDefault();

      // Checking condition that button has href attribute
      if ($(this).attr('href')) {

          var link = $(this).attr('href');

          // Opening Link in new Window
          setTimeout(function () {
              window.open(link, '_blank');
          }, 600);
      }
  });
  }
// ----------------------------------------------------------------
// Smooth Scroll Anchors
function smooth_scroll_link()                               {

  // Setting smooth scroll with delay
  // ------------------------------------------------------------
  $('.button.scroll, .ripple.scroll').on('click', function (e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);

      setTimeout(function ()                                  {
          $('html, body').stop().animate({
              //Scrolling
              'scrollTop': $target.offset().top - 50

          }, 500, 'swing', function () {

              //Navigating
              window.location.hash = target;
          });
      }, 500);
      });
  // ------------------------------------------------------------

  // Setting smooth scroll with delay
  // ------------------------------------------------------------
  $('.internal-link.scroll').on('click', function (e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);

      setTimeout(function ()                                  {
          $('html, body').stop().animate({
              //Scrolling
              'scrollTop': $target.offset().top - 80
          }, 600, 'swing');
      }, 100);
      });
  // ------------------------------------------------------------

  // Setting smooth scroll for section nav - with very small delay
  // ------------------------------------------------------------
  $('.dot.scroll').on('click', function (e)                   {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);

      setTimeout(function ()                                  {
          $('html, body').stop().animate({
              //Scrolling
              'scrollTop': $target.offset().top - 50

          }, 500, 'swing', function () {

              //Navigating
              window.location.hash = target;
          });
      }, 100);
      });
  // ------------------------------------------------------------
  }
// ----------------------------------------------------------------
// Check Cookie
function getCookie(name)                                    {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  // return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
  }
// ----------------------------------------------------------------
// Delete Cookie
var delete_cookie = function(name)                          {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
// ----------------------------------------------------------------
