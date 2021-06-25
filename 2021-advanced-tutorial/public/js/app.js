"use strict";

const sdkKey = "nsai8wcy6qwb4wfzh6k1u2mgc"
const modelSid = "22Ub5eknCVx";
const params = `m=${modelSid}&play=1&qs=1&log=0&applicationKey=${sdkKey}`;
const myComponentType = 'loic.my-component';

var iframe = document.getElementById('showcase');

document.addEventListener("DOMContentLoaded", () => {
    iframe.setAttribute('src', `/bundle/showcase.html?${params}`);
    iframe.addEventListener('load', () => showcaseLoader(iframe));
});

function showcaseLoader(iframe){
    try{
        iframe.contentWindow.MP_SDK.connect(iframe, sdkKey, '3.10')
        .then(loadedShowcaseHandler)
        .catch(console.error);
    } catch(e){
        console.error(e);
    }
}

async function loadedShowcaseHandler(mpSdk){

class MyComponent{
  constructor() {
    this.step = -0.1
    this.zPos = 0
  }
  onInit() {
    console.log('MyComponent.onInit()')
    const THREE = this.context.three;
    this.root = new THREE.Object3D();
    mpSdk.Scene.createNode().then((lights) =>{
      lights.addComponent('mp.lights');
      lights.start();
    });
  
    mpSdk.Scene.createNode().then((modelNode) =>{
      this.modelNode = modelNode
      const fbxComponent = this.modelNode.addComponent(mpSdk.Scene.Component.DAE_LOADER, {
        url: 'https://gitcdn.link/repo/mrdoob/three.js/dev/examples/models/collada/stormtrooper/stormtrooper.dae',
      });
    
      fbxComponent.inputs.localScale = {
        x: 0.3,
        y: 0.3,
        z: 0.3
      };
    
      this.modelNode.obj3D.position.set(0,-1.65,0);
    
      this.modelNode.obj3D.rotation.y = Math.PI
    
      this.modelNode.start();
    });
  }

  onEvent(interactionType, eventData) {
    console.log('MyComponent.onEvent()')
  }

  onInputsUpdated(oldInputs) {
    const THREE = this.context.three;
    console.log('MyComponent.onInputsUpdated()')

  }

  onTick(delta) {
    console.log('MyComponent.onTick()')
    if (this.zPos>= 1.8) {
      this.step = -0.002
    } else if (this.zPos <= -0.4) {
      this.step = 0.002
    }
    this.zPos += this.step
    this.modelNode.obj3D.rotation.y += 0.002;
    this.modelNode.obj3D.position.set(0,-1.65, this.zPos);
  }
}

const makeMyComponent = function() {
  return new MyComponent();
}

await mpSdk.Scene.register(myComponentType, makeMyComponent)
const test = await mpSdk.Scene.createNode();
test.addComponent(myComponentType);
test.start()

}