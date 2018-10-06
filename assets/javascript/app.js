// GLOBAL VARIABLES ================================================

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDictF3i0-bhVFTcTiGg0_v75eM_6FfIH4",
  authDomain: "train-c1021.firebaseapp.com",
  databaseURL: "https://train-c1021.firebaseio.com",
  projectId: "train-c1021",
  storageBucket: "train-c1021.appspot.com",
  messagingSenderId: "645472902095"
};
firebase.initializeApp(config);

var firebaseData = firebase.database();

// FUNCTIONS ========================================================

$("#addTrainBtn").click(function() {
  event.preventDefault();
  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var trainTime = $("#trainTime")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

    // 
  firebaseData.ref().push({
    name: trainName,
    destination: destination,
    firstTime: trainTime,
    frequency: frequency,
  });
});

// MAIN PROCESS ======================================================
