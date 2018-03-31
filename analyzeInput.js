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
 * https://www.sitepoint.com/understanding-module-exports-exports-node-js/
 */

const DEFAULT_FILENAME = "input.mid";

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

function handleHaystack() {
	var control = document.getElementById("mid-input-file");
	control.addEventListener("change", function(event) {
		console.log("Retrieving MIDI file...");
		var i = 0;
		files = control.files;
		len = files.length;
		for(; i < len; i++) {
			console.log("name: " + files[i].name + "; type: " + files[i].type + "; size: " + files[i].size + " bytes");
		}
		console.log("File retrieved.");
	}, false);
}

function handleNeedle() {
	var control = document.getElementById("mid-test-file");
	control.addEventListener("change", function(event) {
		console.log("Retrieving test MIDI file...");
		name = control.value;
		console.log("name: " + name);
		console.log("File retrieved.");
	}, false);
}

function runComparison() {
	var freader = new FileReader();
	var control = document.getElementById("run-comparison");
	control.addEventListener("change", function(event) {
		console.log("Running comparison...");
		freader.onload = (function(f) {
			return function(e) {
				var contents = e.target.result;
				console.log("contents: " + contents);
			};
		})(f);
		analyzeInput();
		console.log("Finished.");
	}, false);
}