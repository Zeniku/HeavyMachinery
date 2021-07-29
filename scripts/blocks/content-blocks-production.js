let lib = "heavymachinery/libs/"

let blockTypes = require(lib + "blockTypes")

const lcomp = blockTypes.customAnimation(GenericCrafter, "lonsdaleite-compressor", {}, GenericCrafter.GenericCrafterBuild, {}, {frameSpeed: 5, frameCount: 4, sine: true})