let text = "heavymachinery/libs/"

let blib = require(text + "bulletlib");
let flib = require(text + "function");

const overSeerBullet = blib.newOverSeerBullet({
  damage: 20,
  pierceCap: 10
});

const overSeerTurret = extend(PowerTurret, "overSeerTurret",{
  targetPosition(pos){
    if(!this.hasAmmo() || pos == null) return;

    this.targetPos.set(pos);

    if(this.targetPos.isZero()){
      this.targetPos.set(pos);
    }
  },//it should fix the overseer bullet going in front of enemy and not hitting it
  shootType: overSeerBullet,
  buildVisibility: BuildVisibility.shown
});