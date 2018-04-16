class Adapter {
  static getPokemon() {
    fetch("http://localhost:3000/api/v1/pokemons").then(res => res.json()).then(json => {
      json.forEach(pokemon => new Pokemon(pokemon.name, pokemon.front_sprite, pokemon.back_sprite))

      const pokemonContainer = document.getElementById('pokemon-container')
      pokemonContainer.innerHTML=""

      for (var i in Pokemon.all()) {
        pokemonContainer.innerHTML += Pokemon.all()[i].render()
      }
    })
  }

  static getMoves() {
    fetch("http://localhost:3000/api/v1/moves").then(res => res.json()).then(json => {
      json.forEach(move => new Move(move.name, move.power))
    })
  }
}
