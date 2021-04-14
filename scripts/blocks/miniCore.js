const miniCore = extendContent(CoreBlock, "miniCore", {
	load(){//same thing as i did on content-block-production.js
		this.super$load();
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.decalRegion = Core.atlas.find(this.name + "-decal");
	},
	icons(){
		return [
			Core.atlas.find("heavymachinery-miniCore-full")
		];
	},
	canPlaceOn(){
		return true;
	},
});
miniCore.buildType = () => {
	let mc = extendContent(CoreBlock.CoreBuild, miniCore, {
		draw(){
			Draw.rect(miniCore.baseRegion, this.x, this.y);
			
			Draw.color(this.team.color);
			Draw.rect(miniCore.decalRegion, this.x, this.y);
			Draw.color();
		},
	});
	return mc;
};

miniCore.buildVisibility = BuildVisibility.shown