import {getSelector} from "../findSelector"

import finder from '@medv/finder';
// Unique ID for the className.
/*
let MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
console.log("sup world");
// Previous dom, that we want to track, so we can remove the previous styling.
let prevDOM = null;

// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', function (e) {
    let srcElement = e.srcElement;



    // Lets check if our underlying element is a IMG.
    if (prevDOM != srcElement && srcElement.nodeName == 'INPUT') {
        console.log("sshot me");
        // For NPE checking, we check safely. We need to remove the class name
        // Since we will be styling the new one after.
        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        }

        // Add a visited class name to the element. So we can style it.
        srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

        // The current element is now the previous. So we can remove the class
        // during the next ieration.
        prevDOM = srcElement;
        console.info(srcElement.currentSrc);
        console.dir(srcElement);
    }
}, false);
*/

/*

$(document).on("mouseover", "a", function (event) {
    var viewportwidth = document.documentElement.clientWidth;
    var viewportheight = document.documentElement.clientHeight;
    var data = { url: $(this).attr("href"), clientY: viewportwidth, clientX: viewportheight }
    if (data.url.indexOf("://") !== -1) sendMessage(data);
})

function sendMessage(data) {
  console.log("nmano")
    chrome.runtime.sendMessage(data);
}*/

const bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseover', function (e) {

    const srcElement = e.srcElement;

    const rect = srcElement.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);


    if (srcElement.nodeName == 'INPUT') {


        const currentElement = finder(srcElement)
        if (!currentElement) {
            return;
        }

        const message = {
            action: "getDB",

        }
        chrome.runtime.sendMessage(message, function (db) {


            let selector = 'SELECTOR UNDEF';
            if (db && db.login) {


                if (currentElement === db.login.userSelector) {
                    if (currentElement === db.login.passSelector) {
                        selector = "user error, defined as multiple selectors";
                    } else {
                        selector = "user selector is " + db.login.userSelector;
                    }

                } else if (currentElement === db.login.passSelector) {
                    selector = "pass selector is " + db.login.passSelector;
                } else if (currentElement === db.login.submitSelector) {
                    selector = "submit selector is " + db.login.submitSelector;
                }

                /*  switch (currentElement) {
                      case db.login.userSelector && db.login.passSelector:

                          break;
                      case db.login.userSelector:
                          selector = "user selector is " +  db.login.userSelector;
                          break;
                      case db.login.passSelector:
                          selector = "pass selector is " + db.login.passSelector;
                          break;
                      case db.login.submitSelector:
                          selector = "submit selector is " + db.login.submitSelector;
                          break;
                      default:
                          selector = currentElement;

                  }*/

            }

            renderBubble(rect.left, rect.top, selector);  // using static values for the display, someone that knows css could probably make this more fancy

        })


        /*    console.log(e)
            console.log(srcElement)*/


    }


}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mouseout', function (e) {
    bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
    // bubbleDOM.innerHTML = "save me";
    bubbleDOM.innerHTML = selection;
    bubbleDOM.style.top = mouseY + 'px';
    bubbleDOM.style.left = mouseX + 'px';
    bubbleDOM.style.visibility = 'visible';
}
