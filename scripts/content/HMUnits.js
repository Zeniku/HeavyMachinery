//Libs And functions
let heav = "heavymachinery-",
lib = "heavymachinery/libs/",
con = "heavymachinery/content/",
HMAi = require(lib + "HMAi"),
HMBulletTypes = require(con + "HMBulletTypes"),
HMUtils = require(lib + "HMUtils"),
HMEffects = require(con + "HMEffects")

let {defined} = HMUtils
//print(Weapon)

function meleeBullet(object){
  object = defined({
  	fromColor: Color.valueOf("404040"),
  	toColor: Color.valueOf("2a2a2a"),
  	hitColor: Color.valueOf("2a2a2a"),
  	shootEffect: Fx.none,
  	smokeEffect: Fx.none,
  	serrations: 3,
  	hitEffect: Fx.mine,
  	knockback: 0,
  	reflectable: false,
	}, object)
	return extend(ShrapnelBulletType, object);
};
//print(meleeBullet)

//color
let color = [Pal.sapBullet, Pal.sapBulletBack, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), Pal.lancerLaser]
//print(color)

//print(boom)
//[Bullets]
const trahoTractorBeam = HMBulletTypes.TractorBeam({
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
  despawnEffect: HMEffects.boom,
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
  hitEffect: HMEffects.bigBoom,
  despawnEffect: HMEffects.bigBoom,
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

const eteriusLaser = extend(LaserBulletType, {
  damage: 400,
  length: 8 * 40,
  width: 8 * 8,
  lifetime: 65,
  shootEffect: HMEffects.laserCharge,
  lightningSpacing: 35,
  lightningLength: 5,
  lightningDelay: 1.1,
  lightningLengthRand: 15,
  lightningDamage: 50,
  lightningAngleRand: 40,
  lightingColor: color[0],
  ligthColor: color[0],
  largeHit: true,
  sideAngle: 15,
  sideWidth: 0,
  sideLength: 0,
  colors: [color[1], color[0], Color.white],
});

const eteriusFrag = extend(MissileBulletType, {
  damage: 50,
  speed: 4,
  homingPower: 4,
  frontColor: color[0],
  backColor: color[1],
  height: 6,
  width: 46,
  splashDamage: 20,
  splashDamageRadius: 8 * 5,
  lifetime: 15,
  trailColor: color[0]
})

const eteriusArtilleryBullet = extend(BasicBulletType, {
  damage: 40,
  splashDamage: 20,
  splashDamageRadius: 8 * 6,
  lifetime: 30,
  speed: 4.3,
  height: 12,
  width: 10,
  frontColor: color[0],
  backColor: color[1],
  fragBullets: 5,
  fragBullet: eteriusFrag,
  status: StatusEffects.sapped,
  statusDuration: 60 * 7,
  fragCone: 15,
});

const princepsBullet = HMBulletTypes.OverSeerBullet({
  damage: 15,
  speed: 3,
  lifetime: 80,
  trailWidth: 2,
  trailLength: 10
});

const procuratorBullet = HMBulletTypes.OverSeerBullet({
  damage: 35,
  speed: 4,
  lifetime: 120,
  trailWidth: 2,
  trailLength: 15,
});

const inductorOrb = HMBulletTypes.OrbitBullet({
  damage: 30,
  speed: 2,
  lifetime: 60,
  hitSound: Sounds.plasmaboom,
  hitEffect: HMEffects.orbExplode,
  orbiter: princepsBullet
})

const inductorBullet = HMBulletTypes.OverSeerBullet({
  damage: 35,
  speed: 4,
  lifetime: 140,
  trailWidth: 2,
  trailLength: 15
})

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
const trahoTractorWeapon = extend(Weapon, {
  name: heav + "trahoWeapon",
  x: 0,
  y: -5 / 4,
  recoil: 0,
  reload: 30,
  rotate: true,
  continuous: true,
  shootSound: Sounds.tractorbeam,
  bullet: trahoTractorBeam
});
//print(trahoTractorWeapon)

const trahoSapWeapon = extend(Weapon, {
  name: heav + "trahoWeaponII",
  x: 3 / 4,
  y: 0,
  shootY: 25 / 4,
  reload: 30,
  rotate: false,
  bullet: trahoSapBullet
});
//print(trahoSapWeapon)

const spiculumWeapon = extend(Weapon, {
  name: heav + "spiculumWeapon",
  x: 34 / 4,
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
//Bad idea dont copy me
const interitusSpikeWeaponA = extend(Weapon, defined(interitusWeapStat, {
  x: 49 / 4,
  y: 27 / 4
}));
const interitusSpikeWeaponB = extend(Weapon, defined(interitusWeapStat, {
  x: 74 / 4,
  y: -9 / 4,
  reload: 35
}));

const interitusArtillery = extend(Weapon, {
  name: heav + "interitusArtillery",
  reload: 60 * 4,
  recoil: 4,
  bullet: interitusCannonBall,
  y: -15 / 4,
  x: 0,
  shootY: 58/ 4,
  mirror: false,
  shake: 7,
  rotate: true,
  rotateSpeed: 1.5,
  shootSound: Sounds.shootBig
});
//print(interitusArtillery)

const eteriusLaserWeapon = extend(Weapon, {
  name: heav + "eteriusLaser",
  x: 0,
  y: -5 / 4,
  mirror: false,
  rotate: true,
  rotateSpeed: 1.5,
  firstShotDelay: HMEffects.laserCharge.lifetime,
  recoil: 4,
  bullet: eteriusLaser,
  reload: 60 * 5,
  cooldownTime: 60 * 5,
  shootStatusDuration: 60,
  shootStatus: StatusEffects.unmoving,
  shake: 14,
  shootSound: Sounds.laserblast,
  chargeSound: Sounds.lasercharge
})

const eteriusArtillery = extend(Weapon, {
  name: heav + "eteriusArtillery",
  x: 74 / 4,
  y: -76 / 4,
  reload: 30,
  shootSound: Sounds.shootSnap,
  recoil: 3,
  bullet: eteriusArtilleryBullet,
})

const princepsWeapon = extend(Weapon, {
  name: heav + "princepsWeapon",
 	x: 5,
	y: 0,
	top: false,
	reload: 15,
	ejectEffect: Fx.lightningShoot,
	shootSound: Sounds.laser,
	bullet: princepsBullet
});

const procuratorWeapon = extend(Weapon, {
  name: heav + "procuratorWeapon",
  x: 25 / 4,
  y: 3 / 4,
  top: false,
  reload: 25,
  ejectEffect: Fx.lightningShoot,
  shootSound: Sounds.laser,
  bullet: procuratorBullet,
});

const inductorShotgun = extend(Weapon, {
  name: heav + "inductorShotgun",
  x: 36 / 4,
  y: 1 / 4,
  reload: 60,
  top: false,
  ejectEffect: Fx.lightningShoot,
  shootSound: Sounds.laser,
  shots: 4,
  inaccuracy: 15,
  bullet: inductorBullet
});

const inductorArtillery = extend(Weapon, {
  name: heav + "inductorArtillery",
  x: 0,
  y: -21 / 4,
  reload: 190,
  mirror: false,
  rotate: true,
  rotateSpeed: 3.5,
  ejectEffect: Fx.lightningShoot,
  shootSound: Sounds.laser,
  bullet: inductorOrb,
  recoil: 4,
})

const pugioneWeapon = extend(Weapon, {
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

const mucroWeapon = extend(Weapon, {
	name: heav + "mucroWeapon",
	x: 24 / 4,
	y: 0,
	reload: 30,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: 30 / 4,
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

const tragulaWeapon = extend(Weapon, {
	name: heav + "tragulaWeapon",
	x: 8,
	y: 1,
	reload: 40,
	top: false,
	ejectEffect: Fx.none,
	shootSound: Sounds.shotgun,
	shootY: 35 / 4,
	recoil: -4, //negative so it looks like it's punching
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1.74,
	rotate: true,
	rotateSpeed: 60,
	bullet: tragulaBullet
});
//print(tragulaWeapon)

const luciusWeapon = extend(Weapon, {
  name: heav + "luciusWeapon",
  x: 44 / 4,
  y: 1 / 4,
  reload: 20,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: 43 / 4,
  recoil: -4, //negative so it looks like it's punching
  targetAir: false,
  soundPitchMin: 0.42,
  soundPitchMax: 1.74,
  rotate: true,
  rotateSpeed: 60,
  bullet: luciusBullet
});
//print(luciusWeapon)

const machaeraWeapon = extend(Weapon, {
  name: heav + "machaeraWeapon",
  x: 75 / 4,
  y: -6 / 4,
  reload: 35,
  top: false,
  ejectEffect: Fx.none,
  shootSound: Sounds.shotgun,
  shootY: 62 / 4,
  recoil: -5,
  targetAir: false,
  soundPitchMin: 0.42,
  soundPitchMax: 1.74,
  rotate: true,
  rotateSpeed: 60,
  shots: 2,
  bullet: machaeraBullet,
  shotDelay: 5,
	spacing: 0,
	inaccuracy: 10
});
//print(machaeraWeapon)

const miscWeapon = extend(Weapon, {
	name: heav + "earthBend",
	x: 0,
	y: 0,
	reload: 120,
	mirror: false,
	top: false,
	ejectEffect: Fx.none,
	shootEffect: Fx.none,
	shootSound: Sounds.place,
	shootY: 35 / 4,
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: HMBulletTypes.EarthBendBullet({
	  lifetime: 60,
	  groundBullet: pugioneBullet,
	  groundEffect: HMEffects.earthDust,
	  groundBullets: 6,
	  groundBulletST: 25,
	  groundEffectST: 5,
	  groundBulletSpacing: 22.5
	})
});
//print(miscWeapon)

const miscWeaponII = extend(Weapon, {
	name: heav + "earthBendII",
	x: 0,
	y: 0,
	reload: 120,
	mirror: false,
	top: false,
	ejectEffect: Fx.none,
	shootEffect: Fx.none,
	shootSound: Sounds.place,
	shootY: 35 / 4,
	targetAir: false,
	soundPitchMin: 0.42,
	soundPitchMax: 1,
	rotate: true,
	rotateSpeed: 60,
	bullet: HMBulletTypes.EarthBendBullet({
	  lifetime: 60,
	  groundBullet: mucroBullet,
	  groundEffect: HMEffects.earthDustII,
	  groundBullets: 8,
	  groundBulletST: 20,
	  groundEffectST: 5,
	  groundBulletSpacing: 22.5
	})
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

const spiculum = extend(UnitType, "spiculum", {
  laser: extend(ContinuousLaserBulletType, {
    length: 8 * 5,
    damage: 23,
    width: 3,
    colors: [color[1], color[0], Color.white]
  }),
});
spiculum.constructor = () => extend(UnitEntity, {
  bullet: null,
  update(){
    let scl = Mathf.clamp((this.vel.len() - 2) / (5 - 2));
    let bx = this.x + Angles.trnsx(this.rotation, 27 / 4);
    let by = this.y + Angles.trnsy(this.rotation, 27 / 4);
    if(this.bullet !== null){
      this.bullet.set(bx, by)
      this.bullet.rotation(this.rotation)
      this.bullet.time = 0
    }
    if(scl >= 0.36){
      if(this.bullet === null){
       this.bullet = spiculum.laser.create(this, bx, by, this.rotation)
      }
    }else{
      this.bullet = null
    }
    this.super$update()
  }
});
spiculum.weapons.add(spiculumWeapon)
//print(spiculum)

const interitus = extend(UnitType, "interitus", {});
interitus.constructor = () => extend(UnitEntity, {});
interitus.weapons.add(interitusArtillery, interitusSpikeWeaponA, interitusSpikeWeaponB);
//print(interitus)

const eterius = extend(UnitType, "eterius", {});
eterius.constructor = () => extend(UnitEntity, {});
eterius.weapons.add(eteriusLaserWeapon, eteriusArtillery)

//[Ground]
//Overseer
const princeps = extend(UnitType, "princeps", {});
princeps.constructor = () => extend(MechUnit, {});
princeps.defaultController = HMAi.overSeerAI(GroundAI);
princeps.weapons.add(princepsWeapon);
//print(princeps)

const procurator = extend(UnitType, "procurator", {});
procurator.constructor = () => extend(MechUnit, {});
procurator.defaultController = HMAi.overSeerAI(GroundAI);
procurator.weapons.add(procuratorWeapon)

const inductor = extend(UnitType, "inductor", {});
inductor.constructor = () => extend(LegsUnit, {});
inductor.defaultController = HMAi.overSeerAI(GroundAI);
inductor.weapons.add(inductorShotgun, inductorArtillery)

//Melee
const pugione = extend(UnitType, "pugione", {});
pugione.constructor = () => extend(MechUnit, {});
pugione.defaultController = HMAi.meleeAI(2, 10);
pugione.weapons.add(pugioneWeapon);
//print(pugione)

const mucro = extend(UnitType, "mucro", {});
mucro.constructor = () => extend(MechUnit, {});
mucro.defaultController = HMAi.meleeAI(3, 15);
mucro.weapons.add(mucroWeapon);
//print(mucro)

const tragula = extend(UnitType, "tragula", {});
tragula.constructor = () => extend(MechUnit, {});
tragula.defaultController = HMAi.meleeAI(4, 20);
tragula.weapons.add(tragulaWeapon);
//print(tragula)

const lucius = extend(UnitType, "lucius", {});
lucius.constructor = () => extend(MechUnit, {});
lucius.defaultController = HMAi.meleeAI(6, 25);
lucius.weapons.add(luciusWeapon, miscWeapon);
//print(lucius)

const machaera = extend(UnitType, "machaera", {});
machaera.constructor = () => extend(MechUnit, {});
machaera.defaultController = HMAi.meleeAI(8, 30);
machaera.weapons.add(machaeraWeapon, miscWeaponII);
//print(machaera)

const cunit = name => Vars.content.getByName(ContentType.unit, heav + name);

//Debugging
//HMUtils.debug("unit.js", [cunit, aranea, traho, spiculum, interitus, pugione, mucro, tragula, lucius, machaera, princeps]);

//export
module.exports = {
	aranea: cunit("aranea"),
	traho: cunit("traho"),
	spiculum: cunit("spiculum"),
	interitus: cunit("interitus"),
	eterius: cunit("eterius"),
	princeps: cunit("princeps"),
	procurator: cunit("procurator"),
	inductor: cunit("inductor"),
	pugione: cunit("pugione"),
	mucro: cunit("mucro"),
	tragula: cunit("tragula"),
	lucius: cunit("lucius"),
	machaera: cunit("machaera")
}