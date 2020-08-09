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
  
var hints = [];
  
function generate() {
    if(dataArray.length === 0) {
        document.getElementById('confirm').innerHTML = "Please select a seed to generate hints.";
    }
    else {
        document.getElementById('gen').style.backgroundColor = "green";
        document.getElementById('gen').disabled = true;
        document.getElementById('confirm').innerHTML = "Hints have been generated! Refresh to play again.";
        document.getElementById('Simulated Twilight Town').disabled = true;
        document.getElementById('100 Acre Wood').disabled = true;
        document.getElementById('Atlantica').disabled = true;
        for(var i = 1; i < 14; i++) {
            document.getElementById('report-' + i).innerHTML = "Click to reveal hint";
        }
        getLists();
        createHints();
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
  
//Create location, reward, and description lists
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
    else {
        var text = document.getElementById('report-' + id);
        text.innerHTML = hints[id - 1];
        document.getElementById(id).style.backgroundColor = "green";
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
    "000000E2", "000000E3", "000000E4", "000000E5", "000000E6", "000000E7", "000000E8", "000000E9", "000000EA", "000000EB", "000000EC", "000000ED", "000000EE"
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

function writeHint(world, number) {
    if(number === 1) {
        var hint = world + " has " + number + " important check.";
    }
    else {
        var hint = world + " has " + number + " important checks.";
    }
    return hint;
}

function createHints() {
    var AW = createWorldList(AcreWood);
    var AWnumber = numberOfChecks(AW);

    var STT = createWorldList(SimulatedTwilightTown);
    var STTnumber = numberOfChecks(STT);

    var TT = createWorldList(TwilightTown);
    var TTnumber = numberOfChecks(TT);

    var HB = createWorldList(HollowBastion);
    var HBnumber = numberOfChecks(HB);

    var BC = createWorldList(BeastsCastle);
    var BCnumber = numberOfChecks(BC);

    var OC = createWorldList(OlympusColiseum);
    var OCnumber = numberOfChecks(OC);

    var AG = createWorldList(Agrabah);
    var AGnumber = numberOfChecks(AG);

    var LOD = createWorldList(LandOfDragons);
    var LODnumber = numberOfChecks(LOD);

    var PL = createWorldList(PrideLands);
    var PLnumber = numberOfChecks(PL);

    var DC = createWorldList(DisneyCastle);
    var DCnumber = numberOfChecks(DC);

    var HT = createWorldList(HalloweenTown);
    var HTnumber = numberOfChecks(HT);

    var PR = createWorldList(PortRoyal);
    var PRnumber = numberOfChecks(PR);

    var SP = createWorldList(SpaceParanoids);
    var SPnumber = numberOfChecks(SP);

    var TWTNW = createWorldList(TheWorldThatNeverWas);
    var TWTNWnumber = numberOfChecks(TWTNW);

    var DF = createWorldList(Forms);
    var DFnumber = numberOfChecks(DF);

    var LU = createWorldList(Levels);
    var LUnumber = numberOfChecks(LU);
    
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
        hints.push(writeHint(allworlds[i], worldChecks[allworlds[i]]));
    }

}

//Remove world from list of possible hints
function exclude(id) {
    if(document.getElementById(id).checked) {
        for(var i = 0; i < allworlds.length; i++) {
            if(allworlds[i] === id) {
                allworlds.splice(i, 1);
            }
        }
    }
    else {
        allworlds.push(id);
    }
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

var SimulatedTwilightTown = [
    "11CE016E",
    "11CE017A",
    "11CE0186",
    "11CE0192",
    "11CE019E",
    "11CE01AA",
    "11CE01B6",
    "11CE01C2",
    "11CE01CE",
    "11CE01DA",
    "11CE01E6",
    "11CE01F2",
    "11CE01FE",
    "11CE020A",
    "11CE0216",
    "11CE0222",
    "21D10FA8",
    "21D10CB8",
    "21D11278",
    "11CE0636",
    "11CE0606",
    "11CE0612",
    "11CE061E",
    "11CE062A",
    "11CE0642",
    "11CE064E",

    "11CE0B0A" //data roxas
]

var TwilightTown = [
    "11CE022E",
    "11CE023A",
    "11CE0246",
    "11CE0252",
    "11CE025E",
    "11CE026A",
    "11CE0276",
    "11CE0282",
    "11CE028E",
    "11CE029A",
    "11CE02A6",
    "11CE02B2",
    "11CE02BE",
    "11CE02CA",
    "11CE02D6",
    "11CE02E2",
    "11CE02EE",
    "11CE02FA",
    "11CE0306",
    "11CE0312",
    "11CE031E",
    "11CE032A",
    "11CE0336",
    "11CE0342",
    "11CE034E",
    "11CE035A",
    "11CE0366",
    "11CE0372",
    "11CE037E",
    "11CE038A",
    "11CE0396",
    "11CE03A2",
    "11CE03AE",
    "11CE03BA",
    "11CE03C6",
    "11CE03D2",
    "11CE03DE",
    "11CE03EA",
    "11CE03F6",
    "21D110E8",
    "11CE065A",
    "11CE0666",
    "11CE0672",
    "11CE067E",
    "11CE07E6",
    "11CE07F2",
    "11CE07FE",
    "11CE0966",
    "11CE09AE",
    "11CE0A0E",

    "11CE0ACE" //data axel
]

var HollowBastion = [
    "11CDFF3A",
    "11CDFF46",
    "11CDFF52",
    "11CDFF5E",
    "11CDFF6A",
    "11CDFF76",
    "11CDFF82",
    "11CDFF8E",
    "11CDFF9A",
    "11CDFFA6",
    "11CDFFB2",
    "11CDFFBE",
    "11CDFFCA",
    "11CDFFD6",
    "11CDFFE2",
    "11CDFFEE",
    "11CDFFFA",
    "11CE0006",
    "11CE0012",
    "11CE001E",
    "11CE002A",
    "11CE0036",
    "21D10E98",
    "21D10BA8",
    "21D11068",
    "11CE068A",
    "11CE0696",
    "11CE06A2",
    "11CE0702",
    "11CE080A",
    "11CE0822",
    "11CE082E",
    "11CE083A",
    "11CE0936",
    "11CE0942",
    "11CE09A2",
    "11CE09EA",
    "11CE0B3A",
    "11CE0B2E",

    "11CE04E6", //cor
    "11CE04F2",
    "11CE04FE",
    "11CE050A",
    "11CE0516",
    "11CE0522",
    "11CE052E",
    "11CE053A",
    "11CE0546",
    "11CE0552",
    "11CE055E",
    "11CE056A",
    "11CE0576",
    "11CE0582",
    "11CE058E",
    "11CE059A",
    "11CE05A6",
    "11CE05B2",
    "11CE05BE",
    "11CE05CA",
    "11CE05D6",

    "11CE0AB6" //data demyx
]

var LandOfDragons = [
    "11CDF72A",
    "11CDF736",
    "11CDF742",
    "11CDF74E",
    "11CDF75A",
    "11CDF766",
    "11CDF772",
    "11CDF77E",
    "11CDF78A",
    "11CDF796",
    "11CDF7A2",
    "11CDF7AE",
    "11CDF7BA",
    "11CDF7C6",
    "11CDF7D2",
    "11CDF7DE",
    "11CDF7EA",
    "11CDF7F6",
    "11CDF802",
    "11CDF80E",
    "11CDF81A",
    "21D10DF8",
    "21D108C8",
    "21D10908",
    "11CE06D2",
    "11CE06C6",
    "11CE06DE",
    "11CE06EA",

    "11CE0AE6" //data xigbar
]

var BeastsCastle = [
    "11CDFBF2",
    "11CDFBFE",
    "11CDFC0A",
    "11CDFC16",
    "11CDFC22",
    "11CDFC2E",
    "11CDFC3A",
    "11CDFC46",
    "11CDFC52",
    "11CDFC5E",
    "11CDFC6A",
    "11CDFC76",
    "11CDFC82",
    "11CDFC8E",
    "11CDFC9A",
    "11CDFCA6",
    "11CDFCB2",
    "11CDFCBE",
    "11CDFCCA",
    "11CDFCD6",
    "11CDFCE2",
    "21D10758",
    "21D10788",
    "21D107C8",
    "11CE06F6",
    "11CE0852",
    "11CE085E",
    "11CE09C6",

    "11CE0AC2" //data xaldin
]

var OlympusColiseum = [
    "11CDFB02",
    "11CDFB0E",
    "11CDFB1A",
    "11CDFB26",
    "11CDFB32",
    "11CDFB3E",
    "11CDFB4A",
    "11CDFB56",
    "11CDFB62",
    "11CDFB6E",
    "11CDFB7A",
    "11CDFB86",
    "11CDFB92",
    "11CDFB9E",
    "11CDFBAA",
    "11CDFBB6",
    "11CDFBC2",
    "11CDFBCE",
    "11CDFBDA",
    "11CDFBE6",
    "21D10808",
    "21D10FE8",
    "21D10828",
    "21D10858",
    "21D10888",
    "11CE070E",
    "11CE071A",
    "11CE09D2",
    "11CE0726",
    "11CE0882",
    "11CE088E",

    "11CE073E", //cups
    "11CE074A",
    "11CE07CE",
    "11CE07DA",
    "11CE089A",
    "11CE08A6",
    "11CE094E",
    "11CE095A",
    "11CE0996", //hades cup

    "11CE0A56", //AS zexion
    "11CE0A92" //data zexion
]

var DisneyCastle = [
    "11CDF9B2",
    "11CDF9BE",
    "11CDF9CA",
    "11CDF9D6",
    "11CDF9E2",
    "11CDF9EE",
    "11CDF9FA",
    "11CDFA06",
    "21D10D28",
    "11CE0756",
    "11CE0B16",
    "11CE0B22",

    "11CDF95E", //timeless river
    "11CDF96A",
    "11CDF976",
    "11CDF982",
    "11CDF98E",
    "11CDF99A",
    "11CDF9A6",
    "21D10988",
    "21D109B8",
    "11CE076E",
    "11CE0732",
    "11CE0762",

    "11CE0A6E", //AS marluxia
    "11CE0AAA" //data marluxia
]

var PortRoyal = [
    "11CDFE3E",
    "11CDFE4A",
    "11CDFE56",
    "11CDFE62",
    "11CDFE6E",
    "11CDFE7A",
    "11CDFE86",
    "11CDFE92",
    "11CDFE9E",
    "11CDFEAA",
    "11CDFEB6",
    "11CDFEC2",
    "11CDFECE",
    "11CDFEDA",
    "11CDFEE6",
    "11CDFEF2",
    "11CDFEFE",
    "11CDFF0A",
    "11CDFF16",
    "11CDFF22",
    "11CDFF2E",
    "21D110B8",
    "21D10AA8",
    "21D11028",
    "21D10AE8",
    "11CE077A",
    "11CE0786",
    "11CE086A",
    "11CE0876",
    "11CE09DE",

    "11CE0AFE" //data luxord
]

var Agrabah = [
    "11CDF826",
    "11CDF832",
    "11CDF83E",
    "11CDF84A",
    "11CDF856",
    "11CDF862",
    "11CDF86E",
    "11CDF87A",
    "11CDF886",
    "11CDF892",
    "11CDF89E",
    "11CDF8AA",
    "11CDF8B6",
    "11CDF8C2",
    "11CDF8CE",
    "11CDF8DA",
    "11CDF8E6",
    "11CDF8F2",
    "11CDF8FE",
    "11CDF90A",
    "11CDF916",
    "11CDF922",
    "11CDF92E",
    "11CDF93A",
    "11CDF946",
    "11CDF952",
    "21D10DB8",
    "21D10CE8",
    "21D10978",
    "11CE0792",
    "11CE079E",
    "11CE08B2",

    "11CE0A4A", //AS lexaeus
    "11CE0A86" //data lexaeus
]

var HalloweenTown = [
    "11CDFD96",
    "11CDFDA2",
    "11CDFDAE",
    "11CDFDBA",
    "11CDFDC6",
    "11CDFDD2",
    "11CDFDDE",
    "11CDFDEA",
    "11CDFDF6",
    "11CDFE02",
    "11CDFE0E",
    "11CDFE1A",
    "11CDFE26",
    "11CDFE32",
    "21D109E8",
    "11CE07AA",
    "11CE08BE",
    "11CE08CA",
    "11CE08D6",

    "11CE0A3E", //AS vexen
    "11CE0A7A" //data vexen
]

var PrideLands = [
    "11CE0042",
    "11CE004E",
    "11CE005A",
    "11CE0066",
    "11CE0072",
    "11CE007E",
    "11CE008A",
    "11CE0096",
    "11CE00A2",
    "11CE00AE",
    "11CE00BA",
    "11CE00C6",
    "11CE00D2",
    "11CE00DE",
    "11CE00EA",
    "11CE00F6",
    "11CE0102",
    "11CE010E",
    "11CE011A",
    "11CE0126",
    "11CE0132",
    "11CE013E",
    "11CE014A",
    "11CE0156",
    "11CE0162",
    "21D10C18",
    "11CE07B6",
    "11CE07C2",

    "11CE0AF2" //data saix
]

var Atlantica = [
    "11CE0846",
    "11CE08E2",
    "11CE08EE",
    "11CE08FA",
    "11CE0A62", //AS larxene
    "11CE0A9E" //data larxene
]

var AcreWood = [
    "11CDFA12",
    "11CDFA1E",
    "11CDFA2A",
    "11CDFA36",
    "11CDFA42",
    "11CDFA4E",
    "11CDFA5A",
    "11CDFA66",
    "11CDFA72",
    "11CDFA7E",
    "11CDFA8A",
    "11CDFA96",
    "11CDFAA2",
    "11CDFAAE",
    "11CDFABA",
    "11CDFAC6",
    "11CDFAD2",
    "11CDFADE",
    "11CDFAEA",
    "11CDFAF6",
    "11CE0906",
    "11CE0912",
    "11CE091E",
    "11CE092A"
]

var SpaceParanoids = [
    "11CDFCEE",
    "11CDFCFA",
    "11CDFD06",
    "11CDFD12",
    "11CDFD1E",
    "11CDFD2A",
    "11CDFD36",
    "11CDFD42",
    "11CDFD4E",
    "11CDFD5A",
    "11CDFD66",
    "11CDFD72",
    "11CDFD7E",
    "11CDFD8A",
    "21D10C38",
    "21D11078",
    "21D10C78",
    "11CE0816"
]

var TheWorldThatNeverWas = [
    "11CE0402",
    "11CE040E",
    "11CE041A",
    "11CE0426",
    "11CE0432",
    "11CE043E",
    "11CE044A",
    "11CE0456",
    "11CE0462",
    "11CE046E",
    "11CE047A",
    "11CE0486",
    "11CE0492",
    "11CE049E",
    "11CE04AA",
    "11CE04B6",
    "11CE04C2",
    "11CE04CE",
    "11CE04DA",
    "21D111E8",
    "21D10B58",
    "11CE0972",
    "11CE097E",
    "11CE098A",
    "11CE09BA",
    "11CE09F6",
    "11CE0A02",
    "11CE0A1A",
    "11CE0A26",
    "11CE0A32",

    "11CE0ADA" //data xemnas
]

var Forms = [
    "11D1A22E", //valor
    "11D1A236",
    "11D1A23E",
    "11D1A246",
    "11D1A24E",
    "11D1A256",
    "11D1A266", //wisdom
    "11D1A26E",
    "11D1A276",
    "11D1A27E",
    "11D1A286",
    "11D1A28E",
    "11D1A29E", //limit
    "11D1A2A6",
    "11D1A2AE",
    "11D1A2B6",
    "11D1A2BE",
    "11D1A2C6",
    "11D1A2D6", //master
    "11D1A2DE",
    "11D1A2E6",
    "11D1A2EE",
    "11D1A2F6",
    "11D1A2FE",
    "11D1A30E", //Final
    "11D1A316",
    "11D1A31E",
    "11D1A326",
    "11D1A32E",
    "11D1A336"
]

var Levels = [
    "11D0B6C0", //Lvl 2
    "11D0B6E0", //Lvl 4
    "11D0B710", //Lvl 7
    "11D0B730", //Lvl 9
    "11D0B740", //Lvl 10
    "11D0B760", //Lvl 12
    "11D0B780", //Lvl 14
    "11D0B790", //Lvl 15
    "11D0B7B0", //Lvl 17
    "11D0B7E0", //Lvl 20
    "11D0B810", //Lvl 23
    "11D0B830", //Lvl 25
    "11D0B860", //Lvl 28
    "11D0B880", //Lvl 30
    "11D0B8A0", //Lvl 32
    "11D0B8C0", //Lvl 34
    "11D0B8E0", //Lvl 36
    "11D0B910", //Lvl 39
    "11D0B930", //Lvl 41
    "11D0B960", //Lvl 44
    "11D0B980", //Lvl 46
    "11D0B9A0", //Lvl 48
    "11D0B9C0" //Lvl 50
]