const HMDraw = require("heavymachinery/libs/HMDraw");
//Ty MeepOfFaith :D go check out his repos at https://github.com/MEEPofFaith

let {splashLineii, splashCircleii, lineCircleii, fillCircle, lineCircle, splashLine} = HMDraw

let color = [Pal.sapBullet, Pal.sapBulletBack, Color.valueOf("b28768ff"), Color.valueOf("8f665bff"), Pal.lancerLaser]
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

const earthDust = new Effect(20, e => {
	splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 2.5 * e.fslope(), e.id, 10, e.finpow() * 10, e.rotation, 360);
});
earthDust.layer = Layer.debris
//print(earthDust)

const earthDustII = new Effect(30, e => {
	splashCircleii(e.x, e.y, color[2], color[3], e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * 20, e.rotation, 360);
});
earthDustII.layer = Layer.debris
//print(earthDustII)

const boom = new Effect(30, e => {
  splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
  lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fout(), (4 * 8) * e.fin())
  splashLineii(e.x, e.y, color[0], color[2], e.fin(), 4 * e.fout(), 6 * e.fout(), e.id, 15, e.finpow() * (8 * 5), e.rotation, 360)
});

const bigBoom = new Effect(30, e => {
  splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 20, e.finpow() * (8 * 10), e.rotation, 360)
  lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fout(), (6 * 7) * e.finpow())
  lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 6 * e.fout(), (6 * 11) * e.finpow())
  splashLineii(e.x, e.y, color[0], color[2], e.fin(), 4 * e.fout(), 6 * e.fout(), e.id, 20, e.finpow() * (8 * 10), e.rotation, 360)
});

const laserCharge = new Effect(80, e => {
  splashCircleii(e.x, e.y, color[0], color[1], e.fin(), 5 * e.fslope(), e.id, 20, (1 - e.finpow()) * (8 * 6), e.rotation, 360)
  lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fin(), (6 * 7) * (1 - e.finpow()))
  lineCircleii(e.x, e.y, color[0], color[1], e.fin(), 4 * e.fin(), (6 * 11) * (1 - e.finpow()))
  fillCircle(e.x, e.y, color[0], 10 * e.fin())
  fillCircle(e.x, e.y, Color.white, 8 * e.fin())
});

const orbExplode = new Effect(45, e => {
  splashLineii(e.x, e.y, color[4], color[4], e.fin(), 10 * e.fout(), 6 * e.fout(), e.id, 20, e.finpow() * (8 * 4), e.rotation, 360)
  lineCircleii(e.x, e.y, color[4], color[4], e.fin(), (8 * 3) * e.finpow(), (8 * 5) * e.finpow())
});

const flameAura = new Effect(40, e => {
	splashCircleii(e.x, e.y, Pal.lightPyraFlame, Pal.darkFlame, e.fin(), e.fout() * 2.5, e.id, 3, 2 + e.fin() * 9, e.rotation, 360);
});

const spark = new Effect(10, e => {
  splashLine(e.x, e.y, Pal.lancerLaser, 4 * e.fout(), 3 * e.fin(), e.id, 4, e.finpow() * 16, e.rotation, 45)
});

const healWave = new Effect(22, e => {
	lineCircle(e.x, e.y, Pal.heal, e.fout() * 3, 4 + e.finpow() * (8 * 15));
});

const critTrail = new Effect(20, e => {
  Draw.color(Pal.heal)
  Angles.randLenVectors(e.id, 3, 1 + e.fin() * 3, (x, y) => {
    Fill.square(e.x + x, e.y + y, e.fout() * 3.3 + 0.5);
  });
})

const spawnEffect = new Effect(20, e => {
  Draw.color(Pal.heal)
  Lines.stroke(4 * (1 - e.finpow()))
  Lines.circle(e.x, e.y, 8 * e.finpow())
})

module.exports = {
	//used for flames
	flameEffect(lifetime, colorFrom, colorMid, colorTo, radius, amount, distance, cone){
		return new Effect(lifetime, e => {
		  Draw.color(colorFrom, colorMid, colorTo, e.fin())
			HMDraw.bases.splashCircle(e.x, e.y, radius, e.id, amount, distance, e.rotation, cone)
		});
	},
  fakeLightning: fake,
  earthDust: earthDust,
  earthDustII: earthDustII,
  boom: boom,
  bigBoom: bigBoom,
  laserCharge: laserCharge,
  orbExplode: orbExplode,
  flameAura: flameAura,
  spark: spark,
  healWave: healWave,
  spawnEffect: spawnEffect
}