//basically gets all the libraries and put them on a lib because yes
function reqLib(name){
	return require("heavymachinery/libs/" + name);
};
module.exports = {
	elib: reqLib("effectlib"),
	dlib: reqLib("drawlib"),
	AI: reqLib("ai"),
	flib: reqLib("function"),
	blib: reqLib("bulletlib")
}