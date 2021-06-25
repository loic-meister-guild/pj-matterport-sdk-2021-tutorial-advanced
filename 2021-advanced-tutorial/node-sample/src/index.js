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

class Box {
    constructor() {
        this.inputs = {
            visible: false,
        };
    }

    onInit() {
        var THREE = this.context.three;
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial();
        var mesh = new THREE.Mesh(geometry, this.material);
        this.outputs.objectRoot = mesh;
    };

    onEvent(type, data) {
    }

    onInputsUpdated(previous) {
    };

    onTick(tickDelta) {
    }

    onDestroy() {
        this.material.dispose();
    };
}

function BoxFactory() {
    return new Box();
}

async function loadedShowcaseHandler(mpSdk) {

    // Registering the component with the sdk
    mpSdk.Scene.register('box', BoxFactory);
    const myComponentNode = await mpSdk.Scene.createNode();
    myComponentNode.addComponent('box');
    myComponentNode.start()

}