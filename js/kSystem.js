var kSystem = function(canvasId,scale) {
    this.count = 0;
    this.kc = new kCanvas(canvasId,scale);
}

kSystem.prototype.addPlanet = function(pObj) {
    this.planet = pObj;
}

kSystem.prototype.putMother = function() {
    //１秒の角度 * 進んだ数
    var rad = 0;

    this.planet.point = this.kc.rotate(rad, this.planet.distance);
// console.debug(this.planet.point);
    this.kc.gradCircle(
        this.planet.point,
        this.planet.radius, this.planet.grad, rad,
        this.planet.centerGap
     );
}

kSystem.prototype.putAllSatellite = function(children) {
    for (var i = 0; i < children.length; i++)  {
        //衛星表示
        this.putSatellite(children[i]);
        if(children[i].children.length > 0) {
            this.putAllSatellite(children[i].children);
        }
    };

}

kSystem.prototype.putSatellite = function(st) {
    //１回の角度 * 進んだ数
    var theta = this.kc.period2rad(st.period, this.count * -1);
    st.point = this.kc.rotate(theta, st.distance);
// console.debug(st.name, " count: ", this.count, " rad: ",theta, " deg:", this.kc.rad2deg(theta) );

    this.kc.gradCircle(
        [
            st.point[0] + st.parent.point[0],
            st.point[1] + st.parent.point[1]
        ],
        st.radius, st.grad, theta, st.centerGap
     );
}

kSystem.prototype.draw = function() {
    this.kc.ctx.clearRect( 0, 0, this.kc.canvasWidth, this.kc.canvasHeight);
    this.kc.grid();

    this.count ++;

    //母星表示
    this.putMother();
    this.putAllSatellite(this.planet.children);
    // this.kc.screenshot(this.count);
}

