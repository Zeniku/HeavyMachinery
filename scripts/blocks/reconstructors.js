//gets the libs
const units = require("heavymachinery/units");
const item = require("heavymachinery/items");

//adds unit to specified reconstructor
const reconAdd = (recon, planArray) => {
	planArray.forEach(e => {
	    recon.upgrades.add(e.toArray(UnitType));
	});
};

//yeah basically ^^^ but for unit factories
const plansAdd = (fact, planArray) => {
	planArray.forEach(e => {
    fact.plans.add(new UnitFactory.UnitPlan(e.type, e.buildTime, e.requirements))
	})
};

plansAdd(Blocks.groundFactory, [
  {
    type: units.pugione,
    buildTime: 25 * 60,
    requirements: ItemStack.with(
      Items.silicon, 100, 
      Items.lead, 80, 
      Items.titanium, 120
    )
  },
  {
    type: units.princeps,
    buildTime: 20 * 60,
    requirements: ItemStack.with(
      Items.silicon, 80, 
      Items.lead, 80, 
      Items.titanium, 100
    )
  },
]);
plansAdd(Blocks.airFactory, [
  {
    type: units.aranea,
    buildTime: 15 * 60,
    requirements: ItemStack.with(
      Items.silicon, 25,
      Items.lead, 20,
    )
  }
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