// /**
//  * Expand or close the sidebar in mobile screens.
//  */

// const $body = $('body');
// const ATTR_DISPLAY = 'sidebar-display';

// class SidebarUtil {
//   static isExpanded = false;

//   static toggle() {
//     if (SidebarUtil.isExpanded === false) {
//       $body.attr(ATTR_DISPLAY, '');
//     } else {
//       $body.removeAttr(ATTR_DISPLAY);
//     }

//     SidebarUtil.isExpanded = !SidebarUtil.isExpanded;
//   }
// }

// export function sidebarExpand() {
//   $('#sidebar-trigger').on('click', SidebarUtil.toggle);
//   $('#mask').on('click', SidebarUtil.toggle);
// }

/**
 * Expand or close the sidebar in mobile screens.
 */

$(function () {
  const sidebarUtil = (function () {
    const ATTR_DISPLAY = 'sidebar-display';
    let isExpanded = false;
    const body = $('body');

    return {
      toggle() {
        if (isExpanded === false) {
          body.attr(ATTR_DISPLAY, '');
        } else {
          body.removeAttr(ATTR_DISPLAY);
        }

        isExpanded = !isExpanded;
      }
    };
  })();

  // $('#sidebar-trigger').click(sidebarUtil.toggle);
  // $("#sidebar-trigger").click(function(){console.log("hello")})
  $('#sidebar-trigger').click(function () {
    console.log('hello');
    sidebarUtil.toggle();
  });

  $('#mask').click(sidebarUtil.toggle);
});
