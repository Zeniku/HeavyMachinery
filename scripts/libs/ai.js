/*
Made by Zeniku

Ty for Meep's Missing category units for reference
*/

module.exports = {
	meleeAI(meleeRange, seekRange){
		const meleeAIL = prov(() => {
			let u = extend(GroundAI, {
				updateTargeting(){
					let ret = this.retarget();
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
					let result = null
					
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
	    let u = extend(aiType, {
	      updateMovement(){
	        this.super$updateMovement()
	        let shoot = false
	        if(this.target != null && this.unit.inRange(this.target)){
	          this.unit.aimLook(this.target)
	          shoot = true
	        }
	        this.unit.controlWeapons(shoot)
	      }
	    });
	    return u;
	  });
	  return overSeerAIL
	},
};