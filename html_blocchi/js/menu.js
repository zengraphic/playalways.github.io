jQuery(function($) {
    MENU = {

        ///////////////////////
        // Nav Levels Object //
        ///////////////////////

        navDomLevels: {
            0: {
                getElements: function() {
                    return $('.menu__modal--content-items > ul.menu__modal--item_list');
                },
                class: 'menu_level_0',
                active: false,
                label: ''
            },
            1: {
                getElements: function() {
                    return MENU
                        .navDomLevels[0]
                        .getElements()
                        .children("li")
                        .children("ul.menu__modal--item_list");
                },
                class: 'menu_level_1',
                active: false,
                label: ''
            },
            2: {
                getElements: function() {
                    return MENU
                        .navDomLevels[1]
                        .getElements()
                        .children("li")
                        .children("ul.menu__modal--item_list");
                },
                class: 'menu_level_2',
                active: false,
                label: ''
            },
            3: {
                getElements: function() {
                    return MENU
                        .navDomLevels[2]
                        .getElements()
                        .children("li")
                        .children("ul.menu__modal--item_list");
                },
                class: 'menu_level_3',
                active: false,
                label: ''
            },
            4: {
                getElements: function() {
                    return MENU
                        .navDomLevels[3]
                        .getElements()
                        .children("li")
                        .children("ul.menu__modal--item_list");
                },
                class: 'menu_level_4',
                active: false,
                label: ''
            }
        },
        initMenu: function() {

            /***************************************************************

            Class naming for menu DOM traversing, each ul slides up except
            the lower navigation level.

            ***************************************************************/

            $.each(this.navDomLevels, function(index, element) {
                element
                    .getElements()
                    .addClass(element.class);
                if (parseInt(index,10) !== 0) {
                    element
                        .getElements().not('.menu__modal--group-label > ul')
                        .slideUp(300, function() {
                            $('#menu .base__scrollable').getNiceScroll(0).resize();
                        });

                }
            });

            /***************************************************************

            Parent icon init

            ***************************************************************/

            $('.menu__modal--is-parent > a')
                .append('<i class="menu_parent_icon"></i>');


            /***************************************************************

            Navigation links binding function

            ***************************************************************/

            this.bindMenuLinks();
        },
        bindMenuLinks: function() {

            /***************************************************************

            Binding click function to icon to prevent event default
            only for sliding links.

            ***************************************************************/


            $(".menu__modal")
                .on('click','.menu__modal--content-items a i', function(event){

                    var menuLink = $(this).parent();

                    if (menuLink.siblings('ul').length > 0) {
                        event
                            .preventDefault();                        

                        /***************************************************************

                        Call link processing function:

                        -- menuLink : clicked menu link passed to function as parameter.

                        ***************************************************************/

                        MENU
                            .processLink(menuLink, false);
                    }
            });
        },


        processLink: function(menuLink, isBackButton) {

            /***************************************************************

            Link processing function getting clicked link as parameter:

            PHASE 1:
            -- menuList : menu list next to menuLink.

            PHASE 2:
            If the clicked link is already opened, automatically slides up
            clicked tab and its descendants, if not, slides down current link.

            PHASE 3:
            Match navigation level function

            ***************************************************************/

            /***** PHASE 1 *****/

            var menuList = menuLink.siblings('ul');
            var breadcrumbs = $('.back__breadcrumbs--modal');

            /***** PHASE 2 *****/

            if (menuList.hasClass('opened')) {
                if (!isBackButton) {
                    menuList
                        .removeClass('opened')
                        .slideUp(300, function() {
                            $('#menu .base__scrollable')
                                .getNiceScroll(0)
                                .resize();
                        });
                    menuList
                        .parent('.menu__modal--is-parent')
                        .removeClass('slideOpened');
                }
                menuList
                    .find('.opened')
                    .removeClass('opened')
                    .slideUp(300, function() {
                        $('#menu .base__scrollable')
                            .getNiceScroll(0)
                            .resize();
                    });
                menuList
                    .find('.menu__modal--is-parent')
                    .removeClass('slideOpened');
            } else {
                var menuListRoot = menuList.parents('.opened');
                var menuListRootParents = menuList.parents('.slideOpened');
                $('.opened')
                    .not(menuListRoot)
                    .removeClass('opened')
                    .slideUp(300, function() {
                        console.log('ok');
                        $('#menu .base__scrollable').getNiceScroll(0).resize();
                    });
                $('.slideOpened')
                    .not(menuListRootParents)
                    .removeClass('slideOpened');
                menuList
                    .addClass('opened')
                    .slideDown(300, function() {
                        console.log('ok');
                        $('.base__scrollable').getNiceScroll(0).resize();
                    });
                menuList
                    .parent('.menu__modal--is-parent')
                    .addClass('slideOpened');
            }

            /***** PHASE 3 *****/

            this.matchNavigationLevel(menuLink, menuList, breadcrumbs);

        },
        matchNavigationLevel: function(menuLink, menuList, breadcrumbs) {

            /***************************************************************

            Navigation level matching function

            Cycles through menu levels to match current one, then triggers
            breadcrumbs dynamics, to clear, insert current, and build
            breadcrumbs section.

            ***************************************************************/

            for (var levelNumber = 1; levelNumber < 5; levelNumber++) {
                if (menuList.hasClass('menu_level_' + levelNumber)) {
                    this.clearBreadcrumbs(levelNumber, breadcrumbs);
                    this.insertBreadcrumbs(levelNumber, menuLink);
                    this.buildBreadcrumbs(levelNumber, menuLink, breadcrumbs);
                }
            }
        },
        clearBreadcrumbs: function(levelNumber, breadcrumbs) {

            /***************************************************************

            Breadcrumbs clearing function getting navigation level and
            breadcrumbs dom object as parameters.

            PHASE 1:
            Removes all existing breadcrumbs.

            PHASE 2:
            Cycles through navigation levels object from current to the highest,
            setting the navigation level to not-active
            and clearing level label value.

            ***************************************************************/

            /***** PHASE 1 *****/

            breadcrumbs.children().remove();

            /***** PHASE 2 *****/

            for (levelNumber; levelNumber < 5; levelNumber++) {
                var levelToClear = this.navDomLevels[levelNumber];
                levelToClear.active = false;
                levelToClear.label = '';
            }
        },
        insertBreadcrumbs: function(levelNumber, menuLink) {

            /***************************************************************

            Breadcrumbs insertion function getting navigation level and
            clicked menu link as parameters.

            Matches proper navigation level inside navigation level object,
            then sets navigation level to active and label with proper text

            ***************************************************************/

            var levelToFill = this.navDomLevels[levelNumber];
            levelToFill.active = true;
            levelToFill.label = menuLink.text();
        },
        buildBreadcrumbs: function(levelNumber, menuLink, breadcrumbs) {

            /***************************************************************

            Breadcrumbs building function getting navigation level,
            clicked menu link and breadcrumbs dom object as parameters.

            PHASE 1:
            Cycles through all navDomLevels object to match active levels,
            if true inits breadcrumb types to append.
            Base level adds breadcrumb without the slash,
            else if it is a deeper level inits gradient and menu back button,
            finally if it's last breadcrumb adds a non linked element.

            PHASE 2:
            If first navigation level manages to remove back button and
            gradient, for deeper levels moves the breadcrumb element to left.

            ***************************************************************/

            /***** PHASE 1 *****/

            $.each(this.navDomLevels, function(index, element) {
                if (element.active) {
                    var prevBreadcrumb = '<li><span>/</span><a data-label="' + element.label + '" >' + element.label + '</a></li>';
                    var currentBreadcrumb = '<li><span>/</span><span data-label="' + element.label + '" >' + element.label + '</span></li>';
                    if (index == 1) {
                        breadcrumbs.append('<li><a data-label="' + element.label + '" >' + element.label + '</a></li>');
                    } else {
                        if (index == levelNumber) {
                            breadcrumbs.append(currentBreadcrumb);
                        } else {
                            breadcrumbs.append(prevBreadcrumb);
                        }
                        MENU.initBreadcrumbs(levelNumber, menuLink, breadcrumbs);
                    }
                }
            });

            /***** PHASE 2 *****/

            if (levelNumber == 1) {
                $('.back__breadcrumbs')
                    .removeClass('breadGradient');
                $('.menu_back_btn')
                    .remove();
                breadcrumbs
                    .css({ 'left': '0' });
            } else if (levelNumber == 2) {
                breadcrumbs
                    .css({ 'left': '-5%' });
            } else if (levelNumber == 3) {
                breadcrumbs
                    .css({ 'left': '-15%' });
            } else if (levelNumber == 4) {
                breadcrumbs
                    .css({ 'left': '-45%' });
            }
        },

        /***************************************************************

        Breadcrumbs init function for back button, gradient and position,
        getting navigation level, clicked menu link and breadcrumbs
        dom object as parameters.

        Adds gradient to breadcrumbs container, removes previous buttons
        and appends the right one, and binds click function to trigger
        link processing function from upper navigation level,
        with navigation and breadcrumbs update.

        ***************************************************************/

        initBreadcrumbs: function(levelNumber, menuLink, breadcrumbs) {
            var backButton = '<a class="btn_more menu_back_btn" style="cursor:pointer" data-parent="' + this.navDomLevels[levelNumber - 1].label + '"><i class="fa fa-angle-left"></i></a>';

            $('.back__breadcrumbs').addClass('breadGradient');

            $('.menu_back_btn').remove();
            breadcrumbs.closest('.back__breadcrumbs').prepend(backButton);

            $('.menu_back_btn').click(function() {
                var target = menuLink.parents('.menu__modal--is-parent').eq(1);
                var targetLink = target.children('a');
                MENU.processLink(targetLink, true);
            });
        },

    };
});

/***************************************************************

FIRE MENU INITIALIZATION

***************************************************************/

jQuery(document).ready(function($) {
    MENU.initMenu();
});
