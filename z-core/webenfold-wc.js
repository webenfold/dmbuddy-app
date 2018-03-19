/**
 * @package webenfoldtheme
 * JAVASCRIPT:  WebEnfold Core JS
 * Description: WebMasters club template functions.
 */

// ================================================================
// WKH Template: Header Function
// ================================================================
// Header Scroll
function ht2_scroll()                                           {
  var topbar200 = new Waypoint                                ({
      element: document.getElementById('website-body'),
      handler: function (direction)                           {
          if (direction == 'down')                            {
              try {
                  $('#ht2-header-bar').addClass('iScrolled');
                  document.getElementById('back2top').style.width = '45px';
                  document.getElementById('back2top').style.opacity = '1';
                  $('header .wkh-text').removeClass('wkh-text').addClass('no-class');
              }
              catch (err) {}
              }
          if (direction == 'up')                              {
              try {
                  $('#ht2-header-bar').removeClass('iScrolled');
                  document.getElementById('back2top').style.width = '0';
                  document.getElementById('back2top').style.opacity = '0';
                  $('header .no-class').removeClass('no-class').addClass('wkh-text');
              }
              catch (err) {}
              }
          },
      offset: -200
      });
  }
// Header >> Side Navigation
function side_nav()                                             {
  function openSideMenu()                                     {
      $('#side-nav').off();
      $('#side-nav').css({
          'opacity' : '1',
          'padding-right' : '0'
      });
      setTimeout(function(){
          $('#side-nav').addClass('shifted');
          $('#close-menu').one('click', function () {
              setTimeout(closeSideMenu, 500);
          });
      },200);
      }
  function closeSideMenu()                                    {
      $('#side-nav').removeClass('shifted');
      setTimeout(function(){
          $('#side-nav').css({
              'opacity' : '',
              'padding-right' : ''
              });
          $('#side-nav-drawer').one('click', function ()              {
              setTimeout(openSideMenu, 400);
              });
          $('#side-nav').one('click', function ()              {
              setTimeout(openSideMenu, 100);
              });
      },200);
      }
  $('#side-nav-drawer').one('click', function ()              {
      setTimeout(openSideMenu, 400);
      });
  $('#side-nav').one('click', function ()              {
      setTimeout(openSideMenu, 100);
  });

  // Remove Attribute
  $('.menu-item-has-children > a').removeAttr("href");

  function submenuOpen()                                      {
      $('.nav-base .menu').removeClass('on-view');
      $('.back').children('a').one('click', function () {
          setTimeout(submenuClose, 500);
      });
      }
  function submenuClose()                                     {
      $('.nav-base .menu').addClass('on-view');
      $('.menu-item-has-children').one('click', function () {
          setTimeout(submenuOpen, 500);
      });
      }
  $('.menu-item-has-children').one('click', function (){
      $(this).find('.sub-menu').prepend( '<li class="back menu-item"><a class="navLinks ripple"><i class="icon-simple-left"></i> Return Back</a></li>' );
      setTimeout(submenuOpen, 500);
  });
  }
// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Delay Ajax Suggestion
var delay_ajax = (function()                                    {
  var timer = 0;
  return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
      };
  })();
// Place Holder ato Type
var mouse_is_in_window = true;
function mouseStatus(n)                                         {
  mouse_is_in_window = n;
  }
function type_on_placeholder(input_ele,input_string)            {
  if(!mouse_is_in_window){
      return null;
      }
  var input_typed_sting = '';
  var i_plus = 0;
  var i_minus = 0;

  function update_typed_string()          {
      clearTimeout (update_typed_string);

      input_typed_sting = input_typed_sting + input_string.charAt(i_plus);
      input_ele.attr("placeholder", input_typed_sting);
      i_plus++;

      if(input_string.length <= i_plus){
          return null;
      }else{
          setTimeout(update_typed_string, 50);
      }
      }
  function delete_previous_strings()      {
      clearTimeout (delete_previous_strings);

      input_ele.attr("placeholder", input_ele.attr("placeholder").slice(0,-1));
      i_minus--;

      if(i_minus <= 1){
          input_ele.attr("placeholder", "");
          setTimeout(update_typed_string, 500);
      }else{
          setTimeout(delete_previous_strings, 25);
      }
  }

  var previous_text = input_ele.attr("placeholder");
  if(previous_text != '')                 {
      i_minus = previous_text.length;
      delete_previous_strings();
      }
  else                                    {
      setTimeout(update_typed_string, 500);
      }
  }
// Ajax Search Suggestion
function ajax_suggestion()                                      {
  var li_elements     = '.jumbo-search .suggestions li';
  var input_elements  = '.jumbo-search .search-field';
  var suggestion_ele  = '.jumbo-search .suggestions';
  var counterX;

  if(!($(input_elements).length > 0)){
      return null;
  }else{
      document.getElementById('webmaster-club').setAttribute('onmouseover','mouseStatus(true);');
      document.getElementById('webmaster-club').setAttribute('onmouseout','mouseStatus(false);');
  }

  function run_and_repeat(){
      setTimeout(function(){
          function count() {
              var xTemp = Math.floor(Math.random() * 6) + 1;
              if (xTemp == counterX) {
                  count();
              } else {
                  counterX = xTemp;
              }
          }
          count();
          switch(counterX){
          case 1:
              type_on_placeholder($(input_elements),"Use #Hashtag to search articles");
              break;
          case 2:
              type_on_placeholder($(input_elements),"Search Here!");
              break;
          case 3:
              type_on_placeholder($(input_elements),"Wait! Please don't search for the unicorns!");
              break;
          case 4:
              type_on_placeholder($(input_elements),"Write your query and press enter to perform deep search");
              break;
          case 5:
              type_on_placeholder($(input_elements),"Search webmasters club for articles");
              break;
          case 6:
              type_on_placeholder($(input_elements),"Searching something, is better than doing nothing");
              break;
          }
          num = null;
          run_and_repeat();
      },9000);
  }run_and_repeat();

  $(input_elements).keyup(function(){
      var query = $(this).val();

      if(query == ''){
          if($('.overlay-icon').hasClass('loadingWheel')){
              $('.overlay-icon').removeClass('loadingWheel');
          }
          clearTimeout(delay_ajax);
          return;
      }

      if(query.length <= 2){
          if($('.overlay-icon').hasClass('loadingWheel'))
          $('.overlay-icon').removeClass('loadingWheel');
          clearTimeout(delay_ajax);

          $(suggestion_ele).fadeOut();
          $('#dynamic-bg .dbg-overlay').off();
      }else{
          if(!$('.overlay-icon').hasClass('loadingWheel'))
          $('.overlay-icon').addClass('loadingWheel');

          delay_ajax(function(){
          $.ajax({
          url: document.location.origin + '/?ajax-search=suggestion',
          method: 'POST',
          data: {query:query},
          success:function(data){
              var lqv = $('.jumbo-search .search-field').val();
              if(lqv != '' || lqv.length > 2){
                  if($('.overlay-icon').hasClass('loadingWheel'))
                  $('.overlay-icon').removeClass('loadingWheel');

                  $(suggestion_ele).fadeIn().html(data);
                  $('#dynamic-bg .dbg-overlay').one( "click", function(){
                      $(suggestion_ele).fadeOut();
                  });
              }
          }
          });
          }, 500 );
      }
  });
  }
// ----------------------------------------------------------------
// Count Search Result Items
function count_result_item()                                    {
  var number_of_item = $('.postList .article-card').length;
  if(number_of_item > 1){
      $('#searched-item-count').text(number_of_item + ' Items Found');
  }else if(number_of_item == 1){
      $('#searched-item-count').text('One Item Found');
  }else{
      $('#searched-item-count').text('No Item Found');
  }
    }
// ----------------------------------------------------------------

// ================================================================
// WKH Template: Post Listing
// ================================================================
// Stats on Hover Function
function toggle_stats()                                         {
  // Get button elements with class button-stats
  var stat_buttons = document.getElementsByClassName('button-stats');

  function install(elemet) {
      //get actual id of button-stats class elements
      var stat_button_id = elemet.id;

      //Add # and create final id string
      stat_button_id = '#' + stat_button_id;

      //Select button-stats class elements based on id and getting data-id value
      var post_id = $(stat_button_id).data("id");

      //Generate Corresponding Stats Screen id with the data-id value
      var statsId = '#stats-' + post_id;

      //Create a function to show screen on hover or click on mobile
      $(stat_button_id).hover(
          function () {
              $(statsId).addClass('shifted');
          },
          function () {
              $(statsId).removeClass('shifted');
          }
      );
  }

  // Create Stats function for each post grid
  for (i = 0; i < stat_buttons.length; i++) {
      install(stat_buttons[i]);
  }
  }
// ----------------------------------------------------------------
// Blog Template - Blog Post Shorting Function
function short_posts()                                          {
  // Variables
  var select_id;
  var short;

  // On Load Update
  short = gurlpbyn('short');
  if (short == 'modified') {
      $('#selectedDrop').text('Last Modified');
  } else if (short == 'views') {
      $('#selectedDrop').text('Post Views');
  } else {

  }

  // On Click Update
  $('.select').on('click', function () {
      select_id = $(this).index('.select');
      var adjust = ($(this).hasClass('collapsed')) ? 1 : 0;

      var option_menu_height = (($(this).children('.option').length) * $(this).children('.option').height()) * (adjust) + 40 + 'px';

      $(this).animate({
          'height': option_menu_height
      }, 100);
      $(this).toggleClass('collapsed');
  });

  $('.option').on('click', function () {
      var val = $(this).find('a').text();
      $(this).parent().find('.shown').text(val);
      select_id = -1;
  });
  }
// ----------------------------------------------------------------
// Blog Template - Advance Parallax
function run_adv_parallax()                                     {
  try {
      var scene = document.getElementById('scene');
      var parallaxInstance = new Parallax(scene);
  } catch (err) {}
  }
// ----------------------------------------------------------------
// Blog Template - Advance Parallax
function breadcrumbs()                                          {
  $('.sub-category').hover(
      function(){
          $('.cur-item').addClass('close-this');
      },
      function(){
          $('.cur-item').removeClass('close-this');
      }
  );
  $('.par-category').hover(
      function(){
          $('.cur-item, .sub-category').addClass('close-this');
      },
      function(){
          $('.cur-item, .sub-category').removeClass('close-this');
      }
  );
  $('.sup-category').hover(
      function(){
          $('.cur-item, .sub-category, .par-category').addClass('close-this');
      },
      function(){
          $('.cur-item, .sub-category, .par-category').removeClass('close-this');
      }
  );
  }
// ----------------------------------------------------------------

// ================================================================
// WKH Template: Logout Dynamics
// ================================================================
function logout_dynamics()                                      {
  var redirect_url    = window.location.protocol + '//' + window.location.host + window.location.pathname;

  var logout_url      = window.location.protocol + '//' + window.location.host + '/logout/';

  document.cookie     = "wcafterlogoutredirect=" + redirect_url + "; path=/";

  setTimeout(window.location = logout_url, 500);
  }
function show_logout_msg()                                      {
  swal({
      position: 'top-end',
      type: 'success',
      title: 'You are logged out of your account',
      showConfirmButton: false,
      timer: 1500
  });
  }
// ----------------------------------------------------------------

// ================================================================
// Render Blog Content
// ================================================================
// Stylize - Links inside blog content
function blog_style_url()                                       {
  var the_post_links = $('#article-content').find('a');
  for (i = 0; i < the_post_links.length; i++)             {
      // Edit Post Link
      var edit_post_link = $(the_post_links[i]).hasClass('post-edit');
      // Other Links
      var other_links = the_post_links[i].hostname;
      // Check for Internal Links
      if(!(edit_post_link)&&(other_links==window.location.hostname)){
          the_post_links[i].className += ' internal-link';
          }
      // Check for External Links
      else if(!(edit_post_link)&&!(other_links==window.location.hostname)){
          the_post_links[i].className += ' external-link';
          the_post_links[i].innerHTML = '<span>' + the_post_links[i].innerHTML + ' <i class="icon-link2"></i></span>';
          $(the_post_links[i]).on('click', function (e) {
              e.preventDefault();
              //Checking condition that button has href attribute
              if ($(this).attr('href')) {

                  var link = $(this).attr('href');

                  var home_link = window.location.protocol + '//' + window.location.hostname;
                  link = home_link + '/outgoing-link-check/?url=' + link + '&auto_redirect=true';

                  //Opening Link in new Window
                  setTimeout(function () {
                      window.open(link, '_blank');
                  }, 9);
              }
          });

      }
  }
  }
// ----------------------------------------------------------------
// Helper Function - Edit Form Popup
function edit_form_popup(obj)                                   {
  if(we_swal == true){
      var the_url = $(obj).data('url');
      swal({
      title: "Edit Content",
      text: "Modify or update this content using Google form. You will be rewarded for your contribution",
      type: 'info',
      showCancelButton: true,
      confirmButtonText: "Edit Now",
      cancelButtonText: 'Edit Later',
      confirmButtonColor: '#2980B9',
      cancelButtonColor: '#C0392B',
      }).then((result) => {
          if (result.value) {
              window.open(the_url);
          }
      })
  }
  }
// ----------------------------------------------------------------
// Helper Function - Open Edit Form
function open_edit_form(obj)                                    {
  $(obj).off;
  $(obj).attr("onClick", 'edit_form_popup(this)').html(
      '<span><i class="icon-edit"></i> EDIT</span>'
  ).addClass('active-edit');
  }
// ----------------------------------------------------------------
// Render content and make it editable
function render_blog_content()                                  {
  var the_post_id = $('#article-content').data('postid');

  var edit_button = '<span><i class="icon-edit"></i></span>';

  // Paragraph Element
  var paragraph_element = $('#article-content').find('p');
  for (i = 0; i < paragraph_element.length; i++)              {
      var the_element = paragraph_element[i];

      if($(the_element).hasClass('no-edit')){
          continue;
      }

      var raw_content = the_element.innerHTML;

      var the_content = raw_content.replace(/<a[^>]*>/g, "⚓");
      var the_content = the_content.replace(/(<([^>]+)>)/ig, "");

      var url_encoded_content = encodeURIComponent(the_content);
      var url_encoded_content = url_encoded_content.replace(/%20|%26nbsp%3B/g, '+');
      var url_encoded_content = url_encoded_content.replace(/%E2%9A%93%23/g, '%23');

      if (i === 0) {
          $(the_element).addClass('first-para');
      }

      if ($(the_element).hasClass('note')) {
          var section_id = 'Paragraph+' + (i + 1) + '+%5BNote+Type%5D+of+Publication-ID+WHK-' + the_post_id;

          the_element.innerHTML = raw_content +
              '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
              '?usp=pp_url&entry.1217365135=' + url_encoded_content +
              '&entry.1693609218&entry.1557547467=' + section_id +
              '" target="_blank">' + edit_button + '</a>';

          // Add Example Tag
          the_element.innerHTML = '<span class="imp-tag"><span>NOTE:</span></span> ' + the_element.innerHTML;
      } else {
          var section_id = 'Paragraph+' + (i + 1) + '+of+Publication-ID+WHK-' + the_post_id;

          the_element.innerHTML = raw_content +
              '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
              '?usp=pp_url&entry.1217365135=' + url_encoded_content +
              '&entry.1693609218&entry.1557547467=' + section_id +
              '" target="_blank">' + edit_button + '</a>';
      }


  }

  // Heading Element
  var heading_element = $('#article-content').find('h2');
  for (i = 0; i < heading_element.length; i++)                {
      var the_element = heading_element[i];

      if($(the_element).hasClass('no-edit')){
          continue;
      }

      var raw_content = the_element.innerHTML;
      var url_encoded_content = encodeURIComponent(raw_content).replace(/%20|%26nbsp%3B/g, '+');

      var section_id = 'Heading+of+Publication-ID+WHK-' + the_post_id;

      the_element.innerHTML = raw_content +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + url_encoded_content +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
  }

  var heading_element = $('#article-content').find('h3');
  for (i = 0; i < heading_element.length; i++)                {
      var the_element = heading_element[i];

      if($(the_element).hasClass('no-edit')){
          continue;
      }

      var raw_content = the_element.innerHTML;
      var url_encoded_content = encodeURIComponent(raw_content).replace(/%20|%26nbsp%3B/g, '+');

      var section_id = 'Sub-Heading+' + (i + 1) + '+of+Publication-ID+WHK-' + the_post_id;

      if(the_element.id == '')
      the_element.innerHTML = raw_content +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + url_encoded_content +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
      else
      the_element.innerHTML = raw_content +
          '<a class="to-content internal-link scroll" href="#topic-list"><span><i class="icon-simple-up"></i></span></a>' +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + url_encoded_content +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
  }

  var heading_element = $('#article-content').find('h4');
  for (i = 0; i < heading_element.length; i++)                {
      var the_element = heading_element[i];

      if($(the_element).hasClass('no-edit')){
          continue;
      }

      var raw_content = the_element.innerHTML;
      var url_encoded_content = encodeURIComponent(raw_content).replace(/%20|%26nbsp%3B/g, '+');

      var section_id = 'Sub-Heading-h3+' + (i + 1) + '+of+Publication-ID+WHK-' + the_post_id;

      if(the_element.id == '')
      the_element.innerHTML = raw_content +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + url_encoded_content +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
      else
      the_element.innerHTML = raw_content +
          '<a class="to-content internal-link scroll" href="#topic-list"><span><i class="icon-simple-up"></i></span></a>' +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + url_encoded_content +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
  }

  // List Element
  var list_element = $('#article-content').find('ol');
  for (i = 0; i < list_element.length; i++)                 {

      var the_element = list_element[i];
      var raw_content = the_element.innerHTML;

      var li_elements = the_element.getElementsByTagName('li');
      var final_list = '';

      for (var j = 0; j < li_elements.length; j++) {
          var raw_list_content = li_elements[j].innerHTML;
          var the_list_content = li_elements[j].textContent;

          var url_encoded_content = encodeURIComponent(the_list_content);
          var url_encoded_content = url_encoded_content.replace(/%20|%26nbsp%3B/g, '+');
          var url_encoded_content = url_encoded_content.replace(/%E2%9A%93%23/g, '%23');

          var list_number = j + 1;

          final_list = final_list + '%0A' + list_number + ') ' + url_encoded_content + '%0A';
      }

      var section_id = 'List-Item+' + (i + 1) + '+of+Publication-ID+WHK-' + the_post_id;

      the_element.innerHTML = raw_content +
          '<a class="post-edit" ondblclick="open_edit_form(this);" data-url="' + post_content_edit_form_link +
          '?usp=pp_url&entry.1217365135=' + final_list +
          '&entry.1693609218&entry.1557547467=' + section_id +
          '" target="_blank">' + edit_button + '</a>';
  }
  }
// ----------------------------------------------------------------
// Code Verified Message
function code_verified(message)                                 {
  if(we_swal == true){
      if(message == 1)                                        {
          swal({
          title: "Code Verified",
          html: "The author of this post has claimed that, he/she has verified this piece of code and it has no errors.<hr> <j><b>A word of advise:</b> don't forget to modify the values of variables, functions etc. as advised by the author and do check this code, first on your development environment before deploying it into to the live application.</j>",
          type: 'success',
          confirmButtonText: "Got It!",
          confirmButtonColor: '#7F8C8D',
          });
      }
      else                                                    {
          swal({
          title: "Code Not Verified",
          html: "The author of this post has not verified this piece of code.<hr> <j><b>A word of advise:</b> don't forget to modify the values of variables, functions etc. as advised by the author and do check this code, first on your development environment before deploying it into to the live application.</j>",
          type: "warning",
          confirmButtonText: "Got It!",
          confirmButtonColor: '#7F8C8D',
          });
      }
  }
  }
// ----------------------------------------------------------------
// Render code element
function render_code_2()                                        {
  $('#article-content .code-container code').each(function(index){
      // Get Code Data Set from textarea
      var code_verified   = $(this).data('verified');
      var code_type       = $(this).data('type');
      var code_data       = $(this).html();

      var code_editor_ID  = 'code_editior_' + index;

      // Create New Element
      $(this).after('<div id="' + code_editor_ID + '">' + code_data + '</div>').remove();

      // Setting-up editor mode
      var dynamic_code_type = 'ace/mode/' + code_type;

      console.log('Code Editor ID: ' + code_editor_ID + ' | ');
      console.log('Code Editor TYPE: ' + dynamic_code_type + ' | ');
      console.log('Code Editor DATA: ' + code_data + ' | ');

      // Setting up the editor
      var code_editor = ace.edit(code_editor_ID);
      code_editor.setTheme("ace/theme/tomorrow_night_bright");
      code_editor.getSession().setMode(dynamic_code_type);
      code_editor.setShowPrintMargin(false);
      code_editor.setFontSize(18);
      code_editor.getSession().setUseWrapMode(true);
      code_editor.setReadOnly(true);
      code_editor.resize();
      });
  }
// ----------------------------------------------------------------
// Greetings
function greet_user()                                           {
  $('#greeting').text(function(){
      var now = new Date();
      var hrs = now.getHours();
      var msg = "";

      if (hrs >  0) msg = "Mornin' Sunshine!"; // REALLY early
      if (hrs >  6) msg = "Good morning";      // After 6am
      if (hrs > 12) msg = "Good afternoon";    // After 12pm
      if (hrs > 17) msg = "Good evening";      // After 5pm
      if (hrs > 22) msg = "Go to bed!";        // After 10pm

      return msg;
  });
  }
// ----------------------------------------------------------------

// ================================================================
// WKH Template Function Sequence
function wkh_temp_seq()                                         {
  ajax_suggestion();
  side_nav();
  ht2_scroll();
  toggle_stats();
  breadcrumbs();
  short_posts();
  ripple_effect();
  render_blog_content();
  blog_style_url();
  greet_user();
  count_result_item();
  smooth_scroll_link();
  }
// ================================================================
