const planetGen = require("heavymachinery/libs/planetGen");

const caeruleum = extend(Planet, "caeruleum", Planets.sun, 3, 1.25, {
  generator: planetGen.planetGen,
  bloom: true,
  accessible: true,
  hasAtmosphere: true,
  atmosphereColor: Color.valueOf("363f9a"),
  atmosphereRadIn: 0.02,
  atmosphereRadOut: 0.3,
  localizedName: "Caeruleum",
  startSector: 10
});
caeruleum.meshLoader = () => extend(HexMesh, caeruleum, 6, {});