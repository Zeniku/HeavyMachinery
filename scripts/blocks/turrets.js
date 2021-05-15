let text = "heavymachinery/libs/"

let blib = require(text + "bulletlib");
let flib = require(text + "function");

const overSeerBullet = blib.newOverSeerBullet({
  damage: 20,
  speed: 2.5,
  lifetime: 60,
  pierceCap: 10,
  trailWidth: 5
});

const overSeerTurret = extend(PowerTurret, "overSeerTurret", {
  shootType: overSeerBullet,
  buildVisibility: BuildVisibility.shown,
  range: overSeerBullet.range()
});
overSeerTurret.buildType = () => {
  return extend(PowerTurret.PowerTurretBuild, overSeerTurret, {
      targetPosition(pos) {
        if(!this.hasAmmo() || pos == null) return;
        
        this.targetPos.set(pos)
        
        if(this.targetPos.isZero()) {
          this.targetPos.set(pos);
        }
      },
  });
}