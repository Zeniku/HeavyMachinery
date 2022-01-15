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