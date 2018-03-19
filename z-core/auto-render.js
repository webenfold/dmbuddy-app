/**
 * @package webenfoldtheme
 * JAVASCRIPT:  Auto Render
 * Description: These functions are executed automatically on-load.
 *              No need to call these functions.
 *              Some of the functions requires jQuery.
 *              Load it after jQuery and Before webenfolds.js.
 */


var WC_logic={
  _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=WC_logic._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
  decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=WC_logic._utf8_decode(t);return t},
  _utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t}
  ,_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
// ================================================================
// Love / Favorite Function
// ================================================================
function wc_love_function(){
  try                                                       {
    var love_button = document.getElementById('love-button-base');
    var post_id     = love_button.getAttribute('data-post-id');
    var post_action = love_button.getAttribute('data-post-action');

    var love_json  = '{"post_id" : "'+post_id+'","post_action" : "'+post_action+'"}';
    console.log(love_json);
    document.cookie     = "wc_01="+WC_logic.encode(love_json)+"; path=/";
  }catch(err){console.log(err);}
}


// ================================================================
// Social Share
// ================================================================
function facebook_share(obj)                                    {
  window.open(obj.dataset.href, "facebookwindow", "left=20,top=20,width=600,height=700,toolbar=0,resizable=1");
  return false;
  }
function twitter_share(obj)                                     {
  window.open(obj.dataset.href, "twitterwindow", "left=20,top=20,width=600,height=300,toolbar=0,resizable=1");
  return false;
  }
function google_share(obj)                                      {
  window.open(obj.dataset.href, "googlepluswindow", "left=20,top=20,width=600,height=700,toolbar=0,resizable=1");
  return false;
  }
function linkedin_share(obj)                                    {
  window.open(obj.dataset.href, "linkedinwindow", "left=20,top=20,width=600,height=700,toolbar=0,resizable=1");
  return false;
  }
// ----------------------------------------------------------------


// ================================================================
// Call This Function to auto run
function auto_render(){
// ================================================================


// ================================================================
// Browser Normalize
// ================================================================
// Stop Image Dragging
try                                                             {
  $("img").mousedown(function ()                              {
      return false;
      });
  }
catch (err) {}
// ----------------------------------------------------------------


// ================================================================
// Common Theme Function
// ================================================================
// Login Redirect
(function()                                                     {
  var login_url = window.location.protocol + '//' + window.location.host + '/login';

  var redirect_url = window.location.protocol + '//' + window.location.host + window.location.pathname;

  var dynamic_elements = $('.login_dynamics');
  var var_remember_me  = $('.remember-me');

  for(i = 0; i < dynamic_elements.length; i++){
    $(dynamic_elements[i]).on('click', function(e){
      document.cookie = "wcafterloginredirect=" + redirect_url + "; path=/";

      if(!(document.cookie.indexOf("wc_remember_user=") >= 0))
      document.cookie = "wc_remember_user=yes; path=/";

      setTimeout(window.location = login_url, 500);
      });
    }

  for(i = 0; i < var_remember_me.length; i++){
    $(var_remember_me[i]).on('click', function(e){
      if(getCookie("wc_remember_user") == 'no')  {
        document.cookie = "wc_remember_user=yes; path=/";
        $(this).removeClass('do-not');
        }
      else                                        {
        document.cookie = "wc_remember_user=no; path=/";
        $(this).addClass('do-not');
        }
      });
    }
  })();
// ----------------------------------------------------------------
// Set counter class to favorites button
(function()                                                     {
  try{
  var noCounter = document.querySelectorAll('[data-favorites-post-count-id]');
  } catch (err) {noCounter = null;}
  for (var i = 0; i < noCounter.length; i++){
  noCounter[i].className = 'counter';
  }
  })();
// ----------------------------------------------------------------
//Auto Typing
(function()                                                     {
  if ($('#typed-strings p').length > 0)                         {
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      showCursor: false,
      startDelay: 1000,
      typeSpeed: 20,
      backSpeed: 10,
      backDelay: 5000,
      loop: true
      });
    var typedControll = new Waypoint({
      element: document.getElementById('typed'),
      handler: function (typedScrollDirection) {
          if (typedScrollDirection == 'down') {
              typed.destroy();
          }
          if (typedScrollDirection == 'up') {
              typed.reset();
          }
      },
      offset: 0
    });
  }
  if ($('#update-strings p').length > 0)                        {
    var typed = new Typed('#auto-type', {
      stringsElement: '#update-strings',
      showCursor: false,
      startDelay: 1000,
      typeSpeed: 30,
      backSpeed: 15,
      backDelay: 5000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true
      });
    console.log('I ran');
    var typedControll = new Waypoint({
      element: document.getElementById('auto-type'),
      handler: function (typedScrollDirection) {
          if (typedScrollDirection == 'down') {
              typed.destroy();
          }
          if (typedScrollDirection == 'up') {
              typed.reset();
          }
      },
      offset: 0
    });
  }
  })();
// ----------------------------------------------------------------
// Javascript Counter Function [use class counter]
(function()                                                     {
  $('.counter').each(function (index, element) {
      var newId = 'counter' + index;
      $(element).attr('id', newId);
      var endVal = $(element).html();
      $(element).html('0');

      var suf = $(element).data("suf");
      if (suf == null) {
          suf = '';
      }

      var decValue = $(element).data("decimal");
      if (decValue == null) {
          decValue = 0;
      }

      var options = {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          suffix: suf
      };

      function runCounter(ele) {
          var startCount = new CountUp(ele, 0, endVal, decValue, 4, options);
          startCount.update(endVal);
      }

      var countOnView = new Waypoint({
          element: document.getElementById(newId),
          handler: function (direction) {
              if (direction == 'down') {
                  runCounter(newId);
                  this.destroy();
              }
          },
          offset: '75%'
      });

  });
  })();
// ----------------------------------------------------------------

// ----------------------------------------------------------------



// ================================================================
// Footer Function
// ================================================================
// Footer Bar: Live Chat
(function()                                                     {
  $("#liveChatSB").on('click', function ()                      {
    document.getElementById("chatBase").style.bottom = '0';
    });
  $("#chatBaseHide").on('click', function ()                    {
    document.getElementById("chatBase").style.bottom = '-100%';
    });
  })();
// ----------------------------------------------------------------


// ================================================================
// AJAX Function
// ================================================================
// AJAX Post Loading Functions
function ajax_load_posts()                                      {
  var ajax_url = window.location.protocol + '//'
                  + window.location.host
                  + '/wp-admin/admin-ajax.php';
  var page = 1;
  try{
      load_more_button = $('#ajax_loadMore');
      $('#ajax_loadMore').data('page', page);
      $('#ajax_loadMore').data('url', ajax_url);
      $('#ajax_loadMore').on('click',function(){

          $.ajax({
              url: ajax_url,
              data: {
                  page: page,
                  action: load_more_posts
              },
              error: function( response ){},
              success: function( response ){
                  $('#ajax_container').append( response );
              }
          });
      });
  }catch(err){}
  }
// ----------------------------------------------------------------


// ================================================================
// Form Function Function
// ================================================================
// Footer Bar: Live Chat
(function()                                                     {
  // Checkbox
  $('.formBase input:checkbox').removeAttr('checked');
  $('.formBase input:checkbox').click(function ()               {
    if ($(this).is(':checked'))
        $(this).parent().addClass('selected');
    else
        $(this).parent().removeClass('selected');
  });

  // Radio
  $('.formBase input:radio').click(function ()                  {
    if ($(this).is(':checked'))
        $(this).parent().addClass('selected');
    });
  $('.formBase input:radio').change(function ()                 {
      $('input:not(:checked)').parent().removeClass("selected");
  });
  })();
// ----------------------------------------------------------------


}
