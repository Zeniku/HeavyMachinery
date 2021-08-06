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

reconAdd(Blocks.additiveReconstructor, [
	Seq.with(
		units.pugione, 
		units.mucro
	),
	Seq.with(
		units.aranea,
		units.traho
	),
	Seq.with(
    units.princeps,
    units.procurator
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
	),
  Seq.with(
    units.procurator,
    units.inductor
  )
]);
reconAdd(Blocks.exponentialReconstructor, [
  Seq.with(
    units.tragula,
    units.lucius
  ),
  Seq.with(
    units.spiculum,
    units.interitus
  )
]);
reconAdd(Blocks.tetrativeReconstructor, [
  Seq.with(
    units.lucius,
    units.machaera
  ),
  Seq.with(
    units.interitus,
    units.eterius
  )
]);