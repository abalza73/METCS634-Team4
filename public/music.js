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

    // This is the template for music html
    var template = document.getElementById("albums_template").innerHTML;

    var renderFunc = function(template, data) {
        console.log("render func (" + template + " :,: " + data + ")");
        // Concert html
        var html = Mustache.render(template, data);
        return html;
    }
    
    // This is the target div for concerts html 
    var albums = document.getElementById("albums");

    // On loading database  
    db.collection("music").get().then(function(querySnapshot) {
        
        var data4Template = [];
        var albumDict = {};

        querySnapshot.forEach( function(doc) {
            console.log(doc.id + "==>" + JSON.stringify(doc.data()));
            // add event to list
            data4Template.push(doc.data());
            // add event to dictionary
            albumId = doc.id;
            albumDict[albumId] = doc.data();
            
        });
        console.log(albumDict);
        // create data object with albumData field
        data4Template = {albumData: data4Template};
        // render concert data and place in page
        albums.innerHTML = renderFunc(albums_template, data4Template);

        // Add event listeners
        for (var eventProp in eventDict) {
            if (eventDict.hasOwnProperty(eventProp)) {
                console.log("doing stuff for event " + eventProp);
                eventElement = document.getElementById(eventProp);

                // add listener
                eventElement.addEventListener("click", function(e) {
                    console.log("you clicked on " + e.srcElement.parentNode.id);
                    var album = e.srcElement.parentNode;
                    // hide albumCovers events
                    albumCovers.style.display = "none";
                    // change page title
                    document.getElementById("album_details").innerHTML = "Album Details";
                    // show details
                    detailsHTML = renderFunc(detailsTemplate,eventDict[album.id]);
                    albumDetails.innerHTML = detailsHTML;
                    // change column size and center text
                    document.getElementById("flexColumn").className = "col-sm-12 bg-light text-dark text-center mt-2 ml-2 mr-2";
                });
            }
        }
    });

    console.log("music.js executing");
    
})

