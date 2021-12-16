/*
* Lib by JerichoFletcher 
* Extended and Modified by Zeniku
*
* [Notes]
* inOut is where you place e.fin() or e.fout() for the change color
* finion is the completion of the circle
* id is e.id
*/
let bases = {
  //Why am i making this
  lineCircle(x, y, thickness, radius){
    Lines.stroke(thickness);
    Lines.circle(x, y, radius);
    Lines.stroke(1);
  },
  //no fillCircle because Why like Why
  linePoly(x, y, thickness, sides, radius, rotation){
    Lines.stroke(thickness);
    Lines.poly(x, y, sides, radius, rotation);
    Lines.stroke(1);
  },
  //ha yes so does fillPoly
  swirl(x, y, thickness, radius, finion, rotation){
    Lines.stroke(thickness);
    Lines.swirl(x, y, radius, finion, rotation);
    Lines.stroke(1);
  },
  splashLine(x, y, thickness, length, id, amount, distance, rotation, cone){
    Angles.randLenVectors(id, amount, distance, rotation, cone, (a, b) => {
      const ang = Mathf.angle(a, b);
      Lines.stroke(thickness);
      Lines.lineAngle(x + a, y + b, ang, length);
      Lines.stroke(1);
    });
  },
  splashCircle(x, y, radius, id, amount, distance, rotation, cone){
    Angles.randLenVectors(id, amount, distance, rotation, cone, (a, b) => {
      Fill.circle(x + a, y + b, radius);
    });
  }
}
function lineCircle(x, y, color, thickness, radius){
  Draw.color(color);
  bases.lineCircle(x, y, thickness, radius)
  Draw.color();
} 
function lineCircleii(x, y, colorFrom, colorTo, inOut, thickness, radius){
  Draw.color(colorFrom, colorTo, inOut);
  bases.lineCircle(x, y, thickness, radius)
  Draw.color();
}
function fillCircle(x, y, color, radius){
  Draw.color(color);
  Fill.circle(x, y, radius);
  Draw.color();
}
function fillCircleii(x, y, colorFrom, colorTo, inOut, radius){
  Draw.color(colorFrom, colorTo, inOut);
  Fill.circle(x, y, radius);
  Draw.color();
}
function fillPoly(x, y, color, sides, size, rot){
  Draw.color(color);
  Fill.poly(x, y, sides, size, rot);
  Draw.color();
}
function fillPolyii(x, y, colorFrom, colorTo, inOut, alpha, sides, size, rot){
  Draw.color(colorFrom, colorTo, inOut);
  Fill.poly(x, y, sides, size, rot);
  Draw.color();
}
function linePoly(x, y, color, thickness, sides, radius, rotation){
  Draw.color(color);
  bases.linePoly(x, y, thickness, sides, radius, rotation)
  Draw.color();
}
function linePolyii(x, y, colorFrom, colorTo, inOut, thickness, sides, radius, rotation){
  Draw.color(colorFrom, colorTo, inOut);
  bases.linePoly(x, y, thickness, sides, radius, rotation)
  Draw.color();
}
function swirl(x, y, color, thickness, radius, finion, rotation){
  Draw.color(color);
  bases.swirl(x, y, thickness, radius, finion, rotation)
  Draw.color();
}
function swirlii(x, y, colorFrom, colorTo, inOut, thickness, radius, finion, rotation){
  Draw.color(colorFrom, colorTo, inOut);
  bases.swirl(x, y, thickness, radius, finion, rotation)
  Draw.color();
}
function splashLine(x, y, color, thickness, length, id, amount, distance, rotation, cone){
  Draw.color(color);
  bases.splashLine(x, y, thickness, length, id, amount, distance, rotation, cone)
  Draw.color();
}
function splashLineii(x, y, colorFrom, colorTo, inOut, thickness, length, id, amount, distance, rotation, cone){
  Draw.color(colorFrom, colorTo, inOut);
  bases.splashLine(x, y, thickness, length, id, amount, distance, rotation, cone)
  Draw.color();
}
function splashCircle(x, y, color, radius, id, amount, distance, rotation, cone){
  Draw.color(color);
  bases.splashCircle(x, y, radius, id, amount, distance, rotation, cone)
  Draw.color();
}
function splashCircleii(x, y, colorFrom, colorTo, inOut, radius, id, amount, distance, rotation, cone){
  Draw.color(colorFrom, colorTo, inOut);
  bases.splashCircle(x, y, radius, id, amount, distance, rotation, cone)
  Draw.color();
}
function spike(x, y, spikes, size, lengthMultiplier, rotation){
  const step = 360 / spikes;
  for(let i = 0; i < spikes; i++){
    Drawf.tri(x, y, size, (size * lengthMultiplier), i * step + rotation);
  };
}
function spikeii(x, y, color, size, rotation) {
  Draw.color(color)
  spike(x, y, 4, size, 2, rotation)
  Draw.color();
}
function spikeiii(x, y, colorFrom, colorTo, inOut, size, rotation) {
  Draw.color(colorFrom, colorTo, inOut);
  spike(x, y, 4, size, 2, rotation)
  Draw.color();
}

module.exports = {
  bases: bases,
  lineCircle: lineCircle,
  lineCircleii: lineCircleii,
  fillCircle: fillCircle,
  fillCircleii: fillCircleii,
  linePoly: linePoly,
  linePolyii: linePolyii,
  fillPoly: fillPoly,
  fillPolyii: fillPolyii,
  swirl: swirl,
  swirlii: swirlii,
  splashLine: splashLine,
  splashLineii: splashLineii,
  splashCircle: splashCircle,
  splashCircleii: splashCircleii,
  spike: spike,
  spikeii: spikeii,
  spikeiii: spikeiii
}