let text = "heavymachinery/libs/"

let bulletTypes = require(text + "bulletTypes");
let blockTypes = require(text + "blockTypes")
let flib = require(text + "function");

const praefectorBullet = bulletTypes.OverSeerBullet({
  damage: 20,
  speed: 3.5,
  lifetime: 60,
  pierceCap: 10,
  trailWidth: 2.5
});

const praefector = blockTypes.overSeerTurret(PowerTurret, "praefector", {
  shootType: praefectorBullet,
  buildVisibility: BuildVisibility.shown,
  range: praefectorBullet.range(),
  recoilAmount: 2,
}, PowerTurret.PowerTurretBuild, {});