/*
function setup() {
    noCanvas();
    let userinput = select('#userinput');
   userinput.input(changeText);

   function changeText() {
        console.log("text changed");

        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            console.log("got tabs");
            console.log(tabs);
            // send a message to the content script
            let message = userinput.value();
            let msg = {
                txt: userinput.value()
            };
            chrome.tabs.sendMessage(tabs[0].id, msg);
        }






}
  }*/

/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "change_user") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }


    }
);*/

function continueScript() {
    newPopup('index.html');
}


window.onload = function () {
    var link = document.getElementById('link');
    link.addEventListener('click', () => {
        // Get active tab.
        chrome.tabs.query({active: true}, (activeTabs) => {
            const tabId = activeTabs[0].id;
            const message = {
                backgroundColor: 'green'
            };
            const responseCallback = (responseMessage) => {
                // do something with the response if any ...
            };
            // Send a message to the content script of the active tab.
            chrome.tabs.sendMessage(tabId, message, {}, responseCallback);
        });
    });
};