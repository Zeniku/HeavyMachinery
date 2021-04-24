const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
function laserMoveAbility(x, y, stat, minSpeed, maxSpeed, shootSound){
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
      let bullet = extend(ContinuousLaserBulletType, {
        length: 5 * 8
      });
      libs.flib.merge(bullet, stat)
      if(shootSound != Sounds.none && !Vars.headless){
        let shootSoundH = null
        if(shootSound == null){
          shootSoundH = new SoundLoop(shootSound, 1);
        }
        if(shootSoundH != null){
          shootSoundH.update(bx, by, true);
        }
      }
      if(scl > 0.2){
        bullet.create(unit, unit.team, bx, by, unit.rotation)
      }
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}