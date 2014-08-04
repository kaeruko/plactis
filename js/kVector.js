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

/**
 * 斜辺の長さ出す
 */
kVector.prototype.distance = function(len){
    var ret = Math.sqrt( ( len[0] * len[0] ) + ( len[1] * len[1] ) );
    return ret;
}

/**
 * 2つの座標から相対座標を出す
 */
kVector.prototype.relativeLen = function(start, end){
    var vec1 = end, vec2 = start;
    return this.subVector(vec1, vec2);
}

/**
 * 2つの座標の長さをテキストで表示
 */
kVector.prototype.showlenText = function(len, point, color){
    var text = "wid:" + (this.kc.r(len[0],100)) +" , hgt:" + (this.kc.r(len[1],100));
    this.kc.strokeText(text, point[0] + 0.2 , point[1] + 0.2, color, 15);
}

kVector.prototype.setStartPoint = function(e){
    this.startPoint = this.kc.scaledown([e.offsetX,e.offsetY]);
}

kVector.prototype.setEndPoint = function(e){
    this.endPoint = this.kc.scaledown([e.offsetX,e.offsetY]);
    //endpointに丸をひく
    this.kc.fillCircle(this.endPoint, 0.05, Math.PI * 2, "red", true);
}

/**
 * this.vectorに格納
 */
kVector.prototype.setVector = function(){
    //vec1がセットされてたらvec2にセット
    var veclen = this.relativeLen(this.startPoint, this.endPoint ) ;
    if(this.vector1.length > 0){
        this.vector2 = [ this.startPoint, this.endPoint ];
        this.vec2len = veclen;
    }else{
        this.vector1 = [ this.startPoint, this.endPoint ];
        this.vec1len = veclen;
    }
    this.kc.stroke(this.startPoint, this.endPoint);
    //相対ベクトルを表示
    this.showlenText(veclen, this.endPoint);
}

kVector.prototype.showUnitVector = function(e){
    if(this.vector1.length == 0 ){
        return false;
    }
    //斜辺の長さを出す
    var magni = this.distance( this.vec1len );

    //単位ベクトルを出す
    var unit = this.unitVector(magni, this.vec1len);

    this.kc.stroke(this.startPoint, this.endPoint);
    this.showlenText(unit, unit, "rgb(255, 104, 104)");

    var u =
        [
            this.vector1[0][0] + unit[0],
            this.vector1[0][1] + unit[1]
        ];

    this.kc.stroke(this.vector1[0], u, "#FFFF99" );

    this.destruct();
}

//内積を表示
kVector.prototype.showInnerVector = function(e){
    if(this.vector1.length == 0 || this.vector2.length == 0 ){
        return false;
    }
    //正射影を出す
    var seisyaei = this.innerProduct(this.vector1, this.vector2);
debugVec(this.vector2);
console.debug(seisyaei);

    this.destruct();
}

kVector.prototype.innerProduct = function(vec1, vec2){
    var relative1 = this.relativeLen(vec1[0], vec1[1]);
    var relative2 = this.relativeLen(vec2[0], vec2[1]);

    var ret =
        relative1[0] * relative2[0] + relative1[1] * relative2[1];
    return ret;
}

function debugVec(vec) {
    console.debug(" start.x ", vec[0][0]);
    console.debug(" start.y ", vec[0][1]);
    console.debug(" end.x ", vec[1][0]);
    console.debug(" end.x ", vec[1][1]);
}

kVector.prototype.showAddVector = function(e){
    if(this.vector1.length == 0 || this.vector2.length == 0){
        return false;
    }

    var added = this.addVector(this.vec1len, this.vec2len);
    var addedPoint = this.addVectorPoint( added, this.vector1, this.vector2);
    this.showlenText(added, addedPoint[1]);
    this.kc.stroke(addedPoint[0], addedPoint[1]);
    this.kc.fillCircle(addedPoint[1], 0.05, Math.PI * 2, "red", true);
    this.destruct();
}

kVector.prototype.showSubVector = function(e){
    if(this.vector1.length == 0 || this.vector2.length == 0){
        return false;
    }

    var subed = this.subVector(this.vec2len, this.vec1len);
    var subedPoint = this.subVectorPoint( subed, this.vector1, this.vector2);
    this.showlenText(subed, subedPoint[1]);
    this.kc.stroke(subedPoint[0], subedPoint[1], "rgb(255, 255, 0)");
    this.kc.fillCircle(subedPoint[1], 0.05, Math.PI * 2, "rgb(255, 255, 0)", true);
    this.destruct();
}

kVector.prototype.showDivideVector = function(e){
    var vec1 = [1, 1];
    var vec2 = [-0.5, 2];
    var distance =  this.relativeLen(vec1, vec2);
    var xdiff = distance[0];
    var ydiff = distance[1];
    var divide1 = this.count;
    var divide2 = 10;
    var px =  ( ( divide1 * vec2[0] ) + ( divide2 * vec1[0] ) ) / (divide1 + divide2);
    var py =  ( ( divide1 * vec2[1] ) + ( divide2 * vec1[1] ) ) / (divide1 + divide2);

    this.kc.ctx.clearRect( 300, 280, 500, 500);
    this.kc.strokeText([ "x=",this.kc.r(px,100)," y=", this.kc.r(py,100) ], 0 , 0 , "rgb(25, 25, 0)" , 15);
    this.kc.strokeText( [ divide1, divide2 ], -0 , -1 , "rgb(150, 0, 0)" , 15);



    if(this.count == divide2){
        this.count = 0;
        this.init();
    }else{
        this.count ++;
    }
    this.kc.stroke([0,0], vec1, "rgb(255, 255, 0)");
    this.kc.stroke([0,0], vec2, "rgb(255, 200, 100)");

    this.kc.stroke([0,0], [px, py], "rgb(255, 255, 0)");
    this.destruct();
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
        // Math.abs(vec1len[0] + vec2len[0]), Math.abs(vec1len[1] + vec2len[1])
        vec2len[0] + vec1len[0], vec2len[1] + vec1len[1]
    ];
    return add;
}

kVector.prototype.subVectorPoint = function(sub, vec1, vec2){

    var start = vec1[1];
    var end = [  f(start[0]) + f(sub[0]) , f(start[1]) + f(sub[1]) ];

    return [start, end];
}

kVector.prototype.subVector = function(vec1len, vec2len){
    //width, hight
    var sub = [
        vec1len[0] - vec2len[0], vec1len[1] - vec2len[1]
    ];
    return sub;
}

kVector.prototype.unitVector = function(magni, vec){
console.debug("斜辺の長さ:", f(magni));
console.debug( "元ベクトルの横幅:" , vec[0], f(vec[0]) ,   "縦幅:",  vec[1], f(vec[1]));

    var ret = [ f(vec[0]) / f(magni) , f(vec[1]) / f(magni)];
console.debug( "f(vec[0]) / f(magni) :" , f(vec[0]) / f(magni)  );
console.debug( "後ベクトルの横幅:" , ret[0], "縦幅:",  ret[1]);
    return ret;
}

kVector.prototype.destruct = function(){
    this.vec1len = 0;
    this.vec2len = 0;
    this.startPoint = 0;
    this.endPoint = 0;
    this.vector1 = [];
    this.vector2 = [];
}

function f(f){
    return parseFloat(f);
}
