var kCanvas = function(
    canvasId
){
    //座標を何倍にするか
    this.scale = 20;
    var canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = this.canvasHeight = canvas.width;
    this.maxX = this.canvasWidth / this.scale ;
    this.maxY = this.canvasHeight / this.scale ;
    //座標を表示する
    this.grid();
};

kCanvas.prototype.stroke__ = function(start, end , color) {
if(!color){
    color = "rgb(0, 150, 152)";
}
  this.ctx.beginPath();
  this.ctx.moveTo(start[0]  ,start[1] );
  this.ctx.lineTo(end[0]  ,end[1] );
  this.ctx.closePath();
  this.ctx.strokeStyle = color;
  this.ctx.stroke();
}

kCanvas.prototype.stroke = function(start, end , color) {
    var start = this.adjustPoint(start);
    var end = this.adjustPoint(end);
    this.stroke__(start, end, color);
}

kCanvas.prototype.adjustPoint = function(defaultpoint) {
    return [ this.adjustSize( defaultpoint[0] ), this.adjustSize( defaultpoint[1], true )];
}

kCanvas.prototype.adjustSize = function(size,y){
    var ret = size * this.scale;
    if(isFinite(y)){
        ret *= -1;
        ret += (this.canvasHeight / 2);
    }else{
        ret += (this.canvasWidth / 2);
    }
    return ret;
}

kCanvas.prototype.grid = function() {
    //透明に
    this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "rgb(0, 0, 80)";
    //塗りつぶし
    this.ctx.fillRect( 0, 0, this.canvasWidth, this.canvasHeight);

    for (var i = -1 * this.maxX / 2; i < +1 * this.maxX / 2; i++) {
        var color =   "rgb(80, 80, 80)" ;
        if(Math.abs(i) % 5 === 0) {
            color =   "rgb(0, 150, 152)";
        }else if(i == 0 ) {
            color =  "rgb(0, 255, 255)" ;
        }
        //x軸(x軸が動いているので)
        this.stroke([ - 1 * this.maxX, i], [ +1 * this.maxX, i], color);
        this.stroke([ i, - 1 * this.maxX], [ i, +1 * this.maxX], color);
    };

    //真ん中のx軸を引く
    this.stroke([ -1 * this.maxX / 2 , 0 ],[ +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );
    this.stroke([ 0, -1 * this.maxX / 2 ],[ 0, +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );
}

kCanvas.prototype.circle = function(point, radius, color) {
    //座標を補正
    var point = this.adjustPoint(point);
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc( point[0], point[1], radius, this.degreeToRadian(360), false );
    this.ctx.fill();
    this.ctx.closePath();
}

kCanvas.prototype.degreeToRadian = function(degree) {
    return degree * Math.PI / 180;
}

kCanvas.prototype.rotate = function(point, rad, distance) {
    return point;
}