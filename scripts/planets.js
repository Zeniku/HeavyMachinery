const planetGen = require("heavymachinery/libs/planetGen");

const caeruleum = extend(Planet, "caeruleum", Planets.sun, 3, 1.25, {
  generator: planetGen.planetGen,
  bloom: true,
  accessible: true,
  hasAtmosphere: true,
  atmosphereColor: Pal.lancerLaser,
  atmosphereRadIn: 0.06,
  atmosphereRadOut: 0.09,
  localizedName: "Caeruleum"
});