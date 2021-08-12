//if you did not read my lib you will be confused
//effects
let text = "heavymachinery/libs/";

let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib")
let blockTypes = require(text + "blockTypes")

//Effects
const flameAura = new Effect(40, e => {
	dlib.splashCircleii(e.x, e.y, Pal.lightPyraFlame, Pal.darkFlame, e.fin(), e.fout() * 2.5, e.id, 3, 2 + e.fin() * 9, e.rotation, 360);
});

const spark = new Effect(10, e => {
  dlib.splashLine(e.x, e.y, Pal.lancerLaser, 4 * e.fout(), 3 * e.fin(), e.id, 4, e.finpow() * 16, e.rotation, 45)
});

const healWave = new Effect(22, e => {
	dlib.lineCircle(e.x, e.y, Pal.heal, e.fout() * 3, 4 + e.finpow() * (8 * 15));
});

const effect = blockTypes.statusEffectProjector(Block, "statusEffectProjector", {
  statusFx: flameAura,
  healEffect: healWave
}, Building, {})
effect.consumes.power(500/60.0);

const tesla = blockTypes.tesla(Block, "tesla", {
  hitEffect: spark
}, Building, {})
tesla.consumes.power(500/60.0);