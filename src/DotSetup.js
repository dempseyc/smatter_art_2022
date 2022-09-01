export function makeDotData(dotQty = 10, setId = 0, nextIdx = 0, prevQty = 0) {

    let ranPos = (min, max) => Math.floor(Math.random() * max) + min ;

    let twinEatsTwin = (xPos, xPosT) => {
        // remove twins in center 1/QtyTH portion of the area
        return ( Math.abs(xPos-xPosT) <= 100/(dotQty+prevQty) );
    }

    let dotData = [];

    let addDot = function (i, setId, x, y, xTwin) {
        dotData.push({
            id: i,
            setId: setId,
            strategy: (!xTwin) ? 'stay' : 'orth',
            xOrig: x,
            yOrig: y,
            xPos: x,
            yPos: y,
            xTwin: xTwin
        });
    }

    for(let i = 0; i<dotQty-1; i++) {
        let yPos = ranPos(0,400)/4;
        let xPos = ranPos(0,400)/8; //placing 1st twin on left
        let xPosT = 100 - xPos;
        if ( twinEatsTwin(xPos,xPosT) ) {
            xPos = 50;
            let yPosT = 100 - yPos;
            addDot(nextIdx+i, setId, xPos, yPos, false);
            addDot(nextIdx+i+1, setId, xPos, yPosT, false);
            i++
        } else {
            addDot(nextIdx+i, setId, xPos, yPos, true);
            // this is the twin
            addDot(nextIdx+i+1, setId, xPosT, yPos, true);
            // not a mistake, skip an iteration
            i++;
        }
    }

    return dotData;

} // end makeDotData

export function removeDotData(dotQty = -1, setId = 0, dots) {
    let toRemove = dotQty;
    let dotData = [...dots];

    let remove = (array, key, value) => {
        const index = array.findIndex(obj => obj[key] === value);
        return index >= 0 ? [
            ...array.slice(0, index),
            ...array.slice(index + 1)
        ] : array;
    }

    let removeRecursive = () => {
        dotData = remove(dotData,'setId',setId);
        toRemove++;
        if (toRemove !== 0) {
            removeRecursive();
        }
        return dotData;
    }
    dotData = removeRecursive();
    return dotData;
}

export function findNs (currDot, dotsToConsider) {
    let squareNum  = (num) => Math.pow(num, 2) ;

    let dTC = [...dotsToConsider];
    // take dotsToConsider array and fill in this.nn1 and this.nn2
    // 20164 is based on square root of 2 times 100
// why *2 ?
    let nn1DistanceSqrd = 20164 * 2;
    let nn2DistanceSqrd = 20164 * 2;
    let nn3DistanceSqrd = 20164 * 2;

    // find nn1
    dTC.forEach((dot) => {
        let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
        let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
        let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
        // if it's not me
        if (dot.id !== currDot.id) {      
            if (typeof(currDot.nn2) === 'undefined') {
                // console.log('should happen once per dot', typeof(currDot.nn2));
                currDot.nn2 = dot.id;
                currDot.nn3 = dot.id;
                // nn2DistanceSqrd = 0;
                currDot.nn1 = dot.id;
                nn1DistanceSqrd = iNDistanceSqrd;

            }
            if (iNDistanceSqrd <= nn1DistanceSqrd) {
                // console.log('passed nn1 qualification')
                currDot.nn1 = dot.id;
                nn1DistanceSqrd = iNDistanceSqrd;
            }
        }
    });

    // find nn2
    dTC.forEach((dot) => {
        let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
        let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
        let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
        // if it's not me and not nn1
        if (dot.id !== currDot.id && dot.id !== currDot.nn1) {
            if (nn2DistanceSqrd > iNDistanceSqrd && iNDistanceSqrd >= nn1DistanceSqrd) {
            // console.log('passed nn2qualification')
            currDot.nn2 = dot.id;
            nn2DistanceSqrd = iNDistanceSqrd;
            }
        }
    });
    // find nn3
    dTC.forEach((dot) => {
        let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
        let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
        let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
        // if it's not me
        if (dot.id !== currDot.id && dot.id !== currDot.nn1 && dot.id !== currDot.nn2) {
            if (nn3DistanceSqrd > iNDistanceSqrd && iNDistanceSqrd >= nn2DistanceSqrd) {
                // console.log('passed nn2qualification')
                currDot.nn3 = dot.id;
                nn3DistanceSqrd = iNDistanceSqrd;
            }
        }
    });

    currDot.nn1DistanceSqrd = nn1DistanceSqrd;

    return currDot;

} // end findNs