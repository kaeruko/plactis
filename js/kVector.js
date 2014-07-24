var kVector = function(canvasId, scale){
    this.kc = new kCanvas(canvasId, scale);
    this.count = 0;
    this.theta = 0;
    this.startPoint = 0;
    this.endPoint = 0;
    this.vector1 = [];
    this.vector2 = [];
}


kVector.prototype.init = function(){
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.vectorGrid();
}


kVector.prototype.setStartPoint = function(e){
    var scaledownpoint = this.kc.scaledown([e.offsetX,e.offsetY]);
    this.startPoint = scaledownpoint;
}

/**
 * 2つの座標から長さを出す
 */
kVector.prototype.relativeLen = function(start, end){
    var ret = [
        Math.abs(end[0] - start[0]),
        Math.abs(end[1] - start[1])
    ]
    return ret;
}

/**
 * 2つの座標の長さをテキストで表示
 */
kVector.prototype.showlenText = function(len,point){
    var text = "wid:" + Math.abs(this.kc.r(len[0],100)) +" , hgt:" + Math.abs(this.kc.r(len[1],100));
    this.kc.strokeText(text, point[0] + 0.2 , point[1] + 0.2, "rgb(255, 255, 102)", 15);
}

kVector.prototype.setEndPoint = function(e){
    var scaledownpoint = this.kc.scaledown([e.offsetX,e.offsetY]);
    this.kc.fillCircle(scaledownpoint, 0.05, Math.PI * 2, "red", true);
    this.endPoint = scaledownpoint;
    this.kc.stroke(this.startPoint, this.endPoint);

    //相対ベクトルを表示
    var veclen = this.relativeLen(this.endPoint, this.startPoint ) ;
    this.showlenText(veclen, this.endPoint);

    //ベクトル1が設定済みの場合は、足した後のベクトルを表示する
    if(this.vector1.length > 0){
        this.vec2len = veclen;
        this.vector2 = [this.startPoint, this.endPoint];

        var added = this.addVector(this.vec1len, this.vec2len);
        var addedPoint = this.addVectorPoint( added, this.vector1, this.vector2);
// console.debug(added, addedPoint);
        this.showlenText(added, addedPoint[1]);
        this.kc.stroke(addedPoint[0], addedPoint[1]);

        this.startPoint = 0;
        this.endPoint = 0;
        this.vector1 = [];
        this.vector2 = [];
    }
    else{
        this.vector1 = [this.startPoint, this.endPoint];
        this.vec1len = veclen;
    }
}

function f(f){
    return parseFloat(f);
}

kVector.prototype.addVectorPoint = function(add, vec1, vec2){
    var start = [  ( f(vec1[0][0]) + f(vec2[0][0]) )  / 2 ,
                   ( f(vec1[0][1]) + f(vec2[0][1]) )  / 2 ];
     var end = [  start[0] + add[0] , start[1] + add[1] ];
    return [start, end];
}

kVector.prototype.addVector = function(vec1len, vec2len){
    //width, hight
   var add = [
        vec1len[0] + vec2len[0], vec1len[1] + vec2len[1]
    ];
    return add;
}

kVector.prototype.matrixarrow = function(start, end, color){
    //長さを出す
    var diff_x =  end[0] - start[0];
    var diff_y =  end[1] - start[1];

    //傾きを出す
    var slope = diff_y / diff_x;

    console.debug("end", end);
    console.debug("start", start);
    console.debug("slope", slope );

    //点Pをひく
    //ベクトルの何割にp点をひくか
    var pdiv = 0.8;
    //p点の座標
    var ppos = [diff_x * pdiv + start[0], diff_y * pdiv + start[1] ];
    //垂直線
    var vertical = [ end[0]  , end[0] *  (1 / slope) * -1 ];
    rightwing  = this.addVector(vertical, ppos);
    console.debug("vertical", vertical );

    leftwing  = this.addVector([vertical[0] * -1, vertical[1] * -1], ppos);

    // this.kc.stroke( ppos, vertical , "#FF3366" );
    this.kc.stroke( ppos, leftwing , "#FF3366" );
    // this.kc.stroke( end, ppos , "#FF3366" );
    this.kc.stroke( ppos, rightwing , "#FF3366" );
    //垂直線を引く
    this.kc.fillCircle( ppos , 0.1,  Math.PI , "#FFFFFF" );


}

