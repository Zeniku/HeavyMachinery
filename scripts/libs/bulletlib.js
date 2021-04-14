// Lib by Zeniku
// I did it like this because I'm afraid of error
const libs = {
	flib: require("heavymachinery/libs/function"),
	dlib: require("heavymachinery/libs/drawlib"),
	elib: require("heavymachinery/libs/effectlib")
};
//I only need these no need for AI

//look at the libs first
//this is not a great example if you are just beginning to mod

function earthBend(life, bullet, bulletNum, spread, effect, timer, timer2){
	//libs.flib.debug("bulletlib.js", [earthDust, life, bullet, bulletNum, spread, timer, timer2]);
	return extend(BasicBulletType, {
		lifetime: life,
		speed: 2.5,
		damage: bullet.damage * bulletNum, //for some reason estimateDps is making me shit
		absorbable: false,
		reflectable: false,
		hittable: false,
		collides: false,
		collidesGround: false,
		collidesAir: false,
		collidesTiles: false,
		hitEffect: Fx.none,
		despawnEffect: Fx.none,
		shootEffect: Fx.none,
		smokeEffect: Fx.none,
		drawLight(b){
			//nothing
		},
		draw(b){
			//nothing
		},
		update(b){
			if(b.timer.get(0, timer2)){
				effect.at(b.x, b.y, b.rotation());
				Sounds.place.at(b.x, b.y, 0.42, 1);
			}
			if(b.timer.get(1, timer)){
				effect.at(b.x, b.y, b.rotation());
				for(let i = 0; i < bulletNum; i++){
					let angle = b.rotation() + (i - (bulletNum / 2)) * spread
					bullet.create(b, b.x, b.y, angle);
				};
			};
		}
	});
};
//note overriding the bullet type won't work unless you modify the function I think
//but i figured a way so you can override stuff
function overSeer(overide){
	let overseerStat = extendContent(BasicBulletType, {
	  damage: 10,
	  trailColor: Pal.lancerLaser,
	  trailWidth: 1,
	  trailLength: 15,
	  turningPower: 10,
	  speed: 2,
	  pierce: true,
	  pierceCap: 5,
	  targetTime: 15,
	  hitEffect: Fx.hitLancer,
	  despawnEffect: Fx.hitLancer,
	  init(b){
	    if(!b) return;
	    b.data = new Trail(this.trailLength);
	  },
	  draw(e){
	    
	    e.data.draw(this.trailColor, this.trailWidth);
	    Draw.color(this.trailColor)
	    Drawf.tri(e.x, e.y, this.trailWidth, this.trailWidth / 2, e.rotation());
	  },
		update(b){
			if(b.timer.get(0, this.targetTime)){
			  if(b.owner instanceof Unit){
			    b.vel.setAngle(Angles.moveToward(b.rotation(), b.angleTo(b.owner.aimX, b.owner.aimY), this.turningPower * Time.delta * 50));
			  }
			  if(b.owner instanceof Turret){
			    b.vel.setAngle(Angles.moveToward(b.rotation(), b.angleTo(b.owner.targetPos.x, b.owner.targetPos.y), this.turningPower * Time.delta * 50));
			  }
			};
			b.data.update(b.x, b.y);
		}
	});
	libs.flib.merge(overseerStat, overide)
	return overseerStat;
};
module.exports = {
	newEarthBendBullet: earthBend,
	newOverSeerBullet: overSeer
};