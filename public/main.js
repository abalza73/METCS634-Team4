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

    var renderFunc = function(template, data) {
        console.log("render func (" + template + ", " + data + ")");
        // Concert html
        var html = Mustache.render(template, data);
        return html;
    }
    
    // This is the target div for concerts html 
    var concerts = document.getElementById("events");

    // Concert data    
    var data = {
        concertData: [
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            },
            {day : "07",
             month: "December",
             year: "2018",
             time: "7:00",
             dayOfWeek: "Friday",
             location: "Miami, FL",
             venue: "American Airlines Arena",
             ticketsURL: "https://www.songkick.com/artists/460145-carlos-libedinsky"
            }
        ]
    };

    // TODO: Left this here in case you want to try to get pass the async issues with Firebase
    // Printing to the console from Firebase works, but I cant get the data into a var so I can
    // pass it to mustache
   
    db.collection("concerts").get().then(function(querySnapshot) {
        
        var data4Template = [];
        querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", JSON.stringify(doc.data()));
            data4Template.push(doc.data());
            console.log("HERE");
            console.log(data4Template);
            concerts.innerHTML = renderFunc(template, data4Template);
        });
    });




    
    // Insert html into target div
    //concerts.innerHTML = renderFunc(template, data);

    console.log("this file is executing");
    
})

