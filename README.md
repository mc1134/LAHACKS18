# LAHACKS18


## Description

A description of the app

## Modules

### MUS files:

These files describe a song, mutable via Finale Notepad software. 
These files can be exported as MIDI or PDF files.

### MID files:

These files are essentially compressed versions of MUS files under a different format. 
When reading these files as binary (you can do this by executing `od -t x1 --endian=big [file]` in a shell terminal), 
each occurrence of the byte "0x90" past the header chunk directly precedes a note. 
There is also information about the duration of the note within the 8- or 9-byte block of each set of byte "0x90".

### Other modules:

(list and brief description of modules)

## Workflow

(overview of workflow)

## Members

Michael Chen

## Dedications

Joseph Chen for being a programming inspiration

Walter Chang for suggesting the problem in the first place
