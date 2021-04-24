const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
function laserMoveAbility(x, y, stat, speedStart, minSpeed, maxSpeed, shootSound){
  let laserbullet = extend(ContinuousLaserBulletType, {
    length: 5 * 8,
  });
  libs.flib.merge(bullet, stat)
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
      let bx = unit.x + Angles.trnsx(unit.rotation, x, y)
      let by = unit.y + Angles.trnsy(unit.rotation, x, y)
      if(shootSound != Sounds.none && !Vars.headless){
        let shootSoundH = null
        if(shootSound == null){
          shootSoundH = new SoundLoop(shootSound, 1);
        }
        if(shootSoundH != null){
          shootSoundH.update(bx, by, true);
        }
      }
      if(scl >= speedStart){
        laserbullet.create(unit, unit.team, bx, by, unit.rotation)
      }
      libs.flib.debug("Abilities", [scl, laserbullet, shootSound, unit, unit.rotation, bx, by, Vars.headless])
    },
    localized(){
      return "LaserMoveAbility"
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}