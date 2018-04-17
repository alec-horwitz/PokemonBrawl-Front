let Listener = (function Listener() {
  let match = []
  let pickTitle
  let pokemonContainer
  let battleContainer
  let matchContainer
  let moveContainer
  return class Listener {


    static runAll() {
      this.selectPokemon()
    }

    static match() {
      return [...match]
    }

    static selectPokemon() {
      pickTitle = document.getElementById('PICK')
      pokemonContainer = document.getElementById('pokemon-container')
      battleContainer = document.getElementById('battle-container')
      matchContainer = document.getElementById('match-container')
      moveContainer = document.getElementById('move-container')
      pokemonContainer.addEventListener("click", e => {
        if (match.length < 1) {
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          window.scrollTo(0,0);
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        } else {
          let original = Pokemon.all().find(pokemon => e.target.dataset.pokename == pokemon.name)
          let pokemon2 = new Pokemon(original.name, original.frontImage, original.backImage, Pokemon.all().length+1)
          match.push(pokemon2)
          let battle = new Battle(this.match()[0], this.match()[1])
          pokemonContainer.innerHTML = ""
          matchContainer.innerHTML = battle.renderMatch()
          moveContainer.innerHTML = battle.renderMoves()
          this.battleStart()
          pickTitle.innerText = "FIGHT!"
        }
      })
    }

    static battleStart() {
      const moveButton = document.getElementsByClassName('move')[0]
      moveButton.addEventListener("click", e => {
        if (this.match()[1].health > 0) {
          let move = Move.all().find(move => parseInt(e.target.id)=== move.id)
          this.match()[1].health = this.match()[1].health - parseInt(move.power)
        } else {
          clearInterval(attackInterval)
          this.battleOver(true)
        }
      })
      let attackInterval = setInterval(() => {
        if (this.match()[0].health > 0 && this.match()[1].health > 0) {
          this.match()[0].health = this.match()[0].health - 20
        } else {
          clearInterval(attackInterval)
          this.battleOver(false)
        }}, 500)
    }

    static battleOver(userWon) {
      moveContainer.innerHTML = ""
      if (userWon) {
        let score = this.match()[1].pointsOnWin + this.match()[0].health
        pickTitle.innerText = `Congrads You Won With A Score Of: ${score}`
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> CONTINUE?</p>`
      } else {
        match.pop()
        pickTitle.innerText = "DEFEATED!!! You Don't Life Good!"
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> Try Again?</p>`
      }
      document.getElementById('CONTINUE').addEventListener("click", e => {
        matchContainer.innerHTML = ""
        match.pop()
        Pokemon.delete(Pokemon.all().length)
        if (userWon) {
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        } else {
          pickTitle.innerText = "PICK YOUR POKEMON:"
        }
        for (var i in Pokemon.all()) {
          pokemonContainer.innerHTML += Pokemon.all()[i].render()
        }
      })
    }
  }
})()
