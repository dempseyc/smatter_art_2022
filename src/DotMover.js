import { avg } from './DotSetup';

//utils
function ranMM(min,max) {
    return Math.floor(Math.random()*max)+min;
}
function squareNum (num) {
    return Math.pow(num, 2);
}

const $root3 = 1.732;

/// need nearest point orthogonal to get 'rotation' angle
/// except if dot gets to midpoint, that dot.v3 vector will go to zero
/// maybe stop resetting it when it gets too close
/// pull out 'findXXX' functions so that after strategy is chosen
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
    dot.p1 = {x: dot.tmx, y: dot.tmy};
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
    // need v to nn1
    dot = findV0(dot,nn1);
    // need midpoint p1
    dot = findMidpoint(dot,nn1,nn2);
    // from nn1 to nn2
    dot.v1 = {};
    dot.v1.x = nn1.xPos - nn2.xPos;
    dot.v1.y = nn1.yPos - nn2.yPos;
    dot.v1.mag = Math.sqrt(squareNum(dot.v1.x)+squareNum(dot.v1.y));
    //  dot.v1 normalized
    dot.v1n = {};
    dot.v1n.x = (dot.v1.x / dot.v1.mag) || 0;
    dot.v1n.y = (dot.v1.y / dot.v1.mag) || 0;
    // from nn1 to dot normalized
    dot.v0n = {};
    dot.v0n.x = (dot.v0.x / dot.v0.mag) || 0;
    dot.v0n.y = (dot.v0.y / dot.v0.mag) || 0;
    
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

export function findNearestEqidistantPoint(dot,nn1,nn2) {

    dot = findNearestPointOrthogonal(dot,nn1,nn2);
    // from tox to midpoint
    dot.v4 = {x: dot.p2.x - dot.p1.x, y: dot.p2.y - dot.p1.y};
    dot.v4.mag = Math.sqrt(squareNum(dot.v4.x)+squareNum(dot.v4.y));
    dot.v4n = {};
    dot.v4n.x = ( dot.v4.x/dot.v4.mag ) || 0;
    dot.v4n.y = ( dot.v4.y/dot.v4.mag ) || 0;

    //now extending that vector;
    // dot.v5 = { x: dot.v4n.x * dot.avg, y: dot.v4n.y * dot.avg };
    dot.v5 = { x: dot.v4n.x * dot.v4.mag, y: dot.v4n.y * dot.v4.mag };
    dot.p5 = {x: dot.p1.x + dot.v5.x, y: dot.p1.y + dot.v5.y};

    dot.tex = dot.p5.x;
    dot.tey = dot.p5.y;

    return dot;
}

export function setTargets (dot, dots) {
    const nn1Index = dots.findIndex(d => d['id'] === dot.nn1); 
    const nn2Index = dots.findIndex(d => d['id'] === dot.nn2); 
    const nn3Index = dots.findIndex(d => d['id'] === dot.nn3);
    
    let nn1 = dots[nn1Index];
    let nn2 = dots[nn2Index];
    let nn3 = dots[nn3Index];

    dot.avg = 0.5 * (nn1.nn1DistanceSqrd + nn2.nn1DistanceSqrd) ;
    dot.avg = Math.sqrt(dot.avg);
    /// executing
    // dot = findV0(dot, nn1);
    // dot = findMidpoint(dot,nn1,nn2)
    dot = findCenterOfTriangle(dot,nn1,nn2,nn3);
    dot = findNearestEqidistantPoint(dot,nn1,nn2);

    let strats = {
        'stay': {tx: dot.xPos, ty: dot.yPos},
        'orth': {tx: dot.tox, ty: dot.toy},
        'midp': {tx: dot.tmx, ty: dot.tmy},
        'equi': {tx: dot.tex, ty: dot.tey},
        'cent': {tx: dot.tcx, ty: dot.tcy}
    }

    dot.tx = strats[dot.strategy].tx;
    dot.ty = strats[dot.strategy].ty;

    return dot;
} // end set targets
     
export function chooseStrategy (dot) {

    if (dot.strategy === 'stay') {return dot}
    
    let toDistSq = squareNum(dot.tox - dot.xPos) + squareNum(dot.toy - dot.yPos);
    let teDistSq = squareNum(dot.tex - dot.xPos) + squareNum(dot.tey - dot.yPos);
    let tmDistSq = squareNum(dot.tmx - dot.xPos) + squareNum(dot.tmy - dot.yPos);
    let tcDistSq = squareNum(dot.tcx - dot.xPos) + squareNum(dot.tcy - dot.yPos);
    // target equi, unless center is closer
    // if center is closer than equi, but midpoint closer than center, target midpoint
    // target center as last resort
    if (teDistSq < tcDistSq) { dot.strategy = 'equi'; }
    // else if (tcDistSq < tmDistSq) { dot.strategy = 'cent';}
    else { dot.strategy = 'orth'; }


    // dot.strategy = 'midp';
    return dot;
} // end chooseStrategy

export function moveTowardTarget (dot) {
    let xMove = dot.tx - dot.xPos;
    let yMove = dot.ty - dot.yPos;
    dot.xPos = dot.xPos + xMove * 0.2;
    dot.yPos = dot.yPos + yMove * 0.2;
    // if (xMove+yMove < 0.005) { dot.strategy = "stay"; }
    return dot;
}

export function trackAnim (dots) {
    dots.forEach(function (dot, i) {
        return setTargets(dot,dots);
    })
    dots.forEach(function (dot, i) {
        return moveTowardTarget(dot);
    })
    return dots;
}