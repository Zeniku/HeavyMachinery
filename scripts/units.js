//Libs And functions
const libs = require("heavymachinery/libs/libs");

function newWeapon(object){
	return extend(Weapon, object);
	//let weap = new Weapon(name)
	//libs.flib.merge(weap, object)
};

function newTractorWeapon(name, object){
	let weap = extend(Weapon, name, {
	  recoil: 0,
    reload: 30,
    rotate: true,
    continuous: true,
    shootSound: Sounds.tractorbeam,
	});
	libs.flib.merge(weap, object);
	return weap
};

function meleeBullet(object){
	let h = extend(ShrapnelBulletType, {
  	fromColor: Color.valueOf("404040"),
  	toColor: Color.valueOf("2a2a2a"),
  	hitColor: Color.valueOf("2a2a2a"),
  	shootEffect: Fx.none,
  	smokeEffect: Fx.none,
  	serrations: 3,
  	hitEffect: Fx.mine,
  	knockback: 0,
  	reflectable: false,
	});
  libs.flib.merge(h, object)
  return h
};

//Effect
const earthDust = new Effect(20, e => {
	libs.dlib.splashCircleii(e.x, e.y, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), e.fin(), 2.5 * e.fslope(), e.id, 10, e.finpow() * 10, e.rotation, 360);
});
earthDust.layer = Layer.debris

const earthDustII = new Effect(30, e => {
	libs.dlib.splashCircleii(e.x, e.y, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), e.fin(), Mathf.random(1.5, 5.5) * e.fslope(), e.id, 20, e.finpow() * 20, e.rotation, 360);
});
earthDustII.layer = Layer.debris

//Bullets
const trahoBullet = libs.blib.newTractorBeam(11, 720, {
  colors: [Pal.lancerLaser, Color.white],
  length: 142,
  maxRange: 142,
  lifetime: 120
});

const princepsBullet = libs.blib.newOverSeerBullet({
  damage: 15,
  speed: 3,
  lifetime: 80,
  trailWidth: 2,
  trailLength: 10
});

const pugioneBullet = meleeBullet({
	width: 0,
	length: 16,
	lifetime: 12,
	serrations: 3,
	serrationWidth: 11,
	serrationSpacing: 4,
	serrationSpaceOffset: 9,
	serrationLenScl: 6,
	serrationFadeOffset: 0,
	damage: 20,
	recoil: -3, //dash
});

const mucroBullet = meleeBullet({
	lifetime: 20,
	width: 0,
	length: 24,
	serrations: 3,
	serrationWidth: 11,
	serrationSpacing: 4,
	serrationSpaceOffset: 9,
	serrationLenScl: 6,
	serrationFadeOffset: 0,
	damage: 30,
	recoil: -2, //dass
});

const tragulaBullet = meleeBullet({
	lifetime: 30,
	width: 8,
	length: 32,
	serrations: 3,
	damage: 40,
	recoil: -2, //dash
	knockback: 0,
	fragBullet: pugioneBullet,
	fragBullets: 3
});

const luciusBullet = meleeBullet({
	lifetime: 40,
	width: 10,
	length: 40,
	serrations: 3,
	damage: 65,
	recoil: -2, //dash
	knockback: -1,
	fragBullet: mucroBullet,
	fragBullets: 4
});

const machaeraBullet = meleeBullet({
	lifetime: 40,
	width: 15,
	length: 50,
	serrations: 5,
	damage: 75,
	recoil: -2, //dash
	knockback: -1,
	fragBullet: mucroBullet,
	fragBullets: 5
});

//UnitWeapons
const trahoWeapon = newTractorWeapon("traho", {
  x: 0,
  y: libs.flib.pixel(5),
  bullet: trahoBullet
});

const princepsWeapon = newWeapon({
  name: "heavymachinery-princepsWeapon",
 	x: 5,
	y: 0,
	top: false,
	reload: 15,
	ejectEffect: Fx.lightningShoot,
	shootSound: Sounds.laser,
	bullet: princepsBullet
});

const pugioneWeapon = newWeapon({
	name: "heavymachinery-pugioneWeapon",
	reload: 20,
	x: 5,
	y: 0,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: 4.75,
	recoil: -4, //negative so it looks like it's punching
	range: 80,
	soundPitchMin: 0.42,
	soundPitchMax: 1.74,
	rotate: true,
	rotateSpeed: 60,
	bullet: pugioneBullet
});

const mucroWeapon = newWeapon({
	name: "heavymachinery-mucroWeapon",
	x: libs.flib.pixel(24),
	y: 0,
	reload: 30,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: libs.flib.pixel(30),
	recoil: -4, //negative so it looks like it's punching
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1.74,
	rotate: true,
	rotateSpeed: 60,
	bullet: mucroBullet,
	shots: 4,
	shotDelay: 5,
	spacing: 22.5
});

const tragulaWeapon = newWeapon({
	name: "heavymachinery-tragulaWeapon",
	x: 8,
	y: 1,
	reload: 40,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: libs.flib.pixel(35),
	recoil: -4, //negative so it looks like it's punching
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1.74,
	rotate: true,
	rotateSpeed: 60,
	bullet: tragulaBullet
});

const luciusWeapon = newWeapon({
  name: "heavymachinery-luciusWeapon",
  x: libs.flib.pixel(44),
  y: libs.flib.pixel(1),
  reload: 20,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: libs.flib.pixel(43),
  recoil: -4, //negative so it looks like it's punching
  targetAir: false,
  soundPitchMin: 0.42,
  soundPitchMax: 1.74,
  rotate: true,
  rotateSpeed: 60,
  bullet: luciusBullet
});

const machaeraWeapon = newWeapon({
  name: "heavymachinery-machaeraWeapon",
  x: libs.flib.pixel(61),
  y: 0,
  reload: 35,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: libs.flib.pixel(62),
  recoil: -5,
  targetAir: false,
  soundPitchMin: 0.42,
  soundPitchMax: 1.74,
  rotate: true,
  rotateSpeed: 60,
  shots: 5,
  bullet: machaeraBullet,
  shotDelay: 5,
	spacing: 0,
	inaccuracy: 10
});

const miscWeapon = newWeapon({
	name: "heavymachinery-earthBend",
	x: 0,
	y: 0,
	reload: 120,
	mirror: false,
	top: false,
	ejectEffect: Fx.none,
	shootEffect: Fx.none,
	shootSound: Sounds.place,
	shootY: libs.flib.pixel(35),
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: libs.blib.newEarthBendBullet(60, pugioneBullet, 6, 22.5, earthDust, 25, 5)
});

const miscWeaponII = newWeapon({
	name: "heavymachinery-earthBendII",
	x: 0,
	y: 0,
	reload: 120,
	mirror: false,
	top: false,
	ejectEffect: Fx.none,
	shootEffect: Fx.none,
	shootSound: Sounds.place,
	shootY: libs.flib.pixel(35),
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: libs.blib.newEarthBendBullet(60, mucroBullet, 8, 22.5, earthDustII, 20, 5)
});

//Units
//[Air]
//Purple
const aranea = extend(UnitType, "aranea", {});
aranea.constructor = () => extend(UnitEntity, {});

const traho = extend(UnitType, "traho", {});
traho.constructor = () => extend(UnitEntity, {});
traho.weapons.add(trahoWeapon)
//[Ground]
//Overseer
const princeps = extend(UnitType, "princeps", {});
princeps.constructor = () => extend(MechUnit, {});
princeps.defaultController = libs.AI.overSeerAI("ground");
princeps.weapons.add(princepsWeapon);

//Melee
const pugione = extend(UnitType, "pugione", {});
pugione.constructor = () => extend(MechUnit, {});
pugione.defaultController = libs.AI.meleeAI(2, 10);
pugione.weapons.add(pugioneWeapon);

const mucro = extend(UnitType, "mucro", {});
mucro.constructor = () => extend(MechUnit, {});
mucro.defaultController = libs.AI.meleeAI(3, 15);
mucro.weapons.add(mucroWeapon);

const tragula = extend(UnitType, "tragula", {});
tragula.constructor = () => extend(MechUnit, {});
tragula.defaultController = libs.AI.meleeAI(4, 20);
tragula.weapons.add(tragulaWeapon);

const lucius = extend(UnitType, "lucius", {});
lucius.constructor = () => extend(MechUnit, {});
lucius.defaultController = libs.AI.meleeAI(6, 25);
lucius.weapons.add(luciusWeapon, miscWeapon);

const machaera = extend(UnitType, "machaera", {});
machaera.constructor = () => extend(MechUnit, {});
machaera.defaultController = libs.AI.meleeAI(8, 30);
machaera.weapons.add(machaeraWeapon, miscWeaponII);

const cunit = name => Vars.content.getByName(ContentType.unit, "heavymachinery-" + name);
libs.flib.debug("unit.js", [cunit, aranea, traho, pugione, mucro, tragula, lucius, machaera, princeps, trahoBullet, trahoWeapon]);
module.exports = {
	aranea: cunit("aranea"),
	pugione: cunit("pugione"),
	mucro: cunit("mucro"),
	tragula: cunit("tragula"),
	lucius: cunit("lucius"),
	machaera: cunit("machaera")
}