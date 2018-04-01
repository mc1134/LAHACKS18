# LAHACKS18

## Name: MIDI-based page turner

## Description

This hack aims at allowing people to play a portion of a song on an instrument 
and be able to identify where in that song the user is playing. This is useful 
for automating page-turning of sheet music on a device and allowing aspiring 
piano players to more easily follow where they are playing, for instance. The 
comparison between user input and sheet music is performed via a simple naive 
fuzzy string search algorithm (aka brute force) between the MIDI files of the 
user input (converted to MIDI) and the sheet music. A proof of concept is built 
using pre-generated MIDI files and an online website that allows the user to 
upload a MIDI file to compare against the "sheet music", chosen via dropdown 
menu.

This hack uses HTML5/CSS and Javascript to manage the webpage/files and Finale 
Notepad software to generate the MIDI files. Alternatively one could use a free 
and/or simpler music maker program.

## Modules

### MUS files:

These files describe a song, mutable via Finale Notepad software. These files 
can be exported as MIDI or PDF files. For the purpose of conserving space, we
use the MIDI file conversion for easier string matching.

### MID files:

These files are essentially compressed versions of MUS files under a different 
format. When reading these files as binary (you can do this by executing 
`od -t x1 --endian=big [file]` in a shell terminal), each occurrence of the byte 
"0x90" past the header chunk directly precedes a note. There is also information 
about the duration of the note within the 8- or 9-byte block of each set of byte 
"0x90". To read more on the format of MIDI files, look at 
https://www.csie.ntu.edu.tw/~r92092/ref/midi/ or 
http://www.music.mcgill.ca/~ich/classes/mumt306/StandardMIDIfileformat.html. But 
as a general overview, MIDI files are constructed in "chunks", with each chunk 
specifying the chunk type (first 4 bytes) and the chunk length as a 32-bit int 
(next 4 bytes). The remaining 32-bit-integer number of bytes compose the remainder 
of the chunk, and this data section is split into different attributes (eg text 
fields, individual notes, key and time signature, etc.). To see an example of 
what a MIDI file looks like in the process of being decrypted, see this link: 
https://docs.google.com/spreadsheets/d/1yZE8zTO1hTdh1NfTp0zzBJWLRIfEBLXHjr6qmIoLd7E/edit?usp=sharing.

### Other modules:

(list and brief description of modules)

## Workflow

(overview of workflow)

## Other information:

https://docs.google.com/document/d/1FB_Dc3iVBfs8ymNyBe1rfX3XZSMdm-sHPh0LxsjhQck/edit

## Members

Michael Chen

## Dedications

Joseph Chen for being a programming inspiration

Walter Chang for suggesting the problem in the first place
