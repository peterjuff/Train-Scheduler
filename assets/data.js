$(document).ready(function() {
var train;
var destination;
var arrival;
var frequency;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZYn12nR0s3NmYKrDg-4KgGhEJJyCpfSY",
    authDomain: "train-scheduler-a4fe3.firebaseapp.com",
    databaseURL: "https://train-scheduler-a4fe3.firebaseio.com",
    projectId: "train-scheduler-a4fe3",
    storageBucket: "train-scheduler-a4fe3.appspot.com",
    messagingSenderId: "59693188757"
  };
  firebase.initializeApp(config);
  console.log(firebase);

var datab = firebase.database();

console.log(datab);

datab.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var trainVal = childSnapshot.val().name;
  var destinationVal = childSnapshot.val().destination;
  var arrivalVal = childSnapshot.val().arrival;
  var frequencyVal = childSnapshot.val().frequency;
  $("tbody").append("<tr><td>" + trainVal + "</td><td>" + destinationVal + "</td><td>" + arrivalVal + "</td><td>" + frequencyVal + "</td><td></td></tr>");


  console.log(childSnapshot.val());
})

$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log("button clicked");
  train = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  arrival = $("#arrival").val().trim();
  frequency = $("#frequency").val().trim();

  var object = {
    name: train,
    destination: destination,
    arrival: arrival,
    frequency: frequency
  }
  console.log(object);

  datab.ref().push(object);


})

})