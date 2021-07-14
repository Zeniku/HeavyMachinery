// Lib Made by Zeniku
//detects enemies in a radius use cons(method) on cons
function radiusEnemies(team, x, y, radius, func){
	Units.nearbyEnemies(team, x - radius, y - radius, radius * 2, radius * 2, u => {
		if(u.within(x, y, radius)){
			func(u)
		};
	});
}; 
//its basically uh access the bullet entity that has the same type
function eachBullet(bullet, func){
  Groups.bullet.each(e => {
      if(e.type !== bullet) return;
      func(e);
  });
}
//nearby bullets?
function nearbyBullets(x, y, range, func){
  Groups.bullet.intersect(x - range, y - range, range * 2, range * 2, e => {
    if(e.within(x, y, range)){
      func(e)
    }
  });
}
//lets you not spam print and make it readable when null
function debug(scriptName, array){
  print("-------------------");
  if(scriptName !== null){
    print(scriptName);
  }
  array.forEach((item, i) => {
    if(item !== null){
      if(item instanceof Array){
        item.forEach((items) => {
          print(items)
        });
      }else{
        print(item)
      };
    }else{
        print("Number" + i + "in Array is Null")
    };
  });
  print("-------------------");
};

function printer(){
  for(let i of arguments){
    print(i)
  }
}

//don't change the order 
//put this on a "if statement"
function timer(reload){
	let clock =+ Time.delta;
	if(clock >= reload){
	  return true
		clock = 0;
	}else{
	  return false
	}
};

//Pixel to World Units
function pixel(p){
	return (0.25 * p);
};
//you could always use Object.assign but h
//adds, override, copy, merge i guess
function merge(object, objectII){
  for(let key in objectII){
    object[key] = objectII[key]
  }
}
//basically returns a object so you can stack it on top of another
//like mergeII({}, mergeII({}, {}));
function mergeII(object, objectII){
  let out = {}
  for(let key in object){
    out[key] = object[key]
  }
  for(let keyII in objectII){
    out[keyII] = objectII[keyII]
  }
  return out
}

module.exports = {
	radiusEnemies: radiusEnemies,
	eachBullet: eachBullet,
	nearbyBullets: nearbyBullets,
	debug: debug,
	pixel: pixel,
	merge: merge,
	mergeII: mergeII,
	printer: printer
};