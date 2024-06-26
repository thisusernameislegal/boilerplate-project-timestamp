// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
    if (!req.params.date) {
        let now = new Date();
        res.json({
            unix: (Date.now()),
            utc: (now.toUTCString())
        });
        
    } else {
        let unix = Number(req.params.date), utc;
        let response;
        if (isNaN(unix)) {
            unix = Date.parse(req.params.date);
            utc = new Date(unix).toUTCString();
            isNaN(unix) ? response = { error: "Invalid Date" } : response = { unix: unix, utc: utc }
        } else {
            utc = new Date(unix).toUTCString();
            response = { unix: unix, utc: utc };
        }
        res.json(response);
    }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
