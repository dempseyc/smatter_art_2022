export function makeDotData(dotQty = 10, setIndex = 0, nextIdx = 0) {

    let ranPos = (min, max) => Math.floor(Math.random() * max) + min ;

    let twinEatsTwin = (xPos, xPosT) => {
        // remove twins in center 1/QtyTH portion of the area
        return ( Math.abs(xPos-xPosT) <= 100/dotQty );
    }

    let dotData = [];

    let addDot = function (i, setIndex, x, y, xTwin) {
        dotData.push({
            idx: i,
            dotSetIndex: setIndex,
            strategy: (!xTwin) ? 'stay' : 'orth',
            xPos: x,
            yPos: y,
            xTwin: xTwin
        });
    }

    for(let i = 0; i<dotQty-1; i++) {
        let yPos = ranPos(0,200)/2;
        let xPos = ranPos(0,200)/2;
        let xPosT = 100 - xPos;
        if ( twinEatsTwin(xPos,xPosT) ) {
            xPos = 50;
            let yPosT = 100 - yPos;
            addDot(nextIdx+i, setIndex, xPos, yPos, false);
            addDot(nextIdx+i+1, setIndex, xPos, yPosT, false);
            i++
        } else {
            addDot(nextIdx+i, setIndex, xPos, yPos, true);
            // this is the twin
            addDot(nextIdx+i+1, setIndex, xPosT, yPos, true);
            // not a mistake, skip an iteration
            i++;
        }
    }

    return dotData;

} // end makeDotData

export function removeDotData(dotQty = -1, setIndex = 0, dots) {
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
        dotData = remove(dotData,'dotSetIndex',setIndex);
        toRemove++;
        if (toRemove !== 0) {
            removeRecursive();
        }
        return dotData;
    }
    dotData = removeRecursive();
    return dotData;
}

export function newDotSet() {
    return (
        {
            qty: 10,
            size: 3,
            color: 'black',
            behavior: 'global',
        }
    )
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
        if (dot.idx !== currDot.idx) {
            // and i'm not a center dot
            if (currDot.xTwin) {                
                if (typeof(currDot.nn2) === 'undefined') {
                    // console.log('should happen once per dot', typeof(currDot.nn2));
                    currDot.nn2 = dot.idx;
                    currDot.nn3 = dot.idx;
                    // nn2DistanceSqrd = 0;
                    currDot.nn1 = dot.idx;
                    nn1DistanceSqrd = iNDistanceSqrd;
    
                }
    
                if (iNDistanceSqrd <= nn1DistanceSqrd) {
                    // console.log('passed nn1 qualification')
                    currDot.nn1 = dot.idx;
                    nn1DistanceSqrd = iNDistanceSqrd;
                }
                // if i am a center dot, do stuff for all dots not also center dots
            } else {
                if (dot.xTwin) {
                    if (typeof(currDot.nn2) === 'undefined') {
                        // console.log('should happen once per dot', typeof(currDot.nn2));
                        currDot.nn2 = dot.idx;
                        currDot.nn3 = dot.idx;
                        // nn2DistanceSqrd = 0;
                        currDot.nn1 = dot.idx;
                        nn1DistanceSqrd = iNDistanceSqrd;
        
                    }
        
                    if (iNDistanceSqrd <= nn1DistanceSqrd) {
                        // console.log('passed nn1 qualification')
                        currDot.nn1 = dot.idx;
                        nn1DistanceSqrd = iNDistanceSqrd;
                    }
                }
            }
            // and nn2has not been set, set both
        }
    });

    // the nn1 should have been set to second twin with '<=', so make nn 2 first twin
    if (!currDot.xTwin) {
        currDot.nn2 = currDot.nn1-1;
        currDot.nn3 = currDot.idx;
        // and exit
        return currDot;
    }
    // find nn2
    dTC.forEach((dot) => {
        let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
        let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
        let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
        // if it's not me
        if (dot.idx !== currDot.idx) {
            if (nn2DistanceSqrd > iNDistanceSqrd && iNDistanceSqrd > nn1DistanceSqrd) {
            // console.log('passed nn2qualification')
            currDot.nn2 = dot.idx;
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
        if (dot.idx !== currDot.idx) {
            if (nn3DistanceSqrd > iNDistanceSqrd && iNDistanceSqrd > nn2DistanceSqrd) {
            // console.log('passed nn2qualification')
            currDot.nn3 = dot.idx;
            nn3DistanceSqrd = iNDistanceSqrd;
            }
        }
    });

    return currDot;

} // end findNs