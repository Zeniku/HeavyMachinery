
function req(){
  let args = arguments
  let directory = ""
	for(let i in args){
	  if(args[0] != ""){
	    directory = args[0] + "/"
	  }
	  if(args[0] == args[i]) return
	  require("heavymachinery/" + directory + args[i])
	}
}
//Libs
req("libs", ["drawlib", "effectlib", "ai", "function", "bulletlib", "abilities", "planetGen"]);
//No Directory
req("", ["items", "units"]);
//Blocks
req("blocks", ["content-blocks-production", "miniCore", "reconstructors", "projectors", "turrets", "walls"]);