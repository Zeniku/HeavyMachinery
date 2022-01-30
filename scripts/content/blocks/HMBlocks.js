let con = "heavymachinery/content/",
HMBlockTypes = require(con + "HMBlockTypes"),
HMBulletTypes = require(con + "HMBulletTypes"),
HMEffects = require(con + "HMEffects")

const praefectorBullet = HMBulletTypes.OverSeerBullet({
  damage: 20,
  speed: 3.5,
  lifetime: 60 * 4,
  pierceCap: 10,
  trailWidth: 2.5
});

const heavenlySBullet = HMBulletTypes.SwordBullet({
  damage: 25,
  speed: 4,
  lifetime: 65,
  pierceCap: 10,
  trailWidth: 4.5,
  critTrail: HMEffects.critTrail,
  spawnFx: HMEffects.spawnEffect,
})
//Turrets
const heavenlyS = HMBlockTypes.FractalTurret(PowerTurret, "heavenlyStrike", {
  shootType: heavenlySBullet,
  buildVisibility: BuildVisibility.shown,
  range: heavenlySBullet.range() * 1.5,
  recoilAmount: 0,
  shots: 3,
}, PowerTurret.PowerTurretBuild, {})

const praefector = HMBlockTypes.OverSeerTurret(PowerTurret, "praefector", {
  shootType: praefectorBullet,
  buildVisibility: BuildVisibility.shown,
  range: praefectorBullet.range(),
  recoilAmount: 2,
}, PowerTurret.PowerTurretBuild, {});

//Wall

const lonsdaleiteWall = HMBlockTypes.DRWall(Wall, "lonsdaleiteWall", {
  dRChance: 15,
  dRPercentage: 20,
}, Wall.WallBuild, {})

const lonsdaleiteWallLarge = HMBlockTypes.DRWall(Wall, "lonsdaleiteWallLarge", {
  dRChance: 15,
  dRPercentage: 45
}, Wall.WallBuild, {})

//Effecs/Misc
const effect = HMBlockTypes.StatusEffectProjector(Block, "statusEffectProjector", {
  statusFxEnemies: HMEffects.flameAura,
  healEffect: HMEffects.healWave
}, Building, {})
effect.consumes.power(500/60);

const tesla = HMBlockTypes.Tesla(Block, "tesla", {
  hitEffect: HMEffects.spark
}, Building, {})
tesla.consumes.power(500/60);

const miniCore = extend(CoreBlock, "miniCore", {
	buildVisibility: BuildVisibility.shown,
	load(){
	  this.super$load()
	  this.topRegion = Core.atlas.find(this.name + "-team-sharded")
	},
	icons(){
	  return [
	    this.region,
	    this.topRegion
	  ]
	},
	canPlaceOn(){
		return true;
	}
});

//Production
const lcomp = HMBlockTypes.CustomAnimation(
GenericCrafter, "lonsdaleite-compressor", {},
GenericCrafter.GenericCrafterBuild, {},
{
  frameSpeed: 5, 
  frameCount: 4, 
  sine: true
})