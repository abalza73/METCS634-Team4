$(document).ready(function() {
    console.log("Ready!");
    
    // This is the template for concerts html
    var template = document.getElementById("template").innerHTML;
    
    // This is the target div for concerts html 
    var concerts = document.getElementById("concerts");

    // Concert data    
    var data = {
        concertData: [
            {title : "Concert 1",
             description: "loren ipsum 1"
            },
            {title : "Concert 2", 
            description: "loren ipsum 2"
            },
            {title : "Concert 3",
            description: "loren ipsum 2"
            }
        ]
    };

    // Concert html
    var html = Mustache.render(template, data);

    // Insert html into target div
    concerts.innerHTML = html;

    console.log("this file is executing");
    
})

