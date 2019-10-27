import finder from '@medv/finder';

import {getSelector} from "./findSelector"

console.log("Chrome extension go?");

//code for making the automatic run

chrome.runtime.onMessage.addListener(gotScanMessage);

function gotScanMessage(message, sender, sendResponse) {


    // TODO - All this logic is within the if below!
    // scan --> start
    // on start
    // create initial step - type: siteLoad + url

    // find a way to send the event to bg page
    // bg page shall store step data at the DB

    // after that (after we have the first step!!)
    // use your amazing scanLoginData util function
    // in order to scan the current page for the required selectors
    // for the login (user, password, btn)
    // If found selector -->
    // send a new step event to the bg page
    if (message.action === "start") {

        console.log("stated")

        const url = document.activeElement.baseURI;
        let stepLoad = {
            loaded: true,
            url: url
        }
        let message = {
            action: "updateLoad",
            step: stepLoad
        }

        chrome.runtime.sendMessage(message);
        console.log("sent load")


        let selectors = document.querySelectorAll('input')//.filter(":input");

        const userSelector = getSelector("user", selectors);
        const passSelector = getSelector("pass", selectors);
        const submitSelector = getSelector("submit", selectors);

        /*
                const regexUser = new RegExp('log|user|mail', 'gi');  // add NOT "forget"
                const regexPass = new RegExp('pass', 'gi');
                const regexSubmit = new RegExp('submit', 'gi');




                      //todo: work around because find is only defined for arrays, can probably find a better way
                      let tempArr = [];
                      for (let selector of selectors) {
                          tempArr.push(selector)
                      }
                      //todo: prob need case switch


                    const user = tempArr.find(function (selector) {
                          if ((selector.name && selector.name.match(regexUser)) || (selector.id && selector.id.match(regexUser)))

                              return true
                      })
                      const userSelector = user ? finder(user): "";

                      const pass = tempArr.find(function (selector) {
                          if ((selector.name && selector.name.match(regexPass)) || (selector.id && selector.id.match(regexPass)))

                              return true
                      })
                      const passSelector = pass ? finder(pass): "";

                      const submit = tempArr.find(function (selector) {
                          if ((selector.name && selector.name.match(regexSubmit)) || (selector.id && selector.id.match(regexSubmit)))

                              return true
                      })
                      const submitSelector = submit ? finder(submit): "";
                      */

        if (userSelector || passSelector || submitSelector) {
            const stepLogin = {
                userSelector: userSelector,
                passSelector: passSelector,
                submitSelector: submitSelector
            }


            const message = {
                action: "updateLog",
                step: stepLogin
            }
            chrome.runtime.sendMessage(message)
            console.log("sent log")
        }
        console.log("ended")
        // console.log(user,pass,submit)


        /*  let btn1 = document.querySelectorAll('submit')  //must be a way to do a logical OR
          let btn2 = document.querySelectorAll('button')
          console.log("button1 :" ,btn1);
          console.log("button2 :" ,btn2);*/


        /*       chrome.storage.local.get(['data'], function (result) {

                   let data = result.data;
                   data.pageLoad = true;
                   data.url = url;
                   if (user) {
                       data.user = finder(user)
                   }
                   if (pass) {
                       data.pass = finder(pass)
                   }
                   if (submit) {
                       data.submitBtn = finder(submit);
                   }
                   chrome.storage.local.set({'data': data}, function () {
                       // Notify that we saved.
                       console.log('did this work?');
                   });
               })*/


    }
}


//code for making it run from the context menue
chrome.runtime.onMessage.addListener(gotEditMessage);

function gotEditMessage(message, sender, sendResponse) {
    if (message.action === "UpdateSelector") {


//todo: need to get somehow submit type, not sure how yet

        const element = document.activeElement;
        //  console.log(" the element is",element);
        const selector = finder(element);

        // console.log("the selector is ",selector)


        const form = element.closest('form');
        console.log("the selector is ", form);

        sendResponse(selector);

    }
}


////////////////
//     window.onload = function() {
//         // Listen for a message from dialog.js and send a response if needed.
//         chrome.runtime.onMessage.addListener((message, sender, response) => {
//             // Do stuff in your document.
//             document.body.style.backgroundColor = message.backgroundColor;
//         });
//     };


////////////////


// code for making it activate on double click
/*
window.addEventListener('dblclick', mouse);   // can make it so it only happens if a spesific button is pressed at the same time

function mouse(e) {
   console.log("hey listen")


    const selector = finder(e.target);
  //  console.log(selector)
    console.log("the tree is :",e);
    console.log("the target  is :",e.target);

    const url = e.toElement.baseURI;
    console.log(url)

   /!* for (let t in e.target)
    {
        console.log(t.)
    }*!/
//         const temp = e.target
//     console.log(e.path[0])
// /!*    for (let t in e){
//         console.log(t)
//     }*!/
//
//   //  const temp  = getString(e.target.tagName);
//     console.log("string is ",temp);
//     let end = temp.indexOf('.')
//
//
//
//     console.log("string is ",end);
//
//     let  selector = temp.substr(0, end);  // i mean works most of the time
//     console.log(selector)

    // console.log(document.activeElement.tagName);

/!*    const element = document.activeElement;

   // const clone = JSON.parse(JSON.stringify(element)); doesnt wrok

     let fieldnames =  element.getAttributeNames()   // this is pretty dirty stuff but atleast its universal
     let selectors  = [];                            // wish i could just clone the object as is :(
     for (let fname of fieldnames) {
         let selector = fname + "='" + element.getAttribute(fname) + "'";
         selectors.push(selector)
     }


//console.log(element.id,element.getAttribute("id"))

const attr = element.getAttribute("id");

  // chrome.runtime.sendMessage(selector);
*!/
}

*/
