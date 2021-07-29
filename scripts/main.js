
function req(){
  let args = arguments
  let directory = ""
  if(args[0] != ""){
	    directory = args[0] + "/"
	}
	for(let i in args){
	  if(args[0] != args[i]){
	    require("heavymachinery/" + directory + args[i])
	    print("heavymachinery/" + directory + args[i])
	  }
	}
}
//Libs
req("libs", "drawlib", "effectlib", "ai", "function", "bulletTypes", "blockTypes", "abilities", "planetGen");
//No Directory
req("", "items", "units");
//Blocks
req("blocks", "content-blocks-production", "miniCore", "reconstructors", "projectors", "turrets", "walls");