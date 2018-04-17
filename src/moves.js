let Move = (function Move() {
  let all = []
  return class Move {
    constructor(name, power, pokemon_id, id) {
      this.name = name
      this.power = power
      this.pokemonId = pokemon_id
      this.id = id
      all.push(this)
    }

    static all() {
      return [...all]
    }
  }
})()
