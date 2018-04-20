class Adapter {
  static getPokemon() {
    fetch("http://localhost:3000/api/v1/pokemons").then(res => res.json()).then(json => {
      json.forEach(pokemon => new Pokemon(pokemon.name, pokemon.front_sprite, pokemon.back_sprite, pokemon.id, pokemon.type1, pokemon.type2))
      const pokemonContainer = document.getElementById('pokemon-container')

      for (var i in Pokemon.all()) {
        pokemonContainer.innerHTML += Pokemon.all()[i].render()
      }
    })
  }

  static getMoves() {
    fetch("http://localhost:3000/api/v1/moves").then(res => res.json()).then(json => {

      json.forEach(move => new Move(move.name, move.power, move.pokemon_id, move.id, move.accuracy, move.pp, move.move_type))
    })
  }
    static getGames() {
    fetch("http://localhost:3000/api/v1/games").then(res => res.json()).then(json => {
      json.forEach(game => new Game(game.playername, game.score))
    })
  }
  static postGames(name, score) {
    fetch("http://localhost:3000/api/v1/games", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({playername: name, score: score})
    })
  }
}
