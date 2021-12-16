let text = "heavymachinery/libs/"

let bulletTypes = require(text + "bulletTypes");
let blockTypes = require(text + "blockTypes")
let flib = require(text + "function");
let dlib = require(text + "drawlib")

const critTrail = new Effect(20, e => {
  Draw.color(Pal.heal)
  Angles.randLenVectors(e.id, 3, 1 + e.fin() * 3, (x, y) => {
    Fill.square(e.x + x, e.y + y, e.fout() * 3.3 + 0.5);
  });
})

const spawnEffect = new Effect(20, e => {
  Draw.color(Pal.heal)
  Lines.stroke(4 * (1 - e.finpow()))
  Lines.circle(e.x, e.y, 8 * e.finpow())
})

const praefectorBullet = bulletTypes.OverSeerBullet({
  damage: 20,
  speed: 3.5,
  lifetime: 60 * 4,
  pierceCap: 10,
  trailWidth: 2.5
});

const heavenlySBullet = bulletTypes.SwordBullet({
  damage: 25,
  speed: 4,
  lifetime: 65,
  pierceCap: 10,
  trailWidth: 4.5,
  critTrail: critTrail,
  spawnFx: spawnEffect,
})

const heavenlyS = blockTypes.FractalTurret(PowerTurret, "heavenlyStrike", {
  shootType: heavenlySBullet,
  buildVisibility: BuildVisibility.shown,
  range: heavenlySBullet.range() * 1.5,
  recoilAmount: 0,
  shots: 3,
}, PowerTurret.PowerTurretBuild, {})

const praefector = blockTypes.OverSeerTurret(PowerTurret, "praefector", {
  shootType: praefectorBullet,
  buildVisibility: BuildVisibility.shown,
  range: praefectorBullet.range(),
  recoilAmount: 2,
}, PowerTurret.PowerTurretBuild, {});