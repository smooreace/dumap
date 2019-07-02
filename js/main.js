// GLOBAL

// Global Scene view
var scene;

// Options (Do not edit these by hand!)
var hide_Orbitals = false;

// Scaling
var scales = [];
const miniscale = 3000000;
const moonScaling = 100000;
const starScaling = 50000;
const planetScaling = 200000;	//was 1 million for all 3 scaling
const ringScaling = 3000000;	//keep same as miniscale for the same scaling as the planets
const sphereRadius = 0.5; // Not worth changing since scaling handles this
const labelscale = 1.5;
const moon_Distance_Scale = 5; //how much the distance between the moon and planet is multiplied by
const tourRadius = 1.0; // The fuzzy sphere around planets
var mRadius;
var pRadius;

// Colors
const planetsDiffuse = "0 0 1";
const planetsEmissive = "0 0 0";

const moonDiffuse = "1 0 0";
const moonEmissive = "0 0 0";

const fuzzySpheresDiffuse = "0 0 0";
const fuzzySpheresEmissive = "0 1 0";
const fuzzySpheresTransparency = 0.9; // The transparency of those spheres

const ringDiffuse = "0 0 0";
var ringEmmissive = "0.05 0.05 0.05";
var ringTransparency = 0.6;

const starDiffuse = "0 0 0"
const starEmissive = "1 1 0"

// Camera
var cameraCenterOfRotation = [0, 8, 0];
var cameraOrientation = [1, 0, 0, -0.51]//[10,10,10,-0.5];
var cameraPosition = [0, 50, 75];//[-35,-20,90];


// Datapoints
var datapoints;
var newDatapoints;
var datatours;
var newDataTours;
var datapoints_Moon;
var newDatapoints_Moon;
var datapoints_Orbit;
var newDatapoints_Orbit;
var datapoints_Star;
var newDatapoints_Star;

// Data rows
var rows_Planet;
var rows_Moon;
var rows_Orbit;
var rows_Star;

// Axis
const axisKeys = ["x", "y", "z"];
const axisRange = [0, 10];

// Plotting
const initialDuration = 0;
const ease = 'linear';


var planet_Data = [
    {"id": 1,	"name": "Madis",		"type": "Planet",	"radius": 45000, "pos": [17465536, 22665536, -34464], "class": "hT"},
    {"id": 2,	"name": "Alioth",		"type": "Planet",	"radius": 60000, "pos": [-4, -4, -60534], "class": "M"},
    {"id": 3,	"name": "Thades",		"type": "Planet",	"radius": 56000, "pos": [29165536, 10865536, 65536], "class": "T"},
    {"id": 4,	"name": "Talemai",		"type": "Planet",	"radius": 58000, "pos": [-13234464, 55765536, 465536], "class": "M"},
    {"id": 5,	"name": "Feli",			"type": "Planet",	"radius": 60000, "pos": [-43534464, 22565536, -48934464], "class": "M"},
    {"id": 6,	"name": "Sicari",		"type": "Planet",	"radius": 51000, "pos": [52765536, 27165536, 52065536], "class": "M"},
    {"id": 7,	"name": "Sinnen",		"type": "Planet",	"radius": 55000, "pos": [58665536, 29665536, 58165536], "class": "hT"},
    {"id": 8,	"name": "Teoma",		"type": "Planet",	"radius": 62000, "pos": [80865536, 54665536, -934464], "class": "M"},
    {"id": 9,	"name": "Jago",			"type": "Planet",	"radius": 63000, "pos": [-94134464, 12765536, -3634464], "class": "M"},
    {"id": 100,	"name": "Lacobus",		"type": "Planet",	"radius": 57000, "pos": [98865536, -13534464, -934464], "class": "hP"},
    {"id": 110,	"name": "Symeon",		"type": "Planet",	"radius": 49000, "pos": [14165536, -85634464, -934464], "class": "hP"},
    {"id": 120,	"name": "Ion",			"type": "Planet",	"radius": 45000, "pos": [2865536, -99034464, -934464], "class": "hP"}
];

var moon_Data = [
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [17448118, 22966848, 143079], "home": "Madis"},
    {"id": 11,	"name": "Moon 2",		"type": "Moon",		"radius": 10000, "pos": [17194626, 22243633, -214962], "home": "Madis"},
    {"id": 12,	"name": "Moon 3",		"type": "Moon",		"radius": 10000, "pos": [17520617, 22184726, -309986], "home": "Madis"},
    {"id": 20,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [-564185, 233791, -167448], "home": "Alioth"},
    {"id": 21,	"name": "Moon 3",		"type": "Moon",		"radius": 10000, "pos": [-895203, 358389, -225602], "home": "Alioth"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [29214403, 10907080, 433861], "home": "Thades"},
    {"id": 10,	"name": "Moon 2",		"type": "Moon",		"radius": 10000, "pos": [29404194, 10432766, 19553], "home": "Thades"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [-13058408, 55781856, 740177], "home": "Talemai"},
    {"id": 10,	"name": "Moon 2",		"type": "Moon",		"radius": 10000, "pos": [-13503090, 55594324, 769836], "home": "Talemai"},
    {"id": 10,	"name": "Moon 3",		"type": "Moon",		"radius": 10000, "pos": [-12800514, 55700257, 325207], "home": "Talemai"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [-43902841, 22261034, -48862386], "home": "Feli"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [58969618, 29797943, 57969448], "home": "Sinnen"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [99180967, -13783860, -926156], "home": "Lacobus"},
    {"id": 10,	"name": "Moon 2",		"type": "Moon",		"radius": 10000, "pos": [99250054, -13629215, -1059341], "home": "Lacobus"},
    {"id": 10,	"name": "Moon 3",		"type": "Moon",		"radius": 10000, "pos": [98905290, -13950923, -647589], "home": "Lacobus"},
    {"id": 10,	"name": "Moon 1",		"type": "Moon",		"radius": 10000, "pos": [2472917, -99133746, -1133581], "home": "Ion"},
    {"id": 10,	"name": "Moon 2",		"type": "Moon",		"radius": 10000, "pos": [2995424, -99275008, -1378482], "home": "Ion"}
];

var orbit_Data = [
    {"id": -1,	"name": "Madis Orbit",	"type": "Orbit",	"radius": 17516475, "pos": [0,24000000,0], "rotate": 0},
    {"id": -2,	"name": "Alioth Orbit",	"type": "Orbit",	"radius": 24000080, "pos": [0,24000000,0], "rotate": 0},
    {"id": -3,	"name": "Thades Orbit",	"type": "Orbit",	"radius": 31986667, "pos": [0,24000000,0], "rotate": 0},
    {"id": -4,	"name": "Talemai Orbit","type": "Orbit",	"radius": 34415360, "pos": [0,24000000,0], "rotate": 0},
    {"id": -5,	"name": "Feli Orbit",	"type": "Orbit",	"radius": 65512510, "pos": [0,24000000,0], "rotate": 5.26},
    {"id": -6,	"name": "Sicari Orbit",	"type": "Orbit",	"radius": 74195973, "pos": [0,24000000,0], "rotate": 5.31},
    {"id": -7,	"name": "Sinnen Orbit",	"type": "Orbit",	"radius": 82806841, "pos": [0,24000000,0], "rotate": 5.28},
    {"id": -8,	"name": "Teoma Orbit",	"type": "Orbit",	"radius": 86489786, "pos": [0,24000000,0], "rotate": 0},
    {"id": -9,	"name": "Jago Orbit",	"type": "Orbit",	"radius": 94872123, "pos": [0,24000000,0], "rotate": 0},
    {"id": -100,"name": "Lacobus Orbit","type": "Orbit",	"radius": 105754921, "pos": [0,24000000,0], "rotate": 0},
    {"id": -110,"name": "Symeon Orbit",	"type": "Orbit",	"radius": 110549768, "pos": [0,24000000,0], "rotate": 0},
    {"id": -120,"name": "Ion Orbit",	"type": "Orbit",	"radius": 123071377, "pos": [0,24000000,0], "rotate": 0}
];

var star_Data = [
    {"id": 0,	"name": "Helios",		"type": "Star",		"radius": 60000, "pos": [0, 24000000, 0]}
];

function move_Moons(cX, cY, cZ, home_Name) {
    //function not being used
    var temp_Coord_Planet = [];
    var temp_New_Coords = [];
    for (ae = 0; ae < planet_Data.length; ae++) {
        if (planet_Data[ae].name === home_Name) {
            //planet is matching moon home
            temp_Coord_Planet = planet_Data[ae].pos;
            break;
        }
    }
    temp_New_Coords[0] = cX - temp_Coord_Planet[0];
    temp_New_Coords[1] = cY - temp_Coord_Planet[1];
    temp_New_Coords[2] = cZ - temp_Coord_Planet[2];
    temp_New_Coords[0] = temp_New_Coords[0] * moon_Distance_Scale;
    temp_New_Coords[1] = temp_New_Coords[1] * moon_Distance_Scale;
    temp_New_Coords[2] = temp_New_Coords[2] * moon_Distance_Scale;
    temp_New_Coords[0] = temp_New_Coords[0] + temp_Coord_Planet[0];
    temp_New_Coords[1] = temp_New_Coords[1] + temp_Coord_Planet[1];
    temp_New_Coords[2] = temp_New_Coords[2] + temp_Coord_Planet[2];
    return [temp_New_Coords[0], temp_New_Coords[1], temp_New_Coords[2]];
}

function move_Moons_Further_Away() {
    var temp_Coord_Planet = [];
    var temp_Coord_Moon = [];
    var temp_New_Coords = [];
    for (ad = 0; ad < moon_Data.length; ad++) {
        //find differnce in pos from home planet and moon, then multiple that distance by a multipler, then add it back to original coord
        for (ae = 0; ae < planet_Data.length; ae++) {
            if (planet_Data[ae].name === moon_Data[ad].home) {
                //planet is matching moon home
                temp_Coord_Planet = planet_Data[ae].pos;
                break;
            }
        }
        temp_Coord_Moon = moon_Data[ad].pos;
        temp_New_Coords[0] = temp_Coord_Moon[0] - temp_Coord_Planet[0];
        temp_New_Coords[1] = temp_Coord_Moon[1] - temp_Coord_Planet[1];
        temp_New_Coords[2] = temp_Coord_Moon[2] - temp_Coord_Planet[2];
        temp_New_Coords[0] = temp_New_Coords[0] * moon_Distance_Scale;
        temp_New_Coords[1] = temp_New_Coords[1] * moon_Distance_Scale;
        temp_New_Coords[2] = temp_New_Coords[2] * moon_Distance_Scale;
        moon_Data[ad].pos[0] = temp_New_Coords[0] + temp_Coord_Planet[0];
        moon_Data[ad].pos[1] = temp_New_Coords[1] + temp_Coord_Planet[1];
        moon_Data[ad].pos[2] = temp_New_Coords[2] + temp_Coord_Planet[2];
    }
}

function updateDistances(event,i) {
    var source = i;

    var datalabels = scene.selectAll(".dynlabel").remove();

    var shapelabel = scene.selectAll(".dynshape");

    shapelabel.append("Text").attr("string", function(d,i) {
        destination = i;
        if (planet_Data[destination].type === "Moon") {
            return;
        }
        if (planet_Data[destination].type === "Orbit") {
            return;
        }

        distance = getDistanceBetween(planet_Data[source].name, planet_Data[destination].name);
        seconds = getTimeFromDistance(distance);
        var estTime = new Date(seconds * 1000).toISOString().substr(11, 8);

        if (distance > 0) {
            labeldist = '"' + distance + 'su - Est: ' + estTime + '"';
        } else {
            labeldist = ' "You are HERE" ';
        }
        return '"' + planet_Data[i].name + '"' + ' "" ' + ' "" ' + labeldist;
    }).append("fontstyle").attr("family", "arial").attr("quality", "3").attr("size", "1.5");

    var newDatalabels = shapelabel;
    newDatalabels.append("appearance").append("material").attr("diffuseColor", function(d,i) {
        destination = i;
        if (source === destination) {
            return "green";
        } else {
            return "white";
        }
    });
}

/**
 * @return {string}
 */
function CalculateDistance(loc1, loc2) {
    var dx = loc1.pos[0] - loc2.pos[0];
    var dy = loc1.pos[1] - loc2.pos[1];
    var dz = loc1.pos[2] - loc2.pos[2];
    return (Math.sqrt(dx * dx + dy * dy + dz * dz)/200000).toFixed(3);
}

function findPlanet(arr, propName, propValue) {
    for (var i=0; i < arr.length; i++) {
        if (arr[i][propName] === propValue) {
            return arr[i];	// will return undefined if not found; you could return a default instead
        }
    }
}

function getDistanceBetween(name1, name2) {
    var p1 = findPlanet(planet_Data, "name", name1);
    var p2 = findPlanet(planet_Data, "name", name2);

    distance = CalculateDistance(p1,p2);
    return distance;
}

function getTimeFromDistance(distance) {
    if (distance <= 0) {
        return 0;
    }
    distance = distance * 200; // Scaling
    seconds = (distance/30000) * 3600; // Seconds scaling
    return seconds;
}

// Helper functions for initializeAxis() and drawAxis()
// -- ? --
// Initialize the axes lines and labels.
function initializePlot() {
    initializeAxis(0);
    initializeAxis(1);
    initializeAxis(2);
}

function initializeAxis(axisIndex) {
    var key = axisKeys[axisIndex];
    drawAxis(axisIndex, key, initialDuration);
}

// Assign key to axis, creating or updating its ticks, grid lines, and labels.
function drawAxis(axisIndex, key, duration) {

    var scale = d3.scale.linear();
    scale.domain([-1000,1000]); // demo data range
    scale.range(axisRange);

    scales[axisIndex] = scale;

    var numTicks = 8;
    var tickSize = 0.1;
    var tickFontSize = 0.5;
}

// Function for generating planet datapoints based on scaling
function planetDatapoints() {
    datapoints = scene.selectAll("datapoint").data(rows_Planet);
    datapoints.exit().remove();
    newDatapoints = datapoints.enter().append("transform").attr("class", "datapoint").attr("scale", function(d,i) {
        pRadius = planet_Data[i].radius/planetScaling;
        return [pRadius, pRadius, pRadius];
    }).append("shape")
    newDatapoints.append("appearance").append("material")
    newDatapoints.append("sphere")
    return newDatapoints
}

// Generate our fuzzy sphere datapoints (clickable spheres)
function fuzzySphereDatapoints() {
    datatours = scene.selectAll("datatour").data(rows_Planet);
    datatours.exit().remove();
    newDataTours = datatours.enter().append("transform").attr("class", "datatour").attr("scale", function(d,i) {
        if (planet_Data[i].type === "Planet") {
            return [tourRadius, tourRadius, tourRadius];
        } else {
            return [0, 0, 0]; //0 radius, or nothing basically
        }
    }).append("shape").attr("onclick", function(d,i) { return "updateDistances(event,"+i+");"});
    newDataTours.append("appearance").append("material");
    newDataTours.append("sphere");
    return newDataTours
}

// Generate the moon datapoints
function moonDatapoints() {
    datapoints_Moon = scene.selectAll("datapoint_Moon").data(rows_Moon);
    datapoints_Moon.exit().remove();
    newDatapoints_Moon = datapoints_Moon.enter().append("transform").attr("class", "datapoint_Moon").attr("scale", function(d,i) {
        mRadius = moon_Data[i].radius/moonScaling;
        return [mRadius, mRadius, mRadius];
    }).append("shape")
    newDatapoints_Moon.append("appearance").append("material")
    newDatapoints_Moon.append("sphere")
    return newDatapoints_Moon
}

// Generate the orbit datapoints
function orbitDatapoints() {
    datapoints_Orbit = scene.selectAll("datapoint_Orbit").data(rows_Orbit);
    datapoints_Orbit.exit().remove();
    newDatapoints_Orbit = datapoints_Orbit.enter().append("transform").attr("scale", function(d,i) {
        oDistance = (orbit_Data[i].radius/ringScaling);
        return [oDistance, oDistance, oDistance];
    }).attr("rotation", function(d,i) {
        return [1,1,0,orbit_Data[i].rotate];
    }).attr("class", "datapoint_Orbit").append("shape")
    /*attr("rotation", function(d,i) {
        return [1,0,0,orbit_Data[i].rotate[0]]
    }).attr("rotation", function(d,i) {
        return [0,1,0,orbit_Data[i].rotate[1]]
    }).attr("rotation", function(d,i) {
        return [0,0,1,orbit_Data[i].rotate[2]]
    })*/
    newDatapoints_Orbit.append("appearance").append("material")
    newDatapoints_Orbit.append("circle2d")
    return newDatapoints_Orbit
}

// Generate our star datapoint
function starDatapoint() {
    datapoints_Star = scene.selectAll("datapoint_Star").data(rows_Star);
    datapoints_Star.exit().remove();
    newDatapoints_Star = datapoints_Star.enter().append("transform").attr("class", "datapoint_Star").attr("scale", [star_Data[0].radius/starScaling, star_Data[0].radius/starScaling, star_Data[0].radius/starScaling]).append("shape")
    newDatapoints_Star.append("appearance").append("material")
    newDatapoints_Star.append("sphere")
    return newDatapoints_Star
}

// Apply globally configured colors to objects
function setDatapointColors(planet, fuzzy, moons, orbits, star) {
    planet.selectAll("material")
        .attr("diffuseColor", planetsDiffuse)
        .attr("emissiveColor", planetsEmissive)

    fuzzy.selectAll("material")
        .attr("diffuseColor", fuzzySpheresDiffuse)
        .attr("emissiveColor", fuzzySpheresEmissive)
        .attr("transparency", fuzzySpheresTransparency)

    moons.selectAll("material")
        .attr("diffuseColor", moonDiffuse)
        .attr("emissiveColor", moonEmissive)

    orbits.selectAll("material")
        .attr("diffuseColor", ringDiffuse)
        .attr("emissiveColor", ringEmmissive)
        .attr("transparency", ringTransparency)

    star.selectAll("material")
        .attr("diffuseColor", starDiffuse)
        .attr("emissiveColor", starEmissive)

}

// Generate initial labels for planets
function generateLabels(){
    var datalabels = scene.selectAll("datalabel").data(rows_Planet);

    datalabels.exit().remove();

    var shapelabel = datalabels.enter().append("transform")
        .attr("class", "datalabel")
        .attr("scale", [sphereRadius*labelscale, sphereRadius*labelscale, sphereRadius*labelscale])
        .append("billboard")
        .attr("render", 'true')
        .attr("axisOfRotation", '0,0,0')
        .append("shape")
        .attr("class", 'dynshape')

    shapelabel.append("Text")
        .attr("string", function(d,i) {
            if (planet_Data[i].type === "Moon") {
                return;
            } else if (planet_Data[i].type === "Planet") {
                return '"' + planet_Data[i].name + '"' + '""' + '""' + '""';
            }
        })
        .attr("class", 'dynlabel')
        .append("fontstyle")
        .attr("family", "arial")
        .attr("quality", "3")
        .attr("size", "1.5");

    return datalabels;
}

// Plot Translations
function plotTranslation(duration, planets, fuzzy, moons, orbits, star, labels) {
    tranpoints = planets.transition();
    trantours =	fuzzy.transition();
    tranpoints_Moon = moons.transition();
    tranpoints_Orbit = orbits.transition();
    tranpoints_Star = star.transition();
    tranlabels = labels.transition();

    tranpoints.ease(ease).duration(duration).attr("translation", function(row) {
        return row[0] + ", " + row[1] + ", " + row[2]});

    trantours.ease(ease).duration(duration).attr("translation", function(row) {
        return row[0] + ", " + row[1] + ", " + row[2]});

    tranpoints_Moon.ease(ease).duration(duration).attr("translation", function(row) {
        return row[0] + ", " + row[1] + ", " + row[2]});

    tranpoints_Orbit.ease(ease).duration(duration).attr("translation", function(row) {
        return row[0] + ", " + row[1] + ", " + row[2]});

    tranpoints_Star.ease(ease).duration(duration).attr("translation", function(row) {
        return 0 + ", " + 8 + ", " + 0});	//not sure why this wasn't working with row[0] &ect, was just undefined.
    tranlabels.ease(ease).duration(duration).attr("translation", function(row) {
        return row[0] + ", " + row[1] + ", " + row[2]});
}

// Update the data points (spheres) and stems.
function plotData(duration) {

    if (!rows_Planet) {
        console.log("no planets to plot.");
        return;
    }

    //planets
    newDatapoints = planetDatapoints();

    //transparent spheres around planets
    newDataTours = fuzzySphereDatapoints();

    //moons
    newDatapoints_Moon = moonDatapoints();

    //orbit
    newDatapoints_Orbit = orbitDatapoints();

    //the star
    newDatapoints_Star = starDatapoint();

    //labels and other stuff like that
    datalabels = generateLabels();

    //color / transparency
    setDatapointColors(newDatapoints, newDataTours, newDatapoints_Moon, newDatapoints_Orbit, newDatapoints_Star);

    // Translation
    plotTranslation(duration, datapoints, datatours, datapoints_Moon, datapoints_Orbit, datapoints_Star, datalabels);
}

function initializeDataGrid_Planet() {
    var coords_Planet = [];
    for (aa = 0; aa < planet_Data.length; aa++) {
        var x=planet_Data[aa].pos[0]/miniscale;
        var y=planet_Data[aa].pos[1]/miniscale;
        var z=planet_Data[aa].pos[2]/miniscale;
        var little_Planet = [x,y,z,"Planet"];
        coords_Planet.push(little_Planet);
    }
    return coords_Planet;
}

function initializeDataGrid_Moon() {
    var coords_Moon = [];
    for (ab = 0; ab < moon_Data.length; ab++) {
        var x=moon_Data[ab].pos[0]/miniscale;
        var y=moon_Data[ab].pos[1]/miniscale;
        var z=moon_Data[ab].pos[2]/miniscale;
        var little_Moon = [x,y,z,"Moon"];
        coords_Moon.push(little_Moon);
    }
    return coords_Moon;
}

function initializeDataGrid_Orbit() {
    var coords_Orbit = [];
    for (ac = 0; ac < orbit_Data.length; ac++) {
        var little_Orbit = [0,8,0,"Orbit"];	//24,000,000 / 3,000,000. this will be the center location
        coords_Orbit.push(little_Orbit);
    }
    return coords_Orbit;
}

function initializeDataGrid_Star() {
    return [star_Data[0].pos[0],star_Data[0].pos[1]/miniscale,star_Data[0].pos[2],"Star"];	//center location for the star
}

function scatterPlot3d(parent) {
    var x3d = parent.append("x3d");
    x3d.style('width', '100%');
    x3d.style('height', '100%');
    x3d.style("border", "inset");

    scene = x3d.append("scene");

    var background = scene.append("Background")
        .attr("crossOrigin","anonymous")
        .attr("leftUrl", "images/bg.png")
        .attr("rightUrl", "images/bg.png")
        .attr("bottomUrl", "images/bg.png")
        .attr("topUrl", "images/bg.png")
        .attr("frontUrl", "images/bg.png")
        .attr("backUrl", "images/bg.png");

    // Camera
    var view = scene.append("viewpoint");
    view.attr("fieldOfView", 0.7);
    view.attr("centerOfRotation", cameraCenterOfRotation);
    view.attr("orientation", cameraOrientation);
    view.attr("position", cameraPosition); // <-> || ^ down || forward back

    move_Moons_Further_Away();

    rows_Planet = initializeDataGrid_Planet(); //planet data
    rows_Moon = initializeDataGrid_Moon(); //moon data
    rows_Orbit = initializeDataGrid_Orbit(); //orbit data
    rows_Star = initializeDataGrid_Star(); //star data

    initializePlot();
    plotData(1000);
}

function open_Options() {
    var temp_id = document.getElementById("menu");
    if (temp_id.style.display === "none") {
        temp_id.style.display = "initial";
    } else {
        temp_id.style.display = "none";
    }
}

function start_Up() {
    scatterPlot3d(d3.select('#plot'));
    document.getElementById("menu").style.display = "none";	//start the menu hidden
    document.getElementById("menu").style.position = "absolute";
    document.getElementById("menu").style.left = "12px";
    document.getElementById("menu").style.top = "46px";
}

function orbitals_Check() {
    var temp_Checkbox_Value = document.getElementById("orbitals_Checkbox");
    if (temp_Checkbox_Value.checked === true) {
        hide_Orbitals = true;
    }
    if (temp_Checkbox_Value.checked === false) {
        hide_Orbitals = false;
    }
    show_Hide_Orbitals(hide_Orbitals);
}

function show_Hide_Orbitals(boo) {
    if (boo === true) {
        newDatapoints_Orbit.selectAll("material").attr("transparency", 1);
    } else
    if (boo === false) {
        newDatapoints_Orbit.selectAll("material").attr("transparency", ringTransparency);
    }
}

function orbitals_Visibility() {
    var temp_orbitDarkness_Value = document.getElementById("orbitals_Visibility");
    set_orbitVisibility(temp_orbitDarkness_Value.value);
}

function set_orbitVisibility(value) {
    ringTransparency = value * 0.01;
    newDatapoints_Orbit.selectAll("material").attr("transparency", ringTransparency);
}