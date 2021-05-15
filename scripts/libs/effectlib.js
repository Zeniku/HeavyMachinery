	/*
	* An extension for draw lib
	* Lib by Zeniku
	*/
const fake = new Effect(5, 500, e => {
  let data = e.data;//uselesss but whatever
  let length = data[0];
  let tileLength = Mathf.round(length / tilesize);

  Lines.stroke(data[1] * e.fout());
  Draw.color(e.color, Color.white, e.fin());

  for(let i = 0; i < tileLength; i++){
    let offsetXA = i == 0 ? 0 : Mathf.randomSeed(e.id + (i * 6413), -4.5, 4.5);
    let offsetYA = (length / tileLength) * i;
    let f = i + 1;
    
    let offsetXB = f == tileLength ? 0 : Mathf.randomSeed(e.id + (f * 6413), -4.5, 4.5);
    let offsetYB = (length / tileLength) * f;
    
    Tmp.v1.trns(e.rotation, offsetYA, offsetXA);
    Tmp.v1.add(e.x, e.y);

    Tmp.v2.trns(e.rotation, offsetYB, offsetXB);
    Tmp.v2.add(e.x, e.y);

    Lines.line(Tmp.v1.x, Tmp.v1.y, Tmp.v2.x, Tmp.v2.y, false);
    Fill.circle(Tmp.v1.x, Tmp.v1.y, Lines.getStroke() / 2);
    Drawf.light(data[2], Tmp.v1.x, Tmp.v1.y, Tmp.v2.x, Tmp.v2.y, data[1] * 3, e.color, 0.4);
        }

    Fill.circle(Tmp.v2.x, Tmp.v2.y, Lines.getStroke() / 2);
});
fake.layer = Layer.bullet + 0.01
	const dlib = require("heavymachinery/libs/drawlib");
	module.exports = {
	//simple effect circle
	circle(lifetime, colorFrom, colorTo, radius){
		const c = new Effect(lifetime, e => {
			Draw.color(colorFrom, colorTo, e.fin());
			Fill.circle(e.x, e.y, radius);
			Draw.color();
			});
		return c;
	},
	//circle that becomes smaller
	circleii(lifetime, colorFrom, colorTo, radius, radiusMultiplier){
		const cii = new Effect(lifetime, e => {
			dlib.fillCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), 1, radius + e.fout() * radiusMultiplier);
		});
		return cii;
	},
	//Splash Effect
	splashCircle(lifetime, colorFrom, colorTo, radius, amount, distance, cone){
		const sc = new Effect(lifetime, e => {
		   dlib.splashCircleii(e.x, e.y, colorFrom, colorTo, e.fin(), radius, e.id, amount, e.finpow() * distance, e.rotation, cone);
		});
		return sc;
	},
	//line
	//it's like circle but it's an outline
	lineCircle(lifetime, colorFrom, colorTo, thickness, radius){
		const lc = new Effect(lifetime, e => {
			Draw.color(colorFrom, colorTo, e.fin());
			Lines.stroke(thickness);
			Lines.circle(x, y, radius);
			Draw.color();
			Lines.stroke(1);
		});
		return lc;
	},
	//basically circleii but it's an outline
	lineCircleii(lifetime, colorFrom, colorTo, thickness, radius, radiusMultiplier){
		const lcii = new Effect(lifetime, e => {
			Draw.color(colorFrom, colorTo, e.fin());
			Lines.stroke(thickness);
			Lines.circle(x, y, radius + e.fout() * radiusMultiplier);
			Draw.color();
			Lines.stroke(1);
		});
		return lcii;
	},
	//splash line mostly used for hit Effect
	splashline(lifetime, colorFrom, colorTo, thickness, length, amount, distance, cone){
		const sl = new Effect(lifetime, e => {
		    dlib.splashlineii(e.x, e.y, colorFrom, colorTo, e.fin(), thickness, length, e.id, amount, e.finpow() * distance, e.rotation, cone);
		});
		return sl;
	},
	// swill/swirl effect mainly used for charge or black hole Effect
	swillEffect(lifetime, colorFrom, colorTo, thickness, radius, length, rotationMultiplier, amount, distance, cone){
		const se = new Effect(lifetime, e => {
			Draw.color(colorFrom, colorTo, e.fin());
				const hj = new Floatc2({get: function(a, b){
					const ang = Mathf.angle(a, b);
					let l = length * 0.01
					Lines.stroke(thickness);
					Lines.swirl(e.x, e.y, e.fout() * radius, l, ang * e.fout() * rotationMultiplier);
					Lines.stroke(1);
				}});
				Angles.randLenVectors(e.id, amount, distance, e.rotation, cone, hj);
			Draw.color();
		});
		return se;
	},
	//used for flames
	flameEffect(lifetime, colorFrom, colorMid, colorTo, radius, amount, distance, cone){
		const sc = new Effect(lifetime, e => {
			Draw.color(colorFrom, colorMid, colorTo, e.fin());
			const hj = new Floatc2({get: function(x, y){
				Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * radius);
			}});  
			Angles.randLenVectors(e.id, amount, e.finpow() * distance, e.rotation, cone, hj);
			
		});
		return sc;
	},
  fakeLightning(team, x1, y1, x2, y2, lightningColor, lightningStroke){
    let ang = Angles.angle(x1, y1, x2, y2)
    fake.at(x1, y1, ang, lightningColor, [Mathf.dst(x1, y1, x2, y2), lightningStroke, team])
  }
}
//Credits
//MeepOfFaith fake lightning