
const lonsdaleite = extend(Item, "lonsdaleite", {});

const citem = stringName => Vars.content.getByName(ContentType.item, "heavymachinery-" + stringName);

module.exports = {
	lonsdaleite: citem("lonsdaleite")
};