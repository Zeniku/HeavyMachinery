//Libs And functions
let text = "heavymachinery/libs/";

let AI = require(text + "ai");
let alib = require(text + "abilities");
let blib = require(text + "bulletlib");
let flib = require(text + "function");
let dlib = require(text + "drawlib");

function newWeapon(object){
	return extend(Weapon, object);
	//let weap = new Weapon(name)
	//flib.merge(weap, object)
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
  flib.merge(h, object)
  return h
};

//Effect
//can i even extend(Effect, lifetime, e => {}, {});
const earthDust = new Effect(20, e => {
	dlib.splashCircleii(e.x, e.y, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), e.fin(), 2.5 * e.fslope(), e.id, 10, e.finpow() * 10, e.rotation, 360);
});
earthDust.layer = Layer.debris

const earthDustII = new Effect(30, e => {
	dlib.splashCircleii(e.x, e.y, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * 20, e.rotation, 360);
});
earthDustII.layer = Layer.debris

//[Bullets]
const trahoBullet = blib.newTractorBeam({
  colors: [Pal.lancerLaser, Color.white],
  length: 142,
  maxRange: 142,
  lifetime: 120,
  force: 8,
  scaledForce: 70
});

const trahoBulletII = extend(SapBulletType, {
    length: 8 * 15,
    damage: 20,
    shootEffect: Fx.shootSmall,
    hitColor: Color.valueOf("bf92f9"),
    color: Color.valueOf("bf92f9"),
    despawnEffect: Fx.none,
    width: 0.5,
    knockback: 0,
});

const spiculumBullet = extend(SapBulletType, {
    length: 8 * 10,
    damage: 37,
    shootEffect: Fx.shootSmall,
    hitColor: Color.valueOf("bf92f9"),
    color: Color.valueOf("bf92f9"),
    despawnEffect: Fx.none,
    width: 0.5,
    knockback: 2.5,
});


const princepsBullet = blib.newOverSeerBullet({
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

//[UnitWeapons]
const trahoWeapon = newWeapon({
  name: "heavymachinery-trahoWeapon",
  x: 0,
  y: flib.pixel(-5),
  recoil: 0,
  reload: 30,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: trahoBullet
});

const trahoWeaponII = newWeapon({
  name: "heavymachinery-trahoWeaponII",
  x: flib.pixel(3),
  y: 0,
  shootY: flib.pixel(25),
  reload: 30,
  rotate: false,
  bullet: trahoBulletII
});

const spiculumWeapon = newWeapon({
  name: "heavymachinery-spiculumWeapon",
  x: flib.pixel(34),
  y: 0,
  reload: 15,
  rotate: false,
  bullet: spiculumBullet
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
	x: flib.pixel(24),
	y: 0,
	reload: 30,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: flib.pixel(30),
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
	shootY: flib.pixel(35),
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
  x: flib.pixel(44),
  y: flib.pixel(1),
  reload: 20,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: flib.pixel(43),
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
  x: flib.pixel(75),
  y: flib.pixel(-6),
  reload: 35,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: flib.pixel(62),
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
	shootY: flib.pixel(35),
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: blib.newEarthBendBullet(60, pugioneBullet, 6, 22.5, earthDust, 25, 5)
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
	shootY: flib.pixel(35),
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: blib.newEarthBendBullet(60, mucroBullet, 8, 22.5, earthDustII, 20, 5)
});

//Units
//[Air]
//Purple
const aranea = extend(UnitType, "aranea", {});
aranea.constructor = () => extend(UnitEntity, {});

const traho = extend(UnitType, "traho", {});
traho.constructor = () => extend(UnitEntity, {});
traho.weapons.add(trahoWeapon, trahoWeaponII);

const spiculum = extend(UnitType, "spiculum", {});
spiculum.constructor = () => extend(UnitEntity, {});
spiculum.weapons.add(spiculumWeapon)
spiculum.abilities.add(alib.laserMoveAbility(flib.pixel(22), 0, {damage: 23, colors: [Color.valueOf("bf92f9"), Color.white]}, 0.01, 2, 5, Sounds.minebeam))



//[Ground]
//Overseer
const princeps = extend(UnitType, "princeps", {});
princeps.constructor = () => extend(MechUnit, {});
princeps.defaultController = AI.overSeerAI(GroundAI);
princeps.weapons.add(princepsWeapon);

//Melee
const pugione = extend(UnitType, "pugione", {});
pugione.constructor = () => extend(MechUnit, {});
pugione.defaultController = AI.meleeAI(2, 10);
pugione.weapons.add(pugioneWeapon);

const mucro = extend(UnitType, "mucro", {});
mucro.constructor = () => extend(MechUnit, {});
mucro.defaultController = AI.meleeAI(3, 15);
mucro.weapons.add(mucroWeapon);

const tragula = extend(UnitType, "tragula", {});
tragula.constructor = () => extend(MechUnit, {});
tragula.defaultController = AI.meleeAI(4, 20);
tragula.weapons.add(tragulaWeapon);

const lucius = extend(UnitType, "lucius", {});
lucius.constructor = () => extend(MechUnit, {});
lucius.defaultController = AI.meleeAI(6, 25);
lucius.weapons.add(luciusWeapon, miscWeapon);

const machaera = extend(UnitType, "machaera", {});
machaera.constructor = () => extend(MechUnit, {});
machaera.defaultController = AI.meleeAI(8, 30);
machaera.weapons.add(machaeraWeapon, miscWeaponII);

const cunit = name => Vars.content.getByName(ContentType.unit, "heavymachinery-" + name);

//Debugging
//flib.debug("unit.js", [cunit, aranea, traho, pugione, mucro, tragula, lucius, machaera, princeps, trahoBullet, trahoWeapon]);

//export
module.exports = {
	aranea: cunit("aranea"),
	traho: cunit("traho"),
	spiculum: cunit("spiculum"),
	princeps: cunit("princeps"),
	pugione: cunit("pugione"),
	mucro: cunit("mucro"),
	tragula: cunit("tragula"),
	lucius: cunit("lucius"),
	machaera: cunit("machaera")
}