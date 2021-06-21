# vs-app extracted fron the Matterport SDK Bundle Example

## Install
Install the Node.js modules:

```
yarn install
```
Link the Matterport local libraries:

```
cd core
yarn link
cd ..
yarn link @mp/core
cd common
yarn link
yarn link @mp/core
cd ..
yarn link @mp/common
cd bundle
yarn link
cd ..
yarn link @mp/bundle-sdk
cd save
yarn link
cd ..
yarn link @mp/save
```
Add references to the local libraries in the `package.json`:

```JSON:package.json
    "@mp/core": "^1.0.0",
    "@mp/common": "^1.0.0",
    "@mp/bundle-sdk": "^1.0.0",
    "@mp/save": "^1.0.0",
```
Don't forget to set the SDK Key in the `common/src/index.ts` file of the `common` library folder:

```Typescript:common/src/index.ts
// ...
export const sdkKey = 'PUT_YOUR_SDK_KEY_HERE';
// ...
```
And in the `src/components/Main.tsx` file of the `src` library folder:

```Typescript:src/components/Main.tsx
// ...
this.applicationKey = urlParams.get('applicationKey') || 'PUT_YOUR_SDK_KEY_HERE';
// ...
```

## Serve
To serve the sample, run the following command

```
yarn develop
```