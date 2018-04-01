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
const SHEET_FOLDER_EXT = "./resources/MIDI_sheet/";
const FRAG_FOLDER_EXT = "./resources/MIDI_input/";
const EXTENSION = ".mid";
const START = "===============START===============";
const END = "================END================";
const BUFSIZ = 200;
var sheetName = "";
var fragmentName = "";
var FR1 = new window.FileReader();
var FR2 = new window.FileReader();

/** Uses a fuzzy (naive) string matching algorithm to find the closest match */
function analyzeInput(freader1, freader2) {
	console.log(START);
	console.log("Entering analyzeInput...");
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log("Success!");
		var out1 = document.getElementById("output1").innerHTML = "First file contents:";
		var out2 = document.getElementById("output2").innerHTML = freader1.result;
		var out3 = document.getElementById("output3").innerHTML = "Second file contents:";
		var out4 = document.getElementById("output4").innerHTML = freader2.result;
		var formattedStr = out1 + "\n" + out2 + "\n" + out3 + "\n" + out4;
		console.log(formattedStr);
		
		// midi comparison
		var notes = tokenizer(str);
		console.log("Notes: " + notes);
	} else {
		alert("  The File APIs are not fully supported by your browser.");
	}
	//console.log("Exiting analyzeInput...");
	console.log(END);
}

/** Tokenizes a string into an array of notes, assumes MIDI format */
function tokenizer(inputStr) {
	var str = inputStr;

	// null error checking
	if(str == null || str == "")
		return;
	
	// handle header
	var header = str.substring(0,4);
	str = str.substring(4);
	if(header != "MThd") {
		console.log("Error: header string not MThd but is instead " + header);
		return;
	}
	var headerLen = str.substring(0,4);
	str = str.substring(4);
	if(headerLen != binaryToString(0x00000006)) {
		console.log("Error: header length not 6=0x00000006 but is instead " + bin2hex(stringToBinary(headerLen)));
	}

	return str;
}

/** Turns a string (with binary) into a series of characters */
function bin2ascii(strInput) {
	//var str = strInput;
	var str = "01001110 01101111 01110100 01100101 00111010 00100000 01110100 01101000 01101001 01110011 00100000 01101001 01110011 00100000 01101110 01101111 01110100 00100000 01101101 01111001 00100000 01100011 01101111 01100100 01100101";
	len = (str.length+1)/9;
	console.log("str len: " + len);

	var x = new Uint8Array(len);
	var out = "";
	var message = "";
	for(var i = 0; i < len; i++) {
		// console output management
		/*
		out = "";
		var num = parseInt(str.substring(0,8), 2);
		var j = num.toString(10);
		if(str.length >= 9) str = str.substring(9);
		out += "num: " + j + " ; ";
		x[i] = j;
		out += "x[" + i + "]: " + x[i];
		console.log(out);
		*/
		// only important part
		message += String.fromCharCode(j);
	}

	console.log("arr len: " + x.length);
	console.log("message: " + message);
	return message;
}


/* Other functions */

/** Handles the sheet music */
function handleHaystack() {
	console.log(START);
	var control = document.getElementById("mid-sheet-file");
	control.addEventListener("click", function(event) {
		console.log("Retrieving MIDI file...");
		sheetName = control.value + EXTENSION;
		console.log("  name: " + sheetName);
		console.log("File (sheet music) retrieved.");
		console.log(END);
	});
}

/** Handles the music fragment to match */
function handleNeedle() {
	console.log(START);
	var control = document.getElementById("mid-input-file");
	control.addEventListener("change", function(event) {
		console.log("Retrieving test MIDI file...");
		file = control.files[0];
		fragmentName = file.name;
		console.log("  name: " + fragmentName + "; type: " + file.type + "; size: " + file.size + " bytes");
		console.log("File (music fragment) retrieved.");
		console.log(END);
	});
}

/** Main runner of analyzeInput, bundles everything together */
function runComparison() {
	console.log(START);
	console.log("Running comparisons...");

	// Create File objects
	var tempArr1 = new Uint8Array(BUFSIZ);
	var tempArr2 = new Uint8Array(BUFSIZ);
	name1 = (sheetName == "" || sheetName == undefined)?"NULL":SHEET_FOLDER_EXT + sheetName;
	name2 = (fragmentName == "" || fragmentName == undefined)?"NULL":FRAG_FOLDER_EXT + fragmentName;
	var file1 = new File(tempArr1, name1);
	var file2 = new File(tempArr2, name2);

	// Read files
	var freader1 = new window.FileReader();
	var freader2 = new window.FileReader();
	freader1.onload = function(e) {
		f1 = freader1.result;
		document.getElementById("status1").innerHTML = "Loading " + name1 + "..."; 
	}
	freader2.onload = function(e) {
		f2 = freader2.result;
		document.getElementById("status2").innerHTML = "Loading " + name2 + "...";
	}
	freader1.readAsBinaryString(file1);
	freader2.readAsBinaryString(file2);
	//freader1.readAsText(file1);
	//freader2.readAsText(file2);
	freader1.onloadend = function(e) {
		f1 = e.target.result;
		document.getElementById("status1").innerHTML = "Done loading " + name1 + ".";
	}
	freader2.onloadend = function(e) {
		f2 = e.target.result;
		document.getElementById("status2").innerHTML = "Done loading " + name2 + ".";
	}

	// control listener
	var control = document.getElementById("status1");
	control.addEventListener("change", function(event) {
		analyzeInput(freader1, freader2);
	});

// debug
	//console.log("freader1: <" + freader1 + "> ; freader2: <" + freader2 + ">");
	//console.log("file1.size: <" + file1.size + "> ; file2.size: <" + file2.size + ">");
	//console.log("freader1.result: <" + f1 + "> ; freader2.result: <" + f2 + ">");
	console.log("FR1.result: <" + FR1.result + "> ; FR2.result: <" + FR2.result + ">");
	console.log("file1.name: <" + file1.name + "> ; file2.name: <" + file2.name + ">");
	if( FR1.result != null && FR1.result != "" && FR2.result != null && FR2.result != "" ) {
		fr1 = binaryToString(FR1.result);
		fr2 = binaryToString(FR2.result);
		console.log("FR1 tostring: <" + fr1 + "> ; FR2 tostring: <" + fr2 + ">");
	}
	FR1 = freader1;
	FR2 = freader2;
// end debug

	//analyzeInput(freader1, freader2);

	console.log("...Finished.");
	console.log(END);
}

/**
 * Function that converts a binary representation of a string back into the string
 * Source: https://ourcodeworld.com/articles/read/380/how-to-convert-a-binary-string-into-a-readable-string-and-vice-versa-with-javascript
 * @see https://gist.github.com/eyecatchup/6742657
 * @author https://github.com/eyecatchup
 *
 * 01001110 01101111 01110100 01100101 00111010 00100000 01110100 01101000
 * 01101001 01110011 00100000 01101001 01110011 00100000 01101110 01101111
 * 01110100 00100000 01101101 01111001 00100000 01100011 01101111 01100100
 * 01100101
 */
function binaryToString(str) {
	// Removes the spaces from the binary string
	str = str.replace(/\s+/g, '');
	// Pretty (correct) print binary (add a space every 8 characters)
	str = str.match(/.{1,8}/g).join(" ");

	var newBinary = str.split(" ");
	var binaryCode = [];

	for (i = 0; i < newBinary.length; i++) {
		binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
	}
	
	return binaryCode.join("");
}

/**
 * Function that converts a string to binary representation
 * Source: https://ourcodeworld.com/articles/read/380/how-to-convert-a-binary-string-into-a-readable-string-and-vice-versa-with-javascript
 *
 * 01001110 01101111 01110100 01100101 00111010 00100000 01110100 01101000
 * 01101001 01110011 00100000 01101001 01110011 00100000 01101110 01101111
 * 01110100 00100000 01101101 01111001 00100000 01100011 01101111 01100100
 * 01100101
 */
function stringToBinary(str, spaceSeparatedOctets) {
	function zeroPad(num) {
		return "00000000".slice(String(num).length) + num;
	}

	return str.replace(/[\s\S]/g, function(str) {
		str = zeroPad(str.charCodeAt().toString(2));
		return !1 == spaceSeparatedOctets ? str : str + " "
	});
};

/** Converts a binary number to hexadecimal */
function bin2hex(num) { return parseInt(num, 2).toString(16); }