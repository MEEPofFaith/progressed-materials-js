//Haha code steal go brrrr
const clone = obj => {
    if(obj === null || typeof(obj) !== 'object') return obj;
    var copy = obj.constructor();
    for(var attr in obj) {
        if(obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
        }
    };
    return copy;
}

module.exports = {
  strobeNode(type, build, speed, name, obj, objb){
    if(obj == undefined) obj = {};
    if(objb == undefined) objb = {};
    obj = Object.assign({
      load(){
        this.super$load();
        this.colorRegion = Core.atlas.find(this.name + "-strobe");
        this.laser = Core.atlas.find("prog-mats-rainbow-laser");
        this.laserEnd = Core.atlas.find("prog-mats-rainbow-laser-end");
      },
      setupColor(satisfaction){
        Draw.color(strobe.laserColor1.cpy().shiftHue(Time.time * speed), strobe.laserColor2.cpy().shiftHue(Time.time * speed), (1 - satisfaction) * 0.86 + Mathf.absin(3, 0.1));
        Draw.alpha(Renderer.laserOpacity);
      },
      drawPlace(x, y, rot, val){
        Draw.z(Layer.block + 0.01);
        Draw.color(strobe.laserColor1.cpy().shiftHue(Time.time * speed));
        Draw.alpha(1);
        Draw.rect(strobe.colorRegion, x * Vars.tilesize + strobe.offset, y * Vars.tilesize + strobe.offset);
        Draw.reset();
        this.super$drawPlace(x, y, rot, val);
      },
      laserColor1: Color.red,
      laserColor2: Color.red.cpy().mul(0.5)
    }, obj);
    
    objb = Object.assign({
      draw(){
        Draw.z(Layer.block + 0.01);
        Draw.color(strobe.laserColor1.cpy().shiftHue(Time.time * speed), strobe.laserColor2.cpy().shiftHue(Time.time * speed), (1 - this.power.graph.getSatisfaction()) * 0.86 + Mathf.absin(3, 0.1));
        Draw.alpha(1);
        Draw.rect(strobe.colorRegion, this.x, this.y);
        Draw.reset();
        Draw.z(Layer.block);
        this.super$draw();
      }
    }, objb);
    
    const strobe = extend(type, name, obj);
    
    strobe.buildType = ent => {
      ent = extend(build, strobe, clone(objb));
      return ent;
    }
    
    return strobe;
  }
}