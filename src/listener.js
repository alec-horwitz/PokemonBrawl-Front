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
      const matchContainer = document.getElementById('match-container')
      const moveContainer = document.getElementById('move-container')
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
          this.attack()
          // this.aiAttack()
          pickTitle.innerText = "FIGHT!"
        }
      })
    }

    static attack() {
      const moveButton = document.getElementsByClassName('move')[0]
      moveButton.addEventListener("click", e => {
        if (this.match()[1].health > 0) {
          let move = Move.all().find(move => parseInt(e.target.id)=== move.id)
          this.match()[1].health = this.match()[1].health - parseInt(move.power)
          console.log(`pokemon 2 health is ${this.match()[1].health}`)
        } else {
          clearInterval(attackInterval)
          this.battleOver(true)
        }
      })
      let attackInterval = setInterval(() => {
        if (this.match()[0].health > 0 && this.match()[1].health > 0) {
          this.match()[0].health = this.match()[0].health - 20
          console.log(`pokemon 1 health is ${this.match()[0].health}`)
        } else {
          clearInterval(attackInterval)
          this.battleOver(false)
        }}, 500)
    }

    // static aiAttack() {
    //
    // }

    static battleOver(userWon) {
      const pokemonContainer = document.getElementById('pokemon-container')
      const matchContainer = document.getElementById('match-container')
      const moveContainer = document.getElementById('move-container')
      const pickTitle = document.getElementById('PICK')
      moveContainer.innerHTML = ""
      if (userWon) {
        let score = this.match()[1].pointsOnWin + this.match()[0].health
        pickTitle.innerText = `Congrads You Won With A Score Of: ${score}`
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> CONTINUE?
        </p>`
        document.getElementById('CONTINUE').addEventListener("click", e => {
          matchContainer.innerHTML = ""
          match.pop()
          pickTitle.innerText = "PICK YOUR OPPONENT:"
          // debugger
          for (var i in Pokemon.all()) {
            pokemonContainer.innerHTML += Pokemon.all()[i].render()
          }
        })
      } else {
        match.pop()
        pickTitle.innerText = "DEFEATED!!! You Don't Life Good!"
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> Try Again?
        </p>`
        document.getElementById('CONTINUE').addEventListener("click", e => {
          matchContainer.innerHTML = ""
          match.pop()
          pickTitle.innerText = "PICK YOUR POKEMON:"
          // debugger
          for (var i in Pokemon.all()) {
            pokemonContainer.innerHTML += Pokemon.all()[i].render()
          }
        })
      }
    }
  }
})()
