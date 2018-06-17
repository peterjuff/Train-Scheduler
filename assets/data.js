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
    frequency = parseInt($("#frequency").val().trim());
  
    var object = {
      name: train,
      destination: destination,
      arrival: arrival,
      frequency: frequency,
      momentArrive: momentArrive,
      minAway: minAway
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
    // var away = childSnapshot.val().away;

    var trainTimeCon = moment(arrivalVal, 'hh:mm a').subtract(1, 'years');
    var currentTime = moment().format('HH:mm a');
    console.log(currentTime);

    //store variable for difference between current and arrival time
    var trainTimeDiff = moment().diff(moment(trainTimeCon), 'minutes');
    console.log(trainTimeDiff);

    var timeLeft = trainTimeDiff % frequencyVal;
    console.log(timeLeft);
    //calculate minutes until next train
    var minutesAway = frequencyVal - timeLeft;
    console.log(minutesAway);

    var nextArr = moment().add(minutesAway, 'minutes').format('hh:mm a');
    console.log(nextArr);


    $("tbody").append("<tr><td>" + trainVal + "</td><td>" + destinationVal + "</td><td>" + arrivalVal + "</td><td>" + frequencyVal + "</td><td>" + nextArr + "</td></tr>");

  });

  

});


