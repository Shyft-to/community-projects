# Translator

A simple to read, [human-friendly Solana explorer](https://translator.shyft.to) powered by SHYFT APIs.

SHYFT's very own Solana Translator: [https://translator.shyft.to](https://translator.shyft.to)

SHYFT Official Documentation: [docs.shyft.to](https://docs.shyft.to)

Get your own API KEY from [SHYFT](https://shyft.to/): [https://shyft.to/get-api-key](https://shyft.to/get-api-key) 

## Getting Started with the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this project create your own `.env` file, with SHYFT's API endpoint, and [your own API key](https://shyft.to/get-api-key).
```
REACT_APP_API_EP=https://api.shyft.to/sol/v1/
REACT_APP_API_KEY=test
REACT_APP_GA_ID=123
```
or you can simply rename `example.env` to `.env`, add your API key and get started.

To start this project on local environment, use command `npm run start`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


