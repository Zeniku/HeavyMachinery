//why like this? because it's already defined on json
function extendItem(name){
  return extend(Item, name, {
  });
};

const lonsdaleite = extendItem("lonsdaleite");

const citem = stringName => Vars.content.getByName(ContentType.item, "heavymachinery-" + stringName);

module.exports = {
	lonsdaleite: citem("lonsdaleite")
};