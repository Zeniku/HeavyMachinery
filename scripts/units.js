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
//print(newWeapon)

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
//print(meleeBullet)

//color
let color = [Pal.sapBullet, Pal.sapBulletBack, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), Pal.lancerLaser]
//print(color)

//Effect
const earthDust = new Effect(20, e => {
	dlib.splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 2.5 * e.fslope(), e.id, 10, e.finpow() * 10, e.rotation, 360);
});
earthDust.layer = Layer.debris
//print(earthDust)

const earthDustII = new Effect(30, e => {
	dlib.splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * 20, e.rotation, 360);
});
earthDustII.layer = Layer.debris
//print(earthDustII)

const boom = new Effect(30, e => {
  dlib.splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
  dlib.lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fout(), (4 * 8) * e.fin())
  dlib.splashLineii(e.x, e.y, color[0], color[2], e.fin(), 4 * e.fout(), 6 * e.fout(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
});

const bigBoom = new Effect(30, e => {
  dlib.splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * (8 * 10), e.rotation, 360)
  dlib.lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fout(), (6 * 7) * e.fin())
  dlib.lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 6 * e.fout(), (6 * 11) * e.fin())
  dlib.splashLineii(e.x, e.y, color[0], color[2], e.fin(), 4 * e.fout(), 6 * e.fout(), e.id, 20, e.finpow() * (8 * 10), e.rotation, 360)
});

//print(boom)
//[Bullets]
const trahoTractorBeam = blib.newTractorBeam({
  colors: [color[4], Color.white],
  length: 142,
  maxRange: 142,
  lifetime: 120,
  force: 8,
  scaledForce: 70
});
//print(trahoTractorBeam)

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
//print(trahoSapBullet)

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
//print(spiculumSapBullet)

const interitusSpikeBullet = extend(ShrapnelBulletType, {
  hitColor: color[1],
  fromColor: color[0],
  toColor: color[1],
  length: 20 * 8,
  damage: 25,
  width: 16,
  status: StatusEffects.sapped,
  statusDuration: 60 * 7,
  serrations: 4,
});
//print(interitusSpikeBullet)

const interitusFrag = extend(ArtilleryBulletType, {
  collidesAir: true,
  collides: true,
  collidesTiles: true,
  despawnEffect: boom,
  damage: 30,
  splashDamage: 15,
  splashDamageRadius: 3 * 8,
  hitColor: color[1],
  backColor: color[1],
  frontColor: color[0],
  status: StatusEffects.sapped,
  statusDuration: 60 * 7,
  height: 10,
  width: 10,
});
//print(interitusFrag)

const interitusCannonBall = extend(ArtilleryBulletType, {
  collidesAir: true,
  collides: true,
  collidesTiles: true,
  speed: 3.7,
  lifetime: 55,
  hitEffect: bigBoom,
  despawnEffect: bigBoom,
  height: 16,
  width: 16,
  damage: 230,
  splashDamage: 40,
  splashDamageRadius: 10 * 8,
  frontColor: color[0],
  backColor: color[1],
  fragBullets: 3,
  fragBullet: interitusFrag,
  status: StatusEffects.sapped,
  statusDuration: 60 * 7,
  hitSound: Sounds.explosionbig
});
//print(interitusCannonBall)

const princepsBullet = blib.newOverSeerBullet({
  damage: 15,
  speed: 3,
  lifetime: 80,
  trailWidth: 2,
  trailLength: 10
});
//print(princepsBullet)

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
//print(pugioneBullet)

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
//print(mucroBullet)

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
//print(tragulaBullet)

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
//print(luciusBullet)

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
//print(machaeraBullet)

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
//print(trahoTractorWeapon)

const trahoSapWeapon = newWeapon({
  name: heav + "trahoWeaponII",
  x: flib.pixel(3),
  y: 0,
  shootY: flib.pixel(25),
  reload: 30,
  rotate: false,
  bullet: trahoSapBullet
});
//print(trahoSapWeapon)

const spiculumWeapon = newWeapon({
  name: heav + "spiculumWeapon",
  x: flib.pixel(34),
  y: 0,
  reload: 15,
  rotate: false,
  bullet: spiculumSapBullet
});
//print(spiculumWeapon)

const interitusWeapStat = {
  name: heav + "interitusSpikeWeapon",
  reload: 20,
  rotate: false,
  bullet: interitusSpikeBullet,
  shootSound: Sounds.shotgun
}

const interitusSpikeWeaponA = newWeapon(interitusWeapStat);
flib.merge(interitusSpikeWeaponA, {
  x: flib.pixel(49),
  y: flib.pixel(27)
});
const interitusSpikeWeaponB = newWeapon(interitusWeapStat);
flib.merge(interitusSpikeWeaponB, {
  x: flib.pixel(74),
  y: flib.pixel(-9),
  reload: 35
});

const interitusArtillery = newWeapon({
  name: heav + "interitusArtillery",
  reload: 60 * 4,
  recoil: 4,
  bullet: interitusCannonBall,
  y: flib.pixel(-15),
  x: 0,
  shootY: flib.pixel(58),
  mirror: false,
  shake: 7,
  rotate: true,
  rotateSpeed: 1.5,
  shootSound: Sounds.shootBig
});
//print(interitusArtillery)

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
//print(princepsWeapon)

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
//print(pugioneWeapon)

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
//print(mucroWeapon)

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
//print(tragulaWeapon)

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
//print(luciusWeapon)

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
//print(machaeraWeapon)

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
//print(miscWeapon)

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
//print(miscWeaponII)

//Units
//[Air]
//Purple
const aranea = extend(UnitType, "aranea", {});
aranea.constructor = () => extend(UnitEntity, {});
//print(aranea)

const traho = extend(UnitType, "traho", {});
traho.constructor = () => extend(UnitEntity, {});
traho.weapons.add(trahoTractorWeapon, trahoSapWeapon);
//print(traho)
//print(alib.laserMoveAbility)

const spiculum = extend(UnitType, "spiculum", {});
spiculum.constructor = () => extend(UnitEntity, {});
spiculum.abilities.add(alib.laserMoveAbility(flib.pixel(22), 0, {damage: 23, colors: [color[0], Color.white]}, 0.01, 2, 5, Sounds.minebeam, 8 * 5))
spiculum.weapons.add(spiculumWeapon);
//print(spiculum)

const interitus = extend(UnitType, "interitus", {});
interitus.constructor = () => extend(UnitEntity, {});
interitus.weapons.add(interitusArtillery, interitusSpikeWeaponA, interitusSpikeWeaponB);
//print(interitus)

//[Ground]
//Overseer
const princeps = extend(UnitType, "princeps", {});
princeps.constructor = () => extend(MechUnit, {});
princeps.defaultController = AI.overSeerAI(GroundAI);
princeps.weapons.add(princepsWeapon);
//print(princeps)

//Melee
const pugione = extend(UnitType, "pugione", {});
pugione.constructor = () => extend(MechUnit, {});
pugione.defaultController = AI.meleeAI(2, 10);
pugione.weapons.add(pugioneWeapon);
//print(pugione)

const mucro = extend(UnitType, "mucro", {});
mucro.constructor = () => extend(MechUnit, {});
mucro.defaultController = AI.meleeAI(3, 15);
mucro.weapons.add(mucroWeapon);
//print(mucro)

const tragula = extend(UnitType, "tragula", {});
tragula.constructor = () => extend(MechUnit, {});
tragula.defaultController = AI.meleeAI(4, 20);
tragula.weapons.add(tragulaWeapon);
//print(tragula)

const lucius = extend(UnitType, "lucius", {});
lucius.constructor = () => extend(MechUnit, {});
lucius.defaultController = AI.meleeAI(6, 25);
lucius.weapons.add(luciusWeapon, miscWeapon);
//print(lucius)

const machaera = extend(UnitType, "machaera", {});
machaera.constructor = () => extend(MechUnit, {});
machaera.defaultController = AI.meleeAI(8, 30);
machaera.weapons.add(machaeraWeapon, miscWeaponII);
//print(machaera)

const cunit = name => Vars.content.getByName(ContentType.unit, heav + name);

//Debugging
//flib.debug("unit.js", [cunit, aranea, traho, spiculum, interitus, pugione, mucro, tragula, lucius, machaera, princeps]);

//export
module.exports = {
	aranea: cunit("aranea"),
	traho: cunit("traho"),
	spiculum: cunit("spiculum"),
	interitus: cunit("interitus"),
	princeps: cunit("princeps"),
	pugione: cunit("pugione"),
	mucro: cunit("mucro"),
	tragula: cunit("tragula"),
	lucius: cunit("lucius"),
	machaera: cunit("machaera")
}