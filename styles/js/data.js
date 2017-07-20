var samples = [{"coord":{"lon":-0.13,"lat":51.51},
    "weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],
    "base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,
    "temp_max":281.15},
    "visibility":10000,
    "wind":{"speed":4.1,"deg":80},
    "clouds":{"all":90},
    "dt":1485789600,
    "sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},
    "id":2643743,
    "name":"London",
    "cod":200}];
var nameList = [];
var dataList = [];
const SERVER = true;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "13px Arial";
const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;
var mode = "temperature";
document.getElementById("submit").addEventListener("click", addLocation);
document.getElementById("refresh").addEventListener("click", makeRequest);

function addLocation(){
    var table = document.getElementById('table');
    table.innerHTML = "<th>Location</th>"
    for (var i = 0; i < nameList.length; i++) {
        table.innerHTML += "<tr>"+nameList[i]+"</tr>";
    }
    var stuff = document.getElementById("input").value;
    if (validate(stuff)) {
        nameList.push(stuff);
        makeRequest(stuff);
    }
    else {
        console.log(stuff+" denied.")
    }
    update(ctx);
}

function makeRequest(name){
    if (SERVER) {
        for (var i = 0; i < nameList.length; i++) {
            console.log("request");
            var url = "http://api.openweathermap.org/data/2.5/weather?q="+nameList[i]+"&{API_KEY}";
            var weirdI = i;
            $.getJSON(url, function(response) {
                console.log(response);
                dataList[weirdI] =response;
            });
        }
    }
    else {
        console.log("Local hosting, no request made.");
        dataList.push(samples[Math.round(Math.random()*samples.length/2)]);
    }
    update(ctx);
}

function update(ctx) {
    for (var i = 0; i < dataList.length; i++) {
        const PI = 3.14159265358973;
        const ORIGIN = {"x":500, "y":150};
        var pos = {"x":ORIGIN.x, "y": ORIGIN.y};
        var coords = {"x":0, "y":0};
        coords.x = (dataList[i].coord.lon + 180) * (2.0/360.0);
        var mercN = Math.log(Math.tan((PI/4)+((dataList[i].coord.lat*PI/180)/2)));
        coords.y = (2.0/2)-(2.0*mercN/(2*PI));
        pos.x += coords.x * 250;
        pos.y += coords.x * 100;
        pos.x -= coords.y * 250;
        pos.y += coords.y * 100;
        pos.x += -50;
        pos.y += -50;
        ctx.moveTo(pos.x, pos.y);
        ctx.linewidth = 1;
        var height = 0;
        switch(mode) {
        case "temperature":
            var scale = (dataList[i].main.temp-273)/40;
            ctx.strokeStyle = "rgb("+parseInt(255*scale)+", 0, "+parseInt(1/(255*(scale)))+")";
            ctx.lineTo(pos.x, pos.y-(scale*75));
            ctx.stroke();
            ctx.arc(pos.x, pos.y-(scale*75), 5, 0, 2*PI);
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.fillText(dataList[i].name+" "+Math.round(dataList[i].main.temp - 273.2)+"C", pos.x, pos.y + 10);
            ctx.strokeStyle = "black";
            break;
        case "pressure":
            break;
        case "humidity":
            break;
        default:
            break;
        }

    }
}

function validate(name){
    var isValid = true;
    for (var i = 0; i < nameList.length; i++) {
        if (name == nameList[i]) {
            isValid = false;
        }
    }
    return isValid;
}

function canvasInit(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black"
    ctx.linewidth = 3;
    ctx.moveTo(500, 350);
    ctx.lineTo(250, 250);
    ctx.lineTo(500, 150);
    ctx.lineTo(750, 250);
    ctx.lineTo(500, 350);
    ctx.lineTo(500, 450);
    ctx.lineTo(750, 350);
    ctx.lineTo(750, 250);
    ctx.moveTo(250, 250);
    ctx.lineTo(250, 350);
    ctx.lineTo(500, 450);
    ctx.stroke();
}

canvasInit(ctx);
