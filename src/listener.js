let Listener = (function Listener() {
  let match = []
  return class Listener {
    static runAll() {
      this.selectPokemon()
    }

    static match() {
      return [...match]
    }

    static selectPokemon() {
      const pickTitle = document.getElementById('PICK')
      const pokemonContainer = document.getElementById('pokemon-container')
      pokemonContainer.addEventListener("click", e => {
        if (match.length < 1) {
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        } else {
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        }
      })
    }
  }
})()
