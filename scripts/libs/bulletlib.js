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
	    Drawf.tri(e.x, e.y, this.trailWidth, this.trailWidth * 2, e.rotation());
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

function tractorBeam(object){
   let tractor = extend(BulletType, {
      update(b){
        if(!b) return;
        this.super$update(b);
        
        let target = Damage.linecast(b, b.x, b.y, b.rotation(), this.length);
        b.data = target;
        if(target instanceof Hitboxc){
          if(b.timer.get(1, 5)){
            let hit = target;

            hit.collision(b, hit.x, hit.y);
            b.collision(hit, hit.x, hit.y);
            if(hit instanceof Unit){
              hit.impulse(Tmp.v3.set(hit).sub(b.x, b.y).nor().scl(-1 * (this.force + ((hit.dst(b) / this.range())) * this.scaledForce)));
            }
          }
        }else if(target instanceof Building){
          if(b.timer.get(1, 5)){
            let tile = target;

            if(tile.collide(b)){
              tile.collision(b);
              this.hit(b, tile.x, tile.y);
            }
          }
        }else{
          b.data = new Vec2().trns(b.rotation(), this.length).add(b.x, b.y);
        }
        
      },
      range(){
        return this.length;
      },
      draw(b){
        if(b.data instanceof Position){
          let data = b.data;
          Tmp.v1.set(data);
          
          let fin = Mathf.curve(b.fin(), 0, this.growTime / b.lifetime);
          let fout = 1 - Mathf.curve(b.fin(), (b.lifetime - this.fadeTime) / b.lifetime, 1);
          let lWidth = fin * fout * this.width;
          
          let widthScls = [1.8, 1];

          for(let i = 0; i < 2; i++){
            Draw.color(this.colors[i])
            Lines.stroke(lWidth * widthScls[i]);
            Lines.line(b.x, b.y, Tmp.v1.x, Tmp.v1.y, false);
            Fill.circle(b.x, b.y, Lines.getStroke() / 1.25);
            Fill.circle(Tmp.v1.x, Tmp.v1.y, Lines.getStroke() / 1.25);
            Draw.reset();
          }

          Drawf.light(Team.derelict, b.x, b.y, Tmp.v1.x, Tmp.v1.y, 15 * fin * fout + 5, this.colors[1], 0.6);
        }
      },
      speed: 0.0001,
      damage: 0.5,
      knockback: 0,
      colors: [Pal.heal, Color.white],
      length: 160,
      width: 2,
      maxRange: 160,
      absorbable: false,
      collidesTiles: false,
      collidesGround: true,
      hittable: false,
      keepVelocity: false,
      pierce: true,
      hitSize: 0,
      lifetime: 45,
      fadeTime: 10,
      growTime: 10,
      smokeEffect: Fx.none,
      shootEffect: Fx.none,
      hitEffect: Fx.none,
      despawnEffect: Fx.none,
      force: 0,
      scaledForce: 0
   });
   libs.flib.merge(tractor, object)
   return tractor;
}
//honestly i could I have translated sc to the above but im lazy so TY Meep Very cool
module.exports = {
	newEarthBendBullet: earthBend,
	newOverSeerBullet: overSeer,
	newTractorBeam: tractorBeam
};