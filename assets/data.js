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

// Create a variable to reference the database
var database = firebase.database();
