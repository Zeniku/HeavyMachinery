	/*
	* An extension for draw lib
	* Lib by Zeniku
	*/
const dlib = require("heavymachinery/libs/drawlib");
//Ty MeepOfFaith :D
const fake = new Effect(15, 500, e => {
  let data = e.data;//uselesss but whatever
  let length = data[0];
  let tileLength = Mathf.round(length / 8);

  Lines.stroke(data[1] * e.fout());
  Draw.color(e.color, Color.white, e.fin());

  for(let i = 0; i < tileLength; i++){
    let offsetXA = i == 0 ? 0 : Mathf.randomSeed(e.id + (i * 6413), -4.5, 4.5);
    let offsetYA = (length / tileLength) * i;
    let f = i + 1;
    
    let offsetXB = f == tileLength ? 0 : Mathf.randomSeed(e.id + (f * 6413), -4.5, 4.5);
    let offsetYB = (length / tileLength) * f;
    
    let tmp1 = new Vec2();
    tmp1.trns(e.rotation, offsetYA, offsetXA);
    tmp1.add(e.x, e.y);

    let tmp2 = new Vec2();
    tmp2.trns(e.rotation, offsetYB, offsetXB);
    tmp2.add(e.x, e.y);

    Lines.line(tmp1.x, tmp1.y, tmp2.x, tmp2.y, false);
    Fill.circle(tmp1.x, tmp1.y, Lines.getStroke() / 2);
    Drawf.light(data[2], tmp1.x, tmp1.y, tmp2.x, tmp2.y, data[1] * 3, e.color, 0.4);
        }

    Fill.circle(Tmp.v2.x, Tmp.v2.y, Lines.getStroke() / 2);
});
fake.layer = Layer.bullet + 0.01
module.exports = {
	//simple effect circle
	circle(lifetime, colorFrom, colorTo, radius){
		return new Effect(lifetime, e => {
		  dlib.fillCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), radius)
		});
	},
	//circle that becomes smaller
	circleii(lifetime, colorFrom, colorTo, radius, radiusMultiplier){
		return new Effect(lifetime, e => {
			dlib.fillCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), radius + e.fout() * radiusMultiplier);
		});
	},
	//Splash Effect
	splashCircle(lifetime, colorFrom, colorTo, radius, amount, distance, cone){
		return new Effect(lifetime, e => {
		   dlib.splashCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), radius, e.id, amount, e.finpow() * distance, e.rotation, cone);
		});
	},
	//line
	//it's like circle but it's an outline
	lineCircle(lifetime, colorFrom, colorTo, thickness, radius){
		return new Effect(lifetime, e => {
			dlib.lineCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), thickness, radius)
		});
	},
	//basically circleii but it's an outline
	lineCircleii(lifetime, colorFrom, colorTo, thickness, radius, radiusMultiplier){
		return new Effect(lifetime, e => {
			dlib.lineCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), thickness, radius + e.fout() * radiusMultiplier)
		});
	},
	//splash line mostly used for hit Effect
	splashline(lifetime, colorFrom, colorTo, thickness, length, amount, distance, cone){
		return new Effect(lifetime, e => {
		    dlib.splashlineii(e.x, e.y, colorFrom, colorTo, e.fin(), thickness, length, e.id, amount, e.finpow() * distance, e.rotation, cone);
		});
	},
	//used for flames
	flameEffect(lifetime, colorFrom, colorMid, colorTo, radius, amount, distance, cone){
		return new Effect(lifetime, e => {
		  Draw.color(colorFrom, colorMid, colorTo, e.fin())
			bases.splashCircle(e.x, e.y, radius, e.id, amount, distance, e.rotation, cone)
		});
	},
  fakeLightning: fake
}
//Credits
//MeepOfFaith fake lightning