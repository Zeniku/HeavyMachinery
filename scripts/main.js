
function c(directory, file){
  //dir is for where they at if they are not in a folder then put ""
	let text = []
	let dir = ""
	
	if(directory !== ""){
		dir = directory + "/"
	}else{
		dir = ""
	}
	//get the text you put and puts them onna array with other stuff
	for(let i in file){
		text[i] = "heavymachinery/" + dir + file[i]
	}
	//returns the array
	return {
		text: text
	}
}

const libs = c("libs", ["drawlib", "effectlib", "ai", "function", "bulletlib", "abilities", "libs"]);
const noCat = c("", ["items", "units"]);
const blocks = c("blocks", ["content-blocks-production", "miniCore", "reconstructors", "statusEffectProjector"]);

const heavyMachineryContent = [libs, noCat, blocks];

function req(array){
  //for of returns val
  //for in returns index/key
  for(let i in array){
    for(let j in array[i].text){
      require(array[i].text[j])
    }
  }
}

req(heavyMachineryContent);
// go check PixelCraft for more yes
const autoUpdate = require("heavymachinery-autoUpdate");
autoUpdate.autoUpdate("heavymachinery", "Zeniku/HeavyMachinery", "main");