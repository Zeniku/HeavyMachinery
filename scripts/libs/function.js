// Lib Made by Zeniku
//detects enemies in a radius use cons(method) on cons
function radiusEnemies(team, x, y, radius, method){
	Units.nearbyEnemies(team, x - radius, y - radius, radius * 2, radius * 2, u => {
		if(u.within(x, y, radius)){
			cons(method).get(u);
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

//don't change the order 
//put this on a "if statement"
function timer(reload){
	let clock =+ Time.delta;
	return (clock >= reload);
	if(clock >= reload){
		clock = 0;
	};
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
	debug: debug,
	pixel: pixel,
	merge: merge,
	mergeII: mergeII
};