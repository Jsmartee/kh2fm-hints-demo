function load(elem) {
    elem.nextElementSibling.click();
}

//CSV functions from MounirMesselmeni
function handleFiles(elem, files) {
    // Check for the various File API support.
    if (window.FileReader) {
      // FileReader are supported.
      getAsText(files[0]);
    } 
    else {
        alert('FileReader are not supported in this browser.');
    }

    elem.nextElementSibling.innerText = files[0].name;
    elem.previousElementSibling.classList.add("success");
}
  
function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}
  
function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}
  
var dataArray = [];
  
function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(';');
      var tarr = [];
      for (var j=0; j<data.length; j++) {
        tarr.push(data[j]);
      }
      lines.push(tarr);
    }
    dataArray = lines;
    //console.log(lines);
}
  
function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      alert("Cannot read file!");
    }
}
//End CSV functions

var locationList = [];
var rewardList = [];
  
var hints = [];
var savedhints = [];

var seed;

var lists = [];
var alllists = [];
var worlds = [];
var worldAndList = [];

function start() {
    alllists.push(AcreWood, SimulatedTwilightTown, TwilightTown, HollowBastion, BeastsCastle, 
        OlympusColiseum, Agrabah, LandOfDragons, PrideLands, DisneyCastle, 
        HalloweenTown, PortRoyal, SpaceParanoids, TheWorldThatNeverWas, Forms, Levels, Atlantica);

    lists.push(AcreWood, SimulatedTwilightTown, TwilightTown, HollowBastion, BeastsCastle, 
        OlympusColiseum, Agrabah, LandOfDragons, PrideLands, DisneyCastle, 
        HalloweenTown, PortRoyal, SpaceParanoids, TheWorldThatNeverWas, Forms, Levels);

    var creatinglists = {
        "100 Acre Wood": AcreWood,
        "Simulated Twilight Town" : SimulatedTwilightTown,
        "Twilight Town" : TwilightTown,
        "Hollow Bastion" : HollowBastion,
        "Beast's Castle" : BeastsCastle,
        "Olympus Coliseum" : OlympusColiseum,
        "Agrabah" : Agrabah,
        "Land of Dragons" : LandOfDragons,
        "Pride Lands" : PrideLands,
        "Disney Castle" : DisneyCastle,
        "Halloween Town" : HalloweenTown,
        "Port Royal" : PortRoyal,
        "Space Paranoids" : SpaceParanoids,
        "The World That Never Was" : TheWorldThatNeverWas,
        "Drive Forms" : Forms,
        "Sora's Heart" : Levels,
        "Atlantica" : Atlantica,
    }

    worlds = Object.keys(creatinglists);

    worldAndList = creatinglists;
}
  
function generate() {
    if(dataArray.length === 0) {
        document.getElementById('confirmGen').innerHTML = "Please select a seed to generate hints.";
    }
    else {
        document.getElementById("gen").classList.add("success");
        document.getElementById('gen').disabled = true;
        document.getElementById('confirmGen').innerHTML = "Hints have been generated! Refresh to play again.";
        document.getElementById('confirmShare').innerHTML = "Hints have been generated! Click Save Hints to send them to other players.";
        document.getElementById('page').disabled = true;
        document.getElementById('report').disabled = true;
        document.getElementById('abilities').disabled = true;
        document.getElementById('final').disabled = true;
        document.getElementById('Simulated Twilight Town').disabled = true;
        document.getElementById('100 Acre Wood').disabled = true;
        document.getElementById('Atlantica').disabled = true;
        for(var i = 1; i < 14; i++) {
            document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
        }
        getLists();
        createHints();
        var seedName = dataArray[0].toString().split('');
        seed = seedName[3].concat(seedName[4], seedName[5], seedName[6]);
    }
}

function save() {
    var blob = new Blob(savedhints, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "kh2fm-hints-" + seed + ".txt");
}

function uploadHints() {
    var row = dataArray[0].toString().split('.');
    row.pop();
    for(var i = 0; i < row.length; i++) {
        var index = row[i].toString().split(',');
        var code = index[0];
        var number = parseInt(index[1]) - 32;
        for(var j = 0; j < alllists.length; j++) {
            if(alllists[j].includes(code)) {
                var world = worlds[j];
            }
        }
        hints.push(writeHint(world, number));
    }
    document.getElementById("upload-btn").classList.add("success");
    document.getElementById('upload-btn').disabled = true;
    document.getElementById('gen').disabled = true;
    document.getElementById('confirmShare').innerHTML = "Hints have been uploaded! Refresh to play again.";
    document.getElementById('confirmGen').innerHTML = "Hints have been uploaded! Refresh to play again.";
    document.getElementById('page').disabled = true;
    document.getElementById('report').disabled = true;
    document.getElementById('abilities').disabled = true;
    document.getElementById('final').disabled = true;
    document.getElementById('Simulated Twilight Town').disabled = true;
    document.getElementById('100 Acre Wood').disabled = true;
    document.getElementById('Atlantica').disabled = true;
    for(var i = 1; i < 14; i++) {
        document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
  
//Create location and reward lists
function getLists() {
    for(var i = 0; i < dataArray.length; i++) {
      var item = dataArray[i].toString();
      var row = item.split(',');
      locationList.push(row[2]);
      rewardList.push(row[4]);
    }
}

function reveal(id) {
    if(dataArray.length === 0) {
        document.getElementById('report-' + id).innerHTML = "Please select a seed to generate hints.";
    }
    else if(hints.length === 0) {
        document.getElementById('report-' + id).innerHTML = "Hints have not been generated.";
    }
    else {
        var text = document.getElementById('report-' + id);
        text.innerHTML = hints[id - 1];
        document.getElementById(id).classList.add("success");
    }
}

/*
Spikevegeta's Hint System
Hint tells how many important checks in a world.
*/

var keyItems = [
    //Proofs and Promise Charm
    "00000251", "00000252", "00000253", "0000020C",

    //Drive Forms
    "0000001A", "0000001B", "00000233", "0000001F", "0000001D",

    //Summons
    "0000017F", "00000019", "0000009F", "000000A0",

    //Magic
    "00000015", "00000016", "00000017", "00000018", "00000057", "00000058",

    //Torn Pages
    "00000020",

    //Ansem Reports
    "000000E2", "000000E3", "000000E4", "000000E5", "000000E6", "000000E7", "000000E8", "000000E9", "000000EA", "000000EB", "000000EC", "000000ED", "000000EE",
];

var ansemReports = [
    "000000E2", "000000E3", "000000E4", "000000E5", "000000E6", "000000E7", "000000E8", "000000E9", "000000EA", "000000EB", "000000EC", "000000ED", "000000EE"
];

var tornPages = [
    "00000020"
];

var abilities = [
    "0000019F", "000001A0" //Second Chance & Once More
];

var finalform = [
    "0000001D"
]

var proofs = [
    "00000251", "00000252", "00000253" //connection, nonexistence, peace
];

//Create list of rewards from world
function createWorldList(world) {
    var checks = [];
    for(var i = 0; i < locationList.length; i++) {
        if(world.includes(locationList[i])) {
            checks.push(rewardList[i]);
        }
    }
    return checks;
}

//Get number of important checks in world
function numberOfChecks(world) {
    var number = 0;
    for(var i = 0; i < world.length; i++) {
        if(keyItems.includes(world[i])) {
            number++;
        }
    }
    return number;
}

var proofLocations = [];

//See if world/location has a proof
function getProofs(world) {
    var proof = false;
    for(var i = 0; i < world.length; i++) {
        if(world.includes(proofs[0]) || world.includes(proofs[1]) || world.includes(proofs[2])) {
            proof = true;
        }
    }
    return proof;
}

//Prioritize worlds/locations with proofs
function sortWorldLists(proof, worldName) {
    if(proof) {
        proofLocations.push(worldName);
        var index = allworlds.indexOf(worldName);
        allworlds.splice(index, 1);
    }
}

var reportLocations = [];

//finds location of item
function findLocation(item) {
    var locationCode;
    var location;
    for(var i = 0; i < rewardList.length; i++) {
        if(rewardList[i] === item) {
            for(var j = 0; j < alllists.length; j++) {
                if(alllists[j].includes(locationList[i])) { //this check is mainly for levels
                    locationCode = locationList[i];
                }
            }
        }
    }
    console.log(locationCode);
    for(var j = 0; j < alllists.length; j++) {
        if(alllists[j].includes(locationCode)) {
            location = Object.keys(worldAndList).find(key => worldAndList[key] === alllists[j]);
        }
    }
    console.log(location);
    return location;
}

function writeHintReport(world, number, reportNumber, reportLocation) {
    switch(number) {
        case 0:
            var hint = world + " is a heartless choice.";
            break;
        
        case 1:
            var hint = world + " has " + number + " important check.";
            break;
        
        default:
            var hint = world + " has " + number + " important checks.";
            break;
    }

    switch(reportNumber) {
        case 13:
            var hint2 = " Report 1 is from " + reportLocations[0];
            break;

        default:
            var hint2 = " Report " + (reportNumber + 1) + " is from " + reportLocation;
    }

    hint = hint.concat(hint2);
    return hint;
}

function writeHint(world, number) {
    switch(number) {
        case 0:
            var hint = world + " is a heartless choice.";
            break;
        
        case 1:
            var hint = world + " has " + number + " important check.";
            break;
        
        default:
            var hint = world + " has " + number + " important checks.";
            break;
    }
    return hint;
}

function createHints() {
    var AW = createWorldList(AcreWood);
    var AWcode = AcreWood[Math.floor(Math.random() * 4)];
    var AWproof = getProofs(AW);
    sortWorldLists(AWproof, "100 Acre Wood");
    var AWnumber = numberOfChecks(AW);

    var AT = createWorldList(Atlantica);
    var ATcode = Atlantica[Math.floor(Math.random() * 4)];
    var ATproof = getProofs(AT);
    sortWorldLists(ATproof, "Atlantica");
    var ATnumber = numberOfChecks(AT);

    var STT = createWorldList(SimulatedTwilightTown);
    var STTcode = SimulatedTwilightTown[Math.floor(Math.random() * 4)];
    var STTproof = getProofs(STT);
    sortWorldLists(STTproof, "Simulated Twilight Town");
    var STTnumber = numberOfChecks(STT);

    var TT = createWorldList(TwilightTown);
    var TTcode = TwilightTown[Math.floor(Math.random() * 4)];
    var TTproof = getProofs(TT);
    sortWorldLists(TTproof, "Twilight Town");
    var TTnumber = numberOfChecks(TT);

    var HB = createWorldList(HollowBastion);
    var HBcode = HollowBastion[Math.floor(Math.random() * 4)];
    var HBproof = getProofs(HB);
    sortWorldLists(HBproof, "Hollow Bastion");
    var HBnumber = numberOfChecks(HB);

    var BC = createWorldList(BeastsCastle);
    var BCcode = BeastsCastle[Math.floor(Math.random() * 4)];
    var BCproof = getProofs(BC);
    sortWorldLists(BCproof, "Beast's Castle");
    var BCnumber = numberOfChecks(BC);

    var OC = createWorldList(OlympusColiseum);
    var OCcode = OlympusColiseum[Math.floor(Math.random() * 4)];
    var OCproof = getProofs(OC);
    sortWorldLists(OCproof, "Olympus Coliseum");
    var OCnumber = numberOfChecks(OC);

    var AG = createWorldList(Agrabah);
    var AGcode = Agrabah[Math.floor(Math.random() * 4)];
    var AGproof = getProofs(AG);
    sortWorldLists(AGproof, "Agrabah");
    var AGnumber = numberOfChecks(AG);

    var LOD = createWorldList(LandOfDragons);
    var LODcode = LandOfDragons[Math.floor(Math.random() * 4)];
    var LODproof = getProofs(LOD);
    sortWorldLists(LODproof, "Land of Dragons");
    var LODnumber = numberOfChecks(LOD);

    var PL = createWorldList(PrideLands);
    var PLcode = PrideLands[Math.floor(Math.random() * 4)];
    var PLproof = getProofs(PL);
    sortWorldLists(PLproof, "Pride Lands");
    var PLnumber = numberOfChecks(PL);

    var DC = createWorldList(DisneyCastle);
    var DCcode = DisneyCastle[Math.floor(Math.random() * 4)];
    var DCproof = getProofs(DC);
    sortWorldLists(DCproof, "Disney Castle");
    var DCnumber = numberOfChecks(DC);

    var HT = createWorldList(HalloweenTown);
    var HTcode = HalloweenTown[Math.floor(Math.random() * 4)];
    var HTproof = getProofs(HT);
    sortWorldLists(HTproof, "Halloween Town");
    var HTnumber = numberOfChecks(HT);

    var PR = createWorldList(PortRoyal);
    var PRcode = PortRoyal[Math.floor(Math.random() * 4)];
    var PRproof = getProofs(PR);
    sortWorldLists(PRproof, "Port Royal");
    var PRnumber = numberOfChecks(PR);

    var SP = createWorldList(SpaceParanoids);
    var SPcode = SpaceParanoids[Math.floor(Math.random() * 4)];
    var SPproof = getProofs(SP);
    sortWorldLists(SPproof, "Space Paranoids");
    var SPnumber = numberOfChecks(SP);

    var TWTNW = createWorldList(TheWorldThatNeverWas);
    var TWTNWcode = TheWorldThatNeverWas[Math.floor(Math.random() * 4)];
    var TWTNWproof = getProofs(TWTNW);
    sortWorldLists(TWTNWproof, "The World That Never Was");
    var TWTNWnumber = numberOfChecks(TWTNW);

    var DF = createWorldList(Forms);
    var DFcode = Forms[Math.floor(Math.random() * 4)];
    var DFproof = getProofs(DF);
    sortWorldLists(DFproof, "Drive Forms");
    var DFnumber = numberOfChecks(DF);

    var LU = createWorldList(Levels);
    var LUcode = Levels[Math.floor(Math.random() * 4)];
    var LUproof = getProofs(LU);
    sortWorldLists(LUproof, "Sora's Heart");
    var LUnumber = numberOfChecks(LU);
    
    var worldChecks = {
        "100 Acre Wood" : AWnumber,
        "Atlantica" : ATnumber,
        "Simulated Twilight Town" : STTnumber, 
        "Twilight Town" : TTnumber, 
        "Hollow Bastion" : HBnumber,
        "Beast's Castle" : BCnumber, 
        "Olympus Coliseum" : OCnumber,
        "Agrabah" : AGnumber, 
        "Land of Dragons" : LODnumber,
        "Pride Lands" : PLnumber,
        "Disney Castle" : DCnumber,
        "Halloween Town" : HTnumber,
        "Port Royal" : PRnumber,
        "Space Paranoids" : SPnumber,
        "The World That Never Was" : TWTNWnumber,
        "Drive Forms" : DFnumber,
        "Sora's Heart" : LUnumber
    }

    var codeChecks = {
        "100 Acre Wood" : AWcode,
        "Atlantica" : ATcode,
        "Simulated Twilight Town" : STTcode, 
        "Twilight Town" : TTcode, 
        "Hollow Bastion" : HBcode,
        "Beast's Castle" : BCcode, 
        "Olympus Coliseum" : OCcode,
        "Agrabah" : AGcode, 
        "Land of Dragons" : LODcode,
        "Pride Lands" : PLcode,
        "Disney Castle" : DCcode,
        "Halloween Town" : HTcode,
        "Port Royal" : PRcode,
        "Space Paranoids" : SPcode,
        "The World That Never Was" : TWTNWcode,
        "Drive Forms" : DFcode,
        "Sora's Heart" : LUcode 
    }

    shuffallworlds = shuffle(allworlds);

    var worlds = proofLocations.concat(shuffallworlds);
    var selectedworlds = [];
    for(var k = 0; k < 13; k++) {
        selectedworlds.push(worlds[k]);
    }

    selectedworlds = shuffle(selectedworlds);

    //get report locations
    for(var j = 0; j < ansemReports.length; j++) {
        reportLocations.push(findLocation(ansemReports[j]));
    }

    if(document.getElementById('ReportOption').checked) {
        for(var i = 0; i < 13; i++) {
            hints.push(writeHintReport(selectedworlds[i], worldChecks[selectedworlds[i]], i + 1, reportLocations[i + 1]));
            savedhints.push(codeChecks[selectedworlds[i]] + "," + (worldChecks[selectedworlds[i]] + 32) + ".");
        }
    }
    else {
        for(var i = 0; i < 13; i++) {
            hints.push(writeHint(selectedworlds[i], worldChecks[selectedworlds[i]]));
            savedhints.push(codeChecks[selectedworlds[i]] + "," + (worldChecks[selectedworlds[i]] + 32) + ".");
        }
    }

}

//Include or exclude category of items from key items
function include(id) {
    if(document.getElementById(id).checked) {
        switch(id) {
            case 'page':
                keyItems = keyItems.concat(tornPages);
                break;

            case 'report':
                keyItems = keyItems.concat(ansemReports);
                break;

            case 'abilities':
                keyItems = keyItems.concat(abilities);
                break;

            case 'final':
                keyItems = keyItems.concat(finalform);
        }
    }
    else {
        switch(id) {
            case 'page':
                var index = keyItems.indexOf(tornPages[0]);
                keyItems.splice(index, 1);
                break;

            case 'report':
                var index = keyItems.indexOf(ansemReports[0]);
                keyItems.splice(index, 13);
                break;

            case 'abilities':
                var index = keyItems.indexOf(abilities[0]);
                keyItems.splice(index, 2);    
                break;

            case 'final':
                var index = keyItems.indexOf(finalform[0]);
                keyItems.splice(index, 1);    
                break;
        }
    }
    console.log(keyItems);
}

//Remove world from list of possible hints
function exclude(id) {
    var list = worldAndList[id];
    if(!document.getElementById(id).checked) {
        for(var i = 0; i < allworlds.length; i++) {
            if(allworlds[i] === id) {
                allworlds.splice(i, 1);
                for(var j = 0; j < lists.length; j++) {
                    if(lists[j] === list) {
                        lists.splice(j, 1);
                    }
                }
            }
        }
    }
    else {
        allworlds.push(id);
        lists.push(list);
    }
    console.log(allworlds);
}

var allworlds = [
    "100 Acre Wood", 
    "Simulated Twilight Town", 
    "Twilight Town", 
    "Hollow Bastion", 
    "Beast's Castle", 
    "Olympus Coliseum", 
    "Agrabah", 
    "Land of Dragons", 
    "Pride Lands",
    "Disney Castle", 
    "Halloween Town", 
    "Port Royal", 
    "Space Paranoids", 
    "The World That Never Was", 
    "Drive Forms", 
    "Sora's Heart"
];
