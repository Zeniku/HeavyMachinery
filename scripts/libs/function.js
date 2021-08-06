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
//I really Have a problem
function loop(Cap, execute){
  for(let i = 0; i < Cap; i++){
    execute(i)
  }
}

//lets you not spam print and make it readable when null
function debug(scriptName, array){
  if(scriptName != null){
    print(scriptName);
  }
  for(let i in array.length){
    if(array[i] != null){
      if(typeof(array[i]) == "object"){
        debug(null, array[i])
      }else{
        print(array[i])
      }
    }else{
      print("Array Index Number" + i + "is Null")
    }
  }
};

//don't change the order 
//put this on a "if statement

//you could always use Object.assign but h
//adds and overrides
function merge(){
  let args = arguments
  for(let i in args){
    if(typeof(args[i]) !== "object") return
    for(let j in arguments[i]){
      if(args[0] != args[i]){
        args[0][j] = args[i][j]
      }
    }
  };
}
//merge but it makes a new Object
function mergeII(){
  let out = {}
  let args = arguments
  for(let i in args){
    if(typeof(args[i]) !== "object") return 
    for(let j in args[i]){
      out[j] = args[i][j]
    }
  }
  return out
}
//Haha code steal go brrrr clone from one of meeps
function clone(obj){
  if(obj === null || typeof(obj) !== 'object') return obj;
  let copy = obj.constructor();
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      copy[key] = obj[key];
    }
  };
  return copy;
}
/*
Credits:
  MeepOfFaith - for the clone()
*/
module.exports = {
	radiusEnemies: radiusEnemies,
	nearbyBullets: nearbyBullets,
	debug: debug,
	merge: merge,
	mergeII: mergeII,
	loop: loop,
	clone: clone
}