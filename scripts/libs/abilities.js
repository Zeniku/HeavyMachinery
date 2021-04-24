const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
function laserMoveAbility(x, y, stat, minSpeed, maxSpeed, shootSound){
  let bullet = extend(ContinuousLaserBulletType, {
        length: 5 * 8
  });
  libs.flib.merge(bullet, stat)
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
      if(shootSound != Sounds.none && !Vars.headless){
        let shootSoundH = null
        if(shootSound == null){
          shootSoundH = new SoundLoop(shootSound, 1);
        }
        if(shootSoundH != null){
          shootSoundH.update(bx, by, true);
        }
      }
      libs.flib.debug("Abilities", [scl, bullet, shootSound, Vars.headless])
      if(scl > 0.01){
        bullet.create(unit, unit.team, bx, by, unit.rotation)
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