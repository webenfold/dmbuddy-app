/**
 * @package webenfoldtheme
 * JAVASCRIPT:  Core JS
 * Description: Important template functions.
 */

//◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
//◯	Main Template
//◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯


// ================================================================
// Main Template: Header Function
// ================================================================
// Header >> Menu Functions
function ht1_menu()                                             {
    $('ripple span').css('opacity', '0');


    // Open Menu
    // ------------------------------------------------------------
    function openMenu()                                         {
        $('#smart-container').animate({
            opacity: 0
        }, 200, function () {
            closeSearch();
            $(this).css('visibility', 'hidden');

            $('#drawer-text').css('background-color', '#C0392B');
            $('#ht1-head').css({
                'top': '0',
                'background-color': 'rgba(44,62,80,1)'
            });
            $('#drawer-button').css({
                'height': '50px',
                'background-color': 'rgba(0,0,0,0.2)'
            });
            $('#ht1-head, #logo-minimal, #smart-nav, #search-button').css('height', '50px');
            $('#logo-img').css('height', '42px');
            $('#drawer-text').css('line-height', '50px');

            $('#ht1-nav').addClass('droping');
            $('#ht1-nav').addClass('droped');
            $('#ht1-nav').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                $('#ht1-nav').removeClass('droping');
                $('#drawer-text').html('<i class="icon-menu-close"></i> MENU');
                $('#drawer-text').one('click', function () {
                    setTimeout(closeMenu, 100);
                    var childElement = $(this).children('i');
                    loadingSpinner(childElement);
                });

                $('ripple span').css('opacity', '').addClass('gas_class');
            });
        });
        }
    // ------------------------------------------------------------
    // Close Menu
    // ------------------------------------------------------------
    function closeMenu()                                        {
        $('ripple span').stop( true, true ).css('opacity', '0.5').animate({
            opacity: 0
        }, 200, function () {
            $(this).removeClass('gas_class');
        });

        $('#smart-container').animate({
            opacity: 1
        }, 200, function () {
            $(this).css('visibility', 'visible');
            $('#ht1-nav').addClass('falling');

            $('#drawer-text').css('background-color', '');
            $('#ht1-head').css({
                'top': '',
                'background-color': ''
            });
            $('#drawer-button').css({
                'height': '',
                'background-color': ''
            });
            $('#ht1-head, #logo-img, #logo-minimal, #smart-nav, #search-button').css('height', '');
            $('#drawer-text').css('line-height', '');

            $('#ht1-nav').removeClass('droped');
            $('#ht1-nav').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
                $('#ht1-nav').removeClass('falling');
                $('#drawer-text').html('<i class="icon-menu"></i> MENU');
                $('#drawer-text').one('click', function () {
                    setTimeout(openMenu, 100);
                    var childElement = $(this).children('i');
                    loadingSpinner(childElement);
                });
            });
        });
        }
    // ------------------------------------------------------------
    // Open menu first time
    $('#drawer-text').one('click', function ()                   {
        setTimeout(openMenu, 10);
        var childElement = $(this).children('i');
        loadingSpinner(childElement);
        });
    // ------------------------------------------------------------


    // Open Search
    // ------------------------------------------------------------
    function openSearch()                                       {
        $('#ht1-search-base').css({
            top: '60px',
            opacity: '1'
        }).each(function () {
            $('#toolBar').css('backgroundColor', 'rgba(44,62,80,1)');
            $('#ht1-main').css('backgroundColor', 'rgba(44,62,80,1)');
            $('#drawer-button').css('backgroundColor', 'rgba(0,0,0,0.2)');
        }).delay(300).queue(function () {
            //Change Search Button Text
            $('#search-text').html('<i class="icon-menu-close"></i> Search');
            //Setting one click event on Search Button
            $('#search-text').one('click', function () {
                setTimeout(closeSearch, 300);
                var childElement = $(this).children('i');
                loadingSpinner(childElement);
            });
            //dequeue
            $(this).dequeue();
        });
        }
    // ------------------------------------------------------------
    // Close Search
    function closeSearch()                                      {
        $('#ht1-search-base').css({
            top: '',
            opacity: '0'
        }).each(function () {
            $('#toolBar').css('backgroundColor', '');
            $('#ht1-main').css('backgroundColor', '');
            $('#drawer-button').css('backgroundColor', '');
        }).delay(300).queue(function () {
            //Change Search Button Text
            $('#search-text').html('<i class="icon-search"></i> Search');
            //Setting one click event on Search Button
            $('#search-text').one('click', function () {
                setTimeout(openSearch, 300);
                var childElement = $(this).children('i');
                loadingSpinner(childElement);
            });
            //dequeue
            $(this).dequeue();
        });
        }
    // ------------------------------------------------------------
    // Open search first time
    $('#search-text').one('click', function ()                  {
        try {
            customSearchEngine();
        } catch (err) {}
        setTimeout(openSearch, 300);
        var childElement = $(this).children('i');
        loadingSpinner(childElement);
        });
    // ------------------------------------------------------------


    // Header >> Nav Menu Delay
    // ------------------------------------------------------------
    $('#ht1-nav .navLinks').on('click', function (e)            {
        e.preventDefault();

        // Checking condition that button has href attribute
        if ($(this).attr('href')) {

            var link = $(this).attr('href');

            setTimeout(closeMenu, 100);
            var childElement = $('#drawer-text').children('i');
            loadingSpinner(childElement);

            // Navigating window to link after 0.5 miliseconds
            setTimeout(function () {
                window.location.href = link;
            }, 1000);
        }
        });
    // ------------------------------------------------------------
    }
// ----------------------------------------------------------------
// Header >> Menu Ripple Effect Functions
function ht1_ripple()                                           {
    try                                                         {
        var ripple  = document.getElementsByTagName('ripple' )[0];
        var rippleA = ripple.getElementsByClassName('rippleA')[0];
        var rippleB = ripple.getElementsByClassName('rippleB')[0];
        var rippleC = ripple.getElementsByClassName('rippleC')[0];
        var rippleD = ripple.getElementsByClassName('rippleD')[0];
        var rippleE = ripple.getElementsByClassName('rippleE')[0];
        var rippleF = ripple.getElementsByClassName('rippleF')[0];
        var final_size;

        var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 

        var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if(window_height > window_width){
            final_size = window_height;
        }else{
            final_size = window_width;
        }

        ripple.style.width = (final_size)  + 'px';
        ripple.style.height = (final_size) + 'px';

        rippleA.style.width = (final_size * 0.5) + 'px';
        rippleA.style.height = (final_size * 0.5) + 'px';
        rippleA.style.marginBottom = '-' + ((final_size * 0.5) * 0.5 ) + 'px';
        rippleA.style.marginRight = '-' + ((final_size * 0.5) * 0.5 ) + 'px';

        rippleB.style.width = (final_size * 1) + 'px';
        rippleB.style.height = (final_size * 1) + 'px';
        rippleB.style.marginBottom = '-' + ((final_size * 1) * 0.5 ) + 'px';
        rippleB.style.marginRight = '-' + ((final_size * 1) * 0.5 ) + 'px';

        rippleC.style.width = (final_size * 1.5) + 'px';
        rippleC.style.height = (final_size * 1.5) + 'px';
        rippleC.style.marginBottom = '-' + ((final_size * 1.5) * 0.5 ) + 'px';
        rippleC.style.marginRight = '-' + ((final_size * 1.5) * 0.5 ) + 'px';

        rippleD.style.width = (final_size * 2) + 'px';
        rippleD.style.height = (final_size * 2) + 'px';
        rippleD.style.marginBottom = '-' + ((final_size * 2) * 0.5 ) + 'px';
        rippleD.style.marginRight = '-' + ((final_size * 2) * 0.5 ) + 'px';

        rippleE.style.width = (final_size * 2.5) + 'px';
        rippleE.style.height = (final_size * 2.5) + 'px';
        rippleE.style.marginBottom = '-' + ((final_size * 2.5) * 0.5 ) + 'px';
        rippleE.style.marginRight = '-' + ((final_size * 2.5) * 0.5 ) + 'px';

        rippleF.style.width = (final_size * 3) + 'px';
        rippleF.style.height = (final_size * 3) + 'px';
        rippleF.style.marginBottom = '-' + ((final_size * 3) * 0.5 ) + 'px';
        rippleF.style.marginRight = '-' + ((final_size * 3) * 0.5 ) + 'px';
        }
    catch(err){}
    }
// ----------------------------------------------------------------
// Header >> Automatically collapse based on scroll
function header_scroll()                                        {
    // After 200px - Control Color
    // ------------------------------------------------------------
    var topbar300 = new Waypoint                                ({
        element: document.getElementById('website-body'),
        handler: function (direction)                           {
            if (direction == 'down')                            {
                try {$('#ht1-head').addClass('iScrolled');}
                catch (err) {}
                }
            if (direction == 'up')                              {
                try {$('#ht1-head').removeClass('iScrolled');}
                catch (err) {}
                }
            },
        offset: -300
        });
    // ------------------------------------------------------------
    // After 800px - Control main header collapsing
    // ------------------------------------------------------------
    var topbar1200 = new Waypoint                               ({
        element: document.getElementById('website-body'),
        handler: function (direction)                           {
            if (direction == 'down')                            {
                try                                             {
                    $('#ht1-head').addClass('collapsed');

                    document.getElementById('back2top').style.width = '45px';
                    document.getElementById('back2top').style.opacity = '1';

                    document.getElementById("ht1-search-base").style.marginTop = '-10px';
                    }
                catch (err) {}
                }
            if (direction == 'up')                              {
                try                                             {
                    $('#ht1-head').removeClass('collapsed');

                    document.getElementById('back2top').style.width = '0';
                    document.getElementById('back2top').style.opacity = '0';

                    document.getElementById("ht1-search-base").style.marginTop = '0';
                }
                catch (err) {}
                }
            },
        offset: -800
        });
    // ------------------------------------------------------------
    }
// ----------------------------------------------------------------
// Smart Menu: Smart Line
function smart_line()                                           {
    var $mainNav    = $("#smart-nav-group");
    var $magicLine  = $("#smartLine");
    var $el, leftPos, newWidth;

    // check is there any navigation link
    // ------------------------------------------------------------
    if ($('#smart-nav-group li a').length)                      {
        // Add smart-line element
        if (!$('#smartLine').length)                            {
            $mainNav.append("<li id='smartLine' class='smartLine'></li>");
            }
        // Setup Magic Line - AKA "smart-line"
        $magicLine.width                                        (
            $("#smart-nav-group .active").width()
        ).css                                                   (
            "left", $("#smart-nav-group .active a").position().left
        ).data                                                  (
            "origLeft", $magicLine.position().left
        ).data                                                  (
            "origWidth", $magicLine.width()
        );
        }
    // ------------------------------------------------------------

    // smart-line - Hover Function
    // ------------------------------------------------------------
    $("#smart-nav-group li a").hover                            (
        function ()                                             {
            $el = $(this);
            leftPos = $el.position().left;
            newWidth = $el.parent().width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        },
        function ()                                             {
            $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
            });
        }
        );
    // ------------------------------------------------------------
    }
// ----------------------------------------------------------------
// Smart Menu
function smart_menu()                                           {
    smart_line();

    try {
        // Cache selectors
        var lastId;
        var topMenu = $("#smart-nav-group");
        var topMenuHeight = topMenu.outerHeight() + 60;
        var menuItems = topMenu.find("a"); // Anchors corresponding to menu items

        var scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

        //Update Smart Nav
        function updateSmartNav() {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop) return this;
            });

            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                //Check if id is empty
                if (!id == "") {
                    //Stop Smart underlining on hover
                    $("#smart-nav-group li a").off();

                    // Set/remove active class in case ID changes
                    menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");

                    //Update Smart Nav elements only when active menu changes
                    var $magicLine = $("#smartLine");
                    $("#smart-nav-group [href='#" + id + "']").each(function () {
                        $el = $(this);
                        var leftPos = $el.position().left;
                        var newWidth = $el.parent().width();
                        $magicLine.stop().animate({
                            left: leftPos,
                            width: newWidth
                        });
                    });

                    //Start Underlining on hover
                    smart_line();
                    smooth_scroll_link(); //Mercury Librairies Function
                    ripple_effect(); //Mercury Librairies Function
                }
            }
        }

        // Bind to scroll
        var scrolled = false;
        window.onscroll = runThisFunction;

        function runThisFunction() {
            scrolled = true;
        }
        setInterval(function () {
            if (scrolled) {
                scrolled = false;
                updateSmartNav();
            }
        }, 150);

    } catch (err) {
        console.log(err);
    } finally {
        //One time
        updateSmartNav();
        smart_line();
    }
    }
// ----------------------------------------------------------------
// Smart Menu: Initialization
function smart_menu_int()                                       {
    var smartMenu = "";
    var smartMenuItemArray = null;

    //  Find element menu to push
    // ------------------------------------------------------------
    try                                                         {
        smartMenuItemArray = document.getElementsByClassName('menuPush');
        }
    catch (err){}
    // ------------------------------------------------------------

    // Creating "Menu Object"
    // ------------------------------------------------------------
    if (smartMenuItemArray !== null)                             {
        for (i = 0; i < smartMenuItemArray.length; i++) {

            // Break At third loop
            if (i >= 3)     {break;}

            var menuItemTitle, menuItemLink, isActive;
            menuItemTitle = smartMenuItemArray[i].getAttribute("name");
            menuItemLink = smartMenuItemArray[i].id;

            // Set Active Menu Item
            if (i === 0)     {isActive = "active";}
            else            {isActive = "";}

            smartMenu = smartMenu + '<li class="' + isActive + '"><a class="smartMenuItem ripple scroll" title="' + menuItemTitle + '" href="#' + menuItemLink + '">' + menuItemTitle + '</a></li>';
            }
        }
    // ------------------------------------------------------------

    // Create Smart Menu From "Menu Object"
    // ------------------------------------------------------------
    $('#pre-loaded').animate({opacity: 0}, 300, function ()     {
        try                                                     {
            document.getElementById('smart-nav-group').innerHTML = smartMenu;
            }
        catch(err){}
        });
    // ------------------------------------------------------------

    // Calling Other Essential Functions
    // ------------------------------------------------------------
    setTimeout(function()                                       {
        smart_menu();
        smooth_scroll_link();
        ripple_effect();
        },300);
    // ------------------------------------------------------------
    }
// ----------------------------------------------------------------


// ================================================================
// Main Template: Intro Function [headerMenu = ht1_menu]
// ================================================================
// Intro: Icon Grid
function icon_grid()                                            {
    //Round Off Function
    function round2(x) {
        return Math.ceil(x / 2) * 2;
    }

    // Variables
    var igElement = null;
    var igWidth = null;
    var igHeight = null;
    //Check for Elements
    try {
        igElement = document.getElementById('iconGrid');
        igWidth = parseInt(document.getElementsByTagName('body')[0].offsetWidth, 10);
        igHeight = parseInt(document.getElementById('ig-intro').offsetHeight, 10);
    } catch (err) {}

    //Create Icon Grid with random icons
    if (igElement !== null && igHeight !== null) {
        var nhBox, nvBox; //Number of Horizontal & Vertical boxes
        var totalBoxes; //Total Number of boxes parent & Child
        var parentBoxArray = '', counterX;
        //Expanding igWidth
        igWidth = igWidth / 100;
        igWidth = round2(igWidth) + 2;
        //Setting igElement width & height
        igElement.style.width = igWidth * 100 + "px";
        igElement.style.height = igHeight + "px";
        //Expanding igHeight
        igHeight = igHeight / 100;
        igHeight = round2(igHeight) + 2;
        //Filling grid
        //calculate number of parent boxes required to fill the grid
        nhBox = igWidth / 2;
        nvBox = igHeight / 2;
        totalBoxes = nhBox * nvBox; //totalBoxes => Repersents number
        //Creating Parent Box Array
        for (i = 0; i < totalBoxes; i++) {
            parentBoxArray = parentBoxArray + '<span class="igPb"></span>';
        }
        //Inseting Parent Boxes into DOM
        document.getElementById('iconGrid').innerHTML = parentBoxArray;
        //Total boxes of parent inserted  //totalBoxes => Repersents Parent Box
        totalBoxes = document.getElementsByClassName('igPb');
        //Inseting Child Boxes into DOM
        for (i = 0; i < totalBoxes.length; i++) {
            totalBoxes[i].innerHTML = '<span class="igCb"></span><span class="igCb"></span><span class="igCb"></span><span class="igCb"></span>';
        }
        //Total child boxes inserted      //totalBoxes => Repersents Child Box
        totalBoxes = document.getElementsByClassName('igCb');
        //Inseting Icons into DOM
        for (i = 0; i < totalBoxes.length; i++) {
            //Special counter with skipping duplicate contents
            function count() {
                var xTemp = Math.floor((Math.random() * 10));
                if (xTemp == counterX) {
                    count();
                } else {
                    counterX = xTemp;
                }
            }
            count();
            // Local Variables
            var yTemp = null;
            //Selection based on random number
            switch (counterX) {
                case 0:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-b' + yTemp + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 1:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-b' + yTemp + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 2:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-b' + yTemp + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 3:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-b' + yTemp + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-b' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 4:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-c' + yTemp + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 5:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-c' + yTemp + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 6:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    if (yTemp >= 7) {
                        yTemp = 6;
                    }
                    totalBoxes[i].innerHTML = '<i class="igIs ic-c' + yTemp + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 1) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 2) + '"></i>' +
                        '<i class="igIs ic-c' + (yTemp + 3) + '"></i>';
                    yTemp = null;
                    break;

                case 7:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    totalBoxes[i].innerHTML = '<i class="igIl ic-a' + yTemp + '"></i>';
                    yTemp = null;
                    break;

                case 8:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    totalBoxes[i].innerHTML = '<i class="igIl ic-a' + yTemp + '"></i>';
                    yTemp = null;
                    break;

                case 9:
                    //Second Counter
                    yTemp = Math.floor((Math.random() * 10));
                    totalBoxes[i].innerHTML = '<i class="igIl ic-a' + yTemp + '"></i>';
                    yTemp = null;
                    break;

                default:
                    break;
            }
        }
        //Nullifying the variables
        parentBoxArray = null;
        totalBoxes = null;
        //Setting-Up DOM Content Finally
        function showig() {
            $('#iconGrid, #particles').css('opacity', '1');
        }
        setTimeout(showig, 1000);
    }
    return null;
    }
// ----------------------------------------------------------------


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Main Template Function Sequence
function main_temp_seq()                                        {
    ht1_menu();
    smart_menu_int();
    ht1_ripple();
    header_scroll();
    icon_grid();
    section_nav();
    sticky_sidebar();
    }
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯
//◯	Modern Template
//◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯


// ================================================================
// Modern Template: Header Function
// ================================================================
// Header Menu Drawer
function ht3_menu_drawer()                                      {
    var ele_button      = $('#drawer-button');
    var ele_shifter_1   = $('.ht3 #right-nav');
    var ele_shifter_2   = $('.ht3 .body-content');

    ele_button.toggle(
        function () {
            ele_shifter_1.addClass('shifted');
            ele_shifter_2.addClass('shifted').on('click', function(){
                ele_shifter_1.removeClass('shifted');
                ele_shifter_2.removeClass('shifted');
                ele_button.off();
                ht3_menu_drawer();
            });
        },
        function () {
            ele_shifter_1.removeClass('shifted');
            ele_shifter_2.removeClass('shifted');
        }
    );
    }
// ----------------------------------------------------------------
// Header Side Menu Functions
function ht3_side_nav()                                         {
    // Variables
    var ele_parent  = $('nav .menu-item-has-children');
    var ele_sub_menu = $('nav .menu-item-has-children .sub-menu');

    // Set number of element in Data Attribute [data-ele]
    ele_sub_menu.attr("data-ele", function(){
        return $(this).children('li').length;
    });

    // Expand Menu
    ele_parent.toggle(
        function () {
            $(this).addClass('dropped').children('.sub-menu').css('height', function(){
                return ($(this).attr("data-ele") * 40);
            });
        },
        function () {
            $(this).removeClass('dropped').children('.sub-menu').css('height', 0);
        }
    );
    }
// ----------------------------------------------------------------
// Header Menu Location Update - Responsive
function ht3_header()                                           {
    var menu_head   = $('#header-menu');
    var menu_side   = $('nav .nav-base-mobile');
    var menu_data   = menu_side.html();
    var loc_updated = true;

    try                                                         {
        function update_menu_loc()                              {
            setTimeout(function(){
                var window_width = $( window ).width();

                if(window_width > 768 &&
                loc_updated &&
                menu_data){
                    menu_head.html(menu_data);
                    menu_side.css('display', 'none');
                    menu_head.css('display', '');
                    menu_data = false;
                    loc_updated = false;
                }

                else if(window_width > 768 &&
                loc_updated && !(menu_data)){
                    menu_side.css('display', 'none');
                    menu_head.css('display', '');
                    loc_updated = false;
                    loc_updated = false;
                }

                else if(window_width < 768){
                    menu_side.css('display', '');
                    menu_head.css('display', 'none');
                    loc_updated = true;
                }
            }, 150);
            }
        // Run Once
        update_menu_loc();
        // Bind on Resize
        $( window ).resize(update_menu_loc);
        }
    catch(err){}
    finally                                                     {
        ht3_menu_drawer();
        ht3_side_nav();
        }
    }
// ----------------------------------------------------------------


// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// WKH Template Function Sequence
function modern_temp_seq()                                      {
    ht3_header();
    }
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
