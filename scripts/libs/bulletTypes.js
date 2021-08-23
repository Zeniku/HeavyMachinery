// Lib by Zeniku
let text = "heavymachinery/libs/";
let heav = "heavymachinery"

let flib = require(text + "function");
let dlib = require(text + "drawlib");
let elib = require(text + "effectlib");

//look at the libs first
//this is not a great example if you are just beginning to mod

function earthBend(object){
	if(object == undefined) object = {}
	object = Object.assign({
		lifetime: 40,
		speed: 2.5,
		damage: 0,
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
		groundEffectST: 0,
		groundBulletST: 0,
		groundBullet: Bullets.standardCopper,
		groundBullets: 2,
		groundBulletSpacing: 0,
		drawLight(b){
			//nothing
		},
		draw(b){
			//nothing
		},
		update(b){
			if(b.timer.get(0, this.groundEffectST)){
				this.groundEffect.at(b.x, b.y, b.rotation());
				Sounds.place.at(b.x, b.y, 0.42, 1);
			}
			if(b.timer.get(1, this.groundBulletST)){
				this.groundEffect.at(b.x, b.y, b.rotation());
				flib.loop(this.groundBullets, i => {
					let angle = b.rotation() + (i - (this.groundBullets / 2)) * this.groundBulletSpacing
					this.groundBullet.create(b, b.x, b.y, angle);
				})
			};
		},
		estimateDps(){
		  let sum = this.super$estimateDps()
        if(this.groundBullet != null && this.groundBullet != this){
          sum += (this.groundBullet.estimateDps() * this.groundBullets / 2) * (this.lifetime / this.groundBulletST)
        }
        return sum;
		}
	}, object)
	return extend(BasicBulletType, object);
};
//note overriding the bullet type won't work unless you modify the function I think
//but i figured a way so you can override stuff
//Ty Sh1penfire for toggleable 1 time homing
function overSeer(object){
  if(object == undefined) object = {}
  object = Object.assign({
	  damage: 10,
	  trailColor: Pal.lancerLaser,
	  trailWidth: 1,
	  trailLength: 15,
	  turningPower: 10,
	  speed: 2,
	  pierce: true,
	  pierceCap: 5,
	  homeStop: false,
	  targetTime: 15,
	  hitEffect: Fx.hitLancer,
	  despawnEffect: Fx.hitLancer,
	  customTrail: false,
    customTrailST: 0,
    customTrailEffect: Fx.none,
	  init(b){
	    if(!b) return;
	    b.data = {}
	    if(!this.customTrail){
	      b.data.trail = new Trail(this.trailLength);
	    }
	    b.data.home = true
	  },
	  draw(b){
	    if(!this.customTrail){
	      b.data.trail.draw(this.trailColor, this.trailWidth);
	    }
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
			    if(this.homeStop){
			      if(b.data.home){
	            b.rotation(ang)
		          b.vel.setAngle(ang);
			      }
			    }else{
			      b.rotation(ang)
			      b.vel.setAngle(ang);
			    }
			  }
			  if(b.within(tx, ty, this.hitSize / 2)){
			    if(this.homeStop){
	          b.data.home = false
			    }
			  }
			  //flib.printer(tx, ty, ang, b.data.homeCount)
		  }
		  if(!this.customTrail){
			  b.data.trail.update(b.x, b.y);
		  }else {
		    if(b.timer.get(1, this.customTrailST)) {
		      if(this.customTrailEffect != Fx.none) {
		        this.customTrailEffect.at(ox[i], oy[i], b.rotation())
		      }
		    }
		  }
		}
	}, object);
	return extendContent(BasicBulletType, object);
};

function tractorBeam(object){
  if(object == undefined) object = {}
  object = Object.assign({
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
   }, object)
  return extend(BulletType, object);
}

function orbitBullet(object){
  if(object == undefined) object = {}
  object = Object.assign({
    init(b){
      if(!b) return
      b.data = {}
      b.data.trails = []
      if(!this.customTrail){
        flib.loop(this.orbiters, i => {
          b.data.trails[i] = new Trail(this.orbiterTrailLength)
        });
      }
    },
    update(b){
      let angle = (360 / this.orbiters)
      let data = b.data
      let ox = []
      let oy = []
      data.ox = ox
      data.oy = oy
      for(let i in data.trails){
        ox[i] = b.x + Angles.trnsx(angle * i + Time.time, this.orbitRadius);
        oy[i] = b.y + Angles.trnsy(angle * i + Time.time, this.orbitRadius)
        if(!this.customTrail){
          data.trails[i].update(ox[i], oy[i])
        }else {
          if(b.timer.get(1, this.customTrailST)){
            if(this.customTrailEffect != Fx.none){
              this.customTrailEffect.at(ox[i], oy[i], b.rotation())
            }
          }
        }
      };
      if(b.timer.get(0, this.orbiterST)){
        for(let i in data.trails){
          this.orbiter.create(b.owner, ox[i], oy[i], b.rotation())
        };
      }
    },
    draw(b){
      let data = b.data
      let ox = data.ox
      let oy = data.oy
      dlib.fillCircle(b.x, b.y, this.orbiterColor, 1, (this.orbiters * 1.5) * b.fout())
      for(let i in data.trails){
        dlib.fillCircle(ox[i], oy[i], this.orbiterColor, 1, this.orbiterRadius * b.fout())
        if(!this.customTrail){
          data.trails[i].draw(this.orbiterColor, this.orbiterTrailWidth * b.fout())
        }
      };
    },
    estimateDps(){
      let sum = this.super$estimateDps()
      if(this.orbiter != null && this.orbiter != this){
        sum += (this.orbiter.estimateDps() * this.orbiters / 2) * (this.lifetime / this.orbiterST)
      }
      return sum
    },
    orbiter: Bullets.standardCopper,
    orbiterST: 25,
    orbiters: 4,
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
    customTrail: false,
    customTrailST: 0,
    customTrailEffect: Fx.none
  }, object)
  return extend(BasicBulletType, object)
}
// not to be confused on ER's BulletSpawnBulletType
// still the same though
function bulletSpawn(object){
  if(object == undefined) object = {}
  object = Object.assign({
    init(b){
      if(!b) return
      b.data = {}
      b.data.reload = 0
    },
    update(b){
      this.super$update(b)
      this.Ai(b)
      let data = b.data
      if(data.shoot){
        data.reload = Math.min(data.reload + Time.delta, this.reload)
        if(data >= this.reload){
          this.shoot(b, Angles.angle(b.x, b.y, data.shootX, data.shootY))
        }
      }
    },
    shoot(b, a){
      let shots = this.shots
      if(this.shots <= 0) shots = 1
      if(shots > 1){
        flib.loop(shots, i => {
          let shootCone = this.bulletShotShootCone / 2
          let angle = Mathf.clamp((i - (shots / 2)) * this.bulletShotSpacing + Mathf.range(this.bulletShotInaccuracy), -shootCone, shootCone)
          this.bulletShot.create(b, b.x, b.y, angle + a)
        });
      }else if(shots == 1){
        let shootCone = this.bulletShotShootCone / 2
        let angle = Mathf.clamp(Mathf.range(this.bulletShotInaccuracy), -shootCone, shootCone)
        this.bulletShot.create(b, b.x, b.y, angle + a)
      }
    },
    nearbyEnemies(b, range, air, ground){
      return Units.closestTarget(b.team, b.x, b.y, range, u => u.checkTarget(air, ground), t => ground)
    },
    Ai(b){
      let range = this.bulletShot.range()
      let target = this.nearbyEnemies(b, range, this.bulletShot.collidesAir, this.bulletShot.collidesGround)
      if(Units.invalidateTarget(target, b.team, b.x, b.y)){
        target = null
      }
      let shootX = null
      let shootY = null
      let shoot = false
      if(this.enablePredict){
        if(target != null){
          let to = Predict.intersept(b, target, this.bulletShot.speed)
          shootX = to.x
          shootY = to.y
          shoot = target.within(b.x, b.y, range)
        }
      }else{
        if(target != null){
          shootX = target.x
          shootY = target.y
          shoot = target.within(b.x, b.y, range)
        }
      }
      b.data.shoot = shoot
      b.data.shootX = shootX
      b.data.shootY = shootY
    },
    draw(b){
      dlib.fillCircleii(b.x, b.y, this.colorFrom, this.colorTo, b.fin(), 1, this.radius)
      dlib.linePolyii(b.x, b.y, this.colorFrom, this.colorTo, b.fin(), 4, 6, this.radius, Time.time * this.rotationalMultiplier)
    },
    bulletShot: Bullets.standardCopper,
    bulletShotSpacing: 4,
    bulletShotShootCone: 90,
    bulletShotInaccuracy: 5,
    shots: 3,
    colorFrom: Pal.lancerLaser,
    colorTo: Pal.lancerLaser,
    radius: 4,
    rotationalMultiplier: 2,
    enablePredict: true
  }, object)
  return extend(BulletType, object);
}

/*function adaptiveBullet(object){
  if(object == undefined) object = {} 
  Object.assign({
    init(b){
      if(!b) return
      b.data = {}
    },
    hit(b, x, y){
      b.hit = true;
      let data = b.data
      let unit = Units.closestTarget(b.team, x, y, this.hitSize / 2, u => u.checkTarget(this.collidesAir, this.collidesGround), t => this.collidesGround)
      if(unit != null){
        let units = flib.nearbyEnemies(b.team, unit.x, unit.y, 8 * 15, u => {
          data.enemies++
        })
      }
      this.hitEffect.at(x, y, b.rotation(), this.hitColor);
      this.hitSound.at(x, y, this.hitSoundPitch, this.hitSoundVolume);

      Effect.shake(this.hitShake, this.hitShake, b);;

      if(this.fragBullet != null){
        if(data.enemies > 1){
          for(let i = 0; i < (data.enemies / 2); i++){
            let len = Mathf.random(1, 7);
            let a = b.rotation() + Mathf.range(this.fragCone/2) + this.fragAngle;
            this.fragBullet.create(b, x + Angles.trnsx(a, len), y + Angles.trnsy(a, len), a, Mathf.random(this.fragVelocityMin, this.fragVelocityMax), Mathf.random(this.fragLifeMin, this.fragLifeMax));
          }
        }
      }

      if(this.puddleLiquid != null && this.puddles > 0){
        for(let i = 0; i < this.puddles; i++){
          let tile = Vars.world.tileWorld(x + Mathf.range(this.puddleRange), y + Mathf.range(this.puddleRange));
              Puddles.deposit(tile, this.puddleLiquid, this.puddleAmount);
        }
      }

      if(Mathf.chance(this.incendChance)){
        if(unit != null){
          if(!unit.isImmune(StatusEffects.burning)){
            Damage.createIncend(x, y, this.incendSpread, this.incendAmount);
          }
        }
      }

      if(this.splashDamageRadius > 0 && !b.absorbed){
        if(data.enemies > 1){
           Damage.damage(b.team, x, y, this.splashDamageRadius, ((b.damage / data.enemies) * (data.enemies / 2)) * b.damageMultiplier(), this.collidesAir, this.collidesGround);
        }

        if(unit != null){
          unit.type.immunities.each(e => {
            e.opposites.each(s => {
              if(s != StatusEffects.none && !target.isImmune(s)){
                Damage.status(b.team, x, y, this.splashDamageRadius, s, this.statusDuration, this.collidesAir, this.collidesGround);
              }
            })
          })
        }
      }

      if(this.healPercent > 0){
        BlockIndexer.eachBlock(b.team, x, y, this.splashDamageRadius, () => Building.damaged(), other => {
          Fx.healBlockFull.at(other.x, other.y, other.block.size, Pal.heal);
          other.heal(this.healPercent / 100 * other.maxHealth());
        });
      }

      if(this.makeFire){
        BlockIndexer.eachBlock(null, x, y, this.splashDamageRadius, other => other.team != b.team, other => {
          Fires.create(other.tile);
        });
      }

      if(data.enemies > 1){
        for(let i = 0; i < this.lightning; i++){
          Lightning.create(b, this.lightningColor, this.lightningDamage < 0 ? b.damage : this.lightningDamage, b.x, b.y, b.rotation() + Mathf.range(this.lightningCone/2) + this.lightningAngle, this.lightningLength + Mathf.random(this.lightningLengthRand));
        }
      }
    }
  }, object)
  return extend(BasicBulletType, object)
}
*/
function swordBullet(object){
  if(object == undefined) object = {}
  object = Object.assign({
    load(){
      this.super$load()
      this.backRegions = []
      this.frontRegions = []
      if(this.variants > 0){
        for(let i = 0; i < this.variants; i++){
          this.backRegions.push(Core.atlas.find(this.sprite + "-back-" + i, this.backRegion));
          this.frontRegions.push(Core.atlas.find(this.sprite + "-" + i, this.frontRegion));
        }
      }else{
        this.backRegions.push(this.backRegion);
        this.frontRegions.push(this.frontRegion);
      }
    },
    init(b){
      if(!b) return
      b.data = {}
      let dat = b.data
      dat.trail = new Trail(this.trailLength)
      if(dat.crit == null){
        if(Mathf.chance(this.critChance)){
          dat.crit = true
        }else{
          dat.crit = false
        }
      }
      if(dat.crit) b.damage *= this.critMultiplier
      
      if(this.spawnFx != null || this.spawnFx != Fx.none){
        this.spawnFx.at(b)
      }
      let ind = Math.round(Mathf.random(this.frontRegions.length - 1))
      dat.sprite = this.frontRegions[ind]
      dat.spriteBack = this.backRegions[ind]
      this.super$init(b)
    },
    update(b){
      if(!b) return
      this.super$update(b)
      let dat = b.data
      dat.trail.update(b.x, b.y)
      if(dat.crit && Mathf.chanceDelta(1)){
        if(this.critTrail != null || this.critTrail != Fx.none){
          this.critTrail.at(b)
        }
      }
    },
    draw(b){
      if(!b) return
      let dat = b.data
      let height = this.height * ((1 - this.shrinkY) + this.shrinkY * b.fout());
      let width = this.width * ((1 - this.shrinkX) + this.shrinkX * b.fout());
      let offset = -90 + (this.spin != 0 ? Mathf.randomSeed(b.id, 360) + b.time * this.spin : 0)
      
      let mix = Tmp.c1.set(this.mixColorFrom).lerp(this.mixColorTo, b.fin());

      Draw.mixcol(mix, mix.a);

      Draw.color(this.backColor);
      Draw.rect(dat.spriteBack, b.x, b.y, width, height, b.rotation() + offset);
      Draw.color(this.frontColor);
      Draw.rect(dat.sprite, b.x, b.y, width, height, b.rotation() + offset);

      Draw.reset();
      
      dat.trail.draw(this.backColor, this.trailWidth * b.fout())
    },
    backColor: Pal.heal,
    frontColor: Color.white,
    hitColor: Pal.heal,
    shootEffect: Fx.none,
    width: 8 * 3,
    height: 8 * 3,
    sprite: "heavymachinery-swordBullet",
    trailWidth: 10,
    shrinkX: 0,
    shrinkY: 0,
    trailLength: 15,
    critTrail: Fx.none,
    spawnFx: Fx.none,
    critChance: 0.25,
    critMultiplier: 2,
    variants: 5,
  }, object)
  return extend(BasicBulletType, object)
}
/*you
[Credits]:
  MeepOfFaith - for letting me use tractor beam
  Sh1penfire - for the Turret.TurretBuild not Turret
*/
module.exports = {
	EarthBendBullet: earthBend,
	OverSeerBullet: overSeer,
	TractorBeam: tractorBeam,
	OrbitBullet: orbitBullet, 
	BulletSpawner: bulletSpawn,
	//AdaptiveBullet: adaptiveBullet,
	SwordBullet: swordBullet
};