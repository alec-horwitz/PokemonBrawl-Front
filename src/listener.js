let Listener = (function Listener() {
  let match = []
  let pickTitle
  let pokemonContainer
  let battleContainer
  let matchContainer
  let moveContainer
  let game = new Game("default", 0)
  let cpuPower = 39
  let powerRate = 5
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
      let battle = new Battle(this.match()[0], this.match()[1])
      matchContainer.innerHTML = battle.renderMatch()
      moveContainer.innerHTML = battle.renderMoves()

      const moveButton = document.getElementsByClassName('move')[0]
      moveButton.addEventListener("click", e => {
        let move = Move.all().find(move => parseInt(e.target.id)=== move.id)
        if (this.match()[1].health > move.power) {
          this.match()[1].health = this.match()[1].health - parseInt(move.power)
          console.log(`CPU: ${this.match()[1].health}`);
        } else {
          clearInterval(attackInterval)
          this.battleOver(true)
        }
      })
      let attackInterval = setInterval(() => {
        if (this.match()[0].health > cpuPower) {
          this.match()[0].health = this.match()[0].health - cpuPower
          console.log(`Player: ${this.match()[0].health}`);
        } else {
          clearInterval(attackInterval)
          this.battleOver(false)
        }}, 500)


    }

    static battleOver(userWon) {
      console.log(`DPS: ${cpuPower}`);
      moveContainer.innerHTML = ""
      if (userWon) {
        game.score += this.match()[1].pointsOnWin + this.match()[0].health
        pickTitle.innerText = `Congrads You Won With A Score Of: ${game.score}`
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> CONTINUE?</p>`
      } else {
        match.pop()
        pickTitle.innerText = "DEFEATED!!! You Don't Life Good!"
        matchContainer.innerHTML = `
        <p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> Try Again?</p>
        <div id="burnAfterReading"><form id="playerSubmission" class="playerSubmission" action="index.html" method="post">
          <input id="playername" type="text" name="playername" value="">
          <input id="submitName" type="submit" name="submit" value="submit">
        </form></div>`
        const playerFormDiv = document.getElementById('burnAfterReading')
        const playerSubmit = document.getElementById('playerSubmission')
        const playerInput = document.getElementById('playername')
        playerSubmit.addEventListener("submit", function(e) {
          e.preventDefault()
          playerFormDiv.innerHTML = ""
          console.log(playerInput.value);
          game.name = playerInput.value
          Game.renderScores()
          Adapter.postGames(game.name, game.score)
        })
      }
      document.getElementById('CONTINUE').addEventListener("click", e => {
        moveContainer.innerHTML = ""
        matchContainer.innerHTML = ""
        match.pop()
        Pokemon.delete(Pokemon.all().length)
        if (userWon) {
          cpuPower = cpuPower + powerRate
          pickTitle.innerText = "PICK YOUR OPPONENT:"
        } else {
          game = new Game("default", 0)
          pickTitle.innerText = "PICK YOUR POKEMON:"
        }
        for (var i in Pokemon.all()) {
          pokemonContainer.innerHTML += Pokemon.all()[i].render()
        }
      })
    }
  }
})()
