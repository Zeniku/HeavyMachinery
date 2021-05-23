let text = "heavymachinery-"
const miniCore = extend(CoreBlock, "miniCore", {
	buildVisibility: BuildVisibility.shown,
	icons(){
	  return [
	    Core.atlas.find(text + "miniCore"),
	    Core.atlas.find(text + "miniCore-team-sharded")
	  ]
	},
	canPlaceOn(){
		return true;
	}
});