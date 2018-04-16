class Adapter {
  static getPokemon() {
    fetch("http://localhost:3000/api/v1/pokemons").then(res => res.json()).then(json => {
      json.forEach(pokemon => new Pokemon(pokemon.name, pokemon.front_sprite, pokemon.back_sprite))
      console.log(json);

      const pokemonContainer = document.getElementById('pokemon-container')
      pokemonContainer.innerHTML=""

      for (var i in Pokemon.all()) {
        pokemonContainer.innerHTML += Pokemon.all()[i].render()
      }
    })
  }
}
