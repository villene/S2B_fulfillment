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

const NAME_ACTION = 'scroll';
const DIRECTION_ARGUMENT = 'direction';
const PIXELS_ARGUMENT = 'pixels';


exports.speech2browser = functions.https.onRequest((request, response) => {
    const app = new App({request, response});
    // console.log('Request headers: ' + JSON.stringify(request.headers));
    // console.log('Request body: ' + JSON.stringify(request.body));

    function makeScroll (app) {
        console.log(NAME_ACTION);
        let direction = app.getArgument(DIRECTION_ARGUMENT);
        let pixels = app.getArgument(PIXELS_ARGUMENT);

        speechdb.set({
            action: "scroll",
            direction: direction,
            pixels: pixels
        });

        app.tell('Done');
    }

    let actionMap = new Map();
    actionMap.set(NAME_ACTION, makeScroll);


    app.handleRequest(actionMap);
});