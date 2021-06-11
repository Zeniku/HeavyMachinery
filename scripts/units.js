//Libs And functions
let lib = "heavymachinery/libs/";
let heav = "heavymachinery-"

let AI = require(lib + "ai");
let alib = require(lib + "abilities");
let blib = require(lib + "bulletlib");
let flib = require(lib + "function");
let dlib = require(lib + "drawlib");

//if you see flib.pixel thats just me being lazy about being lazy

function newWeapon(object){
	return extend(Weapon, object);
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

//color
let color = [Pal.sapBullet, Pal.sapBulletBack, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), Pal.lancerLaser]

//Effect
const earthDust = new Effect(20, e => {
	dlib.splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 2.5 * e.fslope(), e.id, 10, e.finpow() * 10, e.rotation, 360);
});
earthDust.layer = Layer.debris

const earthDustII = new Effect(30, e => {
	dlib.splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * 20, e.rotation, 360);
});
earthDustII.layer = Layer.debris

const boom = new Effect(30, e => {
  dlib.splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
  dlib.lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fout(), (4 * 8) * e.fin())
  dlib.splashLineii(e.x, e.y, color[0], color[2], e.fin(), 4 * e.fout(), 6 * e.fout(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
})

//[Bullets]
const trahoTractorBeam = blib.newTractorBeam({
  colors: [color[4], Color.white],
  length: 142,
  maxRange: 142,
  lifetime: 120,
  force: 8,
  scaledForce: 70
});

const trahoSapBullet = extend(SapBulletType, {
    length: 8 * 15,
    damage: 20,
    shootEffect: Fx.shootSmall,
    hitColor: color[0],
    color: color[0],
    despawnEffect: Fx.none,
    width: 0.5,
    knockback: 0,
});

const spiculumSapBullet = extend(SapBulletType, {
    length: 8 * 10,
    damage: 37,
    shootEffect: Fx.shootSmall,
    hitColor: color[0],
    color: color[0],
    despawnEffect: Fx.none,
    width: 0.5,
    knockback: 2.5,
});

const interitusSpikeBullet = extend(ShrapnelBulletType, {
  hitColor: color[1],
  color: color[0],
  length: 4 * 8,
  damage: 35,
  width: 4,
  serrations: 4,
});

const interitusFrag = extend(ArtilleryBulletType, {
  collidesAir: true,
  collides: true,
  collidesTiles: true,
  despawnEffect: boom,
  damage: 30,
  splashDamage: 15,
  splashDamageRadius: 3 * 8,
  color: color[0],
  hitColor: color[1]
});

const interitusCannonBall = extend(ArtilleryBulletType, {
  collidesAir: true,
  collides: true,
  collidesTiles: true,
  hitEffect: boom,
  despawnEffect: boom,
  damage: 70,
  splashDamage: 30,
  splashDamageRadius: 5 * 8,
  color: color[0],
  fragBullets: 3,
  fragBullet: interitusFrag
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
const trahoTractorWeapon = newWeapon({
  name: heav + "trahoWeapon",
  x: 0,
  y: flib.pixel(-5),
  recoil: 0,
  reload: 30,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: trahoTractorBeam
});

const trahoSapWeapon = newWeapon({
  name: heav + "trahoWeaponII",
  x: flib.pixel(3),
  y: 0,
  shootY: flib.pixel(25),
  reload: 30,
  rotate: false,
  bullet: trahoSapBullet
});

const spiculumWeapon = newWeapon({
  name: heav + "spiculumWeapon",
  x: flib.pixel(34),
  y: 0,
  reload: 15,
  rotate: false,
  bullet: spiculumSapBullet
});

const interitusWeapStat = {
  name: heav + "interitusSpikeWeapon",
  reload: 30,
  rotate: false,
  bullet: interitusSpikeBullet
}
//i dont trust mergeii
//const interitusSpikeWeaponA = newWeapon(Object.assign(interitusWeapStat, {}));

const interitusArtillery = newWeapon({
  name: heav + "interitusArtillery",
  reload: 50,
  recoil: 1,
  bullet: interitusCannonBall,
  y: flib.pixel(15),
  x: 0,
  shootY: flib.pixel(58),
  mirror: false,
  shake: 7,
  rotate: true,
  rotateSpeed: 1.5,
});

const princepsWeapon = newWeapon({
  name: heav + "princepsWeapon",
 	x: 5,
	y: 0,
	top: false,
	reload: 15,
	ejectEffect: Fx.lightningShoot,
	shootSound: Sounds.laser,
	bullet: princepsBullet
});

const pugioneWeapon = newWeapon({
	name: heav + "pugioneWeapon",
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
	name: heav + "mucroWeapon",
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
	name: heav + "tragulaWeapon",
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
  name: heav + "luciusWeapon",
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
  name: heav + "machaeraWeapon",
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
	name: heav + "earthBend",
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
	name: heav + "earthBendII",
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
traho.weapons.add(trahoTractorBeam, trahoSapWeapon);

const spiculum = extend(UnitType, "spiculum", {});
spiculum.constructor = () => extend(UnitEntity, {});
spiculum.weapons.add(spiculumWeapon)
spiculum.abilities.add(alib.laserMoveAbility(flib.pixel(22), 0, {damage: 23, colors: [Color.valueOf("bf92f9"), Color.white]}, 0.01, 2, 5, Sounds.minebeam))

const interitus = extend(UnitType, "interitus", {});
interitus.constructor = () => extend(UnitEntity, {});
interitus.weapons.add(interitusArtillery);

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

const cunit = name => Vars.content.getByName(ContentType.unit, heav + name);

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