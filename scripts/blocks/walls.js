//Libs And functions
//please don't do what i do because im retarded

let lib = "heavymachinery/libs/";
let heav = "heavymachinery-"

let flib = require(lib + "function");
let dlib = require(lib + "drawlib");

function CustomWallBuild(Type, name, customStats, Build){
  let stats = flib.mergeII({
    size: 1,
    dRChance: 20,
    dRPercentage: 50,
  }, customStats)
  let hitEffect = new Effect(15 * stats.size, e => {
    Lines.stroke((2 + stats.size) * e.fout(), stats.hitColor)
    Lines.square(e.x, e.y, ((8 * stats.size) / 2) * e.fin())
  });
  let CustomWallBuildL = extend(Type, name, stats)
  CustomWallBuildL.buildType = () => extend(Build, CustomWallBuildL, {
    collision(b){
      if(stats.dRChance > 0 && stats.dRPercentage > 0){
        if(Mathf.chance(stats.dRChance)){
          b.damage = b.damage - (b.damage * (stats.dRPercentage / 100))
          hitEffect.at(this.x, this.y, 0)
        }
      }
      this.super$collision(b)
    }
  })
  return CustomWallBuildL
}

const lonsdaleiteWall = CustomWallBuild(Wall, "lonsdaleiteWall", {
  dRChance: 15,
  dRPercentage: 20,
}, Wall.WallBuild)
const lonsdaleiteWallLarge = CustomWallBuild(Wall, "lonsdaleiteWallLarge", {
  size: 2,
  dRChance: 15,
  dRPercentage: 30
}, Wall.WallBuild)
