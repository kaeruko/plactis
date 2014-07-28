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
kVector.prototype.magnitude = function(len){
    var ret = Math.sqrt( ( len[0] * len[0] ) + ( len[1] * len[1] ) );
    return ret;
}

/**
 * 2つの座標から相対座標を出す
 */
kVector.prototype.relativeLen = function(start, end){
    var ret = [
        end[0] - start[0],
        end[1] - start[1]
    ]
    return ret;
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
    var magni = this.magnitude( this.vec1len );

    //単位ベクトルを出す
    var unit = this.unitVector(magni, this.vec1len);

    this.kc.stroke(this.startPoint, this.endPoint);
    this.showlenText(unit, [this.vector1[1][0], this.vector1[1][1] - 0.5], "rgb(255, 104, 104)");

    var l =
    [ this.vector1[0][0] + unit[0],
    this.vector1[0][1] + unit[1]
    ];

    this.kc.stroke(this.vector1[0], l, "#FFFF99" );

    this.destruct();
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

    var subed = this.subVector(this.vec1len, this.vec2len);
    var subedPoint = this.subVectorPoint( subed, this.vector1, this.vector2);
    this.showlenText(subed, subedPoint[1]);
    this.kc.stroke(subedPoint[0], subedPoint[1], "rgb(255, 255, 0)");
    this.kc.fillCircle(subedPoint[1], 0.05, Math.PI * 2, "rgb(255, 255, 0)", true);
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
        vec2len[0] - vec1len[0], vec2len[1] - vec1len[1]
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
