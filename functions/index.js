'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyCN2On1hWv0Qqa9TX-KnIYZQ_9LE7YHxqo",
    authDomain: "speech2browser.firebaseapp.com",
    databaseURL: "https://speech2browser.firebaseio.com",
    projectId: "speech2browser",
    storageBucket: "speech2browser.appspot.com",
    messagingSenderId: "666598580580"
};

firebase.initializeApp(config);

var speechdb = firebase.database().ref();

// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'make_name';
// b. the parameters that are parsed from the make_name intent
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';


exports.sillyNameMaker = functions.https.onRequest((request, response) => {
    const app = new App({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
    function makeScroll (app) {
        let direction = app.getArgument(DIRECTION_ARGUMENT);
        let pixels = app.getArgument(PIXELS_ARGUMENT);
        app.tell('Done');
        firebase.database().ref().set({
            action: SCROLL,
            direction: direction,
            pixels: pixels
        });
    }
    // d. build an action map, which maps intent names to functions
    let actionMap = new Map();
    actionMap.set(NAME_ACTION, makeScroll);


    app.handleRequest(actionMap);
});