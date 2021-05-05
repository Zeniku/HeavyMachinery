//gets the libs
const units = require("heavymachinery/units");
const item = require("heavymachinery/items");

//adds unut to specified reconstructor
const reconAdd = (recon, planArray) => {
	planArray.forEach(e => {
	    recon.upgrades.add(e.toArray(UnitType));
	});
};

//yeah basically ^^^ but for unit factories
function plansAdd(unit, seconds, items){
	let add = new UnitFactory.UnitPlan(unit, 60 * seconds, items);
	return add;
};

//just for debugging
function debug(array){
	for(let j = 0; j < array.length; j++){
		print(array[j]);
	}
};

const pugioneAdd = plansAdd(units.pugione, 25, ItemStack.with(Items.silicon, 100, Items.lead, 80));
const araneaAdd = plansAdd(units.aranea, 15, ItemStack.with(Items.silicon, 15, Items.lead, 20));

Blocks.groundFactory.plans.add(pugioneAdd);
Blocks.airFactory.plans.add(araneaAdd);

//debug([reconAdd, plansAdd, units.pugione, units.mucro, units.tragula, units.aranea]);

reconAdd(Blocks.additiveReconstructor, [
	Seq.with(
		units.pugione, 
		units.mucro
	)
]);
reconAdd(Blocks.multiplicativeReconstructor, [
	Seq.with(
		units.mucro,
		units.tragula
	)
]);
reconAdd(Blocks.exponentialReconstructor, [
  Seq.with(
    units.tragula,
    units.lucius
  )
]);
reconAdd(Blocks.tetrativeReconstructor, [
  Seq.with(
    units.lucius,
    units.machaera
  )
]);