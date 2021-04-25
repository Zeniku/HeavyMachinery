const flib = require("heavymachinery/libs/function")

function laserMoveAbility(x, y, stat, speedStart, minSpeed, maxSpeed, shootSound){
  let laserbullet = extend(LaserBulletType, {
    length: 5 * 8,
    update(b){
      this.super$update(b);
      b.set(b.owner.x + Angles.trnsx(b.owner.rotation, x, y), b.owner.y + Angles.trnsy(b.owner.rotation, x, y));
      b.rotation(b.ownet.rotation)
    }
  });
  flib.merge(laserbullet, stat)
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));
      let bx = unit.x + Angles.trnsx(unit.rotation, x, y)
      let by = unit.y + Angles.trnsy(unit.rotation, x, y)
      if(scl >= speedStart){
        laserbullet.create(unit, unit.team, bx, by, unit.rotation) //create the Bullet by SPEEEEEEEEED
      }
      if(shootSound != Sounds.none && !Vars.headless){
        let shootSoundH = null
        if(shootSound != null){
          shootSoundH = new SoundLoop(shootSound, 1);//ahyes sound
        }
        if(shootSoundH != null){
          shootSoundH.update(bx, by, true);
        }
      }
      //flib.debug("Abilities", [scl, laserbullet, shootSound, unit, unit.rotation, bx, by, Vars.headless])
    },
    localized(){
      return "LaserMoveAbility"// haha Fuck you bundles
    }
  });
}
module.exports = {
  laserMoveAbility: laserMoveAbility
}