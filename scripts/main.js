function req(){
  for(let i of arguments){
    const dir = (i[0] != "")? i[0] + "/" : "";
    i.forEach(e => {
      if(e != i[0]){
        print("heavymachinery/" + dir + e)
        require("heavymachinery/" + dir + e)
      }
    })
  }
}

req(
  //Libs
  ["libs", "libraries", "drawlib", "effectlib", "ai", "utils", "bulletTypes", "blockTypes", "planetGen", "statLists"],
  //No Directory
  ["", "items", "units", "statusEffects"],
  //Campaign
  ["campaign", "planets"],
  //Blocks
  ["blocks", "content-blocks-production", "miniCore", "reconstructors", "projectors", "turrets", "walls"]
)