"use strict";

const sdkKey = "nsai8wcy6qwb4wfzh6k1u2mgc"
const modelSid = "22Ub5eknCVx";
const params = `m=${modelSid}&play=1&qs=1&log=0&applicationKey=${sdkKey}`;

var iframe = document.getElementById('showcase');

document.addEventListener("DOMContentLoaded", () => {
    iframe.setAttribute('src', `/bundle/showcase.html?${params}`);
    iframe.addEventListener('load', () => showcaseLoader(iframe));
});

function showcaseLoader(iframe) {
    try {
        iframe.contentWindow.MP_SDK.connect(iframe, sdkKey, '3.10')
            .then(loadedShowcaseHandler)
            .catch(console.error);
    } catch (e) {
        console.error(e);
    }
}

async function loadedShowcaseHandler(mpSdk) {
    const cursorNode = await mpSdk.Scene.createNode();
    const cursor = cursorNode.addComponent('mp.cursor');

}