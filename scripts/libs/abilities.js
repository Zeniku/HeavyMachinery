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
        length: (Mathf.clamp(unit.vel.len()) * 100) * 160
      });
      libs.flib.merge(bullet, stat)
      if(shootSound != Sounds.none && !Vars.headless){
        if(shootSound == null) shootSound = new SoundLoop(shootSound, 1);
        shootSound.update(bx, by, true);
      }
      if(scl > minSpeed){
        bullet.create(unit, unit.team, bx, by, unit.rotation)
      }
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}