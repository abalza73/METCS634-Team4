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
    
    // TODO: fix await functions
    db.collection("concerts").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        data2 += doc.data;
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", JSON.stringify(doc.data()));
        var html = Mustache.render(template, data2);
        });
        console.log("data2: " + data2);
    });

    // Function to get concert information out of firebase
    function getConcerts() {
        var concerts;
        db.collection("concerts").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", JSON.stringify(doc.data()));
                concerts += JSON.stringify(doc.data);
            });
            console.log("concerts: " + concerts);
        });
      }
      
    async function main() {
        var concertList = await getConcerts();
        console.log("concert List: " + concertList);
    }

    main();

    
    
    // This is the template for concerts html
    var template = document.getElementById("template").innerHTML;
    
    // This is the target div for concerts html 
    var concerts = document.getElementById("events");

    // Concert data    
    var data = {
        concertData: [
            {title : "Concert 1",
             description: "loren ipsum 1",
             ticketURL: "//www.google.com"
            },
            {title : "Concert 2", 
             description: "loren ipsum 2",
             ticketURL: "//www.tickets2.com"
            },
            {title : "Concert 3",
             description: "loren ipsum 2",
             ticketURL: "//www.tickets3.com"
            },
            {title : "Concert 3",
             description: "loren ipsum 4",
             ticketURL: "//www.google.com"
            },
            {title : "Concert 5", 
             description: "loren ipsum 5",
             ticketURL: "//www.tickets2.com"
            },
            {title : "Concert 6",
             description: "loren ipsum 6",
             ticketURL: "//www.tickets3.com"
            },
            {title : "Concert 7",
             description: "loren ipsum 7",
             ticketURL: "//www.google.com"
            },
            {title : "Concert 8", 
             description: "loren ipsum 8",
             ticketURL: "//www.tickets2.com"
            }
        ]
    };

    // Concert html
    var html = Mustache.render(template, data);

    // Insert html into target div
    concerts.innerHTML = html;

    console.log("this file is executing");
    
})

