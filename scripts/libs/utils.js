// Lib Made by Zeniku
//detects enemies in a radius
function radiusEnemies(team, x, y, radius, func){
	return Units.nearbyEnemies(team, x - radius, y - radius, radius * 2, radius * 2, u => {
		if(u.within(x, y, radius)){
			func(u)
		};  
	});
}; 

//detects enemy bullets
function nearbyBullets(team, x, y, range, func){
  Groups.bullet.intersect(x - range, y - range, range * 2, range * 2, b => {
    if(b.within(x, y, range)){
      if(b.team != team){
        func(b)
      }
    }
  });
}

//lets you not spam print and make it readable when null
function debug(scriptName, array){
  if(scriptName != null){
    print(scriptName);
  }
  for(let i of array){
    if(i != null){
      if(typeof(i) == "object"){
        debug(null, i)
      }else{
        print(i)
      }
    }else{
      print("sad")
    }
  }
};

//Haha code steal go brrrr clone from one of meeps
function clone(obj){
  if(obj === null || typeof(obj) !== 'object') return obj;
  let copy = obj.constructor();
  for(let key in obj) {
    if(obj.hasOwnProperty(key)){
      copy[key] = obj[key];
    }
  };
  return copy;
}

function checkEffect(block, build, condition, aura, effect, amount){
  if(condition){
	  if(aura){
		  for(let i = 0; i < amount; i++){
					if(effect != Fx.none){
					  effect.at(build.x + Angles.trnsx(Mathf.random(360), Mathf.random(block.range)), build.y + Angles.trnsy(Mathf.random(360), Mathf.random(block.range)));
					}
		  };
		}else{
			if(effect != Fx.none){
		    effect.at(build.x, build.y)
		  }
	  }
	};
}

function defined(def, object){
  if(object == undefined) object = {}
  if(def == undefined) def = {}
  return Object.assign(def, object)
}

/*
Credits:
  MeepOfFaith - for the clone()
*/
module.exports = {
	radiusEnemies: radiusEnemies,
	nearbyBullets: nearbyBullets,
	debug: debug,
	clone: clone,
	checkEffect: checkEffect,
	defined: defined
}