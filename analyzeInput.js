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

function analyzeInput() {
	console.log("Entering analyzeInput...");
	var a = 1 + 1000000 - 50 * 40;
	console.log("a is " + a);
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log("Success!");
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}
	console.log("Exiting analyzeInput...");
}

const DEFAULT_FILENAME = "input.mid";

export { analyzeInput, DEFAULT_FILENAME };
