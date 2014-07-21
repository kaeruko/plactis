var kAnime = function(canvasId, scale){
    this.kc = new kCanvas(canvasId, scale);
    this.count = 0;
}

kAnime.prototype.draw = function(){
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.grid();
    this.count ++;
    this.locus();
}

kAnime.prototype.locus = function(){
    var radius = 3;
    var theta = this.kc.period2rad(360,this.count);
    var point = this.kc.rotate(theta, radius);
    this.kc.stroke([0,0],[point[0], point[1]], null);
    this.kc.strokeCircle([0,0], radius, theta, "red", true);
    this.kc.strokeText("Radian:"+theta, -4, 0, "rgb(255, 255, 202)", 30);
    this.kc.strokeText("Dagree:"+this.kc.rad2deg(theta), -4, 1, "rgb(255, 255, 202)", 30);
    // this.kc.strokeText("青はjs上の角度です(上下反転)", -4, 4, "rgb(255, 255, 202)", 10);
}

kAnime.prototype.trigonometoric = function(){
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.grid();
    this.count ++;
    var radius = 1;
    var theta = this.kc.period2rad(100,this.count);
    var point = this.kc.rotate(theta, radius);
    this.kc.stroke([0,0],[point[0], point[1]], "rgb(0, 253, 153)");
    this.kc.stroke([0,0],[point[0], 0], "rgb(255, 0, 102)");
    this.kc.stroke(point,[point[0], 0], "rgb(240, 150, 80)");
    this.kc.strokeCircle([0,0], 1, Math.PI * 2, "red", true);
    this.kc.strokeCircle([0,0], 0.2, theta, "red", true);
if(true){
    this.kc.strokeText("Radian:"+this.kc.r(theta, 100), -0.3, -0.2, "rgb(255, 255, 202)", 20);
    this.kc.strokeText(this.kc.r(this.kc.rad2deg(theta), 100) +"°", -0.03, 0.3, "rgb(255, 255, 202)", 3);
    var costext = "cos:"+this.kc.r(Math.cos(theta),100);
    this.kc.strokeText(costext, point[0] / 2 ,0,  "rgb(255, 0, 102)", 20);
    var sintext = "sin:"+this.kc.r(Math.sin(theta),100);
    this.kc.strokeText(sintext, point[0], point[1] / 2, "rgb(240, 150, 80)", 20);
    this.kc.strokeText(1, point[0] / 2, point[1] / 2, "rgb(0, 253, 153)", 20);

}

//    this.locus();
}
