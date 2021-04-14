//why like this? because it's already defined on json
function extendItem(name){
  const item = extendContent(Item, {
    name: "heavymachinery" + name
  });
	return item;
};
const lonsdaleite = extendItem("lonsdaleite");

const citem = stringName => Vars.content.getByName(ContentType.item, "heavymachinery" + "-" + stringName);

module.exports = {
	lonsdaleite: citem("lonsdaleite")
};