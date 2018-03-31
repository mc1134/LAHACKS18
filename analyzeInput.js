/*
 *
 * This file handles the audio input. The audio input is assumed
 * to be in MIDI format and is a file to be read.
 *
 */

/*
 * Sources:
 * https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
 * https://www.html5rocks.com/en/tutorials/file/dndfiles/
 */

var filename = "input.mid"



//var buf = new ArrayBuffer(16);
//var blob = new Blob([buf]);

if (window.File && window.FileReader && window.FileList && window.Blob) {
	console.log("Success!");
} else {
	alert('The File APIs are not fully supported by your browser.');
}
