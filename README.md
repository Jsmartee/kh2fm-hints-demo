# kh2fm-hints-demo

Bare bones hint generator for the Kingdom Hearts 2 Final Mix randomizer.
Based on SpikeVegeta's hint system where each Ansem Report is a hint that tells you how many important checks are in a world.

Here's a tracker made to be compatible with this hint system: https://github.com/TrevorLuckey/KH2Tracker

## How To Use
* Go to https://jsmartee.github.io/kh2fm-hints-demo/
* Select the pnach file you got from the randomizer generator website and click "Generate Hints".
* Option: You can select different categories of items to be excluded from the pool of important checks.
* Option: You can choose to exclude certain worlds from having hints. This is here so that if you set a world to "Replace" on the randomizer website, you can opt out of getting a useless hint for that world.
* If you and others are playing the same seed and want the same hints, click "Save Hints" and send the text file to everyone else playing the seed.
* If someone has sent a hint text file to you, select that file and click "Upload Hints" to get the same hints they have.
* You can also Download ZIP and open the index.html file to use it locally.

## Information

Important Checks:
* 3 Proofs
* Promise Charm
* 5 drive forms
* 4 summons
* Magic (18 total)
* 5 Torn Pages (can be excluded)
* 13 Ansem Reports (can be excluded)
* Second Chance & Once More (can be excluded, will not be hinted if they are on keyblades)

Worlds/Locations:
* 100 Acre Wood (can be excluded)
* Atlantica (can be excluded)
* Simulated Twilight Town (can be excluded)
* Twilight Town
* Hollow Bastion
* Beast's Castle
* Olympus Coliseum
* Agrabah
* Land of Dragons
* Pride Lands
* Disney Castle
* Halloween Town
* Port Royal
* Space Paranoids
* The World That Never Was
* Drive Forms
* Sora's Heart (Level Ups)

Other notes:
* The worlds/locations with proofs will always be hinted.
* The 3 chests in the Garden of Assemblage and the 7 Critical Bonus rewards are not included in any world.
* Disney Castle and Timeless River are combined into "Disney Castle"
* Cavern of Remembrance is considered part of "Hollow Bastion"
* Sora's Heart refers to level ups
* Absent Silhouettes and Data Org members are included in their respective worlds

## Contributors
The design of the page was all done by Zax, the creator of the KH2FM Randomizer Item Tracker. Check out his work: [KH2FM Item Tracker](https://tracker.zaxu.xyz/)

## Other Generators
If you're interested in another type of hint generator, check out [GoARacle](https://github.com/CrescentRR/GoARacle) by CrescentRR.

Features:
* Larger pool of hinted items including several useful abilities
* Themed pools of items
* Anti-cheat system
* No need for seeded hints
* In-app checklist to help track collected items
