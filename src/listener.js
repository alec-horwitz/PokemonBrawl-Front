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
      const battleContainer = document.getElementById('battle-container')
      pokemonContainer.addEventListener("click", e => {
        if (match.length < 1) {
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          window.scrollTo(0,0);
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        } else {
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          let battle = new Battle(this.match()[0], this.match()[1])
          pokemonContainer.innerHTML = ""
          battleContainer.innerHTML = battle.render()
          pickTitle.innerText = "FIGHT!"
        }
      })
    }
  }
})()
