"use strict";

const sdkKey = "nsai8wcy6qwb4wfzh6k1u2mgc"
const modelSid = "iL4RdJqi2yK";
const params = `m=${modelSid}&help=0&play=1&qs=1&gt=0&hr=0`;

var iframe = document.getElementById('showcase');
let tag;
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
  console.log(mpSdk.Scene.serialize())
  mpSdk.Room.data.subscribe({
    onCollectionUpdated: function (collection) {
      console.log('Collection received. There are ', Object.keys(collection).length, 'rooms in the collection', collection);
    }
  });
  mpSdk.Floor.data.subscribe({
    onCollectionUpdated: function (collection) {
      console.log('Collection received. There are ', Object.keys(collection).length, 'floors in the collection', collection);
    }
  });
  mpSdk.Model.getDetails()
  .then(function(modelDetails) {
    // Model details retreival complete.
    console.log('Model sid:' + modelDetails.sid);
    console.log('Model name:' + modelDetails.name);
    console.log('Model summary:' + modelDetails.summary);
  })
  .catch(function(error) {
    // Model details retrieval error.
  });
  const lights = await mpSdk.Scene.createNode();
  lights.addComponent('mp.lights');
  lights.start();

  const modelNode = await mpSdk.Scene.createNode();
  const fbxComponent = modelNode.addComponent(mpSdk.Scene.Component.DAE_LOADER, {
    url: 'https://gitcdn.link/repo/mrdoob/three.js/dev/examples/models/collada/stormtrooper/stormtrooper.dae',
  });

  fbxComponent.inputs.localScale = {
    x: 0.3,
    y: 0.3,
    z: 0.3
  };

  modelNode.obj3D.position.set(0,-1.65,0);

  modelNode.obj3D.rotation.y = Math.PI

  modelNode.start();

  let step = -0.1
  let zPos = 0
  const tick = function() {
    requestAnimationFrame(tick);
    if (zPos>= 1.8) {
      step = -0.02
    } else if (zPos <= -0.4) {
      step = 0.02
    }
    zPos += step
    modelNode.obj3D.rotation.y += 0.02;
    modelNode.obj3D.position.set(0,-1.65,zPos);
  }
  tick();

console.log('@0')
  addTag()
  console.log('@1')
  function placeTag(){
      if(tag) mpSdk.Mattertag.navigateToTag(tag, mpSdk.Mattertag.Transition.INSTANT);
      tag = null;
  }
  console.log('@2')
  window.addEventListener('blur',function(){  
      window.setTimeout(function () { 
          if (document.activeElement === iframe) {
              placeTag(); //function you want to call on click
              window.focus()
              addTag();
          }
      }, 0);
  });
  console.log('@3')
  function updateTagPos(newPos, newNorm=undefined, scale=undefined){
      if(!newPos) return;
      if(!scale) scale = .33;
      if(!newNorm) newNorm = {x: 0, y: 1, z: 0};

      mpSdk.Mattertag.editPosition(tag, {
          anchorPosition: newPos,
          stemVector: {
              x: scale * newNorm.x,
              y: scale * newNorm.y,
              z: scale * newNorm.z,
          }
      })
      .catch(e =>{
          console.error(e);
          tag = null;
      });
  }
  console.log('@4')

  mpSdk.Pointer.intersection.subscribe(intersectionData => {
      console.log(`intersectionData`,intersectionData)
      console.log(`sdk`,mpSdk.Model.getData())
      if(tag){
          if(intersectionData.object === 'intersectedobject.model' || intersectionData.object === 'intersectedobject.sweep'){
              updateTagPos(intersectionData.position, intersectionData.normal);
          }
      }
  });
  console.log('@5')

  function addTag() {
    console.log('addTag')
      if(!tag){
          mpSdk.Mattertag.add([{
              label: "Matterport Tag",
              description: "",
              anchorPosition: {x: 0, y: 0, z: 0},
              stemVector: {x:0, y: 0, z: 0},
              color: {r: 1, g: 0, b: 0},
          }])
          .then((sid) => {
              tag = sid[0];
          })
          .catch( (e) => {
              console.error(e);
          })
      }
  }
  console.log('@6')
}

