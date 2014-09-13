"use strict";

//初期値
var y = 0;
var vy = 0;
var aY = 0;
var preY = 0;

var framerate = 2;
var kc;

window.addEventListener('load', function() {
    document.addEventListener("touchstart", function(){
        kc.grid();
        y = 0;
        vy = 0;
        ay = 0;
        highY = 0;
    });
    var canvasId = "grav";
    kc = new kCanvas(canvasId, 60);
    kc.grid();
    setInterval("drew()", 10 );
});

function drew () {
    kc.ctx.clearRect( 0, 0, kc.canvasWidth, kc.canvasHeight);

    //上に上げてるときはへばりつく
   if(aY > 0){
        aY = kc.maxY * -1;
        //目標値と現在地点を速さで割る
   }

    document.getElementById("sensor").innerHTML = aY;
//    var txt = "acceleration.x:"+highX+"<br>acceleration.y:"+highY+"<br>";


// return;

//     var absY = Math.abs(ay);

// //    if(absY > highY){
//     if(absY > 1){
//         highY = ay;
//         //壁より大きい場合は壁と同じ座標
//         if( absY >  kc.maxY ){
//             highY = ( ay > 0 ) ? kc.maxY : kc.maxY * -1;
//         }
//     }
//     preY = ay;

   kc.stroke([0,0], [0,aY], "#ffffff");
   kc.fillCircle([0 , aY ], 0.2, Math.PI * 2, "#ff6600");
}

window.addEventListener("devicemotion", function(evt){

    //重力
    // aY = evt.accelerationIncludingGravity.y;    // Y方向の傾き
    aY = evt.acceleration.y;


}, true);

