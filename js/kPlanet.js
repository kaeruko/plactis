var kPlanet = function(name, radius, period, distance, grad, centerGap) {
    this.children = [];
    this.create(name, radius, period, distance, grad, centerGap);
}

kPlanet.prototype.create = function(name, radius, period, distance, grad, centerGap) {
    this.name = name;
    this.radius = radius;
    this.period = period;
    this.distance = distance;
    this.grad = grad;
    this.centerGap = centerGap;
}

kPlanet.prototype.addChild = function(child) {
    this.children.push(child);
    child.parent = this;
}


kSystem.prototype.sun = function(){
    this.sunPoint = [0,0];
    var radius = 50;
    var color = this.suncolor(this.sunPoint, radius);
    this.kc.circle( this.sunPoint, radius, color );
    this.earth();
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

    var mthrPoint;
    var distance4mthr;

    if(!this.sunPoint){
        return false;
    }
    var distance4mthr = 5;
    var radius = 20;

    this.earthpoint = [ this.sunPoint[0] + distance4mthr, this.sunPoint[1] + distance4mthr ];

console.debug(this.sunPoint);
    var color = this.earthcolor(this.earthpoint, radius);
    this.kc.rotate( this.earthpoint, this.count, distance );
    this.kc.circle( this.earthpoint, radius, color );


    this.sunPoint = [0,0];
    var radius = 50;
    var color = this.suncolor(this.sunPoint, radius);
    this.kc.circle( this.sunPoint, radius, color );
    this.earth();
}