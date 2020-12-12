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

var priorityWorlds = [];
//Prioritize worlds/locations with proofs and/or drive forms and/or torn pages
function prioritizeWorld(item, worldName) {
    if(item && !priorityWorlds.includes(worldName)) {
        priorityWorlds.push(worldName);
        var index = allworlds.indexOf(worldName);
        allworlds.splice(index, 1);
    }
}

function prioritizeForms() {
    var AWform = getForms(AW);
    prioritizeWorld(AWform, "100 Acre Wood");

    var ATform = getForms(AT);
    prioritizeWorld(ATform, "Atlantica");

    var STTform = getForms(STT);
    prioritizeWorld(STTform, "Simulated Twilight Town");

    var TTform = getForms(TT);
    prioritizeWorld(TTform, "Twilight Town");

    var HBform = getForms(HB);
    prioritizeWorld(HBform, "Hollow Bastion");

    var BCform = getForms(BC);
    prioritizeWorld(BCform, "Beast's Castle");

    var OCform = getForms(OC);
    prioritizeWorld(OCform, "Olympus Coliseum");

    var AGform = getForms(AG);
    prioritizeWorld(AGform, "Agrabah");

    var LODform = getForms(LOD);
    prioritizeWorld(LODform, "Land of Dragons");

    var PLform = getForms(PL);
    prioritizeWorld(PLform, "Pride Lands");

    var DCform = getForms(DC);
    prioritizeWorld(DCform, "Disney Castle");

    var HTform = getForms(HT);
    prioritizeWorld(HTform, "Halloween Town");

    var PRform = getForms(PR);
    prioritizeWorld(PRform, "Port Royal");

    var SPform = getForms(SP);
    prioritizeWorld(SPform, "Space Paranoids");

    var TWTNWform = getForms(TWTNW);
    prioritizeWorld(TWTNWform, "The World That Never Was");

    var DFform = getForms(DF);
    prioritizeWorld(DFform, "Drive Forms");

    var LUform = getForms(LU);
    prioritizeWorld(LUform, "Sora's Heart");
}

function prioritizePages() {
    var AWpage = getPages(AW);
    prioritizeWorld(AWpage, "100 Acre Wood");

    var ATpage = getPages(AT);
    prioritizeWorld(ATpage, "Atlantica");

    var STTpage = getPages(STT);
    prioritizeWorld(STTpage, "Simulated Twilight Town");

    var TTpage = getPages(TT);
    prioritizeWorld(TTpage, "Twilight Town");

    var HBpage = getPages(HB);
    prioritizeWorld(HBpage, "Hollow Bastion");

    var BCpage = getPages(BC);
    prioritizeWorld(BCpage, "Beast's Castle");

    var OCpage = getPages(OC);
    prioritizeWorld(OCpage, "Olympus Coliseum");

    var AGpage = getPages(AG);
    prioritizeWorld(AGpage, "Agrabah");

    var LODpage = getPages(LOD);
    prioritizeWorld(LODpage, "Land of Dragons");

    var PLpage = getPages(PL);
    prioritizeWorld(PLpage, "Pride Lands");

    var DCpage = getPages(DC);
    prioritizeWorld(DCpage, "Disney Castle");

    var HTpage = getPages(HT);
    prioritizeWorld(HTpage, "Halloween Town");

    var PRpage = getPages(PR);
    prioritizeWorld(PRpage, "Port Royal");

    var SPpage = getPages(SP);
    prioritizeWorld(SPpage, "Space Paranoids");

    var TWTNWpage = getPages(TWTNW);
    prioritizeWorld(TWTNWpage, "The World That Never Was");

    var DFpage = getPages(DF);
    prioritizeWorld(DFpage, "Drive Forms");

    var LUpage = getPages(LU);
    prioritizeWorld(LUpage, "Sora's Heart");
}

var shroomReport;
var shroomHint;
var terraReport;
var terraHint;

function checkTerraShroomReports(worlds) {
    var hintedWorlds = worlds;

    if(reportLocationCodes.includes("11CE0B16")) {
        terraReport = true;
        var indexTerra1 = reportLocationCodes.indexOf("11CE0B16");
        if(hintedWorlds[indexTerra1] === proofLocations[0]) {
            terraHint = true;
        }
    }
    if(reportLocationCodes.includes("11CE0B22")) {
        terraReport = true;
        var indexTerra2 = reportLocationCodes.indexOf("11CE0B22");
        if(hintedWorlds[indexTerra2] === proofLocations[0]) {
            terraHint = true;
        }
    }
    if(reportLocationCodes.includes("11CE0B3A")) {
        shroomReport = true;
        var indexShroom1 = reportLocationCodes.indexOf("11CE0B3A");
        if(hintedWorlds[indexShroom1] === proofLocations[2]) {
            shroomHint = true;
        }
    }
    if(reportLocationCodes.includes("11CE0B2E")) {
        shroomReport = true;
        var indexShroom2 = reportLocationCodes.indexOf("11CE0B2E");
        if(hintedWorlds[indexShroom2] === proofLocations[2]) {
            shroomHint = true;
        }
    }

    if(terraHint || shroomHint) {
        while(terraHint || shroomHint) {
            hintedWorlds = shuffle(hintedWorlds);
            if(hintedWorlds[indexTerra1] === proofLocations[0] || hintedWorlds[indexTerra2] === proofLocations[0]) {
                terraHint = true;
            }
            else {
                terraHint = false;
            }
            if(hintedWorlds[indexShroom1] === proofLocations[2] || hintedWorlds[indexShroom2] === proofLocations[2]) {
                shroomHint = true;
            }
            else {
                shroomHint = false;
            }
            console.log("reshuffle");
        }
    }

    return hintedWorlds;
}