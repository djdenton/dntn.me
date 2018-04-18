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

// Get document. Set NewParagraph to false and clear the dictation
var dictation = firebase.database().ref('/Dictation');
dictation.child('ActiveSection').set('');
dictation.child('NewParagraph').set(false);

window.onload=function(){

  // Define sections
  var device = document.getElementById('Device');
  var activeSection = document.getElementById('ActiveSection');
  var receiver = document.getElementById('Receiver');
  var main = document.getElementById('Main');
  var update = document.getElementById('Update');

  // Listen for changes to the database and update the active section and receiver
  dictation.on('value', function(snapshot) {
    // If there is a new paragraph
    if(snapshot.val().NewParagraph){
      main.innerHTML = main.innerHTML + snapshot.val().ActiveSection; //Only needed on web version
      dictation.child('NewParagraph').set(false); //Reset the new para
    };
    activeSection.innerHTML = snapshot.val().ActiveSection;
    update.innerHTML = snapshot.val().ActiveSection;
  });

  // Update Document
  device.addEventListener('input', function() {
    // If there is a new paragraph
    if(activeSection.innerHTML.includes('<div><br></div>')){
      dictation.child('ActiveSection').set(device.innerHTML);
      dictation.child('NewParagraph').set(true);
      device.innerHTML = '';
      activeSection.innerHTML = '';
    }else{
      dictation.child('ActiveSection').set(device.innerHTML);
    };
  });
}