//utils
function ranMM(min,max) {
    return Math.floor(Math.random()*max)+min;
}
function squareNum (num) {
    return Math.pow(num, 2);
}

const $root3 = 1.732

/// need nearest point orthogonal to get 'rotation' angle
/// except if dot gets to midpoint, that v3 vector will go to zero
/// maybe stop resetting it when it gets too close
/// possible pull out 'findXXX' functions so that after strategy is chosen
/// only needs its one function

export function setTargets (dot, dots) {
    const nn1Index = dots.findIndex(d => d['id'] === dot.nn1); 
    const nn2Index = dots.findIndex(d => d['id'] === dot.nn2); 
    const nn3Index = dots.findIndex(d => d['id'] === dot.nn3);

    // for padding implementation, need vector, dist to nn1
    let findV0 = function () {
        let v0 = {};
        v0.x = dots[nn1Index].xPos - dot.xPos;
        v0.y = dots[nn1Index].yPos - dot.yPos;
        let v0distSq = squareNum(v0.x) + squareNum(v0.y);
        dot.v0 = v0;
        dot.v0distSq = v0distSq;
    }

    // p1 between nn1 and dot.nn2
    let findMidpoint  = function () {
        // console.log(dot);
        dot.tmx = (dots[nn2Index].xPos + dots[nn1Index].xPos) * 0.5 ;
        dot.tmy = (dots[nn2Index].yPos + dots[nn1Index].yPos) * 0.5 ;
    }

    // target center of triangle /////////////////////////////////////////
    let findCenterOfTriangle = function () {

        let p2 = {}

        function findTarget () {
            p2.x = (dots[nn1Index].xPos + dots[nn2Index].xPos + dots[nn3Index].xPos) * 0.333;
            p2.y = (dots[nn1Index].yPos + dots[nn2Index].yPos + dots[nn3Index].yPos) * 0.333;
        }

        findTarget();

        dot.tcx = p2.x;
        dot.tcy = p2.y;
    }
        // target nearest point to orthogonal of nn1->dot.nn2
    let findNearestPointOrthogonal = function  () {

        // midpoint
        let p1 = {};
        // target
        let p2 = {};
        // closest point on v1 to dot
        let p3 = {};
        // from nn1 to dot.nn2
        let v1 = {};
        // from nn1 to p3
        let v1a = {};
        // from nn1 to dot
        let v2 = {};
        // from p3 to dot
        let v3 = {};

        // v1 normalized
        let v1n = {};

        // v2 normalized
        let v2n = {};

        p1 = {x: dot.tmx, y: dot.tmy};
        // dot.p1 = p1;
        // console.log(p1);

        function findTarget () {
            // nn1 to dot.nn2
            v1.x = dots[nn2Index].xPos - dots[nn1Index].xPos;
            v1.y = dots[nn2Index].yPos - dots[nn1Index].yPos;
            v1.mag = Math.sqrt(squareNum(v1.x)+squareNum(v1.y));
            v1n.x = v1.x / v1.mag;
            v1n.y = v1.y / v1.mag;
            // nn1 to dot
            // here we can determine which quadrant is nn1 in compared to dot
            // the process for getting p3 will be determined by the quadrant
            v2.x = dot.xPos - dots[nn1Index].xPos;
            v2.y = dot.yPos - dots[nn1Index].yPos;
            v2.mag = Math.sqrt(squareNum(v2.x)+squareNum(v2.y));
            v2n.x = v2.x / v2.mag;
            v2n.y = v2.y / v2.mag;
            // dot product normalized vectors
            // let dp = Math.abs(v1n.x * v2n.x + v1n.y * v2n.y);
            let dp = v1n.x * v2n.x + v1n.y * v2n.y;


            let theta = Math.acos(dp);

            // having angle theta and hypoteneuse v2, we can get length of adjacent
            let cosTheta = Math.cos(theta);
            let adjacent = cosTheta * v2.mag;

            // this will give us p3, closest point to dot on v1
            v1a.mag = adjacent;
            v1a.x = v1n.x * v1a.mag;
            v1a.y = v1n.y * v1a.mag;
            p3.x = dots[nn1Index].xPos + v1a.x;
            p3.y = dots[nn1Index].yPos + v1a.y;

            // vector from closest point on v1 (p3)
            v3.x = dot.xPos - p3.x;
            v3.y = dot.yPos - p3.y;

            // memo this vector to get a 'rotation' angle
            dot.v3 = v3;

            // shifting v3 to midpoint, thats the nice middle orthoganal
            p2.x = p1.x + v3.x;
            p2.y = p1.y + v3.y;
            // believe this!
            // p2.x = p1.x - v3.x;
            // p2.y = p1.y - v3.y; //see

        }

        findTarget();

        dot.tox = p2.x;
        dot.toy = p2.y;
    }

    /// executing
    findV0();
    findMidpoint();
    findCenterOfTriangle();
    findNearestPointOrthogonal();

    return dot;
} // end set targets
     
export function chooseStrategy (dot) {
    
    if (dot.strategy === 'stay') {
        dot.tx = dot.xPos;
        dot.ty = dot.yPos;
        return dot;
    }

    let toDistSq = squareNum(dot.tox - dot.xPos) + squareNum(dot.toy - dot.yPos);
    let tmDistSq = squareNum(dot.tmx - dot.xPos) + squareNum(dot.tmy - dot.yPos);
    let tcDistSq = squareNum(dot.tcx - dot.xPos) + squareNum(dot.tcy - dot.yPos);
    // target orth, unless center is closer
    if (toDistSq <= tcDistSq) { dot.tx = dot.tox; dot.ty = dot.toy; dot.strategy = 'orth'; }
    // if center is closer than orth, but midpoint closer than center, target midpoint
    else if (tmDistSq <= tcDistSq) { dot.tx = dot.tmx; dot.ty = dot.tmy; dot.strategy = 'midp';}
    // target center as last resort
    else { dot.tx = dot.tcx; dot.ty = dot.tcy; dot.strategy = 'cent'; }

    return dot;
} // end chooseStrategy

export function moveTowardTarget (dot) {
    dot.xPos = dot.xPos + (dot.tx - dot.xPos) * 0.2;
    dot.yPos = dot.yPos + (dot.ty - dot.yPos) * 0.2;
    return dot;
}

export  function applyPadding (dot, minDistSq) {
    if (dot.v0distSq < minDistSq) {
        dot.tx = dot.tx + (dot.v3.x * 0.2);
        dot.ty = dot.ty + (dot.v3.y * 0.2);
    }
}

export function trackAnim (dots) {
    let ranDotIndex = ranMM(0,dots.length-1);
    let distSq = 0;
    dots.forEach(function (dot, i) {
        if (i === ranDotIndex) {
            distSq = squareNum(dot.xPos-dot.tx)+squareNum(dot.yPos-dot.ty);
        }
        setTargets(dot,dots);
        // applyPadding(dot, 34*$root3);
        moveTowardTarget(dot);
    })
    return {dots,distSq};
}