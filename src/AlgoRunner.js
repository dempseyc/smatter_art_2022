export default function AlgoRunner (dotPosData, algo) {
    let moveAmount = 0.5;
    let numMoves = 3;

    // utils
    function ranPos(min,max) {
        return Math.floor(Math.random()*max)+min;
    }
    function squareNum (num) {
        return Math.pow(num, 2);
    }

    // execute
    function main () {
        dotPosData.forEach((dot,i) => {
          dot = findNs(dot);
          // console.log(dot,i);
        });
        console.log('found Ns');
        makeMoves();
    }

    function makeMoves () {
      dotPosData.forEach((dot) => {
        for (let i = numMoves; i>0; i--) {
          setTarget(dot);
          moveTowardTarget(dot);
        }
      });
    }

    main();


    ////////////////////////////////////////////
    //////////////////  functions

    function findNs (currDot) {
        // take allDots array and fill in this.NN and this.NNN 
        // 20164 is based on square root of 2 times 100
        let NNDistanceSqrd = 20164 * 2;
        let NNNDistanceSqrd = 20164 * 2;

        // find NN
        dotPosData.forEach((dot) => {
            let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
            let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
            let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
            // if it's not me
            if (dot.idx !== currDot.idx) {
                // and NNN has not been set, set both
                if (typeof(currDot.NNN) === 'undefined') {
                  // console.log('should happen once per dot', typeof(currDot.NNN));
                  currDot.NNN = currDot;
                  // NNNDistanceSqrd = 0;
                  currDot.NN = dot;
                  NNDistanceSqrd = iNDistanceSqrd;

                }
                if (iNDistanceSqrd <= NNDistanceSqrd) {
                  // console.log('passed NN qualification')
                  currDot.NN = dot;
                  NNDistanceSqrd = iNDistanceSqrd;
                }
            }
        });
        // find NNN
        dotPosData.forEach((dot) => {
            let iNxDistance = Math.abs(currDot.xPos - dot.xPos);
            let iNyDistance = Math.abs(currDot.yPos - dot.yPos);
            let iNDistanceSqrd = squareNum(iNxDistance) + squareNum(iNyDistance);
            // if it's not me
            if (iNDistanceSqrd !== 0) {
                if (NNNDistanceSqrd > iNDistanceSqrd && iNDistanceSqrd > NNDistanceSqrd) {
                // console.log('passed NNN qualification')
                currDot.NNN = dot;
                NNNDistanceSqrd = iNDistanceSqrd;
                }
            }
        });
        return currDot;

    } // end findNs


    function setTarget (dot) {

      // target between NN and NNN /////////////////////////////////////////
      function findMidpoint () {
        // console.log(dot);
        dot.tmx = (dot.NNN.xPos + dot.NN.xPos) * 0.5 ;
        dot.tmy = (dot.NNN.yPos + dot.NN.yPos) * 0.5 ;
        return { x: dot.tmx, y: dot.tmy};
      }

      function targetRandom () {
        dot.trx = ranPos(0,200)/2;
        dot.try = ranPos(0,200)/2;
        dot.tx = dot.trx;
        dot.ty = dot.try;
      }

      function targetMidpoint () {
        dot.tx = dot.tmx;
        dot.ty = dot.tmy;
      }

      // target center of triangle /////////////////////////////////////////
      function targetCenterOfTriangle () {

        // midpoint
        let p1 = {};
        // target
        let p2 = {};
        // from NN to dot
        let v1 = {};
        // from NNN to dot
        let v2 = {};
        // from p1 to p2
        let v3 = {};

        p1 = findMidpoint();
        // console.log(p1);

        function findTarget () {
          v1.x = (dot.xPos - dot.NN.xPos);
          v1.y = (dot.yPos - dot.NN.yPos);
          v2.x = (dot.xPos - dot.NNN.xPos);
          v2.y = (dot.yPos - dot.NNN.yPos);
          v3.x = (v2.x + v1.x) * 0.25;
          v3.y = (v2.y + v1.y) * 0.25;
          p2.x = p1.x - v3.x;
          p2.y = p1.y - v3.y;
        }

        findTarget();
        dot.tcx = p2.x;
        dot.tcy = p2.y;
        dot.tx = dot.tcx;
        dot.ty = dot.tcy;
      }

      // target average magnitude and average angle /////////////////
      function targetAverageVectorAverageMagnitude () {

        // midpoint
        let p1 = {};
        // target
        let p2 = {};
        // from NN to dot
        let v1 = {};
        // from NNN to dot
        let v2 = {};
        // from midpoint to dot
        let v3 = {};
        // mag of NN->NNN applied to v3
        let v4 = {};

        p1 = findMidpoint();
        // console.log(p1);

        function findTarget () {
          v1.x = dot.xPos - dot.NN.xPos;
          v1.y = dot.yPos - dot.NN.yPos;
          v1.mag = Math.sqrt(squareNum(v1.x)+squareNum(v1.y));
          v2.x = dot.xPos - dot.NNN.xPos;
          v2.y = dot.yPos - dot.NNN.yPos;
          v2.mag = Math.sqrt(squareNum(v2.x)+squareNum(v2.y));
          v3.x = (v2.x + v1.x) * 0.5;
          v3.y = (v2.y + v1.y) * 0.5;
          v3.mag = Math.abs((v1.mag + v2.mag) * 0.5);
          v3.xn = v3.x / v3.mag;
          v3.yn = v3.y / v3.mag;

          v4.mag = Math.sqrt(squareNum(dot.NNN.xPos-dot.NN.xPos)+squareNum(dot.NNN.yPos-dot.NN.yPos));
          v4.x = v3.xn * v4.mag / 2;
          v4.y = v3.yn * v4.mag / 2;
          p2.x = p1.x + v4.x;
          p2.y = p1.y + v4.y;
        }

        findTarget();
        dot.tax = p2.x;
        dot.tay = p2.y;
        dot.tx = dot.tax;
        dot.ty = dot.tay;

      }

      // target nearest point to orthogonal of NN->NNN
      function targetNearestPointOrthogonal () {

        // midpoint
        let p1 = {};
        // target
        let p2 = {};
        // closest point on v1 to dot
        let p3 = {};
        // from NN to NNN
        let v1 = {};
        // from NN to p3
        let v1a = {};
        // from NN to dot
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
          // NN to NNN
          v1.x = dot.NNN.xPos - dot.NN.xPos;
          v1.y = dot.NNN.yPos - dot.NN.yPos;
          v1.mag = Math.sqrt(squareNum(v1.x)+squareNum(v1.y));
          v1n.x = v1.x / v1.mag;
          v1n.y = v1.y / v1.mag;
          // NN to dot
          // here we can determine which quadrant is NN in compared to dot
          // the process for getting p3 will be determined by the quadrant
          v2.x = dot.xPos - dot.NN.xPos;
          v2.y = dot.yPos - dot.NN.yPos;
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

          // this will give us p2, closest point to dot on v1
          v1a.mag = adjacent;
          v1a.x = v1n.x * v1a.mag;
          v1a.y = v1n.y * v1a.mag;
          p3.x = dot.NN.xPos + v1a.x;
          p3.y = dot.NN.yPos + v1a.y;

          v3.x = dot.xPos - p3.x;
          v3.y = dot.yPos - p3.y;

          p2.x = p1.x + v3.x;
          p2.y = p1.y + v3.y;

        }

        findTarget();
        dot.tox = p2.x;
        dot.toy = p2.y;
        dot.tx = dot.tox;
        dot.ty = dot.toy;

      }
      ///// end of target strategies

      //// execution on setTarget

      findMidpoint();

      switch (algo) {

        case 'random':
          targetRandom();
          console.log('random');
          break;

        case 'midpoint':
          targetMidpoint();
          console.log('midpoint');
          break;
        
        case 'orthogonal':
          targetNearestPointOrthogonal();
          console.log('orthogonal');
          break;
        
        case 'average':
          targetAverageVectorAverageMagnitude();
          console.log('average');
          break;

        case 'center':
          targetCenterOfTriangle();
          console.log('center');
          break;
        
        default:
          console.log('default');
          break;
      }

    }  // end setTarget

    function moveTowardTarget (dot) {
      // app has a moveAmount constant that slowly moves you toward target
      // console.log('move called');
      dot.xPos = dot.xPos + (dot.tx - dot.xPos) * moveAmount;
      dot.yPos = dot.yPos + (dot.ty - dot.yPos) * moveAmount;

    }

    return dotPosData;

} // end Algo Runner 