# Minimal Matterport React Project
Based on the Matterport Labs painter app.

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
export const sdkKey = 'nsai8wcy6qwb4wfzh6k1u2mgc';
// ...
```
And in the `src/components/Main.tsx` file of the `src` library folder:

```Typescript:src/components/Main.tsx
// ...
this.applicationKey = urlParams.get('applicationKey') || 'nsai8wcy6qwb4wfzh6k1u2mgc';
// ...
```
※ When making this sample, I had CORS errors and access problems using my SDK Key, so I used the one from the lab application: `08s53auxt9txz1w6hx2iww1qb`

Same problem when using the model I used in my first tutorial, so I used the one from the lab application in the `src/components/Main.tsx` file:

```TypeScript:src/components/Main.tsx
// ...
const defaultSid = 'j4RZx7ZGM6T';
// ...
```

## Serve
To serve the sample, run the following command

```
yarn develop
```

## yarn unlink
```
cd core
yarn unlink
cd ..
cd common
yarn unlink
cd ..
cd bundle
yarn unlink
cd ..
cd save
yarn unlink
cd ..
```