let match = []
document.addEventListener("DOMContentLoaded", function() {
  const pickTitle = document.getElementById('PICK')
  const pokemonContainer = document.getElementById('pokemon-container')
  showPokemon()
  // searchInput.addEventListener("keyup", search)
  pokemonContainer.addEventListener("click", flip)

  function showPokemon(){
    pokemonContainer.innerHTML=""
    // let searchQuery = searchInput.value
    // let charList = [];
    // for (var p in POKEMON["pokemons"]){
    //   if(POKEMON["pokemons"][p]["name"].match(searchQuery))
    //   {
    //     charList.push(POKEMON["pokemons"][p])
    //   }
    // }
    for (var i in POKEMON["pokemons"]) {
      newPokemon = new Pokemon(POKEMON["pokemons"][i]["name"], POKEMON["pokemons"][i]["sprites"])
      pokemonContainer.innerHTML += newPokemon.render()
    }
  }

  function flip(e) {
    // name = e.path[0].id // must add id with the value of this.name to "p" tag in the render() function for this to work
    if (match.length < 2) {
      match.push(Pokemon.findByName(e.target.dataset.pokename))
      pickTitle.innerText = "PICK YOUR OPPNENT:"
    }




    // const nameFront = document.getElementById(`${name}-front`)
    // const nameBack = document.getElementById(`${name}-back`)
    // if (nameFront.style.display == "block") {
    //   nameFront.style.display = "none"
    //   nameBack.style.display = "block"
    // } else {
    //   nameFront.style.display = "block"
    //   nameBack.style.display = "none"
    // }
  }
})
