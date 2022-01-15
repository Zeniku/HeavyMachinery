function Libs(){
  let obj = {}
  for(let i of arguments){
    const dir = (i[0] != "")? i[0] + "/" : "";
    i.forEach(e => {
      if(e != i[0]){
        obj[e] = require("heavymachinery/" + dir + e);
      }
    });
  };
  return obj;
}

module.exports = Libs(["libs", "drawlib", "effectlib", "ai", "utils", "bulletTypes", "blockTypes", "planetGen", "statLists"])