var locationList = [];
var rewardList = [];
  
var hints = [];
var savedhints = [];

var seed;

var lists = [];
var alllists = [];
var worlds = [];
var worldAndList = [];

function init() {
    start();
    update();
}

function update() {
    var updates = document.getElementsByClassName('update');
    for(var i = 0; i < updates.length; i++) {
        updates[i].innerHTML = "Last Updated 8/29/21";
    }
}

function start() {
    //all lists of codes
    alllists.push(AcreWood, SimulatedTwilightTown, TwilightTown, HollowBastion, BeastsCastle, 
        OlympusColiseum, Agrabah, LandOfDragons, PrideLands, DisneyCastle, 
        HalloweenTown, PortRoyal, SpaceParanoids, TheWorldThatNeverWas, Forms, Levels, Atlantica, Free);

    //default list of worlds/locations
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
        "Free" : Free
    }

    worlds = Object.keys(creatinglists);

    worldAndList = creatinglists;

    document.getElementById('promisecharm').checked = false;
    document.getElementById('page').checked = true;
    document.getElementById('report').checked = true;
    document.getElementById('abilities').checked = true;
    document.getElementById('final').checked = true;
    document.getElementById('cure').checked = true;
    document.getElementById("Sora's Heart").checked = true;
    document.getElementById('Simulated Twilight Town').checked = true;
    document.getElementById('100 Acre Wood').checked = true;
    document.getElementById('Atlantica').checked = false;

    //document.getElementById('save-btn').disabled = true;
}

function openPopout() {
    window.open("popout.html", "scrollbars=yes, resizable=yes", "width=600, height=700");
}
  
function generate() {
    if(dataArray.length === 0) {
        document.getElementById('confirmGen').innerHTML = "Please select a seed to generate hints.";
    }
    else {
        document.getElementById("gen").classList.add("success");
        document.getElementById('gen').disabled = true;
        document.getElementById('confirmGen').innerHTML = "Hints have been generated! To play another seed, refresh the page.";
        document.getElementById('confirmShare').innerHTML = "Hints have been generated! Click Save Hints to send them to other players.";
        document.getElementById('promisecharm').disabled = true;
        document.getElementById('page').disabled = true;
        document.getElementById('report').disabled = true;
        document.getElementById('abilities').disabled = true;
        document.getElementById('final').disabled = true;
        document.getElementById('cure').disabled = true;
        document.getElementById("Sora's Heart").disabled = true;
        document.getElementById('Simulated Twilight Town').disabled = true;
        document.getElementById('100 Acre Wood').disabled = true;
        document.getElementById('Atlantica').disabled = true;
        for(var i = 1; i < 14; i++) {
            document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
        }
        getLists();
        createHints();
        
        var seedName = dataArray[0].toString().split('');
        if(seedName.length === 0) {
            seed = "seed";
        }
        else {
            seed = seedName[3].concat(seedName[4], seedName[5], seedName[6]);
        }
        //document.getElementById('save-btn').disabled = false;
    }
}

function save() {
    var blob = new Blob(savedhints, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "kh2fm-hints-" + seed + ".hint");
}

function uploadHints(button) {
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

    var row2 = dataArray[1].toString().split('.');
    for(var i = 0; i < row2.length; i++) {
        var index = row2[i].toString().split(',');
        var code = index[0];
        for(var j = 0; j < alllists.length; j++) {
            if(alllists[j].includes(code)) {
                var world = worlds[j];
                reportLocations.push(world);
            }
        }
    }

    if(document.getElementById(button).id === "upload-btn") {
        document.getElementById("upload-btn").classList.add("success");
        document.getElementById('upload-btn').disabled = true;
        document.getElementById('gen').disabled = true;
        document.getElementById('confirmShare').innerHTML = "Hints have been uploaded! To play another seed, refresh the page.";
        document.getElementById('confirmGen').innerHTML = "Hints have been uploaded! To play another seed, refresh the page.";
        document.getElementById('promisecharm').disabled = true;
        document.getElementById('page').disabled = true;
        document.getElementById('report').disabled = true;
        document.getElementById('abilities').disabled = true;
        document.getElementById('final').disabled = true;
        document.getElementById('cure').disabled = true;
        document.getElementById("Sora's Heart").disabled = true;
        document.getElementById('Simulated Twilight Town').disabled = true;
        document.getElementById('100 Acre Wood').disabled = true;
        document.getElementById('Atlantica').disabled = true;
    }
    else {
        document.getElementById("popout-upload-btn").classList.add("success");
        document.getElementById('popout-upload-btn').disabled = true;
    }

    for(var i = 1; i < 14; i++) {
        document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
    }

    document.getElementById("hintSettings").innerHTML = dataArray[2].toString();
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

var high = false;
//Create location and reward lists
function getLists() {
    for(var i = 0; i < dataArray.length; i++) {
      var item = dataArray[i].toString();
      var row = item.split(',');
      locationList.push(row[2]);
      rewardList.push(row[4]);
      if(row[0] === "//Remove High Jump LVl") {
          high = true;
      }
    }
}

var tries = [0,0,0,0,0,0,0,0,0,0,0,0,0];

function reveal(id) {
    if(dataArray.length === 0) {
        document.getElementById('report-' + id).innerHTML = "No file has been selected.";
    }
    else if(hints.length === 0) {
        document.getElementById('report-' + id).innerHTML = "Hints have not been generated.";
    }
    else {
        var text = document.getElementById('report-' + id);
        var location = document.getElementById("report-" + id + "-location").value;
        if(location === reportLocations[id - 1]) {
            text.innerHTML = hints[id - 1];
            document.getElementById(id).classList.add("success");
            document.getElementById("report-" + id + "-location").disabled = true;
        }
        else {
            tries[id - 1]++;
            if(tries[id - 1] === 3) {
                document.getElementById(id).disabled = true;
                document.getElementById('report-' + id).innerHTML = "Number of tries exceeded. Button disabled.";
                document.getElementById("report-" + id + "-location").disabled = true;
            }
            else {
                document.getElementById('report-' + id).innerHTML = "Number of tries remaining: " + (3 - tries[id - 1]);
            }
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
                break;
            
            case 'cure':
                keyItems = keyItems.concat(cure);
                break;

            case 'promisecharm':
                keyItems = keyItems.concat(charm);
                break;
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

            case 'cure':
                var index = keyItems.indexOf(cure[0]);
                keyItems.splice(index, 1);
                break;

            case 'promisecharm':
                var index = keyItems.indexOf(charm[0]);
                keyItems.splice(index, 1);
                break;
        }
    }
    console.log(keyItems);
}

//Remove or include world from list of possible hints
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

/*
Spikevegeta's Hint System
Hint tells how many important checks in a world.
*/

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

//See if world/location has a form
function getForms(world) {
    var form = false;
    for(var i = 0; i < world.length; i++) {
        if(world.includes(forms[0]) || world.includes(forms[1]) || world.includes(forms[2]) || world.includes(forms[3]) || world.includes(forms[4])) {
            form = true;
        }
    }
    return form;
}

//See if world/location has a torn page
function getPages(world) {
    var page = false;
    for(var i = 0; i < world.length; i++) {
        if(world.includes(tornPages[0])) {
            page = true;
        }
    }
    return page;
}

var reportLocations = [];
var reportLocationCodes = [];

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
    for(var j = 0; j < alllists.length; j++) {
        if(alllists[j].includes(locationCode)) {
            location = Object.keys(worldAndList).find(key => worldAndList[key] === alllists[j]);
        }
    }
    if(ansemReports.includes(item)) {
        reportLocationCodes.push(locationCode);
    }
    return location;
}

var proofLocations = ["placeholder1", "placeholder2", "placeholder3"];
//List proofs by type
function sortProofLocations(proof, worldRewards, world) {
    if(proof) {
        if(worldRewards.includes("00000251")) {
            proofLocations[0] = world;
        }
        if(worldRewards.includes("00000252")) {
            proofLocations[1] = world;
        }
        if(worldRewards.includes("00000253")) {
            proofLocations[2] = world;
        }
    }
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

var AW;
var AT;
var STT;
var TT;
var HB;
var BC;
var OC;
var AG;
var LOD;
var PL;
var DC;
var HT;
var PR;
var SP;
var TWTNW;
var DF;
var LU;
var FreeList;

function createHints() {
    //create list of rewards in world
    //select random code to be ID for world
    //see if proof is in world
    //add proof worlds to list
    //prioritize world if there's a proof
    //get number of important checks in world

    AW = createWorldList(AcreWood);
    var AWcode = AcreWood[Math.floor(Math.random() * 4)];
    var AWproof = getProofs(AW);
    sortProofLocations(AWproof, AW, "100 Acre Wood");
    prioritizeWorld(AWproof, "100 Acre Wood");
    var AWnumber = numberOfChecks(AW);

    //vanilla check
    if(AW.length === 0) {
        if(keyItems.includes("00000018")) {
            AW.push("00000018");
            AWnumber++;
        }
    }

    AT = createWorldList(Atlantica);
    var ATcode = Atlantica[Math.floor(Math.random() * 4)];
    var ATproof = getProofs(AT);
    sortProofLocations(ATproof, AT, "Atlantica");
    prioritizeWorld(ATproof, "Atlantica");
    var ATnumber = numberOfChecks(AT);

    //vanilla check
    if(AT.length === 0) {
        AT.push("00000016");
        ATnumber++;
    }

    STT = createWorldList(SimulatedTwilightTown);
    var STTcode = SimulatedTwilightTown[Math.floor(Math.random() * 4)];
    var STTproof = getProofs(STT);
    sortProofLocations(STTproof, STT, "Simulated Twilight Town");
    prioritizeWorld(STTproof, "Simulated Twilight Town");
    var STTnumber = numberOfChecks(STT);

    TT = createWorldList(TwilightTown);
    var TTcode = TwilightTown[Math.floor(Math.random() * 4)];
    var TTproof = getProofs(TT);
    sortProofLocations(TTproof, TT, "Twilight Town");
    prioritizeWorld(TTproof, "Twilight Town");
    var TTnumber = numberOfChecks(TT);

    //vanilla check
    if(TT.length === 0) {
        if(keyItems.includes("000000E3")) {
            TT.push("000000E3");
            TT.push("000000EB");
            TTnumber = TTnumber + 2;
        }
        TT.push("0000001A");
        TT.push("00000233");
        TTnumber = TTnumber + 2;
    }

    HB = createWorldList(HollowBastion);
    var HBcode = HollowBastion[Math.floor(Math.random() * 4)];
    var HBproof = getProofs(HB);
    sortProofLocations(HBproof, HB, "Hollow Bastion");
    prioritizeWorld(HBproof, "Hollow Bastion");
    var HBnumber = numberOfChecks(HB);

    //vanilla check
    if(!locationList.includes(vanillaHollowBastion[0])) {
        if(keyItems.includes("000000E2")) {
            HB.push("000000E2");
            HB.push("000000E8");
            HBnumber = HBnumber + 2;
        }
        if(keyItems.includes("00000020")) {
            HB.push("00000020");
            HBnumber++;
        }
        if(keyItems.includes("00000018")) {
            HB.push("00000018");
            HBnumber++;
        }
        HB.push("00000019");
        HB.push("0000017F");
        HB.push("00000015");
        HB.push("00000016");
        HB.push("00000016");
        HB.push("0000001F");
        HBnumber = HBnumber + 6;
    }

    BC = createWorldList(BeastsCastle);
    var BCcode = BeastsCastle[Math.floor(Math.random() * 4)];
    var BCproof = getProofs(BC);
    sortProofLocations(BCproof, BC, "Beast's Castle");
    prioritizeWorld(BCproof, "Beast's Castle");
    var BCnumber = numberOfChecks(BC);

    //vanilla check
    if(BC.length === 0) {
        if(keyItems.includes("00000018")) {
            BC.push("00000018");
            BCnumber++;
        }
        if(keyItems.includes("000000E5")) {
            BC.push("000000E5");
            BCnumber++;
        }
        BC.push("00000058");
        BCnumber++;
    }

    OC = createWorldList(OlympusColiseum);
    var OCcode = OlympusColiseum[Math.floor(Math.random() * 4)];
    var OCproof = getProofs(OC);
    sortProofLocations(OCproof, OC, "Olympus Coliseum");
    prioritizeWorld(OCproof, "Olympus Coliseum");
    var OCnumber = numberOfChecks(OC);

    //vanilla check
    if(!locationList.includes(vanillaOlympusColiseum[0])) {
        if(keyItems.includes("000000E6")) {
            OC.push("000000E6");
            OCnumber++;
        }
        OC.push("00000017");
        OCnumber++
    }

    AG = createWorldList(Agrabah);
    var AGcode = Agrabah[Math.floor(Math.random() * 4)];
    var AGproof = getProofs(AG);
    sortProofLocations(AGproof, AG, "Agrabah");
    prioritizeWorld(AGproof, "Agrabah");
    var AGnumber = numberOfChecks(AG);

    //vanilla check
    if(AG.length === 0) {
        if(keyItems.includes("00000020")) {
            AG.push("00000020");
            AGnumber++;
        }
        AG.push("00000015");
        AG.push("0000009F");
        AGnumber = AGnumber + 2;
    }

    LOD = createWorldList(LandOfDragons);
    var LODcode = LandOfDragons[Math.floor(Math.random() * 4)];
    var LODproof = getProofs(LOD);
    sortProofLocations(LODproof, LOD, "Land of Dragons");
    prioritizeWorld(LODproof, "Land of Dragons");
    var LODnumber = numberOfChecks(LOD);

    //vanilla check
    if(LOD.length === 0) {
        if(keyItems.includes("00000020")) {
            LOD.push("00000020");
            LODnumber++;
        }
        LOD.push("00000017");
        LODnumber++;
    }

    PL = createWorldList(PrideLands);
    var PLcode = PrideLands[Math.floor(Math.random() * 4)];
    var PLproof = getProofs(PL);
    sortProofLocations(PLproof, PL, "Pride Lands");
    prioritizeWorld(PLproof, "Pride Lands");
    var PLnumber = numberOfChecks(PL);

    //vanilla check
    if(PL.length === 0) {
        if(keyItems.includes("00000020")) {
            PL.push("00000020");
            PLnumber++;
        }
        PL.push("00000017");
        PL.push("00000015");
        PLnumber = PLnumber + 2;
    }

    DC = createWorldList(DisneyCastle);
    var DCcode = DisneyCastle[Math.floor(Math.random() * 4)];
    var DCproof = getProofs(DC);
    sortProofLocations(DCproof, DC, "Disney Castle");
    prioritizeWorld(DCproof, "Disney Castle");
    var DCnumber = numberOfChecks(DC);

    //vanilla check
    if(!locationList.includes(vanillaDisneyCastle[0])) {
        if(keyItems.includes("00000020")) {
            DC.push("00000020");
            DCnumber++;
        }
    }

    //vanilla check
    if(!locationList.includes(vanillaTimelessRiver[0])) {
        DC.push("00000058");
        DC.push("0000001B");
        DCnumber = DCnumber + 2;
    }

    HT = createWorldList(HalloweenTown);
    var HTcode = HalloweenTown[Math.floor(Math.random() * 4)];
    var HTproof = getProofs(HT);
    sortProofLocations(HTproof, HT, "Halloween Town");
    prioritizeWorld(HTproof, "Halloween Town");
    var HTnumber = numberOfChecks(HT);

    //vanilla check
    if(HT.length === 0) {
        HT.push("00000057");
        HTnumber++;
    }

    PR = createWorldList(PortRoyal);
    var PRcode = PortRoyal[Math.floor(Math.random() * 4)];
    var PRproof = getProofs(PR);
    sortProofLocations(PRproof, PR, "Port Royal");
    prioritizeWorld(PRproof, "Port Royal");
    var PRnumber = numberOfChecks(PR);

    //vanilla check
    if(PR.length === 0) {
        if(keyItems.includes("000000E7")) {
            PR.push("000000E7");
            PRnumber++;
        }
        PR.push("00000057");
        PR.push("000000A0");
        PRnumber = PRnumber + 2;
    }

    SP = createWorldList(SpaceParanoids);
    var SPcode = SpaceParanoids[Math.floor(Math.random() * 4)];
    var SPproof = getProofs(SP);
    sortProofLocations(SPproof, SP, "Space Paranoids");
    prioritizeWorld(SPproof, "Space Paranoids");
    var SPnumber = numberOfChecks(SP);

    //vanilla check
    if(SP.length === 0) {
        SP.push("00000058");
        SPnumber++;
    }

    TWTNW = createWorldList(TheWorldThatNeverWas);
    var TWTNWcode = TheWorldThatNeverWas[Math.floor(Math.random() * 4)];
    var TWTNWproof = getProofs(TWTNW);
    sortProofLocations(TWTNWproof, TWTNW, "The World That Never Was");
    prioritizeWorld(TWTNWproof, "The World That Never Was");
    var TWTNWnumber = numberOfChecks(TWTNW);

    //vanilla check
    if(TWTNW.length === 0) {
        if(keyItems.includes("000000E4")) {
            TWTNW.push("000000E4");
            TWTNW.push("000000E9");
            TWTNW.push("000000EA");
            TWTNW.push("000000EC");
            TWTNW.push("000000ED");
            TWTNW.push("000000EE");
            TWTNWnumber = TWTNWnumber + 6;
        }
        TWTNW.push("00000057");
        TWTNWnumber++;
    }

    DF = createWorldList(Forms);
    var DFcode = Forms[Math.floor(Math.random() * 4)];
    var DFproof = getProofs(DF);
    sortProofLocations(DFproof, DF, "Drive Forms");
    prioritizeWorld(DFproof, "Drive Forms");
    var DFnumber = numberOfChecks(DF);

    LU = createWorldList(Levels);
    var LUcode = Levels[Math.floor(Math.random() * 4)];
    var LUproof = getProofs(LU);
    sortProofLocations(LUproof, LU, "Sora's Heart");
    prioritizeWorld(LUproof, "Sora's Heart");
    var LUnumber = numberOfChecks(LU);

    //vanilla check
    if(!locationList.includes("11D0B710")) {
        if(keyItems.includes("0000019F")) {
            LU.push("0000019F");
            LU.push("000001A0");
            LUnumber = LUnumber + 2;
        }
    }

    FreeList = createWorldList(Free);
    var Fcode = Free[Math.floor(Math.random() * 4)];
    var Fproof = getProofs(FreeList);
    sortProofLocations(Fproof, FreeList, "Free");

    if(DFproof) {
        prioritizeForms();
    }

    if(AWproof || document.getElementById('hintTornPages').checked) {
        prioritizePages();
    }

    if(ATproof) {
        prioritizeAtlantica();
    }
    
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
        "Sora's Heart" : LUcode,
        "Free" : Fcode
    }

    shuffallworlds = shuffle(allworlds);

    var worlds = priorityWorlds.concat(shuffallworlds);
    var selectedworlds = [];
    for(var k = 0; k < 13; k++) {
        selectedworlds.push(worlds[k]);
    }

    selectedworlds = shuffle(selectedworlds);

    //get report locations
    for(var j = 0; j < ansemReports.length; j++) {
        var reportPlacement = findLocation(ansemReports[j]);
        if(reportPlacement === undefined) {
            reportPlacement = vanillaReports[j];
        }
        reportLocations.push(reportPlacement);
    }

    //check for connection hint locked on terra or peace hint locked on shroom
    selectedworlds = checkTerraShroomReports(selectedworlds);

    //check that reports pointing to proofs are hinted
    selectedworlds = hintProofReports(selectedworlds);

    if(high) {
        for(var i = 0; i < 13; i++) {
            hints.push(writeHint(selectedworlds[i], 0));
        }
    }
    else {
        for(var i = 0; i < 13; i++) {
            hints.push(writeHint(selectedworlds[i], worldChecks[selectedworlds[i]]));
            savedhints.push(codeChecks[selectedworlds[i]] + "," + (worldChecks[selectedworlds[i]] + 32) + ".");
        }
    }

    //Write saved hints files
    savedhints.push("\n");
    for(var i = 0; i < 13; i++) {
        savedhints.push(codeChecks[reportLocations[i]] + ".");
    }

    savedhints.push("\n");
    savedhints.push("Shared Hint Settings: - ");

    if(document.getElementById('promisecharm').checked) {
        savedhints.push("Promise Charm - ")
    }
    if(document.getElementById('abilities').checked) {
        savedhints.push("Second Chance & Once More - ");
    }
    if(document.getElementById('page').checked) {
        savedhints.push("Torn Pages - ");
    }
    if(document.getElementById('report').checked) {
        savedhints.push("Secret Ansem Reports - ");
    }
    if(document.getElementById('cure').checked) {
        savedhints.push("Cure - ")
    }
    if(document.getElementById('final').checked) {
        savedhints.push("Final Form - ");
    }
    if(document.getElementById("Sora's Heart").checked) {
        savedhints.push("Sora's Heart - ");
    }
    if(document.getElementById("Simulated Twilight Town").checked) {
        savedhints.push("Simulated Twilight Town - ");
    }
    if(document.getElementById('100 Acre Wood').checked) {
        savedhints.push("100 Acre Wood - ");
    }
    if(document.getElementById('Atlantica').checked) {
        savedhints.push("Atlantica - ");
    }
}