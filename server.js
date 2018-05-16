let express = require("express");
let bodyParser = require("body-parser");
let url = require("url");
let querystring = require("querystring");
let fs = require("fs");

// reading the data from the json file
let rawdata = fs.readFileSync("states.json");
let states = JSON.parse(rawdata);
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());


app.post("/", (req, res) => {
  let longitude = req.body.longitude;
  let latitude = req.body.latitude;
  let result = [];

  if (!longitude || longitude === "" || (!latitude || latitude === "")) {
    res.status(500).json({
      error: "You must provide both longitude and latitude. "
    });
  } else {
    let objectFound = false;

    // linearly scan all of the states
    for (let i = 0; i < states.length; i++) {
      let currentState = states[i];
      let borderBoundries = currentState.border;

      // calling the function to check if the point are with boundries
      if (pointInBoundry(longitude, latitude, borderBoundries)) {
        result.push(currentState.state);
        objectFound = true;
        break;
      }
    }

    if (objectFound === false) {
      res.status(500).json({
        error: "state not found."
      });
    } else {
      res.json(result);
    }
  }
});

/*

references:
https://stackoverflow.com/questions/14527485/find-the-state-given-latitude-and-longitude-coordinates
https://github.com/substack/point-in-polygon
*/
function pointInBoundry(x, y, boundries) {
  let inside = false;
  for (let i = 0, j = boundries.length - 1; i < boundries.length; j = i++) {
    let xi = boundries[i][0],
      yi = boundries[i][1];
    let xj = boundries[j][0],
      yj = boundries[j][1];

    let intersect =
      yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

app.listen(8080, () => {
  console.log("Listening port 8080!");
});