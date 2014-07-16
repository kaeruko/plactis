var kSystem = function(planet){
    this.planet = planet;
    this.count = 0;
    this.kc = new kCanvas("astorogy");
    this.sun();
    this.earth();
}

kSystem.prototype.planets = function(count){
    this.count++;
    this.earth();
}

kSystem.prototype.sun = function(){
    this.sunPoint = [0,0];
    var radius = 50;
    var color = this.suncolor(this.sunPoint, radius);
    this.kc.circle( this.sunPoint, radius, color );
}

kSystem.prototype.earth = function(point, distance){
    if(!this.sunPoint){
        return false;
    }
    var distance4mother = 5;
    var radius = 20;

    this.earthpoint = [ this.sunPoint[0] + distance4mother, this.sunPoint[1] + distance4mother ];

// console.debug(this.sunPoint);
    var color = this.earthcolor(this.earthpoint, radius);
    this.kc.rotate( this.earthpoint, this.count, distance );
    this.kc.circle( this.earthpoint, radius, color );
}

kSystem.prototype.suncolor = function(point, radius) {
    var point = this.kc.adjustPoint(point);
    var grad  = this.kc.ctx.createRadialGradient(
        point[0]   , point[1]
        ,radius /2 ,
        point[0]   , point[1]  ,
        radius/1);
    grad.addColorStop(0.8,"rgb(200, 0, 0)");
    grad.addColorStop(0,"rgb(240, 204, 100)");
    grad.addColorStop(0.9,"rgb(200, 100, 0)");
    return grad;
}

kSystem.prototype.earthcolor = function(point, radius, rad) {


}

