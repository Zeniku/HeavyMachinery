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

function plan(unit, seconds, items){
  return new UnitFactory.UnitPlan(unit, 60 * seconds, items);
};

function plansAdd(fact, planArray){
	planArray.forEach(e => {
	  fact.plans.add(e)
	});
};

//just for debugging
function debug(array){
	for(let j = 0; j < array.length; j++){
		print(array[j]);
	}
};

const pugioneAdd = plan(units.pugione, 25, ItemStack.with(Items.silicon, 100, Items.lead, 80, Items.titanium, 120));
const princepsAdd = plan(units.princeps, 20, ItemStack.with(Items.silicon, 80, Items.lead, 80, Items.titanium, 100))
const araneaAdd = plan(units.aranea, 15, ItemStack.with(Items.silicon, 15, Items.lead, 20));

plansAdd(Blocks.groundFactory, [
  pugioneAdd,
  princepsAdd
]);
plansAdd(Blocks.airFactory, [
  araneaAdd
]);
//debug([reconAdd, plansAdd, units.pugione, units.mucro, units.tragula, units.aranea]);

reconAdd(Blocks.additiveReconstructor, [
	Seq.with(
		units.pugione, 
		units.mucro
	),
	Seq.with(
		units.aranea,
		units.traho
	)
]);
reconAdd(Blocks.multiplicativeReconstructor, [
	Seq.with(
		units.mucro,
		units.tragula
	),
	Seq.with(
	  units.traho,
	  units.spiculum
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