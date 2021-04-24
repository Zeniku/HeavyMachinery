const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
function laserMoveAbility(x, y, stat, speedStart, minSpeed, maxSpeed, shootSound){
  let bullet = extend(LaserBulletType, {
    length: 5 * 8,
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