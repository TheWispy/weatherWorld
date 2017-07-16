# Weather World

## Summary
Weather world is weather map with an isometric perspective. Built on javascript and displayed on the HTML canvas.
It was made as a solo 24-hour hackathon from 15/07/2017 8pm to 16/07/2017. It uses the Open Weather Map API.
https://openweathermap.org/api

## How to Run
Load up the necessary files onto a server, and in data.js **replace {API_KEY} with your own key**.
The basic subscirption to the Open Weather Map API allows you to have 60 calls per minute.

## Use
A user can enter the name of a city in the input bar, which after pressing submit and then the neighbouring refresh button,
the display will read the live temperature at that location. The intention was to have location pins color co-ordinated to their values,
but this is well and truly broken due to time constraints.

## What works?
..* Input of cities.
..* The getting of data in the form of JSON
..* Mapping numbers between 0 and 1 onto an isometric grid of given size.
..* Drawing said grid

## What doesn't work as well as everything else?
..* A E S T H E T I C
..* Converting longitude and lattitude into x,y co-ordinates
..* Refreshing of the canvas and colours.

## What was going to be implemented?
..* Selection of data type i.e. humidity, wind, pressure etc.
..* List of currently selected cities.
..* Deletion of cities from tracking list
..* More efficient calls to the API
