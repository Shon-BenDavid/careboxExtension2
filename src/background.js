console.log('background running');

import stepsDB from "./stepsDb";
//we can put default extension behavior here
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("clicked")
    let msg = {
        txt: "hello",
        url: tab.url
    }

    // chrome.tabs.sendMessage(tab.id, msg);
}

/*
window.data = {
  stepType: "", //see how to enum this
  pageLoad: false,
  url: '',
  user: '',
  pass: '',
  submitType: ''
}
*/
// code for selecting manually
let db;


chrome.runtime.onInstalled.addListener(function () {

    db = new stepsDB();

    /*
      let data = {
        stepType: "", //see how to enum this
        pageLoad: false,
        url: '',
        user: '',
        pass: '',
        submitBtn: '',
        submitType: ''
      }

    */


    /*  chrome.storage.local.set({'data': data}, function() {
        // Notify that we saved.
        console.log('Settings saved');
      });*/
    chrome.contextMenus.create({
        id: "menu",
        title: "change selection",
        contexts: ["editable", "page"],
    });

    chrome.contextMenus.create({
        id: "user",
        title: "change user selector",
        contexts: ["editable"],
        parentId: "menu",
        onclick: e => {
            editLogSelector("user")
        }
    });

    chrome.contextMenus.create({
        id: "pass",
        title: "change password selector",
        contexts: ["editable"],
        parentId: "menu",
        onclick: e => {
            editLogSelector("pass")
        }
    });

    chrome.contextMenus.create({
        id: "submitBtn",
        title: "change submit selector",
        contexts: ["page"],
        parentId: "menu",
        onclick: e => {
            editLogSelector("submit")

        }
    });

    chrome.contextMenus.create({
        id: "display",
        title: "display current data",
        contexts: ["browser_action"],
//todo: add UI
        onclick: e => {
            console.log(db)
        }
    });

    chrome.contextMenus.create({
        id: "start",
        title: "scan current site",
        contexts: ["browser_action"],

        onclick: e => {
            let message = {
                action: "start"
            }
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message)
            })
        }
    });


    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == "updateLoad") {
            db.addSiteLoad(message.step)
        }
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == "updateLog") {
            db.addLogin(message.step)
        }
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == "getDB") {
            sendResponse(db.getData())
        }
    });


});


function editLogSelector(selectorField) {
    let message = {
        action: "UpdateSelector"
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (res) {

            //todo:   if(!db.loginDataExists())


            switch (selectorField) {
                case "user":
                    db.updateUser(res)
                    break;
                case "pass":
                    db.updatePass(res)
                    break;
                case "submit":
                    db.updateSubmit(res)
                    break;
            }
        })
    })
}


/*function sendM()
{
  chrome.tabs.query({active: true,currentWindow:true},function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id,message)
  })
}*/


/*
function gotTabs (tabs){
 // console.log("the tab id is: ",tabs[0].id);
  chrome.tabs.sendMessage(tabs[0].id,"user")
}

*/


/*
chrome.runtime.onMessage.addListener(reciver);




function reciver(request ,sender , sendResponse) {

  console.log(request)

}

*/
