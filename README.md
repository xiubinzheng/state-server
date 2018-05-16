# State Server!

Vistar serves up a mound of geospatial data both internally and to third
parties. What we need is a server to tell us which state, if any, a point is in.
Some simplified geometries are included in states.json (so greatly simplified,
that some of the smaller ones disappear).

It need not be fast, but the code should be readable, and the results should be
correct.

## Expected Behavior

$ ./state-server &
[1] 21507
$ curl -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
["Pennsylvania"]
$

## Notes

Given that file, it took one of us about an hour to implement something that
worked correctly. You're welcome to take it however far you want, but we're
expecting something along those lines.

And if there's anything special we have to do to run your program, just let us
know. A Makefile never hurt anyone.

## Running the application

clone the repository

cd into the state-server directory

in the terminal run "npm install"

to run the server from the terminal, "npm run start" or "npm run dev"

## Testing the application

curl -d "longitude=-121.036133&latitude=41.213799" http://localhost:8080/  
output: ["California"]

curl -d "longitude=-111.036133&latitude=48.213799" http://localhost:8080/  
output: ["Montana"]

curl -d "longitude=-999&latitude=99.99" http://localhost:8080/
output: {"error":"state not found."}

curl -d "" http://localhost:8080/
{"error":"You must provide both longitude and latitude. "}
