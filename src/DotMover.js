//// use utils file

//utils
function ranPos(min,max) {
    return Math.floor(Math.random()*max)+min;
}
function squareNum (num) {
    return Math.pow(num, 2);
}

export function setTargets (dot) {

    // p1 between nn1 and nn2
    let findMidpoint  = function () {
        // console.log(dot);
        dot.tmx = (dot.nn2.xPos + dot.nn1.xPos) * 0.5 ;
        dot.tmy = (dot.nn2.yPos + dot.nn1.yPos) * 0.5 ;
        return { x: dot.tmx, y: dot.tmy};
    }

    // target center of triangle /////////////////////////////////////////
    let findCenterOfTriangle = function () {

        let p2 = {}

        function findTarget () {
            p2.x = (dot.nn1.xPos + dot.nn2.xPos + dot.nn3.xPos) * 0.33;
            p2.y = (dot.nn1.yPos + dot.nn2.yPos + dot.nn3.yPos) * 0.33;
        }

        findTarget();

        dot.tcx = p2.x;
        dot.tcy = p2.y;
    }
        // target nearest point to orthogonal of nn1->nn2
    let findNearestPointOrthogonal = function  () {

        // midpoint
        let p1 = {};
        // target
        let p2 = {};
        // closest point on v1 to dot
        let p3 = {};
        // from nn1 to nn2
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

        p1 = findMidpoint();
        // console.log(p1);

        function findTarget () {
            // nn1 to nn2
            v1.x = dot.nn2.xPos - dot.nn1.xPos;
            v1.y = dot.nn2.yPos - dot.nn1.yPos;
            v1.mag = Math.sqrt(squareNum(v1.x)+squareNum(v1.y));
            v1n.x = v1.x / v1.mag;
            v1n.y = v1.y / v1.mag;
            // nn1 to dot
            // here we can determine which quadrant is nn1 in compared to dot
            // the process for getting p3 will be determined by the quadrant
            v2.x = dot.xPos - dot.nn1.xPos;
            v2.y = dot.yPos - dot.nn1.yPos;
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
            p3.x = dot.nn1.xPos + v1a.x;
            p3.y = dot.nn1.yPos + v1a.y;

            // vector to closest point on v1 (p3)
            v3.x = dot.xPos - p3.x;
            v3.y = dot.yPos - p3.y;

            // shifting v3 to midpoint, thats the nice middle orthoganal
            p2.x = p1.x + v3.x;
            p2.y = p1.y + v3.y;

        }

        findTarget();

        dot.tox = p2.x;
        dot.toy = p2.y;
    }

    /// executing
    findMidpoint();
    findCenterOfTriangle();
    findNearestPointOrthogonal();

    return dot;
} // end set targets
     
export function chooseStrategy (dot) {
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
    dot.xPos = dot.xPos + (dot.tx - dot.xPos) * 0.3;
    dot.yPos = dot.yPos + (dot.ty - dot.yPos) * 0.3;
    // need to capture some random moveAmounts, like every X times it's called
    // have a watcher / incrementer
    // when avg moveAmount falls below threshhold, stop calling it
    // maybe all this in an animation module
    return dot;
}