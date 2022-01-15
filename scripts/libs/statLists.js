const statV = object => extend(StatValue, object)
const sListVal = status => statV({
  display(table){
    table.row()
    this.tab(table, s => {
      s.left().defaults().padRight(3).left();
      this.sepC((status.maxShield > 0), s, "[lightgray]" + Core.bundle.get("status.maxShield") + ":[] " + status.maxShield)
      this.sepC((status.shieldAmount > 0), s, "[lightgray]" + Core.bundle.get("status.shieldAmount") + ":[] " + status.shieldAmount + " " + StatUnit.perSecond.localized())
      this.sepC((status.shieldRemoved > 0), s, "[lightgray]" + Core.bundle.get("status.shieldRemoved") + ":[] " + status.shieldRemoved + " " + StatUnit.perSecond.localized())
    })
  },
  sepC(condition, table, text){
    if(condition){
      this.sep(table, text)
    }
  },
  sep(table, text){
    table.row()
    table.add(text)
  },
  tab(table, tab){
    table.table(cons(tab))
  }
})

module.exports = {
  statV: statV,
  shieldListVal: sListVal
}