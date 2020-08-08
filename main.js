//CSV functions from MounirMesselmeni
function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
      // FileReader are supported.
      getAsText(files[0]);
    } 
    else {
        alert('FileReader are not supported in this browser.');
    }
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

var descriptionList = [];
  
var keys = { 
    "100 Acre Wood" : "Sweet Memories",
    "Absent Silhouette" : "Ultima Weapon",
    "Atlantica" : "Mysterious Abyss",
    "Data Organization XIII" : "Ultima Weapon", 
    "Agrabah" : "Wishing Lamp",
    "Beast's Castle" : "Rumbling Rose",
    "Hollow Bastion" : "Sleeping Lion", 
    "Cavern of Remembrance" : "Sleeping Lion", 
    "Critical Extra" : "Star Seeker",
    "Disney Castle" : "Monochrome",
    "Timeless River" : "Monochrome", 
    "Form" : "Two Become One",
    "Halloween Town" : "Decisive Pumpkin", 
    "Land of Dragons" : "Hidden Dragon",
    "Level Up" : "Gull Wing",
    "Olympus Colisseum" : "Hero's Crest", 
    "Olympus Colisseum (Cups)" : "Hero's Crest", 
    "Port Royal" : "Follow the Wind",
    "Pride Lands" : "Circle of Life", 
    "Simulated Twilight Town" : "Oathkeeper", 
    "Twilight Town" : "Oathkeeper", 
    "Space Paranoids" : "Photon Debugger", 
    "The World That Never Was" : "Oblivion" 
};

var worlds = { 
    "100 Acre Wood" : "in 100 Acre Wood",
    "Absent Silhouette" : "from an Absent Silhouette",
    "Atlantica" : "in Atlantica",
    "Data Organization XIII" : "from a Data Org member", 
    "Agrabah" : "in Agrabah",
    "Beast's Castle" : "in Beast's Castle",
    "Hollow Bastion" : "in Hollow Bastion", 
    "Cavern of Remembrance" : "in Hollow Bastion", 
    "Critical Extra" : "from a critical bonus",
    "Disney Castle" : "in Disney Castle",
    "Keyblade" : "from a keyblade",
    "Timeless River" : "in Timeless River", 
    "Form" : "from a Drive Form",
    "Halloween Town" : "in Halloween Town", 
    "Land of Dragons" : "in Land of Dragons",
    "Level Up" : "in Sora's Heart",
    "Olympus Colisseum" : "in Olympus Coliseum", 
    "Olympus Colisseum (Cups)" : "in Olympus Coliseum", 
    "Port Royal" : "in Port Royal",
    "Pride Lands" : "in Pride Lands", 
    "Simulated Twilight Town" : "in Simulated Twilight Town", 
    "Twilight Town" : "in Twilight Town", 
    "Space Paranoids" : "in Space Paranoids", 
    "The World That Never Was" : "in The World That Never Was" 
};

var magic = ["Fire", "Blizzard", "Thunder", "Cure", "Reflect", "Magnet"];
var summons = ["Baseball Charm (Chicken Little)", "Lamp Charm (Genie)", "Ukulele Charm (Stitch)", "Feather Charm (Peter Pan)"];
var forms = ["Valor Form", "Wisdom Form", "Limit Form", "Master Form", "Final Form"];
var abilities = ["Berserk Charge", "Horizontal Slash", "Negative Combo"];
  
var prooflocations = [];
  
var hints = [];
  
function generate() {
    if(dataArray.length === 0) {
        document.getElementById('confirm').innerHTML = "Please select a spoiler log to generate hints.";
    }
    else {
        document.getElementById('gen').style.backgroundColor = "green";
        document.getElementById('confirm').innerHTML = "Hints have been generated! Refresh to play again.";
        for(var i = 1; i < 14; i++) {
            document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
        }
        getLists();
        //getHints(); //Guiding Key Hints
        createHints(); //SpikeVegeta's Hints
    }
}
  
function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
  
//Create location, reward, and description lists
function getLists() {
    for(var i = 0; i < dataArray.length; i++) {
      var item = dataArray[i].toString();
      var row = item.split(',');
      locationList.push(row[0]);
      rewardList.push(row[3]);
      descriptionList.push(row[1]);
    }
}
  
//Get world of specified item
function getLocation(item) {
    for(var i = 0; i < rewardList.length; i++) {
      if(rewardList[i] === item) {
        return locationList[i];
      }
    }
}

//Get multiple locations of one item (magic and torn pages)
function getMultipleLocations(item) {
    var array = [];
    for(var i = 0; i < rewardList.length; i++) {
        if(rewardList[i] === item) {
            array.push(locationList[i]);
        }
    }
    return array;
}

//Check if any proofs are in a specific location/world
function locationCheck(proofs, location) {
    var proof = false;
    for(var i = 0; i < proofs.length; i++) {
        if(proofs[i] === location) {
            proof = true;
        }
    }
    return proof;
}

function writeHint(item, location) {
    var hint = item + " is " + worlds[location];
    return hint;
}

/*
Guiding Key Hints
3 guiding keys x 2 copies
3 forms
4 random items
proof in atlantica guarantees a thunder and magnet hint
proof in 100 acre wood guarantees at least 2 torn page hints
guarantee hint problem: program may grab same magic element or same torn page
*/
  
function getHints() {
    prooflocations.push(getLocation("Proof of Connection"));
    prooflocations.push(getLocation("Proof of Peace"));
    prooflocations.push(getLocation("Proof of Nonexistence"));

    var keylocations = [getLocation(keys[prooflocations[0]]), getLocation(keys[prooflocations[1]]), getLocation(keys[prooflocations[2]])]

    hints.push("There's a guiding key " + worlds[keylocations[0]]);
    hints.push("There's a guiding key " + worlds[keylocations[1]]);
    hints.push("There's a guiding key " + worlds[keylocations[2]]);
    hints.push("There's a guiding key " + worlds[keylocations[0]]);
    hints.push("There's a guiding key " + worlds[keylocations[1]]);
    hints.push("There's a guiding key " + worlds[keylocations[2]]);
    
    if(Boolean(locationCheck(prooflocations, "Cavern of Remembrance"))) {
        hints.push(writeHint("Wisdom Form", getLocation("Wisdom Form")));
        hints.push(writeHint("Master Form", getLocation("Master Form")));
        hints.push(writeHint("Final Form", getLocation("Final Form")));
    }
    else {
        var shuffledForms = shuffle(forms);
        hints.push(writeHint(shuffledForms[0], getLocation(shuffledForms[0])));
        hints.push(writeHint(shuffledForms[1], getLocation(shuffledForms[1])));
        hints.push(writeHint(shuffledForms[2], getLocation(shuffledForms[2])));
    }

    if(Boolean(locationCheck(prooflocations, "Atlantica"))) {
        var magnets = getMultipleLocations("Magnet");
        var shuffmagnets = shuffle(magnets);
        var thunders = getMultipleLocations("Thunder");
        var shuffthunders = shuffle(thunders);
        hints.push(writeHint("Magnet", shuffmagnets[0]));
        hints.push(writeHint("Thunder", shuffthunders[0]));

        var items = magic.concat(summons, abilities);
        items.push("Torn Page");
        var shuffitems = shuffle(items);
        hints.push(writeHint(shuffitems[0], getLocation(shuffitems[0])));
        hints.push(writeHint(shuffitems[1], getLocation(shuffitems[1])));
    }
    else if(Boolean(locationCheck(prooflocations, "100 Acre Wood"))) {
        var tornpages = getMultipleLocations("Torn Page");
        var shuffpages = shuffle(tornpages);
        hints.push(writeHint("Torn Page", shuffpages[0]));
        hints.push(writeHint("Torn Page", shuffpages[1]));

        var items = magic.concat(summons, abilities);
        items.push("Torn Page");
        var shuffitems = shuffle(items);
        hints.push(writeHint(shuffitems[0], getLocation(shuffitems[0])));
        hints.push(writeHint(shuffitems[1], getLocation(shuffitems[1])));
    }
    else {
        var items = magic.concat(summons, abilities);
        items.push("Torn Page");
        var shuffitems = shuffle(items);
        hints.push(writeHint(shuffitems[0], getLocation(shuffitems[0])));
        hints.push(writeHint(shuffitems[1], getLocation(shuffitems[1])));
        hints.push(writeHint(shuffitems[2], getLocation(shuffitems[2])));
        hints.push(writeHint(shuffitems[3], getLocation(shuffitems[3])));
    }

    hints = shuffle(hints);
}

function reveal(id) {
    if(dataArray.length === 0) {
        document.getElementById('report-' + id).innerHTML = "Please select a spoiler log to generate hints.";
    }
    else {
        var text = document.getElementById('report-' + id);
        //text.innerHTML = hints[id - 1]; //Guiding Key Hint System
        text.innerHTML = testhints[id - 1]; //SpikeVegeta's Hint System
        document.getElementById(id).style.backgroundColor = "green";
    }
}


/*
Spikevegeta's Hint System
Hint tells how many important checks in a world.
*/

var testhints = [];

var keyItems = [
"Valor Form", "Wisdom Form", "Limit Form", "Master Form", "Final Form", 
"Fire", "Blizzard", "Thunder", "Cure", "Reflect", "Magnet",
"Baseball Charm (Chicken Little)", "Lamp Charm (Genie)", "Ukulele Charm (Stitch)", "Feather Charm (Peter Pan)",
"Secret Ansem's Report 1", "Secret Ansem's Report 2", "Secret Ansem's Report 3", "Secret Ansem's Report 4", "Secret Ansem's Report 5", "Secret Ansem's Report 6", "Secret Ansem's Report 7",
"Secret Ansem's Report 8", "Secret Ansem's Report 9", "Secret Ansem's Report 10", "Secret Ansem's Report 11", "Secret Ansem's Report 12", "Secret Ansem's Report 13",
"Proof of Connection", "Proof of Peace", "Proof of Nonexistence", "Torn Page"
]

//Create list of checks from world
function createWorldList(world) {
    var checks = [];
    for(var i = 0; i < locationList.length; i++) {
        if(locationList[i] === world) {
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

//Separate function to get level up rewards
function levelList() {
    var checks = [];
    for(var i = 0; i < descriptionList.length; i++) {
        if(descriptionList[i].toString().includes("Sword")) {
            checks.push(rewardList[i]);
        }
    }
    return checks;
}

function write(world, number) {
    if(number === 1) {
        var hint = world + " has " + number + " important check.";
    }
    else {
        var hint = world + " has " + number + " important checks.";
    }
    return hint;
}

//TODO: Determine where to put datas
function createHints() {
    var AW = createWorldList("100 Acre Wood");
    var AWnumber = numberOfChecks(AW);

    var STT = createWorldList("Simulated Twilight Town");
    var STTnumber = numberOfChecks(STT);

    var TT = createWorldList("Twilight Town");
    var TTnumber = numberOfChecks(TT);

    var HB = createWorldList("Hollow Bastion");
    var COR = createWorldList("Cavern of Remembrance");
    HB = HB.concat(COR);
    var HBnumber = numberOfChecks(HB);

    var BC = createWorldList("Beast's Castle");
    var BCnumber = numberOfChecks(BC);

    var OC = createWorldList("Olympus Colisseum");
    var cups = createWorldList("Olympus Colisseum (Cups)");
    OC = OC.concat(cups);
    var OCnumber = numberOfChecks(OC);

    var AG = createWorldList("Agrabah");
    var AGnumber = numberOfChecks(AG);

    var LOD = createWorldList("Land of Dragons");
    var LODnumber = numberOfChecks(LOD);

    var PL = createWorldList("Pride Lands");
    var PLnumber = numberOfChecks(PL);

    var DC = createWorldList("Disney Castle");
    var TR = createWorldList("Timeless River");
    DC = DC.concat(TR);
    var DCnumber = numberOfChecks(DC);

    var HT = createWorldList("Halloween Town");
    var HTnumber = numberOfChecks(HT);

    var PR = createWorldList("Port Royal");
    var PRnumber = numberOfChecks(PR);

    var SP = createWorldList("Space Paranoids");
    var SPnumber = numberOfChecks(SP);

    var TWTNW = createWorldList("The World That Never Was");
    var TWTNWnumber = numberOfChecks(TWTNW);

    var DF = createWorldList("Form");
    var DFnumber = numberOfChecks(DF);

    var LU = levelList();
    var LUnumber = numberOfChecks(LU);

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
    
    var worldChecks = {
        "100 Acre Wood" : AWnumber,
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

    allworlds = shuffle(allworlds);

    for(var i = 0; i < 13; i++) {
        testhints.push(write(allworlds[i], worldChecks[allworlds[i]]));
    }

}