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
    var albums_template = document.getElementById("albums_template").innerHTML;
    var tracks_template = document.getElementById("tracks_template").innerHTML;

    var renderFunc = function(albums_template, data) {
        console.log("render func (" + albums_template + " :,: " + data + ")");
        // Concert html
        var html = Mustache.render(albums_template, data);
        return html;
    }
    
    // This is the target div html 
    var albums = document.getElementById("albums");
    var tracks = document.getElementById("tracks");

    // On loading database  
    db.collection("music").get().then(function(querySnapshot) {
        
        var data4Template = [];
        var albumDict = {};

        querySnapshot.forEach( function(doc) {
            console.log(doc.id + "==>" + JSON.stringify(doc.data()));
            // add event to list
            data4Template.push(doc.data());
            // add event to dictionary
            albumId = doc.data().album_id;
            albumDict[albumId] = doc.data();
            
        });
        console.log(albumDict);
        // create data object with albumData field
        data4Template = {albumData: data4Template};
        // render concert data and place in page
        albums.innerHTML = renderFunc(albums_template, data4Template);

        // Add event listeners
        for (var albumProp in albumDict) {
            if (albumDict.hasOwnProperty(albumProp)) {
                console.log("doing stuff for album " + albumProp);
                albumElement = document.getElementById(albumProp);

                // add listener
                albumElement.addEventListener("click", function(e) {
                    console.log("you clicked on " + e.srcElement.parentNode.id);
                    var album = e.srcElement.parentNode;
                    // hide albums
                    albums.style.display = "none";
                    // change page title
                    document.getElementById("music_title").innerHTML = albumDict[album.id].album_name;
                    // show details

                    detailsHTML = renderFunc(tracks_template,albumDict[album.id]);

                    console.log("albumDict: " + JSON.stringify(albumDict[album.id]));
                    tracks.innerHTML = detailsHTML;
                });
            }
        }
    });

    function toggler() {
        // hide tracks
        tracks.style.display = "none";
        // show albums
        albums.style.display = "block";
    }

    console.log("music.js executing");
    
})

