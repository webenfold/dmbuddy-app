/**
 * @package webenfoldtheme
 * JAVASCRIPT:  Auto Render
 * Description: Loader calls template related functions.
 */


// Function Sequence
// ================================================================
function functionSequence()                                     {

  switch(we_tt){
  case 0:
      // Main Template
      main_temp_seq();
  break;
  case 1:
        // Auto Render
        auto_render();

        // WKH Template
        wkh_temp_seq();
  break;
  case 2:
      // Modern Template
      modern_temp_seq();
  break;
  }

  delay_links();

  // Remove Loading Screen
  setTimeout(function(){
    we_lazy_load();

    // Show Logout Message
    if(we_tt == 1)
    if(getCookie("logoutMessage")){
        document.cookie = 'logoutMessage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setTimeout(show_logout_msg, 2000);
        }

    $('#loadingScreen').animate({
        opacity: 0
    }, 250).css('display', 'none');
  }, 1000);

  // Delay Load
  // setTimeout(function(){
      // customSearchEngine();
      // try {
      //     liveChatStart();
      // } catch (err) {
      //     console.log(err);
      // }
  // }, 4000);
}


// Barba [AJAX Loader]
// ================================================================
if(we_tt == 0)                                                  {
  var loadingScreen = Barba.BaseTransition.extend({

      start: function () {
          Promise.all([this.newContainerLoading, this.loadingScreenShow()]).then(this.finish.bind(this))
      },

      loadingScreenShow: function () {
          return $("#loadingScreen").css({
          opacity: "0",
          display: "block"
          }).delay(900).animate({
          opacity: 1
          }, 250).promise()
      },

      finish: function () {
          this.done()
      }
  });

  Barba.Pjax.getTransition = function () {
      return loadingScreen
  };

  Barba.Dispatcher.on("transitionCompleted", function () {
      // Resetting Render
      first_render = true;

      // Render Website
      render_website();

      // Auto Render
      auto_render();

      // General Function Sequence
      functionSequence();
  });
  }
// ================================================================


// ============================================================
// ON Load Function
// ============================================================
if(window.addEventListener)                                     {
window.addEventListener('load', function () {
  if(we_tt == 0){
      Barba.Pjax.start();
  }
  else{
      functionSequence();
  }
});
}
else                                                        {
window.attachEvent('onload', function () {
  if(we_tt == 0){
      Barba.Pjax.start();
  }
  else{
      functionSequence();
  }
});
}
// ============================================================
