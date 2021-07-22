let lib = "heavymachinery/libs/"
let flib = require(lib +"function");
let elib = require(lib + "effectlib");
function laserMoveAbility(x, y, stat, speedStart, minSpeed, maxSpeed){
  let laserbullet = extend(LaserBulletType, {
    update(b){
      this.super$update(b);
      b.set(b.owner.x + Angles.trnsx(b.owner.rotation, x, y), b.owner.y + Angles.trnsy(b.owner.rotation, x, y));
      b.rotation(b.owner.rotation)
    }
  });
  flib.merge(laserbullet, stat)
  
  return extend(Ability, {
    update(unit){
      let scl = Mathf.clamp((unit.vel.len() - minSpeed) / (maxSpeed - minSpeed));//fuck
      let bx = unit.x + Angles.trnsx(unit.rotation, x, y)
      let by = unit.y + Angles.trnsy(unit.rotation, x, y)
      
      if(scl >= speedStart){
        laserbullet.create(unit, unit.team, bx, by, unit.rotation) //create the Bullet by SPEEEEEEEEED
      }
      //flib.debug("Abilities", [scl, laserbullet, unit, unit.rotation, bx, by])
    },
    localized(){
      return "LaserMoveAbility"// haha Fuck you bundles
    }
  });
}

function bulletStop(range, color, reloadTime, durationTime){
  let wave = elib.lineCircleii(40, color, color, 4, range, 1)
  let splash = elib.lineCircleii(15, color, color, 3, 8, 1)
  return extend(Ability, {
    update(unit){
      let dR =+ Time.delta();
      let stopped = false;
      if(!(dR >= durationTime)){
        flib.nearbyBullets(unit.x, unit.y, range, b => {
          b.vel.set(0, 0)
          splash.at(b)
          stopped = true
        });
      }else{
        if(dR >= (durationTime + reloadTime)){
          if(stopped){
            wave.at(unit)
          }
          dR = 0
        }
      }
    },
    localized(){
      return "BulletStopAbility"
    }
  });
}

module.exports = {
  laserMoveAbility: laserMoveAbility,
  bulletStopAbility: bulletStop
}