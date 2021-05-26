let text = "heavymachinery/libs/"

let blib = require(text + "bulletlib");
let flib = require(text + "function");

const overSeerBullet = blib.newOverSeerBullet({
  damage: 20,
  speed: 3.5,
  lifetime: 60,
  pierceCap: 10,
  trailWidth: 2.5
});

const praefector = extend(PowerTurret, "praefector", {
  shootType: overSeerBullet,
  buildVisibility: BuildVisibility.shown,
  range: overSeerBullet.range(),
  recoilAmount: 2,
});
praefector.buildType = () => {
  return extend(PowerTurret.PowerTurretBuild, praefector, {
      targetPosition(pos) {
        if(!this.hasAmmo() || pos == null) return;
        
        this.targetPos.set(pos)
        
        if(this.targetPos.isZero()) {
          this.targetPos.set(pos);
        }
      },
  });
}