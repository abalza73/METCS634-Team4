$(document).ready(function() {
    console.log("Ready - shortEvents!");

    // Initialize Cloud Firestore
    firebase.initializeApp({
        apiKey: 'AIzaSyCJUiRfxTPoIuig0jxjvoaRPTcNgjgp5zc',
        authDomain: 'carlos-libedinsky.firebaseapp.com',
        projectId: 'carlos-libedinsky'
    });
  
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
  
    // Disable deprecated features
    db.settings({
        timestampsInSnapshots: true
    });

    // This is the template for concerts html
    var template = document.getElementById("template").innerHTML;

    var renderFunc = function(template, data) {
        console.log("render func (" + template + " :,: " + data + ")");
        // Concert html
        var html = Mustache.render(template, data);
        return html;
    }
    
    // This is the target div for concerts html 
    var concerts = document.getElementById("events");

    // On loading database  
    db.collection("concerts").get().then(function(querySnapshot) {
        
        var data4Template = [];
        var eventDict = {};

        querySnapshot.forEach( function(doc) {
            console.log(doc.data().eventId);
            // add event to list
            data4Template.push(doc.data());
            // add event to dictionary
            eventId = doc.data().eventId;
            eventDict[eventId] = doc.data();
            
        });
        console.log(eventDict);
        // create data object with concertData field
        data4Template = {concertData: data4Template};
        // render concert data and place in page
        concerts.innerHTML = renderFunc(template, data4Template);
    });

    console.log("shortEvents.js executing");
    
})

