$(document).ready(function() {
    console.log("Ready!");

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

    // This is the template for concert details
    var detailsTemplate = document.getElementById("concert_template").innerHTML;

    // This is the template for media events
    var mediaTemplate = document.getElementById("media_template").innerHTML;

    var renderFunc = function(template, data) {
        console.log("render func (" + template + " :,: " + data + ")");
        // Concert html
        var html = Mustache.render(template, data);
        return html;
    }
    
    // This is the target div for concerts html 
    var concerts = document.getElementById("events");
    // This is the target div for concert details html
    var concertDetails = document.getElementById("concert_details");
    // This is the target div for media apperances
    var mediaEvents = document.getElementById("media_events");

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

        // Add event listeners
        for (var eventProp in eventDict) {
            if (eventDict.hasOwnProperty(eventProp)) {
                console.log("doing stuff for event " + eventProp);
                eventElement = document.getElementById(eventProp);

                // add listener
                eventElement.addEventListener("click", function(e) {
                    console.log("you clicked on " + e.srcElement.parentNode.id);
                    var concert = e.srcElement.parentNode;
                    // hide concerts & media events
                    concerts.style.display = "none";
                    mediaEvents.style.display = "none";
                    document.getElementById("media_title").style.display = "none";
                    // change page title
                    document.getElementById("events_title").innerHTML = "Concert Details";
                    // show details
                    detailsHTML = renderFunc(detailsTemplate,eventDict[concert.id]);
                    concertDetails.innerHTML = detailsHTML;
                });
            }
        }
    });

    db.collection("media_events").get().then(function(querySnapshot) {
        
        var data4Template = [];
    
        querySnapshot.forEach( function(doc) {
            console.log(doc.data().eventId);
            // add event to list
            data4Template.push(doc.data());
            // add event to dictionary
            eventId = doc.data().eventId;
        });

        // create data object with concertData field
        data4Template = {mediaData: data4Template};
        // render concert data and place in page
        mediaEvents.innerHTML = renderFunc(mediaTemplate, data4Template);
    });

    console.log("main.js executing");
    
})

