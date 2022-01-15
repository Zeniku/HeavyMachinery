//Libs And functions
//please don't do what i do because im retarded

let {blockTypes} = require("heavymachinery/libs/libraries");

const lonsdaleiteWall = blockTypes.DRWall(Wall, "lonsdaleiteWall", {
  dRChance: 15,
  dRPercentage: 20,
}, Wall.WallBuild, {})
const lonsdaleiteWallLarge = blockTypes.DRWall(Wall, "lonsdaleiteWallLarge", {
  dRChance: 15,
  dRPercentage: 45
}, Wall.WallBuild, {})