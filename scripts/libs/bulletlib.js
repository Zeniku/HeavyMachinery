// Lib by Zeniku
// I did it like this because I'm afraid of error
let text = "heavymachinery/libs/";

let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib");

//look at the libs first
//this is not a great example if you are just beginning to mod


function earthBend(life, bullet, bulletNum, spread, effect, timer, timer2){
	//flib.debug("bulletlib.js", [earthDust, life, bullet, bulletNum, spread, timer, timer2]);
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
//Ty Sh1penfire for toggleable 1 time homing
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
	  homingCap: -1,
	  targetTime: 15,
	  hitEffect: Fx.hitLancer,
	  despawnEffect: Fx.hitLancer,
	  init(b){
	    if(!b) return;
	    b.data = {}
	    b.data.trail = new Trail(this.trailLength);
	    b.data.homeCount = 0
	  },
	  draw(b){
	    
	    b.data.trail.draw(this.trailColor, this.trailWidth);
	    Draw.color(this.trailColor)
	    Drawf.tri(b.x, b.y, this.trailWidth * 2, this.trailWidth * 2, b.rotation());
	  },
		update(b){
			let tx = null
			let ty = null
		  if(b.owner instanceof Unit){
		  	tx = b.owner.aimX
		    ty = b.owner.aimY
		  	}
	 	  if(b.owner instanceof Turret.TurretBuild){
		  	tx = b.owner.targetPos.x
		    ty = b.owner.targetPos.y
	    }
		  //just to double check
			if(tx != null && ty != null){
			  let ang = Angles.moveToward(b.rotation(), b.angleTo(tx, ty), this.turningPower * Time.delta * 50);
			  if(b.timer.get(0, this.targetTime)){
			    if(this.homingCap > -1){
			      if(this.homingCap > b.data.homeCount){
	            b.rotation(ang)
		          b.vel.setAngle(ang);
			      }
			    }else if(this.homingCap <= -1){
			      b.rotation(ang)
			      b.vel.setAngle(ang);
			    }
			  }
			  if(b.within(tx, ty, this.hitSize / 2)){
			    if(this.homingCap > -1){
	          b.data.homeCount++
			    }
			  } 
			  //flib.printer(tx, ty, ang, b.data.homeCount)
		  }
			b.data.trail.update(b.x, b.y);
		}
	});
	flib.merge(overseerStat, overide)
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
   flib.merge(tractor, object)
   return tractor;
}

function pointDef(object){
  let beamEffect = Fx.pointBeam
  let point = extend(BulletType, {
    range(){
       return this.length
    },
    update(b){
      let target = Groups.bullet.intersect(b.x - this.range(), b.y - this.range(), this.range() * 2, this.range() * 2).min(t => t.team != b.team && t.type.hittable, t => t.dst2(b));
      
      b.data = target
      b.vel.set(0,0)// overriding speed wont matter anymore
      
      if(target != null && target.within(b, this.range()) && target.team != b.team && target.type != null && target.type.hittable){
        
        if(target.damage() > this.absorbableDamage){
          target.damage(target.damage() - this.absorbableDamage);
        }else{
          target.remove();
          beamEffect.at(b.x, b.y, b.rotation, Color.white, new Vec2().set(target));
        }
      }
    },
    speed: 0.0001,
    length: 5 * 8,
    absorbableDamage: 20,
    absorbable: false,
    hittable: false,
    collides: false,
    collidesAir: false,
    collidesTiles: false,
    collidesGround: true,
    keepVelocity: false,
    pierce: true,
    smokeEffect: Fx.none,
    shootEffect: Fx.none,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    lifetime: 1,
  });
  flib.merge(point, object)
  return point
}

function orbitBullet(object){
  let orbit = extend(BasicBulletType, {
    init(b){
      if(!b) return
      b.data = []
      for(let i = 0; i < this.orbiterAmount; i++){
        //b.data[0] is reserved for angle
        b.data[i + 1] = new Trail(this.orbiterTrailLength)
      }
    },
    update(b){
      let angle = (360 / this.orbiterAmount)
      b.data[0] = angle
      if(b.timer.get(0, this.orbiterST)){
        for(let i = 0; i < this.orbiterAmount; i++){
          let ox = b.x + Angles.trnsx(angle * i + Time.time, this.orbitRadius)
          let oy = b.y + Angles.trnsy(angle * i + Time.time, this.orbitRadius)
          this.orbiter.create(b.owner, ox, oy, b.rotation())
        }
      }
      //Please suggest something better than this
      for(let j = 0; j < this.orbiterAmount; j++){
        let ox = b.x + Angles.trnsx(angle * j + Time.time, this.orbitRadius)
        let oy = b.y + Angles.trnsy(angle * j + Time.time, this.orbitRadius)
        b.data[j + 1].update(ox, oy)
      }
    },
    draw(b){
      let angle = b.data[0]
      dlib.fillCircle(b.x, b.y, this.orbiterColor, 1, (this.orbiterAmount * 1.5) * b.fout())
      for(let i = 0; i < this.orbiterAmount; i++){
        let ox = b.x + Angles.trnsx(angle * i + Time.time, this.orbitRadius)
        let oy = b.y + Angles.trnsy(angle * i + Time.time, this.orbitRadius)
        dlib.fillCircle(ox, oy, this.orbiterColor, 1, this.orbiterRadius * b.fout())
        b.data[i + 1].draw(this.orbiterColor, this.orbiterTrailWidth)
      }
    },
    orbiter: Bullets.standardCopper,
    orbiterST: 25,
    orbiterAmount: 4,
    orbiterColor: Pal.lancerLaser,
    orbiterRadius: 4,
    orbiterTrailWidth: 2,
    orbiterTrailLength: 15,
    orbitRadius: 16,
    hitEffect: Fx.hitLancer,
    despawnEffect: Fx.hitLancer,
    collides: false,
    collidesTiles: false,
    collidesAir: false,
    collidesGround: false,
  });
  flib.merge(orbit, object)
  return orbit
}

//Credits on Meep for letting me use tractor beam
module.exports = {
	newEarthBendBullet: earthBend,
	newOverSeerBullet: overSeer,
	newTractorBeam: tractorBeam,
	newPointDefBullet: pointDef,
	newOrbitBullet: orbitBullet,
};