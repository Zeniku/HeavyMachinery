const miniCore = extendContent(CoreBlock, "miniCore", {
	buildVisibility: BuildVisibility.shown,
	canPlaceOn(){
		return true;
	}
});