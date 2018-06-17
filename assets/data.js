$(document).ready(function() {

  //global variables
  var train;
  var destination;
  var arrival;
  var frequency;
  var away;

  //initialize Firebase

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

  $("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked");
  
      //take inputs and store as variables
    train = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    arrival = $("#arrival").val().trim();
    frequency = $("#frequency").val().trim();
  
    var object = {
      name: train,
      destination: destination,
      arrival: arrival,
      frequency: frequency,
      away: away
    };
  
    datab.ref().push(object);
  
    $("#trainName").val("");
    $("#destination").val("");
    $("#arrival").val("");
    $("#frequency").val("");
  
  });    


  datab.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
    var trainVal = childSnapshot.val().name;
    var destinationVal = childSnapshot.val().destination;
    var arrivalVal = childSnapshot.val().arrival;
    var frequencyVal = childSnapshot.val().frequency;
    var minutesAway = childSnapshot.val().away;
    $("tbody").append("<tr><td>" + trainVal + "</td><td>" + destinationVal + "</td><td>" + arrivalVal + "</td><td>" + frequencyVal + "</td><td>" + minutesAway + "</td></tr>");

    console.log(childSnapshot.val().away);
    console.log(minutesAway)
    
    //moment.js

    // var tfrequency = childSnapshot.val().frequency;
    var convertedDate = moment(childSnapshot.val().arrival, 'hh:mm').subtract(1, 'years');
    var trainTime = moment(convertedDate).format('HH:mm');
    var currentTime = moment();
    console.log(frequencyVal)

    // Pushed back 1 year to make sure it comes before current time
    var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequencyVal;

    // Create variables for minutes til next train
    var tMinutesTrain = frequencyVal - tRemainder;
    var nextTrain = moment().add(tMinutesTrain, 'minutes').format('HH:mm')
    console.log(tMinutesTrain)
  });

  

});



// $(document).ready(function() {
// var train;
// var destination;
// var arrival;
// var frequency;
// var away;


// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyCZYn12nR0s3NmYKrDg-4KgGhEJJyCpfSY",
//     authDomain: "train-scheduler-a4fe3.firebaseapp.com",
//     databaseURL: "https://train-scheduler-a4fe3.firebaseio.com",
//     projectId: "train-scheduler-a4fe3",
//     storageBucket: "train-scheduler-a4fe3.appspot.com",
//     messagingSenderId: "59693188757"
//   };
//   firebase.initializeApp(config);
//   console.log(firebase);

// var datab = firebase.database();

// console.log(datab);

// var time = moment();

// datab.ref().on("child_added", function(childSnapshot, prevChildKey) {
//   var trainVal = childSnapshot.val().name;
//   var destinationVal = childSnapshot.val().destination;
//   var arrivalVal = childSnapshot.val().arrival;
//   var frequencyVal = childSnapshot.val().frequency;
//   var minutesAway = childSnapshot.val().away;
//   $("tbody").append("<tr><td>" + trainVal + "</td><td>" + destinationVal + "</td><td>" + arrivalVal + "</td><td>" + frequencyVal + "</td><td>" + minutesAway + "</td></tr>");


//   console.log(childSnapshot.val());
// })

// $("#submit").on("click", function(event) {
//   event.preventDefault();
//   console.log("button clicked");
//   train = $("#trainName").val().trim();
//   destination = $("#destination").val().trim();
//   arrival = $("#arrival").val().trim();
//   frequency = $("#frequency").val().trim();

//   var object = {
//     name: train,
//     destination: destination,
//     arrival: arrival,
//     frequency: frequency
//   }
//   console.log(object);

//   datab.ref().push(object);


// })

// })