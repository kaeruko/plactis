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
    this.locus();
}
