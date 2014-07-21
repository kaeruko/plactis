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
