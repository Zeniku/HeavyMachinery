function laserMoveAbility(x, y, stat, minSpeed, maxSpeed, shootSound){
  return extend(Ability, {
    update(){
      let scl = Mathf.clamp((this.unit.vel().len() - minSpeed) / (maxSpeed - minSpeed));
      let bullet = extend(ContinuousLaserBulletType, stat);
      let bx = this.unit.x + Angles.trnsx(this.unit.rotation, x, y)
      let by = this.unit.y + Angles.trnsy(this.unit.rotation, x, y)
      bullet.rotation(this.unit.rotation)
      bullet.set(bx, by)
      if(shootSound != Sounds.none && !Vars.headless){
        if(shootSound == null) shootSound = new SoundLoop(shootSound, 1);
        shootSound.update(bx, by, true);
      }
      if(scl > minSpeed){
      bullet.create(this.unit, this.unit.team, bx, by, this.unit.rotation)
      }
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}