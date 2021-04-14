const frames = {
	frameCount: 4,
	frameSpeed: 5
}
//<this> refers to the class which is extended by  extend
const lcomp = extend(GenericCrafter, "lonsdaleite-compressor", {
	load(){//load the sprites
		this.region = Core.atlas.find(this.name);
		this.bottomRegion = Core.atlas.find(this.name + "-bottom");
		this.frameRegions = [];
		
		for(let i = 0; i < frames.frameCount; i++){
			this.frameRegions[i] = Core.atlas.find(this.name + "-frame" + i);
		}
		
		this.topRegion = Core.atlas.find(this.name + "-top");
	},
	icons(){//puts the icons for you to se on the menu
		return [
			this.region,
			this.frameRegions[0]
		]
	}
});
lcomp.buildType = () => {
	let ent = extend(GenericCrafter.GenericCrafterBuild, lcomp, {
		draw(){//draws
			let sine = true;
			Draw.rect(this.bottomRegion, this.x, this.y);
			
			Draw.rect(
			sine ?
				this.block.frameRegions[Math.floor(Mathf.absin(this.totalProgress, frames.frameSpeed, frames.frameCount - 0.001))] :
				this.block.frameRegions[Math.floor(((this.totalProgress / frames.frameSpeed) % frames.frameCount))],
			this.x, this.y);
			
			Draw.rect(this.topRegion, this.x, this.y);
		}
	});
	return ent
};