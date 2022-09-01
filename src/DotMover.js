//utils
function ranMM(min,max) {
    return Math.floor(Math.random()*max)+min;
}
function squareNum (num) {
    return Math.pow(num, 2);
}

const $root3 = 1.732

/// need nearest point orthogonal to get 'rotation' angle
/// except if dot gets to midpoint, that dot.v3 vector will go to zero
/// maybe stop resetting it when it gets too close
/// possible pull out 'findXXX' functions so that after strategy is chosen
/// only needs its one function

// for padding implementation, need dist to nn1
export function findV0 (dot,nn1) {
    dot.v0 = {};
    dot.v0.x = nn1.xPos - dot.xPos;
    dot.v0.y = nn1.yPos - dot.yPos;
    dot.v0.mag = Math.sqrt(squareNum(dot.v0.x)+squareNum(dot.v0.y));
    return dot;
}

// between nn1 and dot.nn2
export function findMidpoint (dot,nn1,nn2) {
    dot.tmx = (nn2.xPos + nn1.xPos) * 0.5 ;
    dot.tmy = (nn2.yPos + nn1.yPos) * 0.5 ;
    return dot;
}

// target center of triangle /////////////////////////////////////////
export function findCenterOfTriangle (dot,nn1,nn2,nn3) {
    dot.tcx = (nn1.xPos + nn2.xPos + nn3.xPos) * 0.333;
    dot.tcy = (nn1.yPos + nn2.yPos + nn3.yPos) * 0.333;
    return dot;
}

// target nearest point to orthogonal of nn1->dot.nn2
export function findNearestPointOrthogonal (dot,nn1,nn2) {
    // midpoint
    dot.p1 = {x: dot.tmx, y: dot.tmy};
    // from nn1 to nn2
    dot.v1 = {};
    dot.v1.x = nn1.xPos - nn2.xPos;
    dot.v1.y = nn1.yPos - nn2.yPos;
    dot.v1.mag = Math.sqrt(squareNum(dot.v1.x)+squareNum(dot.v1.y));
    // dot.v1 normalized
    dot.v1n = {};
    dot.v1n.x = dot.v1.x / dot.v1.mag;
    dot.v1n.y = dot.v1.y / dot.v1.mag;
    // from nn1 to dot normalized
    dot.v0n = {};
    dot.v0n.x = dot.v0.x / dot.v0.mag;
    dot.v0n.y = dot.v0.y / dot.v0.mag;
    
    let dp = dot.v1n.x * dot.v0n.x + dot.v1n.y * dot.v0n.y;
    let theta = Math.acos(-dp);
    // having angle theta and hypoteneuse v0, we can get length of adjacent
    let cosTheta = Math.cos(theta);
    let adjacent = cosTheta * dot.v0.mag; 
    // from nn1 to dot.p3
    dot.v1a = {};
    dot.v1a.mag = adjacent;
    dot.v1a.x = dot.v1n.x * dot.v1a.mag;
    dot.v1a.y = dot.v1n.y * dot.v1a.mag;
    // closest point on v1 to dot
    dot.p3 = {};
    dot.p3.x = nn1.xPos + dot.v1a.x;
    dot.p3.y = nn1.yPos + dot.v1a.y;
    // from dot.p3 to dot
    dot.v3 = {};
    dot.v3.x = dot.p3.x - dot.xPos;
    dot.v3.y = dot.p3.y - dot.yPos;
    // shifting dot.v3 to midpoint, thats the nice middle orthoganal
    // target
    dot.p2 = {};
    dot.p2.x = dot.p1.x - dot.v3.x;
    dot.p2.y = dot.p1.y - dot.v3.y;

    dot.tox = dot.p2.x;
    dot.toy = dot.p2.y;
    
    return dot
}

export function setTargets (dot, dots) {
    const nn1Index = dots.findIndex(d => d['id'] === dot.nn1); 
    const nn2Index = dots.findIndex(d => d['id'] === dot.nn2); 
    const nn3Index = dots.findIndex(d => d['id'] === dot.nn3);

    dot.avg = 0.25 * (dot.nn1DistanceSqrd + dots[nn1Index].nn1DistanceSqrd + dots[nn2Index].nn1DistanceSqrd + dots[nn2Index].nn1DistanceSqrd) ;

    let nn1 = dots[nn1Index];
    let nn2 = dots[nn2Index];
    let nn3 = dots[nn3Index];
    /// executing
    dot = findV0(dot, nn1);
    dot = findMidpoint(dot,nn1,nn2)
    dot = findCenterOfTriangle(dot,nn1,nn2,nn3);
    dot = findNearestPointOrthogonal(dot,nn1,nn2);

    let strats = {
        'stay': {tx: dot.xPos, ty: dot.yPos},
        'orth': {tx: dot.tox, ty: dot.toy},
        'midp': {tx: dot.tmx, ty: dot.tmy},
        'cent': {tx: dot.tcx, ty: dot.tcy}
    }

    dot.tx = strats[dot.strategy].tx;
    dot.ty = strats[dot.strategy].ty;

    return dot;
} // end set targets
     
export function chooseStrategy (dot) {

    if (dot.strategy === 'stay') {return dot}
    
    let toDistSq = squareNum(dot.tox - dot.xPos) + squareNum(dot.toy - dot.yPos);
    let tmDistSq = squareNum(dot.tmx - dot.xPos) + squareNum(dot.tmy - dot.yPos);
    let tcDistSq = squareNum(dot.tcx - dot.xPos) + squareNum(dot.tcy - dot.yPos);
    // target orth, unless center is closer
    // if center is closer than orth, but midpoint closer than center, target midpoint
    // target center as last resort
    // if (toDistSq < tcDistSq) { dot.strategy = 'orth'; }
    // else if (tmDistSq < tcDistSq) { dot.strategy = 'midp';}
    // else { dot.strategy = 'cent'; }
    dot.strategy = 'orth';
    return dot;
} // end chooseStrategy

export function moveTowardTarget (dot) {
    dot.xPos = dot.xPos + (dot.tx - dot.xPos) * 0.2;
    dot.yPos = dot.yPos + (dot.ty - dot.yPos) * 0.2;
    return dot;
}

export function trackAnim (dots) {
    let ranDotIndex = ranMM(0,dots.length-1);
    let distSq = 0;
    dots.forEach(function (dot, i) {
        if (i === ranDotIndex) {
            distSq = squareNum(dot.xPos-dot.tx)+squareNum(dot.yPos-dot.ty);
        }
        return setTargets(dot,dots);
    })
    dots.forEach(function (dot, i) {
        return moveTowardTarget(dot);
    })
    return {dots,distSq};
}