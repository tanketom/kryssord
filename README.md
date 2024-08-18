# kryssord
Andreas can't code, so he tries prompting instead - a crossword experiment. This crossword system is an experiment in generative AI, and made largely using Microsoft Copilot as a programmer. 

<img width="957" alt="Skjermbilde 2024-08-17 kl  23 21 35" src="https://github.com/user-attachments/assets/64693d67-55ca-4b37-8ee2-f2b3ac31782c">

I could not have made it without its help (read: copying off stackoverflow and similar training data). I am not fluent in any code language, but I have some university credits in programming, I like asking questions, and I try to keep up with what my developer friends are talking about. I asked a question to Copilot, and through more prompts added more functions.

Currently, the Javascript looks for a JSON file in the folder "JSON" matching the current week of the current year with the naming convention "W'week'-'year'.json". The JSON file has a 7 by 7 array, and two lists of clues (across and down). The JSON file gives a 7 by 7 table in index.html a solution, and places the clues below the table. Through some (probably very basic) Javascript magic I haven't really looked into, it also populates the table with small numbers to show what clue goes where.

I have no idea how effective the code is, but I do know that even I saw in an early draft of the system that it would be more efficient to use "#" in the solution array in the JSON file to annote black squares than to have a separate function that give the coordinates for black squares, so I bet it could be effectivised further quite easily.

With time I want to make my own solutions, currently I have copied a NYT solution to see if it works.

## "Change log"
### 17.08.2024
* First functioning version.
### 18.08.2024
* Added "choose last 5" function, bugfixes
* Design