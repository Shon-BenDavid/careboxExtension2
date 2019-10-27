import finder from '@medv/finder';

export function getSelector(selectorType, selectors) {
//TODO: may need to add case where the submit is type button instead of input
    let regex = '';
    let typeSubmit = false;

    switch (selectorType) {
        case "user":
            console.log("finding user")
            regex = new RegExp('log|user|mail', 'gi');
            break;
        case "pass":
            regex = new RegExp('pass', 'gi');
            break;
        case "submit":
            regex = new RegExp('submit', 'gi');
            typeSubmit = true;
            break;
        default:
            return;
    }

    let tempArr = [];
    for (let selector of selectors) {
        tempArr.push(selector)
    }

    const currNode = tempArr.find(function (selector) {

        if ((selector.name && selector.name.match(regex)) || (selector.id && selector.id.match(regex)))

            return true
    })

    return currNode ? finder(currNode) : "";


}