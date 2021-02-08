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

var vanillaReports = [
    "Hollow Bastion",
    "Twilight Town",
    "The World That Never Was",
    "Beast's Castle",
    "Olympus Coliseum",
    "Port Royal",
    "Hollow Bastion",
    "The World That Never Was",
    "The World That Never Was",
    "Twilight Town",
    "The World That Never Was",
    "The World That Never Was",
    "The World That Never Was"
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

function prioritizeAtlantica() {
    var AWthunder = false;
    var ATthunder = false;
    var STTthunder = false;
    var TTthunder = false;
    var HBthunder = false;
    var BCthunder = false;
    var OCthunder = false;
    var AGthunder = false;
    var LODthunder = false;
    var PLthunder = false;
    var DCthunder = false;
    var HTthunder = false;
    var PRthunder = false;
    var SPthunder = false;
    var TWTNWthunder = false;
    var DFthunder = false;
    var LUthunder = false;

    var AWmagnet = false;
    var ATmagnet = false;
    var STTmagnet = false;
    var TTmagnet = false;
    var HBmagnet = false;
    var BCmagnet = false;
    var OCmagnet = false;
    var AGmagnet = false;
    var LODmagnet = false;
    var PLmagnet = false;
    var DCmagnet = false;
    var HTmagnet = false;
    var PRmagnet = false;
    var SPmagnet = false;
    var TWTNWmagnet = false;
    var DFmagnet = false;
    var LUmagnet = false;

    //Thunder

    if(AW.includes("00000017")) {
        AWthunder = true;
        prioritizeWorld(AWthunder, "100 Acre Wood");
    }

    if(AT.includes("00000017")) {
        ATthunder = true;
        prioritizeWorld(ATthunder, "Atlantica");
    }

    if(STT.includes("00000017")) {
        STTthunder = true;
        prioritizeWorld(STTthunder, "Simulated Twilight Town");
    }

    if(TT.includes("00000017")) {
        TTthunder = true;
        prioritizeWorld(TTthunder, "Twilight Town");
    }

    if(HB.includes("00000017")) {
        HBthunder = true;
        prioritizeWorld(HBthunder, "Hollow Bastion");
    }

    if(BC.includes("00000017")) {
        BCthunder = true;
        prioritizeWorld(BCthunder, "Beast's Castle");
    }

    if(OC.includes("00000017")) {
        OCthunder = true;
        prioritizeWorld(OCthunder, "Olympus Coliseum");
    }

    if(AG.includes("00000017")) {
        AGthunder = true;
        prioritizeWorld(AGthunder, "Agrabah");
    }

    if(LOD.includes("00000017")) {
        LODthunder = true;
        prioritizeWorld(LODthunder, "Land of Dragons");
    }

    if(PL.includes("00000017")) {
        PLthunder = true;
        prioritizeWorld(PLthunder, "Pride Lands");
    }

    if(DC.includes("00000017")) {
        DCthunder = true;
        prioritizeWorld(DCthunder, "Disney Castle");
    }

    if(HT.includes("00000017")) {
        HTthunder = true;
        prioritizeWorld(HTthunder, "Halloween Town");
    }

    if(PR.includes("00000017")) {
        PRthunder = true;
        prioritizeWorld(PRthunder, "Port Royal");
    }

    if(SP.includes("00000017")) {
        SPthunder = true;
        prioritizeWorld(SPthunder, "Space Paranoids");
    }

    if(TWTNW.includes("00000017")) {
        TWTNWthunder = true;
        prioritizeWorld(TWTNWthunder, "The World That Never Was");
    }

    if(DF.includes("00000017")) {
        DFthunder = true;
        prioritizeWorld(DFthunder, "Drive Forms");
    }

    if(LU.includes("00000017")) {
        LUthunder = true;
        prioritizeWorld(LUthunder, "Sora's Heart");
    }

    //Magnet

    if(AW.includes("00000057")) {
        AWmagnet = true;
        prioritizeWorld(AWmagnet, "100 Acre Wood");
    }

    if(AT.includes("00000057")) {
        ATmagnet = true;
        prioritizeWorld(ATmagnet, "Atlantica");
    }

    if(STT.includes("00000057")) {
        STTmagnet = true;
        prioritizeWorld(STTmagnet, "Simulated Twilight Town");
    }

    if(TT.includes("00000057")) {
        TTmagnet = true;
        prioritizeWorld(TTmagnet, "Twilight Town");
    }

    if(HB.includes("00000057")) {
        HBmagnet = true;
        prioritizeWorld(HBmagnet, "Hollow Bastion");
    }

    if(BC.includes("00000057")) {
        BCmagnet = true;
        prioritizeWorld(BCmagnet, "Beast's Castle");
    }

    if(OC.includes("00000057")) {
        OCmagnet = true;
        prioritizeWorld(OCmagnet, "Olympus Coliseum");
    }

    if(AG.includes("00000057")) {
        AGmagnet = true;
        prioritizeWorld(AGmagnet, "Agrabah");
    }

    if(LOD.includes("00000057")) {
        LODmagnet = true;
        prioritizeWorld(LODmagnet, "Land of Dragons");
    }

    if(PL.includes("00000057")) {
        PLmagnet = true;
        prioritizeWorld(PLmagnet, "Pride Lands");
    }

    if(DC.includes("00000057")) {
        DCmagnet = true;
        prioritizeWorld(DCmagnet, "Disney Castle");
    }

    if(HT.includes("00000057")) {
        HTmagnet = true;
        prioritizeWorld(HTmagnet, "Halloween Town");
    }

    if(PR.includes("00000057")) {
        PRmagnet = true;
        prioritizeWorld(PRmagnet, "Port Royal");
    }

    if(SP.includes("00000057")) {
        SPmagnet = true;
        prioritizeWorld(SPmagnet, "Space Paranoids");
    }

    if(TWTNW.includes("00000057")) {
        TWTNWmagnet = true;
        prioritizeWorld(TWTNWmagnet, "The World That Never Was");
    }

    if(DF.includes("00000057")) {
        DFmagnet = true;
        prioritizeWorld(DFmagnet, "Drive Forms");
    }

    if(LU.includes("00000057")) {
        LUmagnet = true;
        prioritizeWorld(LUmagnet, "Sora's Heart");
    }
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

var priorityWorlds2;
//Make sure reports pointing to proofs are hinted
function hintProofReports(worlds) {
    var hintedWorlds = worlds;
    priorityWorlds2 = priorityWorlds;

    //get indexes of reports pointing to proofs
    var proofReportIndex1;
    var proofReportIndex2;
    var proofReportIndex3;

    for(var i = 0; i < hintedWorlds.length; i++) {
        if(hintedWorlds[i] === proofLocations[0]) {
            proofReportIndex1 = i;
        }
        if(hintedWorlds[i] === proofLocations[1]) {
            proofReportIndex2 = i;
        }
        if(hintedWorlds[i] === proofLocations[2]) {
            proofReportIndex3 = i;
        }
    }

    //get location of reports pointing to proofs
    var reportProof1 = reportLocations[proofReportIndex1];
    var reportProof2 = reportLocations[proofReportIndex2];
    var reportProof3 = reportLocations[proofReportIndex3];

    //if reports are not all hinted, put them into the pool of hinted worlds
    if(!hintedWorlds.includes(reportProof1) || !hintedWorlds.includes(reportProof2) || !hintedWorlds.includes(reportProof3)) {

        if(priorityWorlds2.length < 13) {
            if(!hintedWorlds.includes(reportProof1) && reportProof1 != "Free" && reportProof1 != undefined) {
                var index = Math.floor(Math.random() * 13);
                var priorityWorldIndex = true;
    
                while(priorityWorldIndex) {
                    if(!priorityWorlds2.includes(hintedWorlds[index]) && hintedWorlds[index] != reportProof2 && hintedWorlds[index] != reportProof3) {
                        hintedWorlds[index] = reportProof1;
                        priorityWorldIndex = false;
                        priorityWorlds2.push(reportProof1);
                    }
                    else {
                        priorityWorldIndex = true;
                        index = Math.floor(Math.random() * 13);
                    }
                }
                
            }
        }

        if(priorityWorlds2.length < 13) {
            if(!hintedWorlds.includes(reportProof2) && reportProof2 != "Free" && reportProof2 != undefined) {
                var index = Math.floor(Math.random() * 13);
                var priorityWorldIndex = true;
    
                while(priorityWorldIndex) {
                    if(!priorityWorlds2.includes(hintedWorlds[index]) && hintedWorlds[index] != reportProof1 && hintedWorlds[index] != reportProof3) {
                        hintedWorlds[index] = reportProof2;
                        priorityWorldIndex = false;
                        priorityWorlds2.push(reportProof2);
                    }
                    else {
                        priorityWorldIndex = true;
                        index = Math.floor(Math.random() * 13);
                    }
                }
            }
        }

        if(priorityWorlds2.length < 13) {
            if(!hintedWorlds.includes(reportProof3) && reportProof3 != "Free" && reportProof3 != undefined) {
                var index = Math.floor(Math.random() * 13);
                var priorityWorldIndex = true;
    
                while(priorityWorldIndex) {
                    if(!priorityWorlds2.includes(hintedWorlds[index]) && hintedWorlds[index] != reportProof1 && hintedWorlds[index] != reportProof2) {
                        hintedWorlds[index] = reportProof3;
                        priorityWorldIndex = false;
                        priorityWorlds2.push(reportProof3);
                    }
                    else {
                        priorityWorldIndex = true;
                        index = Math.floor(Math.random() * 13);
                    }
                }
            }
        }
        
    }

    return hintedWorlds;
}