var kAnime = function(canvasId, scale){
    this.kc = new kCanvas(canvasId, scale);
    this.count = 0;
    this.theta = 0;
}

kAnime.prototype.draw = function(){
    if(this.count > 0){
        this.count --;
        return;
    }
    this.count = 3;
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.grid();
    this.count ++;
    this.locus();
}

kAnime.prototype.locus = function(){
    var radius = 3;
    this.theta += this.kc.period2rad(360);
    var point = this.kc.rotate(this.theta, radius);
    this.kc.stroke([0,0],[point[0], point[1]], null);
    this.kc.strokeCircle([0,0], radius, this.theta, "red", true);
    this.kc.strokeText("Radian:"+this.theta, -4, -1, "rgb(255, 255, 202)", 30);
    this.kc.strokeText("Dagree:"+this.kc.rad2deg(this.theta), -4, -2, "rgb(255, 255, 202)", 30);
    // this.kc.strokeText("青はjs上の角度です(上下反転)", -4, 4, "rgb(255, 255, 202)", 10);
}

kAnime.prototype.trigonometoric = function(){
    if(this.count > 0){
        this.count --;
        return;
    }
    this.count = 3;

    var radius = 1;
    this.theta += this.kc.period2rad(96);
    var point = this.kc.rotate(this.theta, radius);
    var deg = this.kc.r(this.kc.rad2deg(this.theta),100);
    var costext = "cos:"+this.kc.r(Math.cos(this.theta),1000);
    var sintext = "sin:"+this.kc.r(Math.sin(this.theta),1000);
    var cons = {
        30:"√3/2", 45:"√2/2", 60:"√1/2", 90:0,
        120:"-√1/2", 135:"-√2/2", 150:"-√3/2", 180:-1,
        210:"-√3/2", 225:"-√2/2", 240:"-√1/2", 270:0,
        300:"√1/2", 315:"√2/2", 330:"√3/2", 360:1
         }
    var sins = {
        30:"√1/2", 45:"√2/2", 60:"√3/2", 90:1,
        120:"√3/2", 135:"√2/2", 150:"√1/2", 180:0,
        210:"-√1/2", 225:"-√2/2", 240:"-√3/2", 270:-1,
        300:"-√3/2", 315:"-√2/2", 330:"-√1/2", 360:0
         }
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.grid();

    for (var i = 0; i < 360; i+=15) {
    var the = this.kc.deg2rad(i);
    var p = this.kc.rotate(the, radius+ 0.2);
    this.kc.strokeText(i, p[0], p[1],  "rgb(255, 255, 202)", 20);
    };

    if(deg % 15 == 0){
        if(cons[deg])costext = cons[deg];
        if(sins[deg])sintext = sins[deg];
    }
    this.kc.stroke([0,0],[point[0], point[1]], "rgb(0, 253, 153)");
    this.kc.stroke([0,0],[point[0], 0], "rgb(255, 0, 102)");
    this.kc.stroke(point,[point[0], 0], "rgb(240, 150, 80)");
    this.kc.strokeCircle([0,0], 1, Math.PI * 2, "red", true);
    this.kc.strokeCircle([0,0], 0.2, this.theta, "red", true);
    this.kc.strokeText("Radian:"+this.kc.r(this.theta, 100), 1, -1.5, "rgb(255, 255, 202)", 20);
    this.kc.strokeText(deg +"°", -0.14, 0.3, "rgb(255, 255, 202)", 20);
    this.kc.strokeText(costext,  point[0] / 2 * 1.1 - 0.2 ,0,  "rgb(255, 0, 102)", 20);
    this.kc.strokeText(sintext, point[0], point[1] / 2, "rgb(240, 150, 80)", 20);
    this.kc.strokeText(1, point[0] / 2, point[1] / 2, "rgb(0, 253, 153)", 2);
    if(cons[deg] && sins[deg]){
        this.count += 10;
    }

}
