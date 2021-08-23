let text = "heavymachinery/libs/";
let heav = "heavymachinery-"
let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib");
let statList = require(text + "statLists");

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
    dRChance: 15,
    dRPercentage: 50,
    hitColor: Pal.lancerLaser
  }, customStat)
  let custom = extend(type, name, customStat)
  
  let hitEffect = new Effect(15 * custom.size, e => {
    Lines.stroke((2 + custom.size) * e.fout(), custom.hitColor)
    Lines.square(e.x, e.y, ((8 * custom.size) / 2) * e.fin())
  });
  
  customBuildStat = Object.assign({
    handleDamage(amount){
      let a = amount
      if(Mathf.chance(custom.dRChance)){
        a = amount - (amount * (custom.dRPercentage / 100))
      }
      return a
    },
    collision(b){
      this.hit = 1
      if(custom.dRPercentage > 0 && custom.dRChance){
          hitEffect.at(this)
      }
      return this.super$collision(b)
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
    solid: true,
    range: 8 * 15,
    damage: 10,
    reload: 60,
    hasPower: true,
    outputsPower: false,
    buildVisibility: BuildVisibility.shown,
    enableHealing: true,
    enableEFxAura: true,
    enableAFxAura: false,
    healPercent: 0.5,
    enemiesStatus: StatusEffects.burning,
    statusFxEnemies: Fx.none,
    statusFxAlly: Fx.none,
    allyStatus: StatusEffects.none,
    healEffect: Fx.none,
    starColor: Pal.lightPyraFlame,
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
    atimer: 0,
    etimer: 0,
    updateTile(){
			if(this.consValid()){
			  let wasHealed = false
			  let appliedEnemies = false
			  let appliedAlly = false
			  this.etimer = Math.min(this.etimer + this.edelta(), custom.reload * 0.25)
			  this.atimer = Math.min(this.atimer + this.edelta(), custom.reload)
			  if(this.atimer >= custom.reload){
			    Units.nearby(this.team, this.x, this.y, custom.range, a => {
			      if (custom.enableHealing) {
			        if (a.damaged()) {
			          a.heal(custom.healPercent)
			          Fx.heal.at(a)
			          wasHealed = true
			        }
			      }
			      if (custom.allyStatus != StatusEffects.none) {
			        if (custom.enableAFxAura) {
			          if(custom.statusFxAlly != Fx.none){
			            custom.statusFxAlly.at(a)
			          }
			        }
			        a.apply(custom.allyStatus, 60)
			        appliedAlly = true
			      }
			    })
			    this.atimer = 0
			  }
			  if(this.etimer >= custom.reload * 0.25){
			    flib.radiusEnemies(this.team, this.x, this.y, custom.range, e => {
			      e.apply(custom.enemiesStatus, 60);
			      if(custom.statusFxEnemies != Fx.none){
			        if(custom.enableEFxAura){
			          custom.statusFxEnemies.at(e)
			        }
			      }
			      e.damage(custom.damage)
			      appliedEnemies = true;
			    });
			    this.etimer = 0
			  }
			  flib.checkEffect(custom, this, (appliedEnemies), custom.enableEFxAura, custom.statusFxEnemies, 5)
			  flib.checkEffect(custom, this, (appliedAlly), custom.enableAFxAura, custom.statusFxAlly, 5)
			  
				if(wasHealed){
				  if(custom.healEffect != Fx.none){
				    custom.healEffect.at(this.x, this.y)
				  }
				}
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
    setStats(){
      this.super$setStats()
      this.stats.add(Stat.range, this.range);
      this.stats.add(Stat.reload, this.reload);
    },
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
    solid: true
  }, customStat)
  let custom = extend(type, name, customStat)

  customBuildStat = Object.assign({
    drawSelect() {
      Drawf.dashCircle(this.x, this.y, custom.range, custom.lightningColor);
    },
    rtimer: 0,
    updateTile(){
      if(this.consValid()){
        this.rtimer = Math.min(this.rtimer + this.edelta(), custom.reload)
        if(this.rtimer >= custom.reload){
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
          this.rtimer = 0
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
/*function adaptiveTurret(type, name, customStat, build, customBuildStat){
  if (customStat == undefined) customStat = {}
  if (customBuildStat == undefined) customBuildStat = {}
  customStat = Object.assign({}, customStat)
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({
    updateTile(){
      this.super$updateTile()
      let t = this.target
      if(t != null){
        if(t instanceof Unit){
          let dist = Mathf.dst2(this.x + this.tr.x, this.y + this.tr.y, t.y, t.x)
          let type = t.type
          this.bSpeed = type.speed * 1.05
          this.bDamage = type.health * 0.5 * 0.6
          this.bLifetime = dist / this.bSpeed * 1.01
        }
        if(t instanceof Building){
          let block = t.block
          this.bSpeed = 4
          this.bDamage = block.health * 0.5 * 0.6
          this.bLifetime = dist / this.bSpeed * 1.01
        }
      }else{
        this.bSpeed = 4
        this.bDamage = 20
        this.bLifetime = 60
      }
    },
    bullet(type, angle){
      let lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(this.x + this.tr.x, this.y + this.tr.y, this.targetPos.x, this.targetPos.y) / type.range(), custom.minRange / type.range(), custom.range / type.range()) : this.bLifetime;

      type.create(this, this.team, this.x + this.tr.x, this.y + this.tr.y, angle, this.bDamage, this.bSpeed + Mathf.range(this.velocityInaccuracy), lifeScl, null);
    },
    targetPosition(pos){
      if(!this.hasAmmo() || pos == null) return;
        let speed = this.bSpeed;
        //slow bullets never interselct
        if(speed < 0.1) speed = 9999999
        
        this.targetPos.set(Predict.intercept(this, pos, speed));
        if(this.targetPos.isZero()){
          this.targetPos.set(pos);
        }
    }
  }, customBuildStat)
  if(build != Building){
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  }else{
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}
*/
function fractalTurret(type, name, customStat, build, customBuildStat){
  if (customStat == undefined) customStat = {}
  if (customBuildStat == undefined) customBuildStat = {}
  customStat = Object.assign({
    shootEffect: Fx.none,
    smokeEffect: Fx.none
  }, customStat)
  let custom = extend(type, name, customStat)
  
  customBuildStat = Object.assign({
    targetPosition(pos){
      if(!this.hasAmmo() || pos == null) return;
      
      this.targetPos.set(pos)
      if(this.targetPos.isZero()){
        this.targetPos.set(pos);
      }
    },
    bullet(type, angle){
      let tp = this.targetPos
      if(Mathf.dst(this.x + custom.tr.x, this.y + custom.tr.y, tp.x, tp.y) > custom.range){
        Tmp.v1.set(tp).sub(this.x, this.y).clamp(-custom.range, custom.range).add(this.x, this.y)
      }else{
        Tmp.v1.set(tp)
      }
      
      let x = Tmp.v1.x + Angles.trnsx(Mathf.random(360), Mathf.random(custom.range * 0.5))
      let y = Tmp.v1.y + Angles.trnsy(Mathf.random(360), Mathf.random(custom.range * 0.5))
      
      Tmp.v2.set(x, y)
      
      let prPos = Predict.intercept(Tmp.v1, tp, type.speed)
      let ang = Angles.angle(x, y, prPos.x, prPos.y)
      let lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(x, y, tp.x, tp.y) / type.range(), custom.minRange / type.range(), custom.range / type.range()) : 1;
      
      type.create(this, this.team, x, y, ang, 1 + Mathf.range(custom.velocityInaccuracy), lifeScl)
     
      print((this.targetPos / 8) + "tP")
      print(this.targetPos.x / 8)
      print(this.targetPos.y / 8)
      print("---------------")
    }
  }, customBuildStat)
  if(build != Building){
    custom.buildType = () => extend(build, custom, flib.clone(customBuildStat))
  }else{
    custom.buildType = () => extend(build, flib.clone(customBuildStat))
  }
  return custom
}

module.exports = {
  CustomAnimation: customAnimation,
  OverSeerTurret: overSeerTurret,
  DRWall: dRWall,
  StatusEffectProjector: statusEffectProjector,
  Tesla: tesla,
  FractalTurret: fractalTurret
}