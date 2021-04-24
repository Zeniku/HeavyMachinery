const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
function laserMoveAbility(x, y, stat, speedStart, minSpeed, maxSpeed, shootSound){
  let bullet = extend(LaserBulletType, {
    length: 5 * 8,
    update(b){
      this.super$update(b)
      b.set(b.owner.x + Angles.trnsx(b.owner.rotation, x, y), b.owner.y + Angles.trnsy(unit.rotation, x, y));
      b.rotation(b.owner.rotation)
      libs.flib.debug("Abilities", [b, b.owner])
    }
  });
  libs.flib.merge(bullet, stat)
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
      let bx = unit.x + Angles.trnsx(unit.rotation, x, y)
      let by = unit.y + Angles.trnsy(unit.rotation, x, y)
      libs.flib.debug("Abilities", [scl, bullet, shootSound, Vars.headless])
      if(scl > speedStart){
        bullet.create(unit, unit.team, bx, by, unit.rotation)
        if(shootSound != Sounds.none && !Vars.headless){
          let shootSoundH = null
          if(shootSound == null){
            shootSoundH = new SoundLoop(shootSound, 1);
          }
          if(shootSoundH != null){
            shootSoundH.update(bx, by, true);
          }
        }
      }
    },
    localized(){
      return "LaserMoveAbility"
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}