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

