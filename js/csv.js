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