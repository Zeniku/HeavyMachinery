//Libs And functions
//please don't do what i do because im retarded

let lib = "heavymachinery/libs/";
let heav = "heavymachinery-"

let flib = require(lib + "function");
let dlib = require(lib + "drawlib");
let blockTypes = require (lib + "blockTypes")

const lonsdaleiteWall = blockTypes.dRWall(Wall, "lonsdaleiteWall", {
  dRChance: 15,
  dRPercentage: 20,
}, Wall.WallBuild, {})
const lonsdaleiteWallLarge = blockTypes.dRWall(Wall, "lonsdaleiteWallLarge", {
  dRChance: 15,
  dRPercentage: 30
}, Wall.WallBuild, {})
