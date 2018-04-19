let Move = (function Move() {
  let all = []
  return class Move {
    constructor(name, power, pokemon_id, id, accuracy, pp, type) {
      this.name = name
      this.power = power
      this.pokemonId = pokemon_id
      this.accuracy = accuracy
      this.id = id
      this.accuracy = accuracy
      this.pp = pp
      this.type = type
      all.push(this)
    }

    static all() {
      return [...all]
    }

    hitChance() {
      let hitChance = Math.floor((Math.random() * 100))
      if (hitChance>this.accuracy) {
        return hitChance = 0
      } else {
        return hitChance = 1
      }
    }
  }
})()
