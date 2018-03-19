// DM Buddy Core Functions
// Developed By Gaurav Kumar
// Version 2.0
// Copyrighted: 2018 DM Buddy | Digital Marketing Buddy
// The moment you try to simplify the technologies, its becomes more complicated!
// The moment you finish your task, new challenge begins and life continues.
// And the moment you back-off, you are finished and out of the game.
// Knowledge will be your best ally


// Global Variable
var obj_selected;
var walker;
var quiz_attempt  = 0;
var walker_chp    = [];
var walker_top    = [];


// =========================================================
// Important CDN Domains & URL
// =========================================================
var cdn_domain    = 'https://cdnjs.cloudflare.com/ajax/libs/';
// ---------------------------------------------------------
var hammer_url    = cdn_domain + 'hammer.js/2.0.8/hammer.min.js';
var hammer_loaded = false;
// =========================================================


// =========================================================
// Helper Functions
// =========================================================
// Load script function
$.load_script = function (url, callback)                    {
  $.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
  }
// ---------------------------------------------------------
// Get Query String
$.get_query = function(name)                                {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  try{
    return results[1] || 0;
  }catch(e){
    return 0;
  }
  }
// ---------------------------------------------------------
// Get Current URL
function the_domain()                                       {
    return window.location.protocol + '//' + window.location.host;
  }
// ---------------------------------------------------------
// Create Notification
function create_notify(content,button)                      {

  var close       = '<span>Close <span class="close icon icon-white icon-close"></span></span>';

  if(button == undefined)button='';

  var content = '<table cellpadding="0" cellspacing="0" border="0"><tr><td>' +
  '<span style="background-image: url(/media/bob.png);"></span></td><td><span>' +
  content + button + '</span></td></tr></table>';

  return '<div class="notify">' + close + content + '</div>';
  }
// ---------------------------------------------------------
// Create Topic List
function create_tl(cph_num)                                 {
  var th            = '';
  var tr            = '';
  var table_half    = true;

  // ---------------------------------------------------------
  if(cph_num == undefined)                                  {
    cph_num = parseInt($.get_query('nav-cph'));
    if(!(cph_num > 0))cph_num=1;
    table_half    = false;

    if(cph_num == 1)                                          {
      th = '<p class="title-bar">1<sup>st</sup> Chapter - Topics List</p>';
      }
    else if(cph_num == 2)                                     {
      th = '<p class="title-bar">2<sup>nd</sup> Chapter - Topics List</p>';
      }
    else if(cph_num == 3)                                     {
      th = '<p class="title-bar">3<sup>rd</sup> Chapter - Topics List</p>';
      }
    else if(cph_num > 3)                                      {
      th = '<p class="title-bar">'+ cph_num +'<sup>th</sup> Chapter - Topics List</p>';
      }
    }
  else{
    cph_num++;
  }
  // ---------------------------------------------------------

  var cph_spec_top = walker_top[(cph_num - 1)];
  th = th + '<table class="topic-list" cellpadding="0" cellspacing="0" border="0">';

  for(i=0; i < cph_spec_top.length; i++)                    {
    var link = "'"+the_domain()+"/dmbuddy.htm?page=course&nav-cph="+cph_num+"&nav-top="+(i+1)+"'";
    tr = tr + '<tr id="tp-list-'+cph_num+'-'+(i+1)+'" onclick="location.href='+link+'"><td><span>'+cph_num+'.'+(i+1)+'</span></td><td>'+
    cph_spec_top[i] +'</td></tr>';
    }
  if(table_half){
    tr = '<tr class="cph-ovw"><td><div id="cph-ovw"></div></td></tr>' + tr;
    }
  return th + tr + '</table>';
  }
// ---------------------------------------------------------
// Load   type  => Course (or) guide [ct to content]
// Load   opt   => Next (or) Prev Topic
// Load   opt   => Next (or) Prev Chapter
function load_ct(type,opt)                                  {
  var the_url, the_path;
  var current_chapter = 0;
  var current_topic   = 0;

  // Guide Chapters & Topics
  current_chapter = parseInt(Cookies.get("guide-current-chapter"));
  current_topic   = parseInt(Cookies.get("guide-current-topic"));
  if(type == "guide" && current_chapter > 0 && current_topic > 0){
    // Course Chapters
    if ( opt == "next-chapter" )                            {
      current_chapter++;
      the_path = 'guide';
      }
    else if ( opt == "prev-chapter" )                       {
      current_chapter--;
      the_path = 'guide';
      }
    // Course Topics
    else if ( opt == "next-topic" )                         {
      current_topic++;
      the_path = 'guide';
      }
    else if ( opt == "prev-topic" )                         {
      current_topic--;
      the_path = 'guide';
      }
    else                                                    {
      the_path = 'guide';
      }
    }
  // -------------------------------------------------------
  current_chapter = 0; current_topic =0;

  // Course Chapters & Topics
  current_chapter = parseInt(Cookies.get(
    "a" + obj_selected + "-current-chapter"
  ));
  current_topic   = parseInt(Cookies.get(
    "a" + obj_selected + "-course-current-topic"
  ));
  if(current_chapter > 0 && current_topic > 0)              {
    // Course Chapters
    if ( opt == "next-chapter" )                            {
      current_chapter++;
      the_path = 'a' + obj_selected;
      }
    else if ( opt == "prev-chapter" )                       {
      current_chapter--;
      the_path = 'a' + obj_selected;
      }
    // Course Topics
    else if ( opt == "next-topic" )                         {
      current_topic++;
      the_path = 'a' + obj_selected;
      }
    else if ( opt == "prev-topic" )                         {
      current_topic--;
      the_path = 'a' + obj_selected;
      }
    else                                                    {
      the_path = 'a' + obj_selected;
      }
    }
  // -------------------------------------------------------

  $.ajax({
    url:     the_domain() + the_path + '/' +
              'content-' + current_chapter + '-' +
              current_topic + '.dmb',
    cache:   false,
    success: function(result){
      $("#inner-content").html(result);
      }
    });
  }
// ---------------------------------------------------------
// Load Other Pages
function load_page(type)                                    {
  var ajax_url, hook;
  // Load Home Page
  if(type == 'home')                                        {
    ajax_url    = the_domain() + '/a' + obj_selected + '/home.dmb';
    hook        = '#inner-content';
    }
  else if(type == 'course')                                 {
    var cph_num = parseInt($.get_query('nav-cph'));
    var top_num = parseInt($.get_query('nav-top'));

    if(!(cph_num > 0))cph_num=1;
    if(!(top_num > 0))top_num=1;

    ajax_url    = the_domain() + '/a' + obj_selected + '/data-'
                  + cph_num + '-'
                  + top_num +'.dmb';
    hook        = '#inner-content';
    }
  else                                                      {
    ajax_url    = the_domain() + '/pages/page-content/' + type + '.dmb';
    hook        = '#info-base';
    }
  $.ajax({
    url:     ajax_url,
    cache:   false,
    success: function(result){
      $(hook).html(result);
      render_page(type + '-r1');
      }
    });
  }
// =========================================================


// =========================================================
// Home Chapter List - Topic List and Over View
// =========================================================
// Show Chapter
function show_chp(event)                                    {
  var ele     = '#' + $(event).data('link');
  var ele_td  = '#' + $(event).data('link') + ' td:first-child';
  if($(event).hasClass('active'))                           {
    $(ele).animate({
      height: 0
      }, 300);
    $(event).removeClass('active');
    }
  else                                                      {
    var height = $(ele_td).outerHeight();
    if(height > 600) height = 600;
    $(ele).animate({
      height: height
      }, 300, function(){
        // location.hash = ele + '-p';
        // console.log('Total Height: ' + (height + $(ele + '-p').offset().top));

        // $('#content').animate({
        //   scrollTop: (height + $(ele + '-p').offset().top + 50)
        // }, 500);
      });
    $(event).addClass('active');
    }
  }
// ---------------------------------------------------------
// Create Chapter List
function create_cl()                                        {
  var tr = '';
  for(i=0; i < walker_chp.length; i++)                      {
    var cp = i;
    var tl = create_tl(i);
    i = cp;
    cp++;
    tr = tr + '<tr id="cph'+cp+
    '-data-p" data-link="cph'+cp+
    '-data" onclick="show_chp(this);">'+
    '<td><span>CPH '+cp+'</span></td>'+
    '<td>' + walker_chp[i] + '</td>'+
    '<td><span class="icon icon-next icon-gray transitionFast"></span></td></tr>'+
    '<tr id="cph'+cp+'-data" style="height: 0;" class="chapter-data"><td>'+tl+'</td></tr>';
    }
  console.log('I Ran ');
  return '<table class="chapter-list" cellpadding="0" cellspacing="0" border="0">' + tr + '</table>';
  }
// ---------------------------------------------------------
// Render Chapter List & Progress
function render_cl()                                        {
  for( i=0; i < walker_chp.length; i++)                     {
    var topic_list = walker_chp[i];
    for(j=0; j < topic_list.length; j++)                    {
      var pro = progress('get-attempt',i,j);
      if(pro >= 1)                                          {
        $('#tp-list-'+i+'-'+j).css('background-color', '#6D8953');
        }
      }
    }
  }
// =========================================================



// =========================================================
// Quiz Functions | Progress
// =========================================================
// Quiz Function [hinx = Highlight Next]
function hinx(obj)                                          {
  var question_set    = $(obj).closest('.question-set');
  question_set.find('.next-cta').removeClass('disabled');
  }
// ---------------------------------------------------------
// Render Quiz
function render_qz()                                        {
  var qz_ele    = $('.qz-ele');
  var qz_total  = qz_ele.length;
  var qz_head   = '<form>'
  var qz_foot   = '<div data-question="0" data-correct="0" data-total="' +
                  qz_total + qz_foot_end;
  var qz_body   = '';
  for(i=0; i < qz_total; i++)                               {
    var is_last = ' ';
    if((i+1) == qz_total)is_last = ' last-question ';
    var qe_h  = '<div data-question="'+(i+1)+'" class="question-set' +
                is_last + 'transition">';
    var qz_q  = qz_ele.eq(i).find('#qz-q').html();
    qz_q      = '<p>' + qz_q + '</p>';

    var qz_a  = qz_ele.eq(i).find('.qz-a');

    var qz_opt_set = '';

    for(j=0; j < qz_a.length; j++)                          {
      var is_correct = '';
      if(qz_a.eq(j).hasClass('correct')) is_correct = ' correct';
      qz_opt_set = qz_opt_set + '<p class="option-base"><input onclick="hinx(this);" class="option radio'+is_correct+'" type="radio" id="opt-'+i+'-'+j+'" name="opt-'+i+'"><label for="opt-'+i+'-'+j+'"><span onclick="hinx(this);">'+$(qz_a).eq(j).html()+'</span></label></p>';
      }
    // Create one question set
    qz_body = qz_body + qe_h + qz_q + qz_opt_set + qz_nav_last;
    }
  // Setting Content in DOM
  $('.quiz').html(qz_head + qz_body + qz_foot);
  }
// ---------------------------------------------------------
// Create Quiz
function create_qz()                                        {
  var temp_html = '';
  function show_msg(allowed)                                {
    var msg     = '';
    if(score > 50)                                          {
      var msg =
              '<p>Nice Score!</p><p>You have scored '+score+'% marks in this topic. You are intelligent my friend. But remember, as Kevin said, "Practice will make you perfect. And when it comes to digital marketing, you need to keep yourself updated."';
      }
    else if(allowed == 'no-attempts')                       {
      var msg =
                '<p>Hey Buddy!</p><p>You have scored '+score+'% marks in this topic. I know, you can do it better. You should read this topic one more time. As if you do not have any attempts left. Either you can reset this chapter (or) increase your attempt limit (to learn more open help section).';
      }
    else                                                    {
      var msg =
                '<p>Hey Buddy!</p><p>You have scored '+score+'% marks in this topic. I know, you can do it better. Before attempting this quiz again.You should read this topic one more time.';
      }
    $(create_notify(msg)).insertAfter('.chatBox');
    // -----------------------------------------------------
    }
  // -------------------------------------------------------

  var cph_num = parseInt($.get_query('nav-cph'));
  var top_num = parseInt($.get_query('nav-top'));
  var p_at = progress('get-attempt',cph_num,top_num);
  // -------------------------------------------------------
  // Attempted & Out of Attempts
  // -------------------------------------------------------
  if(p_at >= 2)                                             {
    $('.retake').remove();

    var score   = progress('get-score',cph_num,top_num);
    show_msg(score,'no-attempts');
    }
  // -------------------------------------------------------
  // Attempted
  // -------------------------------------------------------
  else if(p_at < 2 && p_at > 0)                             {
    // create message and show last page.
    render_qz();

    var score   = progress('get-score',cph_num,top_num);
    show_msg(score);

    $('#result').html('Your Score <span>' + score + '%</span>');

    var length = $('.question-set').length;
    length = length - 1;
    $('.question-set, .question-submit').css('transform','translateX(-' + (length * 100) + '%)');

    $('.retake-cta').removeClass('disabled');
    }
  // -------------------------------------------------------
  // Not attempted
  // -------------------------------------------------------
  else                                                      {
    render_qz();
    }
  $('.qz-ele').remove();

  // Returns this function to execute next;
  return true;
  }
// ---------------------------------------------------------
// Get Progress Data
function progress(type,cph_num,top_num,score_per)           {
  // General Variables
  var cookie_name = 'a' + obj_selected + '-progress';

  // -------------------------------------------------------
  // Cookie Exists [UPDATE]
  // -------------------------------------------------------
  if(Cookies.get(cookie_name))                              {
  var cookie_json       = Cookies.getJSON(cookie_name);
  var json_key          = 0;
  var current_json_key  = 0;

  // -------------------------------------------------------
  // Check Json | Find Attempted | Set Key
  $.each(cookie_json, function(key,val)                     {
    if(val[0] == cph_num && val[1] == top_num){
      json_key          = key;
      current_json_key  = (key + 1);
      }
    });
  // -------------------------------------------------------


  // -------------------------------------------------------
  // Getting Score Data
  if(type == 'get-score' && current_json_key == 0)          {
    return 'no';
    }
  else if(type == 'get-score')                              {
    return cookie_json[json_key][2];
    }
  // Getting Attempt
  if(type == 'get-attempt' && current_json_key == 0)        {
    return 'no';
    }
  else if(type == 'get-attempt')                            {
    return cookie_json[json_key][3];
    }
  // -------------------------------------------------------

  if(type !== 'set')return;

  // Setting Progress Cookie
  // Check Json | Setting New Attempt | Updating Cookie Data
  if(current_json_key == 0)                                 {
    var course_data = [];
    course_data[0]  = cph_num;      // Course Number
    course_data[1]  = top_num;      // Topic  Number
    course_data[2]  = score_per;    // Set Score
    course_data[3]  = 1;            // Set Attempt
    cookie_json.push(course_data);
    // Updating Cookie Data
    Cookies.set(cookie_name,cookie_json);
    }
  // Check Json | Updating Attempt | Manipulating Cookie Data
  else                                                      {
    cookie_json[json_key][2] = score_per; // Set Score
    cookie_json[json_key][3] = 2;         // Set Attempt
    // Manipulating Cookie Data
    Cookies.set(cookie_name,cookie_json);
    }
  // -------------------------------------------------------
  }
  // -------------------------------------------------------
  // Cookie Does Not Exists [CREATE]
  // -------------------------------------------------------
  else                                                      {
    if(type == 'get-score' || type == 'get-progress' || type == 'get-attempt' )
    return 'no';

    if(type !== 'set')
    return;

    var first_json  = [];
    var course_data = [];
    course_data[0]  = cph_num;      // Course Number
    course_data[1]  = top_num;      // Topic  Number
    course_data[2]  = score_per;    // Set Score
    course_data[3]  = 1;            // Set Attempt
    first_json.push(course_data);
    // Setting Cookie For First Time
    Cookies.set(cookie_name,first_json);
    }
  }
// ---------------------------------------------------------
// Next Question
function next_question(obj)                                 {
  // -------------------------------------------------------
  // Out of attempts
  if(quiz_attempt > 2) return;
  // -------------------------------------------------------

  var cph_num = parseInt($.get_query('nav-cph'));
  var top_num = parseInt($.get_query('nav-top'));
  var quiz_attempt_db = progress('get-attempt',cph_num,top_num);

  // -------------------------------------------------------
  // Quiz Function
  var question_set    = $(obj).closest('.question-set');
  var question_set_id = parseInt(question_set.data('question'));
  if(question_set.hasClass('question-submit'))              {
    $('input.option').prop('checked', false);
    $('.question-submit').data('correct', 0);
    }
  else                                                      {
    var checked      = question_set.find('.option');
    var not_checked  = true;
    for(i=0; i < checked.length; i++){
      if((checked).eq(i).prop('checked')) not_checked = false;
    }
    if(not_checked)return;
    // Proceed if there is checked answer
    if(question_set.find('.correct').prop('checked'))       {
      var correct_ans = parseInt($('.question-submit').data('correct')) + 1;
      $('.question-submit').data('correct', correct_ans);
      }
    }
  // -------------------------------------------------------

  // -------------------------------------------------------
  // One Step Before Result [Saving Cookie]
  if(question_set.hasClass('last-question'))                {
    var scored_m  = $('.question-submit').data('correct');
    var total_m   = $('.question-submit').data('total');


    // Compile Score
    var score = (Math.floor((scored_m / total_m) * 100));
    $('#result').html('Your Score <span>' + score + '%</span>');

    // Set Score
    progress('set',cph_num,top_num,score);

    // Increment Attempt
    if(quiz_attempt_db >= 1)
    quiz_attempt = quiz_attempt_db;

    quiz_attempt = quiz_attempt + 1;

    // -------------------------------------------------------
    // Check Attempt [remove retake if last attempt]
    if(quiz_attempt < 2){
      $('.retake-cta').removeClass('disabled');
      }
    else if(quiz_attempt >= 2){
      $('.retake-cta').addClass('disabled');
      }
    }
  // -------------------------------------------------------

  $('.question-set, .question-submit').css('transform','translateX(-' + (question_set_id * 100) + '%)');
  }
// ---------------------------------------------------------
// Create home chapter list with progress
function cph_pro_list(cph_num)                              {

  }
// =========================================================



// =========================================================
// Navigation & menu
// =========================================================
// Topic Navigation
// ---------------------------------------------------------
function toggle_menu(num)                                   {
  if (num == 1) {
    $('#content, #navigation, #drawer').addClass('menu-open').bind("transitionend webkitTransitionEnd", function(){
      $('#content').addClass('on-flow');
    });
    document.getElementById('drawer').onclick = function () {
      toggle_menu(0)
      };
    }
  if (num == 0) {
    $('#content, #navigation, #drawer').removeClass('menu-open').bind("transitionend webkitTransitionEnd", function(){
      $('#content').removeClass('on-flow');
    });
    document.getElementById('drawer').onclick = function () {
      toggle_menu(1)
      };
    }
  }
// =========================================================



// =========================================================
// Application Functions
// ---------------------------------------------------------
function create_page(page_to_create,page_to_load)           {
  if(page_to_create == 'action-page')                       {
    $.ajax({
      url:     the_domain() + '/pages/framework/action-page.dmb',
      cache:   false,
      success: function(result){
        $(result).insertAfter('.loading-screen');
          load_page(page_to_load);
        }
      });
    }
  else if(page_to_create == 'content-page')                 {
    $.ajax({
      url:     the_domain() + '/pages/framework/default.dmb',
      cache:   false,
      success: function(result){
        $(result).insertAfter('.loading-screen');
        if(run_sequence(1)){
          if(page_to_load == 'home'){
            load_page('home');
            }
          else if(page_to_load == 'course'){
            load_page('course');
            }
          }
        }
      });
    }
  }
// ---------------------------------------------------------
// The Last Resort [R1, R2, R3  and more]
// ---------------------------------------------------------
function render_page(type)                                  {
  // Course Render 1 : Load Chat
  if(type == 'course-r1')                                   {
    run_sequence(2);
    }
  // Course Render 2 : Load topic List
  else if(type == 'course-r2')                              {
    run_sequence(3);
    }
  // Course Render 3 : Mark Active topic
  else if(type == 'course-r3')                              {
    if(create_qz())                                         {
      var max_height = 0;
      $('.question-set').each(function(){
        if($(this).height() > max_height){
          max_height = $(this).height();
          }
        });
      $('.question-set').css('height',max_height);
      }
    var cph_num = parseInt($.get_query('nav-cph'));
    var top_num = parseInt($.get_query('nav-top'));
    if(!(cph_num > 0))cph_num=1;
    if(!(top_num > 0))top_num=1;
    redirect_url  = 'dmbuddy.htm?page=course&nav-cph=' +
                    cph_num + '&nav-top=' + top_num;
    Cookies.set("last_page", redirect_url , { expires: 365 });
    end_loading();
    }
  // Home render 1 : Load Continue
  else if(type == 'home-r1')                                {
    var last_page   = Cookies.get('last_page');
    if( last_page != '')                                    {
      chp_num = new RegExp('[\?&]nav-cph=([^&#]*)').exec(last_page);
      top_num = new RegExp('[\?&]nav-top=([^&#]*)').exec(last_page);

      try{
        // Notification
        // -------------------------------------------------
        var msg =
        "<p>Hey buddy!</p><p>Where have you been?</p><p>I was waiting for you. Lets start reading together and continue from where you left off</p>";
        var but =
              '<a class="button primary flat large" href="dmbuddy.htm?page=course&nav-cph=' + chp_num[1] + '&nav-top=' + top_num[1] + '">Continue</a>';
        $('.continue-base').html(create_notify(msg,but));
        // -------------------------------------------------
        }catch(err){}
      }
    if(run_sequence(4)){
      render_cl();
      end_loading();
    }
    }
  else                                                      {
    end_loading();
    }
  }
// =========================================================



// =========================================================
// Objective Management
// ---------------------------------------------------------
// Selecting Objective
function select_objective(type)                             {
  if (type == 1)                                            {
    Cookies.set("user_obj", '1', { expires: 365 });
    location.href = the_domain() + '/dmbuddy.htm?page=home';
    }
  else if (type == 2)                                       {
    Cookies.set("user_obj", '2', { expires: 365 });
    }
  else if (type == 3)                                       {
    Cookies.set("user_obj", '3', { expires: 365 });
    }
  }
// ---------------------------------------------------------
// Initializing or Setting Objective Selection [Needs to be removed]
function set_objective(type)                                {
  if (type == "newbie")                                     {
    load_page("first-destination");
    }
  else if (type == "switch")                                {
    var html  = "<div><h3>Switch Objective</h3>";
    html      = html + "<p>You are about to switch your selected objective. Course content will be changed according to the objective you select.</p>";
    html      = html + '<a id="obj-1" class="button" onClick="select_objective(1)">Promote business</a>';
    html      = html + '<a id="obj-2" class="button" onClick="select_objective(2)">Making money online</a>';
    html      = html + '<a id="obj-3" class="button" onClick="select_objective(3)">Become a webmaster</a>';
    html      = html + '</div>';
    show_notification(html);
    }
  else                                                      {
    var html  = "<div><h3>Select Objective</h3>";
    html      = html + "<p>We can't find your data in your device. Its seems your android device has been reset.</p>";
    html      = html + '<a id="selObj" class="button" onClick="select_objective()">Select</a></div>';
    show_notification(html);
    }
  }
// =========================================================



// =========================================================
// Continue Reading
// ---------------------------------------------------------
function continue_reading()                                 {
  // Course / Guide / Other Page (redirect to home Page)
  var current_page    = Cookies.get("current-page");
  if(current_page == "course-page")                         {
    load_ct();
    }
  else if(current_page == "guide-page")                     {
    load_ct("guide");
    }
  else                                                      {
    load_home();
    }
  }
// =========================================================



// =========================================================
//  Create DM Buddy Objective Logo
function obj_logo(obj_selected)                             {
  $('#logo').data('background-image', function (){
    return 'media/obj-logo-' + obj_selected;
    });
  }
// ---------------------------------------------------------
//  Create Navigation Menu
// ---------------------------------------------------------
function create_nav(obj_selected)                           {
  $.ajax({
    url:        the_domain() + '/nav/a' + obj_selected + '.dmb',
    cache:      false,
    success:    function(result){
      $("#inner-menu").html(result);
      }
    });
  }
// =========================================================



// =========================================================
// Function to end loading
// ---------------------------------------------------------
function end_loading()                                      {
  window.addEventListener('load', function(){
    var ele = $('.loading-screen');
    ele.animate({
      opacity: 0
    }, 'linear', function(){
      $(this).css('pointer-events','none');
    });
    });
  }
// =========================================================



// =========================================================
// Retrieve Configuration Values
function set_walker(obj)                                    {
  if(walker !== undefined)                                  {
    // Retrieve Value
    $.each( walker, function( key_1, val_1 )                {
      // Get data of certain objective
      if(key_1 == obj)                                      {
        $.each(val_1, function( key_2, val_2)               {
          var cph = 0;
          // Get data of course
          if(key_2 == 'course')                             {
            $.each(val_2, function( key_3, val_3)           {
              walker_chp[cph] = key_3;
              cph++;
              var top = 0;
              var temp_array = [];
              $.each(val_3, function( key_4, val_4)         {
                temp_array[top] = val_4;
                top++;
                });
              walker_top.push(temp_array);
              });
            }
          });
        }
      });
    start_script();
    }
  else                                                      {
    // Get Configuration Set Walker
    $.getJSON('/z-core/config.json').done(function( data )  {
      walker = data;
      set_walker(obj);
      });
    }
  }
// ---------------------------------------------------------
// Core Function Sequence (Step Wise)
// ---------------------------------------------------------
function run_sequence(sequence)                             {
  if      ( sequence == 1 )                                 {
    // Function Sequence
    create_nav( obj_selected);
    obj_logo(   obj_selected);
    // Return Function
    return true;
    }
  else if ( sequence == 2 )                                 {
    $('.kevin'  ).html(function()                           {
      return '<img draggable="false" src="../images/kevin.png"/><nm>Kevin</nm><span>' + $(this).html();
      });
    $('.bob'    ).html(function()                           {
      return '<img draggable="false" src="../images/bob.png"/><nm>bob</nm><span>' + $(this).html();
      });
    $('.stuart' ).html(function()                           {
      return '<img draggable="false" src="../images/stuart.png"/><nm>stuart</nm><span>' + $(this).html();
      });
    $('.dave'   ).html(function()                           {
      return '<img draggable="false" src="../images/dave.png"/><nm>dave</nm><span>' + $(this).html();
      });
    $('.tim'    ).html(function()                           {
      return '<img draggable="false" src="../images/tim.png"/><nm>tim</nm><span>' + $(this).html();
      });
    // -----------------------------------------------------
    var html = '<p class="title-bar">Buddies Chat</p>';
    $(html).insertAfter('.contentBox');
    // -----------------------------------------------------
    // Loading Chapter List
    $('#list-base').html(create_tl());
    render_page('course-r2');
    }
  else if ( sequence == 3 )                                 {
    $('.topic-list tr').each(function(index){
      var top_num = parseInt($.get_query('nav-top'));
      if(!(top_num > 0))top_num=1;
      top_num--;
      if(index == top_num){
        $(this).addClass(function(){
          render_page('course-r3');
          return 'active';
        });
        }
      });
    }
  else if ( sequence == 4 )                                 {
    $('#chapter-base').html(create_cl());
    return true;
    }
  }
// ---------------------------------------------------------
// No Query [[ Index ]]
// ---------------------------------------------------------
//     => First Time  => The first destination
//     => Returning   => The continue
// ---------------------------------------------------------
// Get Query (action)
// [[ ?action= ]]
// ---------------------------------------------------------
//     => switch      => DM Buddy switch objective
//     => reset-all   => DM Buddy Course reset all progress
// ---------------------------------------------------------
// Get Query (page)
// [[ ?page= ]]
// ---------------------------------------------------------
//     => home        => DM Buddy Home Page
//     => ask         => DM Buddy Ask Buddy Page
//     => about       => DM Buddy About Page
//     => course      => Identify Course Type
//     => guide       => Identify Guide Type
// ---------------------------------------------------------
//
// ---------------------------------------------------------
// Get Query (page = course) (action)
// [[ ?page=course & action= ]]
// ---------------------------------------------------------
//     => continue    => Continue course
// ---------------------------------------------------------
// Get Query (page = course) (nav-cph) (nav-top)
// [[ ?page=course & nav-cph=x & nav-top=y ]]
// ---------------------------------------------------------
//     => y           => Go to y topic of x chapter
// ---------------------------------------------------------
// Get Query (page = course) (nav-cph) (action)
// [[ ?page=course & nav-cph=x & action= ]]
// ---------------------------------------------------------
//     => quiz        => DM Buddy chapter show quiz
//     => reset-quiz  => DM Buddy chapter reset quiz score
// ---------------------------------------------------------
//
// ---------------------------------------------------------
// Get Query (page = course) (nav-guide) (action)
// [[ ?page=guide & nav-guide=xyz & action= ]]
// ---------------------------------------------------------
//     => continue    => Continue xyz guide
// ---------------------------------------------------------
// Get Query (page = guide) (nav-guide) (nav-top)
// [[ ?page=guide & nav-guide=xyz & nav-top=y ]]
// ---------------------------------------------------------
//     => y           => Go to y topic of xyz guide
// ---------------------------------------------------------
// Get Query (page = guide) (nav-guide) (action)
// [[ ?page=guide & nav-guide=xyz & action= ]]
// ---------------------------------------------------------
//     => continue    => DM Buddy continue xyz guide
//     => quiz        => DM Buddy show quiz of xyz guide
//     => reset-quiz  => DM Buddy reset quiz score of xyz guide
// ---------------------------------------------------------
function start_script()                                     {
  // Check Objective
  obj_selected      = parseInt(Cookies.get("user_obj"));

  // -------------------------------------------------------
  // [Query] Navigation     =>  ( Check Page To Load  )
  // -------------------------------------------------------
  if($.get_query('page') != 0 && obj_selected > 0)          {
    // -----------------------------------------------------
    // Setting Up Walker
    // -----------------------------------------------------
    if(walker == undefined)                                 {
      set_walker('a' + obj_selected);
      return;
      }
    // -----------------------------------------------------
    // Navigation to course home page
    // -----------------------------------------------------
    if($.get_query('page') == 'home')                       {
      create_page('content-page','home');
      }
    // -----------------------------------------------------
    // Continue Course
    // -----------------------------------------------------
    else if($.get_query('page') == 'course')                {
      create_page('content-page','course');
      }
    // -----------------------------------------------------
    // Navigation to guide home page
    // -----------------------------------------------------
    else if($.get_query('page') == 'guide')                 {
      create_page('guide');
      }
    // -----------------------------------------------------
    // Continue Guide
    // -----------------------------------------------------
    else                                                    {
      create_page('error');
      }
    return;
    }
  // -------------------------------------------------------
  // [NO Query] Returning   =>  ( Session Restart     )
  // -------------------------------------------------------
  else if(obj_selected > 0)                                 {
    create_page('action-page','returning');
    return;
    }
  // -------------------------------------------------------
  // [NO Query] First Time   =>  ( Setup              )
  // -------------------------------------------------------
  else                                                      {
    obj_selected = 0;
    create_page('action-page','first-destination');
    return;
    }
   }
// ---------------------------------------------------------
// ON Load Function
// ---------------------------------------------------------
window.addEventListener('load', start_script());
// =========================================================
