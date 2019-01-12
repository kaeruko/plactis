var kCanvas = function(
    canvasId,scale
){
    //座標を何倍にするか
    this.scale = scale;
    var canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = this.canvasHeight = canvas.width;
    this.maxX = this.canvasWidth / this.scale ;
    this.maxY = this.canvasHeight / this.scale ;
    this.canvas = canvas;
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
    var x =   ( defaultpoint[0] * this.scale ) + (this.canvasWidth  / 2) ;
    var y = - ( defaultpoint[1] * this.scale ) + (this.canvasHeight / 2) ;
    return [x,y];
}

kCanvas.prototype.scaledown = function(defaultpoint) {
    var x =  ( defaultpoint[0] - ( this.canvasWidth  / 2 )) / this.scale;
    var y =  ( defaultpoint[1] - ( this.canvasHeight / 2 )) / this.scale;
    return [x,-y];
}

kCanvas.prototype.adjustSize = function(size){
    return size * this.scale;
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
        //縦軸の座標
        this.strokeText(i, i , - this.maxX / 2 + 0.9 , "rgb(255, 255, 102)",  this.scale / 30);
        this.strokeText(i, this.maxY / 2 - 0.9, i, "rgb(255, 0, 102)",  this.scale / 30);
    };

    //真ん中のx軸を引く
    this.stroke([ -1 * this.maxX / 2 , 0 ],[ +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );
    this.stroke([ 0, -1 * this.maxX / 2 ],[ 0, +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );
}

kCanvas.prototype.vectorGrid = function() {
    //透明に
    this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "rgb(0, 0, 80)";
    //塗りつぶし
    this.ctx.fillRect( 0, 0, this.canvasWidth, this.canvasHeight);

    for (var i = -1 * this.maxX / 2; i < +1 * this.maxX / 2; i++) {
        var color =   "rgb(80, 80, 80)" ;
        //x軸(x軸が動いているので)
        this.stroke([ - 1 * this.maxX, i], [ +1 * this.maxX, i], color);
        this.stroke([ i, - 1 * this.maxX], [ i, +1 * this.maxX], color);
    };
}


kCanvas.prototype.grid_text = function() {
    //透明に
    this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "rgb(0, 0, 80)";
    //塗りつぶし
    this.ctx.fillRect( 0, 0, this.canvasWidth, this.canvasHeight);

    for (var i = -1 * this.maxX / 2; i < +1 * this.maxX / 2; i++) {
        var color =   "rgb(80, 80, 80)" ;
        //x軸(x軸が動いているので)
        this.stroke([ - 1 * this.maxX, i], [ +1 * this.maxX, i], color);
        this.stroke([ i, - 1 * this.maxX], [ i, +1 * this.maxX], color);
        this.strokeText(i, i , - this.maxX / 2 + 0.9 , "rgb(255, 255, 102)",  this.scale / 30);
        this.strokeText(i, this.maxY / 2 - 0.9, i, "rgb(255, 0, 102)",  this.scale / 30);
    };
    //真ん中のx軸を引く
    this.stroke([ -1 * this.maxX / 2 , 0 ],[ +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );
    this.stroke([ 0, -1 * this.maxX / 2 ],[ 0, +1 * this.maxX / 2 , 0 ], "rgb(153, 255, 255)" );

}


kCanvas.prototype.strokeText__ = function(text, x, y, color, size) {
    this.ctx.strokeStyle = color;
    // this.ctx.font = size + "px 'ヒラギノ角ゴ'";
    this.ctx.font = 10 + "px 'ヒラギノ角ゴ'";
    this.ctx.strokeText(text, x, y);
}

kCanvas.prototype.strokeText = function(text, x, y, color, size){
    var ret = this.adjustPoint([x,y]);
    this.strokeText__(text, ret[0], ret[1], color, size);
}

kCanvas.prototype.strokeCircle = function(point, radius, theta, color) {
    var point = this.adjustPoint(point);
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc( point[0], point[1], this.adjustSize(radius), 0, -theta , true );
    this.ctx.stroke();
    this.ctx.closePath();
}

kCanvas.prototype.fillCircle = function(point, radius, theta, color) {
    var point = this.adjustPoint(point);
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc( point[0], point[1], this.adjustSize(radius),  0 , -theta , true );
    this.ctx.fill();
    this.ctx.closePath();
}

kCanvas.prototype.gradCircle = function(point, radius, colors, theta, centerGap) {
    var grad = this.createGrad(colors, point, radius, theta, centerGap);
    //座標を補正
    this.fillCircle(point, radius, Math.PI * 2, grad);
}

kCanvas.prototype.createGrad = function(colors, point, radius, theta , centerGap) {
    var x = 0 - point[0];
    var y = 0 - point[1];

    var d = Math.sqrt( ( x * x ) + ( y * y ) );

    var ux = 0;
    var uy = 0;
    //単位ベクトル
    if(d !== 0){
        ux = x / d;
        uy = y / d;
    }

    var gapX =  (radius * centerGap ) * ux ;
    var gapY =  (radius * centerGap ) * uy ;
    var gapPoint = [ point[0] + gapX, point[1] + gapY];
    gapPoint = this.adjustPoint(gapPoint);
    point = this.adjustPoint(point);

    var grad  = this.ctx.createRadialGradient(
            gapPoint[0],
            gapPoint[1],
            this.adjustSize(radius) /2 ,
            point[0] ,
            point[1] ,
            this.adjustSize(radius) /1
        );

    for (var ratio in colors) {
       grad.addColorStop(ratio, colors[ratio]);
    };
    return grad;
}

kCanvas.prototype.period2rad = function(period, count) {
    return ( Math.PI * 2 / period ) % (Math.PI * 2);
   // return (Math.PI / period * count) % Math.PI * 2;
}

kCanvas.prototype.deg2rad = function(degree) {
    //6.28をperiodで割っていくつ進めるか
    return  ( Math.PI / 180 * degree )  % (Math.PI *2);
}

kCanvas.prototype.rad2deg = function(rad) {
    return rad *  180 / Math.PI % 360;
// return rad * 57;
}

kCanvas.prototype.getPeriod = function(period) {
    return period;
}

kCanvas.prototype.rotate = function(rad, distance) {
            //座標
    var x = Math.cos(rad) * distance * 1;
    var y = Math.sin(rad) * distance * 1;
// console.debug( "rad:" , rad, "cos: ", Math.cos(rad) , "sin:" , Math.sin(rad) );
    return [x,y];
}

kCanvas.prototype.r = function(num, digit) {
    return Math.round(num * digit) / digit;
}

kCanvas.prototype.arrow = function(start, end, color){
//長さを出す
var x_diff = end[0] - start[0];
var y_diff = end[1] - start[1];

var fat_flg = x_diff > y_diff;

var p = [(x_diff * 0.8) + start[0], (y_diff * 0.8) + start[1] ];

this.stroke( start, p, "#333300" );

//直角の傾きを出す
var slope = fat_flg ? -x_diff / y_diff : -y_diff / x_diff;

if(!isFinite(slope)){
  slope = 0;
}

if(!fat_flg){
  var x =   1 *  slope ;
  var y =   1  ;
}else{
  var x =   1  ;
  var y =   1  * slope  ;
}

var ratio =  1 / Math.sqrt( (x * x) + (y * y)  )  ;

if(fat_flg){
  var tmp_right = [ p[0] +  -1 *  slope  * ratio ,  p[1] - 1  * ratio ]
  var tmp_left  = [ p[0] + 1 *  slope  * ratio ,  p[1] + 1  * ratio ]
}else{
  var tmp_right = [ p[0] + 1 * ratio , p[1] + 1 * slope * ratio ]
  var tmp_left  = [ p[0] - 1 * ratio , p[1] - 1 * slope * ratio ]
}

this.stroke( p, tmp_right, "#CCFFFF" );

this.stroke( p, tmp_left, "#FF0000" );

this.stroke( end, tmp_right, "#ffffff" );
this.stroke( end, tmp_left, "#F971DB" );
}




/*
Base64toBlob
return:blob blobオブジェクト
param0:string base64エンコーディングされた文字列

support(たぶん)
    Chrome 7+
    Firefox(Gecko)4(2)+
    Internet Explorer 10+
    Opera 11.6+
    Safari 5.1+
*/
function Base64toBlob(_base64)
{
    var i;
    var tmp = _base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];

    //var buff = new ArrayBuffer(data.length);
    //var arr = new Uint8Array(buff);
    var arr = new Uint8Array(data.length);
    for (i = 0; i < data.length; i++) {arr[i] = data.charCodeAt(i);}
    var blob = new Blob([arr], { type: mime });
    return blob;
}
/**
saveBlob
param0:blob blobオブジェクト
param1:string デフォルトのダウンロードファイル名

@support (たぶん)
    Chrome 8+
    Firefox(Gecko) 4+
    Internet Explorer 10+
    Opera 12+
    Safari(WebKit) Nightly build
**/
function saveBlob(_blob,_file)
{
    if( /*@cc_on ! @*/ false )
    {   // IEの場合
        window.navigator.msSaveBlob(_blob, _file);
    }
    else
    {
        var url = (window.URL || window.webkitURL);
        var data = url.createObjectURL(_blob);
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.href = data;
        a.download = _file;
        a.dispatchEvent(e);
    }
}

/*
ArraytoBlob
return:blob blobオブジェクト
param0:string mime
param1:array byte配列データ

support(たぶん)
    Chrome 7+
    Firefox(Gecko)4(2)+
    Internet Explorer 10+
    Opera 11.6+
    Safari 5.1+
*/
function ArraytoBlob(_mime,_array)
{
    // ArrayBufferやUint8Arrayなら入れなおす工数がなくなります
    var arr = new Uint8Array(_array.length);
    for (var i = 0; i < _array.length; i++) {arr[i] = _array[i];}

    var blob = new Blob([arr], { type: _mime });
    return blob;
}


kCanvas.prototype.screenshot = function(count) {
    var base64 = this.canvas.toDataURL();
    var blob = Base64toBlob(base64);
    saveBlob(blob,count + ".png");
}
