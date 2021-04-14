const libs = require("heavymachinery/libs/libs");
//if you did not read my lib you will be confused
//effects
const flameAura = new Effect(40, e => {
	libs.dlib.splashCircleii(e.x, e.y, Pal.lightPyraFlame, Pal.darkFlame, e.fin(), e.fout() * 2.5, e.id, 3, 2 + e.fin() * 9, e.rotation, 360);
});

const healWave = new Effect(22, e => {
	libs.dlib.lineCircle(e.x, e.y, Pal.heal, e.fout() * 3, 4 + e.finpow() * (8 * 15));
});

//block
const effect = extend(LiquidBlock, "statusEffectProjector", {
	icons(){
		return [
			Core.atlas.find("heavymachinery-statusEffectProjector")
		];
	},
	drawPlace(x, y, rotation){
		Drawf.dashCircle(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, this.range, Pal.accent);
	}
});
effect.buildType = () => {
	let eff = extend(LiquidBlock.LiquidBuild, effect, {
	
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
				libs.flib.radiusEnemies(this.team, this.x, this.y, effect.range, cons(unitii => {
					unitii.apply(StatusEffects.melting, 60);
					enemiesBurn = true;
				}));
				
				if(enemiesBurn){
					for(var i = 0; i < 3; i++){
						flameAura.at(this.x + Angles.trnsx(Mathf.random(360), Mathf.random(effect.range)), this.y + Angles.trnsy(Mathf.random(360), Mathf.random(effect.range)));
					};
				};
			};
		},
		
		drawSelect(){
			Drawf.dashCircle(this.x, this.y, effect.range, Pal.accent);
			
			Draw.reset();
		},
		
		draw(){
			Draw.rect(Core.atlas.find("heavymachinery-statusEffectProjector"), this.x, this.y);
			
			if(this.consValid()){
				libs.dlib.spikeii(this.x, this.y, Pal.lightPyraFlame, 2 * 2.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
				libs.dlib.spikeii(this.x, this.y, Color.white, 2 * 1.9 + Mathf.absin(Time.time, 5, 1) + Mathf.random(0.1),  2 * Time.time);
			};
		},
		
	});
	return eff;
};
effect.breakable = true;
effect.update = true;
effect.targetable = true;
effect.hasLiquids = false;
effect.outputsLiquid = false;
effect.hasItems = false;
effect.range = 8 * 15;
effect.reload = 1 * 60;
effect.consumes.power(500/60.0);
effect.hasPower = true;
effect.outputsPower = false;
effect.buildVisibility = BuildVisibility.shown;