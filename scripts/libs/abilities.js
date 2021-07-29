let lib = "heavymachinery/libs/"
let flib = require(lib +"function");
let elib = require(lib + "effectlib");
function laserMoveAbility(x, y, laserStat, speedStart, minSpeed, maxSpeed, customStat){
  if(customStat == undefined) customStat = {}
  if(laserStat == undefined) laserStat = {}
  laserStat = Object.assign({
    lifetime: 15,
    laserEffect: Fx.none,
    update(b){
      let owner = b.owner
      let bx = owner.x + Angles.trnsx(owner.rotation, x, y)
      let by = owner.y + Angles.trnsy(owner.rotation, x, y)
      b.set(bx, by)
      b.rotation(owner.rotation)
    }
  }, laserStat);
  
  customStat = Object.assign({
    bullet: extend(LaserBulletType, laserStat),
    update(unit) {
        let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
        let bx = unit.x + Angles.trnsx(unit.rotation, x, y)
        let by = unit.y + Angles.trnsy(unit.rotation, x, y)
        if(scl > 0.1){
          if(unit.timer.get(0, this.bullet.lifetime - 5)){
            this.bullet.create(unit, bx, by, unit.rotation)
          }
        }
        //flib.debug("Abilities", [scl, laserbullet, unit, unit.rotation, bx, by])
      },
      localized() {
        return "LaserMoveAbility" // haha Fuck you bundles
      },

  }, customStat)
  
  return extend(Ability, customStat)
}

module.exports = {
  laserMoveAbility: laserMoveAbility,
}