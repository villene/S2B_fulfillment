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

const DIRECTION_ARGUMENT = 'direction';
const PIXELS_ARGUMENT = 'pixels';
const FOCUS_ARGUMENT = 'focusable';
const NUMBER_ARGUMENT = 'number';


exports.speech2browser = functions.https.onRequest((request, response) => {
    const app = new App({request, response}),
        // userId = app.getUser().userId,
        // speechdb = firebase.database().ref(userId);
    speechdb = firebase.database().ref();

    // console.log('Request headers: ' + JSON.stringify(request.headers));
    // console.log('Request body: ' + JSON.stringify(request.body));

    function doScroll (app) {
        let direction = app.getArgument(DIRECTION_ARGUMENT);
        let pixels = app.getArgument(PIXELS_ARGUMENT);

        sendToDB({
            action: "scroll",
            direction: direction,
            pixels: pixels,
            complete: 0
        });

        app.tell('Done');
    }

    function doHighlight (app) {
        let focus = app.getArgument(FOCUS_ARGUMENT);

        sendToDB({
            action: "highlight",
            focusable: focus,
            complete: 0
        });

        // app.tell('Done');
    }

    function doSelectNum (app) {
        let num = app.getArgument(NUMBER_ARGUMENT);

        sendToDB({
            action: "select",
            num: num,
            name: "",
            complete: 0
        });

        app.tell('Done');
    }

    function sendToDB (command) {
        speechdb.set(command);
    }

    let actionMap = new Map();
    actionMap.set('scroll', doScroll);   
    actionMap.set('highlight', doHighlight);
    actionMap.set('selectNum', doSelectNum);


    app.handleRequest(actionMap);
});