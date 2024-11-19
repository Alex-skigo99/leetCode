"use strict";
function predictPartyVictory_2(senate) {
    function killOrWin(senate, current) {
        const partyCurrent = senate[current];
        const partyAlter = partyCurrent === 'R' ? 'D' : 'R';
        const len = senate.length;
        let newCurr = current;
        for (let y = 1; y < len; y++) {
            let i = (current + y) % len;
            if (senate[i] === partyAlter) {
                newCurr = i <= current ? current : (current + 1) % len;
                if (i === len - 1) {
                    killOrWin(senate.slice(0, i), newCurr);
                }
                killOrWin(senate.slice(0, i) + senate.slice(i + 1), newCurr);
            }
        }
        return senate[0] == 'R' ? 'Radiant' : 'Dire';
    }
    return killOrWin(senate, 0);
}
;
const start2 = performance.now();
console.log('Expect Radiant -', predictPartyVictory_2("DRRDRDRDRDDRDRDR"));
const end2 = performance.now();
console.log("Execution time:", end2 - start2);
