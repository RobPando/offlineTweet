# Offline Tweet
Write tweets even when the device is offline, once connectivity is regained, tweets will be posted live. React Native example project for how to setup [redux-offline-queue](https://github.com/InspireNL/redux-offline-queue)

# Setup
1. Git clone this repo.
2. Intall the app with `yarn intall`
3. Link libraries `react-native link`
4. Create twitter app via [apps.twitter.com](https://apps.twitter.com) **NOTE:** Once you have created the twitter app, make sure to generate access tokens in the twitter app -> Keys and Access Tokens -> scroll to bottom -> click 'Create my access token'.
5. Rename `app/config/tokens.js.example` to `app/config/tokens.js` and fill in your own tokens and secrets.
6. Start the server `yarn start` start your simulator or device.

**IMPORTANT NOTE:** If app is killed the offline messages wont be delivered. Set up `redux-persist` to persist the store and post even after app has been killed.
