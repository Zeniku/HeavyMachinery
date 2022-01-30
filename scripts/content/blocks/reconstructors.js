//gets the libs
const HMUnits = require("heavymachinery/content/HMUnits");
const HMItems = require("heavymachinery/content/HMItems");

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
    type: HMUnits.pugione,
    buildTime: 25 * 60,
    requirements: ItemStack.with(
      Items.silicon, 100, 
      Items.lead, 80, 
      Items.titanium, 120
    )
  },
  {
    type: HMUnits.princeps,
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
    type: HMUnits.aranea,
    buildTime: 15 * 60,
    requirements: ItemStack.with(
      Items.silicon, 25,
      Items.lead, 20,
    )
  }
]);

reconAdd(Blocks.additiveReconstructor, [
	Seq.with(
		HMUnits.pugione, 
		HMUnits.mucro
	),
	Seq.with(
		HMUnits.aranea,
		HMUnits.traho
	),
	Seq.with(
    HMUnits.princeps,
    HMUnits.procurator
  )
]);
reconAdd(Blocks.multiplicativeReconstructor, [
	Seq.with(
		HMUnits.mucro,
		HMUnits.tragula
	),
	Seq.with(
	  HMUnits.traho,
	  HMUnits.spiculum
	),
  Seq.with(
    HMUnits.procurator,
    HMUnits.inductor
  )
]);
reconAdd(Blocks.exponentialReconstructor, [
  Seq.with(
    HMUnits.tragula,
    HMUnits.lucius
  ),
  Seq.with(
    HMUnits.spiculum,
    HMUnits.interitus
  )
]);
reconAdd(Blocks.tetrativeReconstructor, [
  Seq.with(
    HMUnits.lucius,
    HMUnits.machaera
  ),
  Seq.with(
    HMUnits.interitus,
    HMUnits.eterius
  )
]);