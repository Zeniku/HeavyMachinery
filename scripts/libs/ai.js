/*
Made by Zeniku

returns a prov()
look for global.js for that

I looked for the codes on UnitComp, Units, UnitType, AIController, and all the ai types

<this.unit.> is the UnitComp
<this.unit.type.> is UnitType like the unut stats
<this.> refers the class you are extending which in this case a ai
<this.super$<methodName> example this.super$update
what this does is it calls for the default method code on SC
basically you can add code not override

I Made this thing because i saw someone use mods for example who (s)he can't understand BRUH DON'T USE A COMPLICATED MOD FOR EXAMPLE AND COMPLAIN LEARN JS FIRST YOU SHIT

Ty for Meep's Missing category units for reference
*/

function pointDef(aitype){
  const newAI = prov(() => {
    let u = extend(aitype, {
	    targetFound: false,
	    updateWeapons(){
	      if(this.unit.hasWeapons()){
	        this.super$updateWeapons()
	          
	        let mounts = this.unit.mounts
	        let targets = []
	        let rotation = this.unit.rotation - 90
	        let ret = this.retargetII()
	         
	        for(let i in mounts){
             let mount = mounts[i]
	           let weapon = mount.weapon
           if(weapon.bullet.absorbableDamage > 0){
              let mountX = this.unit.x + Angles.trnsx(rotation, weapon.x, weapon.y);
              let mountY = this.unit.y + Angles.trnsy(rotation, weapon.x, weapon.y);
                
              if(this.retargetII()){
                let target = Groups.bullet.intersect(mountX - weapon.bullet.range(), mountY - weapon.bullet.range(), weapon.bullet.range() * 2, weapon.bullet.range() * 2).min(t => t.team != this.unit.team && t.type.hittable, t => t.dst2(this.unit));
                if(target != null){
                  if(!this.unit.inRange(target)){
                    this.targetFound = false;

                    targets[i] = null;
                  }else if(this.unit.inRange(target)){
                    this.targetFound = true;

                    targets[i] = target;
                  }else{
                    this.targetFound = false;

                    this.targets[i] = null;
                  }
                }else{
                  this.targetFound = false;
                }
              }
              if(targets[i] != null){
                mount.aimX = targets[i].x;
                mount.aimY = targets[i].y;
                let hShoot = targets[i].within(mountX, mountY, weapon.bullet.range()) && this.shouldShoot();
                mount.shoot = hShoot;
                mount.rotate = hShoot;
              }
	          }
	        }
	      }
	    },
	    retargetII(){
	      return this.timer.get(this.timerTarget2, !this.targetFound ? 40 : 60);
	    }
	  });
	  return u
	});
	return newAI
}

module.exports = {
	meleeAI(meleeRange, seekRange){
		const meleeAIL = prov(() => {
			let u = extend(GroundAI, {
				updateTargeting(){
					var ret = this.retarget();
					if(ret){
						this.target = this.findTarget(this.unit.x, this.unit.y, 8 * seekRange, this.unit.type.targetAir, this.unit.type.targetGround);
					}
					if(this.invalid(this.target)){
						this.target = null;
					}
				},
				updateMovement(){
					let core = this.targetFlag(this.unit.x, this.unit.y, BlockFlag.core, true);
					let shoot = false;
				  if(core != null && this.unit.within(core, seekRange)){
					  this.unit.lookAt(core);
		  			this.pathfind(Pathfinder.fieldCore);
            if(this.unit.inRange(core)){
               this.unit.aim(core);
							shoot = true;
						};
          }else if(this.target != null){
            this.unit.lookAt(this.target);
            this.moveTo(this.target, meleeRange)
							if(this.unit.inRange(this.target)){
								this.unit.aim(this.target);
								shoot = true;
							};	
					}else{
						this.super$updateMovement();
					}
					
					this.unit.controlWeapons(shoot);
					
					//it will go to rally even if there's a target
					if(this.command() == UnitCommand.rally){
					    let rally = this.targetFlag(this.unit.x, this.unit.y, BlockFlag.rally, false);
					
					    if(rally != null && !this.unit.within(rally, 70)){
					        this.pathfind(Pathfinder.fieldRally);
					    }
					}
				},
				findTarget(x, y, range, air, ground){
					var result = null
					
					result = result = Units.closestTarget(this.unit.team, x, y, range, u => u.checkTarget(air, ground), t => ground);
					if(result != null) return result;
					
					return null;
				}
			});
			return u;
		});
		return meleeAIL;
	},
	overSeerAI(aiType){
	  const overSeerAIL = prov(() => {
	    let u = extend(aitype, {
	      updateMovement(){
	        this.super$updateMovement()
	        let shoot = false
	        if(this.target !== null && this.unit.inRange(this.target)){
	          this.unit.aimLook(this.target);
	          shoot = true;
	        }
	        this.unit.controlWeapons(shoot)
	      },
	    });
	    return u;
	  });
	  return overSeerAIL
	},
	pointDefAI: pointDef
};