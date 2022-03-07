const lonsdaleite = extend(Item, "lonsdaleite", {});
const ignisium = extend(Item, "ignisium", {});

const citem = stringName => Vars.content.getByName(ContentType.item, "heavymachinery-" + stringName);

module.exports = {
	lonsdaleite: citem("lonsdaleite"),
	ignisium: citem("ignisium")
};