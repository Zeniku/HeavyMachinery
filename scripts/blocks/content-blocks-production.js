function customDrawAnimation(Block, Build, sine, frameStat, customDraw){
  Block.buildType = () => extend(Build, Block, {
    draw(){
      Draw.rect(Block.bottomRegion, this.x, this.y);
      Draw.rect(
        sine ?
        Block.frameRegions[Math.floor(Mathf.absin(this.totalProgress, frameStat.frameSpeed, frameStat.frameCount - 0.001))] :
        Block.frameRegions[Math.floor(((this.totalProgress / frameStat.frameSpeed) % frameStat.frameCount))],
        this.x, this.y);
  
      Draw.rect(Block.topRegion, this.x, this.y);
      customDraw()
    }
  });
}

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
customDrawAnimation(lcomp, GenericCrafter.GenericCrafterBuild, true, {frameCount: 4, frameSpeed: 5}, () => {})