//if you did not read my lib you will be confused
//effects
let text = "heavymachinery/libs/";

let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib")

//Effects
const flameAura = new Effect(40, e => {
	dlib.splashCircleii(e.x, e.y, Pal.lightPyraFlame, Pal.darkFlame, e.fin(), e.fout() * 2.5, e.id, 3, 2 + e.fin() * 9, e.rotation, 360);
});

const spark = new Effect(10, e => {
  dlib.splashline(e.x, e.y, Pal.lancerLaser, 4 * e.fout(), 3 * e.fin(), e.id, 4, e.finpow() * 16, e.rotation, 45)
});

const healWave = new Effect(22, e => {
	dlib.lineCircle(e.x, e.y, Pal.heal, e.fout() * 3, 4 + e.finpow() * (8 * 15));
});

//block
/*Note: I couldake these things overdrivable but im lazy*/
const effect = extend(LiquidBlock, "statusEffectProjector", {
  breakable: true,
  update: true,
  targetable: true,
  hasLiquids: false,
  outputsLiquid: false,
  hasItems: false,
  range: 8 * 15,
  damage: 2,
  reload: 60,
  hasPower: true,
  outputsPower: false,
  buildVisibility: BuildVisibility.shown,
  timers: 2,
	icons(){
		return [
			Core.atlas.find("heavymachinery-statusEffectProjector")
		];
	},
	drawPlace(x, y, rotation){
		Drawf.dashCircle(x * Vars.tilesize, y * Vars.tilesize, this.range, Pal.accent);
	}
});
effect.buildType = () => extend(LiquidBlock.LiquidBuild, effect, {
	
		updateTile(){
		//Basically checks if it's consuming something and check if timer
			if(this.consValid() && this.timer.get(0, effect.reload)){
				let wasHealed = false;
				
				//Checks if there's a unit in the radius and heals them
				Units.nearby(this.team, this.x, this.y, effect.range, unit => {
					//checks if the unit is damaged so it won't do the effect even if it's fully healed
					if(unit.damaged()){
						unit.heal(0.5);
						Fx.heal.at(unit);
						wasHealed = true;
					};
				});
				//this piece of code here makes it so it only 1 effect is active even with multiple units
				if(wasHealed){
					healWave.at(this.x, this.y);
				};
			};
			
			if(this.consValid()){
				let enemiesBurn = false;
				//remember using cons() on this function
				flib.radiusEnemies(this.team, this.x, this.y, effect.range, unitii => {
					unitii.apply(StatusEffects.melting, 60);
					if(this.timer.get(1, effect.reload * 0.25)){
			  		unitii.damage(effect.damage)
					}
					enemiesBurn = true;
				});
				
				if(enemiesBurn){
					for(var i = 0; i < 3; i++){
						flameAura.at(this.x + Angles.trnsx(Mathf.random(360), Mathf.random(effect.range)), this.y + Angles.trnsy(Mathf.random(360), Mathf.random(effect.range)));
					};
				};
			};
		},
		
		drawSelect(){
			Drawf.dashCircle(this.x, this.y, effect.range, Pal.accent);
		},
		draw(){
			Draw.rect(Core.atlas.find("heavymachinery-statusEffectProjector"), this.x, this.y);
			
			if(this.consValid()){
			  Draw.z(Layer.effect - 0.01)
				dlib.spikeii(this.x, this.y, Pal.lightPyraFlame, 2 * 2.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
				dlib.spikeii(this.x, this.y, Color.white, 2 * 1.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
			};
		},
		
	});
effect.consumes.power(500/60.0);

const tesla = extend(Block, "tesla", {
  drawPlace(x, y, rotation){
    Drawf.dashCircle(x * Vars.tilesize, y * Vars.tilesize, this.range, Pal.lancerLaser);
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
  timers: 2
});
tesla.buildType = () => extend(Building, {
  drawSelect() {
    Drawf.dashCircle(this.x, this.y, tesla.range, Pal.lancerLaser);
  },
  updateTile(){
    if(this.consValid()){
      if(this.timer.get(0, tesla.reload)){
        flib.radiusEnemies(this.team, this.x, this.y, tesla.range, unit => {
          unit.apply(StatusEffects.disarmed, 10);
          unit.apply(StatusEffects.shocked, 15);
          unit.damage(tesla.damage)
          spark.at(unit)
          let ang = Angles.angle(this.x, this.y, unit.x, unit.y)
          elib.fakeLightning.at(this.x, this.y, ang, Pal.lancerLaser, [Mathf.dst(this.x, this.y, unit.x, unit.y), 4, this.team])
      });
        if(Mathf.chance(25)){
          for(let i = 0; i < tesla.lightningCount; i++){
          Lightning.create(this.team, Pal.lancerLaser, tesla.damage * 0.5, this.x, this.y, Mathf.random(0, 359), ((tesla.range * 0.125) * 0.5) + Mathf.random(5));
          }
        }
      }
    }
  },
  draw(){
    Draw.rect(this.block.region, this.x, this.y);
    if(this.consValid()){
      Draw.z(Layer.bullet + 0.01)
      Draw.color(Pal.lancerLaser)
      Fill.circle(this.x, this.y, 2 * 1.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1));
    }
  }
});
tesla.consumes.power(500/60.0);