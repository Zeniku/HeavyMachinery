let text = "heavymachinery/libs/";
let heav = "heavymachinery-"
let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib");
//temp is just a thing so i can copy paste
function temp(type, name, customStat, build, customBuildStat){
  if (customStat == undefined) customStat = {}
  if (customBuildStat == undefined) customBuildStat = {}
  customStat = Object.assign({}, customStat)
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({}, customBuildStat)
  if(build != Building){
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  }else{
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

function customAnimation(type, name, customStat, build, customBuildStat, frames){
  if(customStat == undefined) customStat = {}
  if(customBuildStat == undefined) customBuildStat = {}
  customStat = Object.assign({
    load(){ //load the sprites
      this.region = Core.atlas.find(this.name);
      this.bottomRegion = Core.atlas.find(this.name + "-bottom");
      this.frameRegions = [];
    
      for (let i = 0; i < frames.frameCount; i++) {
        this.frameRegions[i] = Core.atlas.find(this.name + "-frame" + i);
        }
      this.topRegion = Core.atlas.find(this.name + "-top");
    },
    icons() { //puts the icons for you to se on the menu
      return [
        this.region,
        this.frameRegions[0]
      ];
    }
  }, customStat);
  
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({
    draw() {
      Draw.rect(custom.bottomRegion, this.x, this.y);
      Draw.rect(
        frames.sine ?
        custom.frameRegions[Math.floor(Mathf.absin(this.totalProgress, frames.frameSpeed, frames.frameCount - 0.001))] :
        custom.frameRegions[Math.floor(((this.totalProgress / frames.frameSpeed) % frames.frameCount))],
        this.x, this.y);
    
      Draw.rect(custom.topRegion, this.x, this.y);
    }
  }, customBuildStat)
  
  if (build != Building) {
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  } else {
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  
  return custom
}

function overSeerTurret(type, name, customStat, build, customBuildStat){
  if(customStat == undefined) customStat = {}
  if(customBuildStat == undefined) customBuildStat = {}
  
  customStat = Object.assign({}, customStat)
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({
    targetPosition(pos) {
      if(!this.hasAmmo() || pos == null) return;
  
      this.targetPos.set(pos)
  
      if (this.targetPos.isZero()) {
        this.targetPos.set(pos);
      }
    },
  }, customBuildStat)
  if (build != Building) {
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  } else {
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

function dRWall(type, name, customStat, build, customBuildStat){
  if(customStat == undefined) customStat = {}
  if(customBuildStat == undefined) customBuildStat = {}
  
  customStat = Object.assign({
    dRChance: 20,
    dRPercentage: 50,
    hitColor: Pal.lancerLaser
  }, customStat)
  let custom = extend(type, name, customStat)
  
  let hitEffect = new Effect(15 * custom.size, e => {
    Lines.stroke((2 + custom.size) * e.fout(), custom.hitColor)
    Lines.square(e.x, e.y, ((8 * custom.size) / 2) * e.fin())
  });
  
  customBuildStat = Object.assign({
    collision(b){
      if(custom.dRChance > 0 && custom.dRPercentage > 0){
        if(Mathf.chance(custom.dRChance)){
          b.damage = b.damage - (b.damage * (custom.dRPercentage / 100))
          hitEffect.at(this)
        }
      }
      this.super$collision(b)
    }
  }, customBuildStat)
  if (build != Building) {
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  } else {
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

function statusEffectProjector(type, name, customStat, build, customBuildStat){
  if (customStat == undefined) customStat = {}
  if (customBuildStat == undefined) customBuildStat = {}
  
  customStat = Object.assign({
    breakable: true,
    update: true,
    targetable: true,
    hasLiquids: false,
    outputsLiquid: false,
    hasItems: false,
    range: 8 * 15,
    damage: 10,
    reload: 60,
    hasPower: true,
    outputsPower: false,
    buildVisibility: BuildVisibility.shown,
    timers: 2,
    enableHealing: true,
    enableStatusAura: true,
    healPercent: 0.5,
    statusEffect: StatusEffect.burn,
    statusFx: Fx.none,
    healEffect: Fx.none,
    starColor: Pal.pyraFlame,
	  icons(){
		  return [
			  Core.atlas.find(this.name)
		  ];
	  },
	  drawPlace(x, y, rotation){
		  Drawf.dashCircle(x * 8, y * 8, this.range, Pal.accent);
	  },
	  setStats(){
      this.super$setStats()
      this.stats.add(Stat.range, this.range);
      this.stats.add(Stat.reload, this.reload);
    },
  }, customStat)
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({
    updateTile(){
			if(this.consValid()){
			  let wasHealed = false
			  let appliedStatus = false
			  flib.unitNearby(this, custom.range, a => {
			    if(custom.enableHealing){
			      if(this.timer.get(0, custom.reload)){
			        if(a.damaged()){
			          a.heal(custom.healPercent)
			          Fx.heal.at(a)
			          wasHealed = true
			        }
			      }
			    }
			  }, e => {
			    e.apply(custom.statusEffect, 60);
			    if(this.timer.get(1, custom.reload * 0.25)) {
			      e.damage(custom.damage)
			    }
			    appliedStatus = true;
			  });
				if(wasHealed){
				  if(custom.healEffect != Fx.none){
				    custom.healEffect.at(this)
				  }
				}
				if(appliedStatus){
				  if(custom.enableStatusAura){
					  for(let i = 0; i < 3; i++){
					    if(custom.statusFx != Fx.none){
						    custom.statusFx.at(this.x + Angles.trnsx(Mathf.random(360), Mathf.random(custom.range)), this.y + Angles.trnsy(Mathf.random(360), Mathf.random(custom.range)));
					    }
					  };
				  }else{
				    if(custom.statusFx != Fx.none){
				      custom.statusFx.at(this)
				    }
				  }
				};
			};
		},
		drawSelect(){
			Drawf.dashCircle(this.x, this.y, custom.range, Pal.accent);
		},
		draw(){
			Draw.rect(custom.region, this.x, this.y);
			
			if(this.consValid()){
			  Draw.z(Layer.effect - 0.01)
				dlib.spikeii(this.x, this.y, custom.starColor, 2 * 2.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
				dlib.spikeii(this.x, this.y, Color.white, 2 * 1.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
			};
		},
  }, customBuildStat)
  if (build != Building) {
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  } else {
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

function tesla(type, name, customStat, build, customBuildStat) {
  if (customStat == undefined) customStat = {}
  if (customBuildStat == undefined) customBuildStat = {}
  customStat = Object.assign({
  drawPlace(x, y, rotation){
    Drawf.dashCircle(x * 8, y * 8, this.range, Pal.lancerLaser);
  },
  breakable: true,
  update: true,
  targetable: true,
  hasLiquids: false,
  outputsLiquid: false,
  hasItems: false,
  range: 8 * 15,
  reload: 20,
  damage: 20,
  hasPower: true,
  outputsPower: false,
  buildVisibility: BuildVisibility.shown,
  lightningCount: 3,
  lightningLength: 10,
  lightningLengthRand: 6,
  lightningColor: Pal.lancerLaser,
  hitEffect: Fx.none,
  timers: 2
  }, customStat)
  let custom = extend(type, name, customStat)

  customBuildStat = Object.assign({
  drawSelect() {
    Drawf.dashCircle(this.x, this.y, custom.range, custom.lightningColor);
  },
  updateTile(){
    if(this.consValid()){
      if(this.timer.get(0, custom.reload)){
        flib.radiusEnemies(this.team, this.x, this.y, custom.range, u => {
          u.apply(StatusEffects.disarmed, 10);
          u.apply(StatusEffects.shocked, 15);
          u.damage(custom.damage)
          if(custom.hitEffect != Fx.none){
            custom.hitEffect.at(u)
          }
          let ang = Angles.angle(this.x, this.y, u.x, u.y)
          elib.fakeLightning.at(this.x, this.y, ang, custom.lightningColor, [Mathf.dst(this.x, this.y, u.x, u.y), 4, this.team])
      });
        if(Mathf.chance(25)){
          for(let i = 0; i < custom.lightningCount; i++){
          Lightning.create(this.team, custom.lightningColor, custom.damage * 0.5, this.x, this.y, Mathf.random(0, 359), Mathf.random(custom.lightningLength, custom.lightningLengthRand));
          }
        }
      }
    }
  },
  draw(){
    Draw.rect(custom.region, this.x, this.y);
    if(this.consValid()){
      Draw.z(Layer.bullet + 0.01)
      Draw.color(custom.lightningColor)
      Fill.circle(this.x, this.y, 2 * 1.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1));
    }
  }
  }, customBuildStat)
  if (build != Building) {
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  } else {
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

module.exports = {
  customAnimation: customAnimation,
  overSeerTurret: overSeerTurret,
  dRWall: dRWall,
  statusEffectProjector: statusEffectProjector,
  tesla: tesla
}