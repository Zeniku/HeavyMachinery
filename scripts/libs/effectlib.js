	/*
	* An extension for draw lib
	* Lib by Zeniku
	*/
const dlib = require("heavymachinery/libs/drawlib");
const fake = new Effect(15, 500, e => {
  let data = e.data;//uselesss but whatever
  let length = data[0];
  let tileLength = Mathf.round(length / Vars.tilesize);

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
		  dlib.fillCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), 1, radius)
		});
	},
	//circle that becomes smaller
	circleii(lifetime, colorFrom, colorTo, radius, radiusMultiplier){
		return new Effect(lifetime, e => {
			dlib.fillCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), 1, radius + e.fout() * radiusMultiplier);
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
	// swill/swirl effect mainly used for charge or black hole Effect
	swillEffect(lifetime, colorFrom, colorTo, thickness, radius, length, rotationMultiplier, amount){
		return new Effect(lifetime, e => {
			Draw.color(colorFrom, colorTo, e.fin());
				Angles.randLenVectors(e.id, amount, 0, e.rotation, 120, (a, b) => {
					const ang = Mathf.angle(a, b);
					let l = length * 0.01
					Lines.stroke(thickness);
					Lines.swirl(e.x, e.y, e.fout() * radius, l, ang * e.fout() * rotationMultiplier);
					Lines.stroke(1);
				});
			Draw.color();
		});
	},
	//used for flames
	flameEffect(lifetime, colorFrom, colorMid, colorTo, radius, amount, distance, cone){
		return new Effect(lifetime, e => {
			Draw.color(colorFrom, colorMid, colorTo, e.fin());
			const hj = new Floatc2({get: function(x, y){
				Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * radius);
			}});  
			Angles.randLenVectors(e.id, amount, e.finpow() * distance, e.rotation, cone, hj);
		});
	},
  fakeLightning: fake
}
//Credits
//MeepOfFaith fake lightning