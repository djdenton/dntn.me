  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBFErnCaSdbeJMKjkpz_-Fn3emriLwIOLI",
    authDomain: "dictation-prototype.firebaseapp.com",
    databaseURL: "https://dictation-prototype.firebaseio.com",
    projectId: "dictation-prototype",
    storageBucket: "dictation-prototype.appspot.com",
    messagingSenderId: "805593500412"
  };
firebase.initializeApp(config);

// Get document
var dictation = firebase.database().ref('/Dictation');

// Listen for changes to document
dictation.on('value', function(snapshot) {
  document.getElementById('receiver').innerHTML = snapshot.val();                   
});

window.onload=function(){
// Update Document
var device = document.getElementById('device');

device.addEventListener('input', function() {
    dictation.set(device.innerHTML);
});
}