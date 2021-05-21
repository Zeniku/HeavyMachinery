const miniCore = extend(CoreBlock, "miniCore", {
	buildVisibility: BuildVisibility.shown,
	canPlaceOn(){
		return true;
	}
});