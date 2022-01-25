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
  ["libs", "HMUtils", "HMDraw", "HMAi", "planetGen", "statLists"],
  //Content
  ["content", "HMEffects", "HMBulletTypes", "HMBlockTypes", "HMItems", "HMUnits", "HmStatusEffects"],
  //Blocks
  ["content/blocks", "HMBlocks", "reconstructors"],
  //Campaign
  ["campaign", "planets"]
)
