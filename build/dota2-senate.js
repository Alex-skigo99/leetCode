"use strict";
function predictPartyVictory(senate) {
    function killOrWin(senate, current) {
        const partyCurrent = senate[current];
        const partyAlter = partyCurrent === 'R' ? 'D' : 'R';
        const len = senate.length;
        let newCurr = current;
        for (let y = 1; y < len; y++) {
            let i = (current + y) % len;
            if (senate[i] === partyAlter) {
                newCurr = i <= current ? current : current + 1;
                if (i === len - 1) {
                    return { newSenate: senate.slice(0, i), newCurr, next: true };
                }
                return { newSenate: senate.slice(0, i) + senate.slice(i + 1), newCurr, next: true };
            }
        }
        return { newSenate: senate, newCurr, next: false };
    }
    let current = 0;
    let nextVote = true;
    while (nextVote) {
        console.log(senate, current);
        let result = killOrWin(senate, current);
        senate = result.newSenate;
        nextVote = result.next;
        current = result.newCurr;
        if (current >= senate.length) {
            current = 0;
        }
    }
    ;
    console.log('res', senate);
    return senate[0] == 'R' ? 'Radiant' : 'Dire';
}
;
function predictPartyVictory_2(senate) {
    // https://leetcode.com/problems/dota2-s
    // recursive solution
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
const start = performance.now();
console.log('Expect Radiant -', predictPartyVictory("DRRDRDRDRDDRDRDR"));
const end = performance.now();
console.log("Execution time:", end - start);
const start2 = performance.now();
console.log('Expect Radiant -', predictPartyVictory_2("DRRDRDRDRDDRDRDR"));
const end2 = performance.now();
console.log("Execution time:", end2 - start2);
