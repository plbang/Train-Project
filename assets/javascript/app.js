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

function trainFunction () {
  
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

  firebaseData.ref().push({
    name: trainName,
    destination: destination,
    firstTrainTime: trainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
};

firebaseData.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().frequency);

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirstDepartureTime = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().frequency;

  var firstTimeConverted = moment(trainFirstDepartureTime, "HH:mm").subtract(
    1,
    "years"
  );
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainTime = moment(nextTrain).format("h:mm A");

  var tbody = $("tbody");
  var tr = $("<tr>");
  // name of train
  tr.append("<td>" + trainName + "</td>");
  // train destination
  tr.append("<td>" + trainDestination + "</td>");
  // train frequency
  tr.append("<td>" + trainFrequency + "</td>");
  // next arrival
  tr.append("<td>" + nextTrainTime + "</td>");
  // minutes before train arrive
  tr.append("<td>" + tMinutesTillTrain + "</td>");
  // append to all to tbody
  tbody.append(tr);
}),
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  };

function clearList () {
  firebaseData.ref().set({});
  location.reload();
}


// MAIN PROCESS ======================================================

  $("#addTrainBtn").click(trainFunction);
  $("#clearTrainBtn").click(clearList);