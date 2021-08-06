function req(){
  let args = arguments
  for(let i in args){
    let dir = ""
    if(args[i][0] != ""){
      dir = args[i][0] + "/"
    }
    for(let j in args[i]){
      if(args[i][0] != args[i][j]){
        require("heavymachinery/" + dir + args[i][j])
        print("heavymachinery/" + dir + args[i][j])
      }
    }
  }
}

req(
  //Libs
  ["libs", "drawlib", "effectlib", "ai", "function", "bulletTypes", "blockTypes", "planetGen"],
  //No Directory
  ["", "items", "units", "planets"],
  //Blocks
  ["blocks", "content-blocks-production", "miniCore", "reconstructors", "projectors", "turrets", "walls"]
)