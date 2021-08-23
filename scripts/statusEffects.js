let text = "heavymachinery-"
let lib = "heavymachinery/libs/"

let flib = require(lib + "function")
let statList = require(lib + "statLists")

function status(name, stats){
  if(stats == undefined) stats = {}
  stats = Object.assign({
    load(){
      this.super$load()
      this.region = Core.atlas.find(this.name)
    },
    icons(icon){
      return this.region
    },
    isHidden(){
      return false
    },
  }, stats)
  return extend(StatusEffect, name, stats)
}

const shielded = status("shielded", {
  setStats(){
    this.super$setStats()
    this.stats.add(Stat.shieldHealth, Core.bundle.get("yes.yes"));
    this.stats.add(Stat.shieldHealth, statList.shieldListVal(this))
  },
  update(u, time){
    this.super$update(u, time)
    if(u.shield < this.maxShield){
      u.shield = Math.min(u.shield + (this.shieldAmount / 60), this.maxShield)
    }
  },
  shieldAmount: 20,
  maxShield: 250,
});

const shieldBreak = status("shieldBreak", {
  setStats(){
    this.super$setStats()
    this.stats.add(Stat.shieldHealth, Core.bundle.get("yes.yes"));
    this.stats.add(Stat.shieldHealth, statList.shieldListVal(this));
  },
  update(u, time){
    this.super$update(u, time)
    if(u.shield > 0){
      u.shield = Math.max(u.shield + (-this.shieldRemoved / 60), 0)
    }
  },
  shieldRemoved: 20
})

shielded.opposite(shieldBreak)
shieldBreak.opposite(shielded)