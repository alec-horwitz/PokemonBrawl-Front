let Listener = (function Listener() {
  let match = []
  let pickTitle
  let pokemonContainer
  let battleContainer
  let matchContainer
  let moveContainer
  let health2
  let health1
  let game = new Game("default", 0)
  let cpuPower = 10
  let powerRate = 5

  return class Listener {


    static runAll() {
      this.PickPokemon()
    }

    static match() {
      return [...match]
    }

    static selectPokemon() {
      pokemonContainer = document.getElementById('pokemon-container')
      for (var i in Pokemon.all()) {
        pokemonContainer.innerHTML += Pokemon.all()[i].render()
      }
    }


    static PickPokemon() {
      pickTitle = document.getElementById('PICK')
      battleContainer = document.getElementById('battle-container')
      matchContainer = document.getElementById('match-container')
      moveContainer = document.getElementById('move-container')
      pokemonContainer = document.getElementById('pokemon-container')

      pokemonContainer.addEventListener("click", e => {
        if (match.length < 1) {
          //PICK YOUR POKEMON
          match.push(Pokemon.findByName(e.target.dataset.pokename))
          window.scrollTo(0,0);
          this.PickOpponent()
        }
      })
          // pickTitle.innerText = "PICK YOUR OPPONENT:"
        // } else {
          //CREATE COPY OF OPPONENT POKEMON
    }

    static PickOpponent() {
        let original = Pokemon.randomPokemon()
        // let original = Pokemon.all().find(pokemon => e.target.dataset.pokename == pokemon.name)
        let pokemon2 = new Pokemon(original.name, original.frontImage, original.backImage, Pokemon.all().length+1, original.type1, original.type2)
        match.push(pokemon2)
        pokemonContainer.innerHTML = ""
        pickTitle.innerText = `A wild ${this.match()[1].name} appeared!`
        this.battleStart()
    }

    static battleStart() {
      //Grab Pokemon for battle
      let battle = new Battle(this.match()[0], this.match()[1])
      matchContainer.innerHTML = battle.renderMatch()
      battle.pokemon1.randomizeMoveSet()
      moveContainer.innerHTML = battle.pokemon1.renderAllMoves()
      let health2 = document.getElementById("health-2")
      let moveButton = document.getElementsByClassName('move')
      document.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
          let move
          move = Move.all().find(move => parseInt(e.target.id)=== move.id)
          if (this.match()[1].health > move.power) {
            this.match()[1].health = this.match()[1].health - move.power*move.hitChance()*Pokemon.typeMultiplier(move, battle.pokemon2)
            health2.value = this.match()[1].health;
            Game.renderText(move, battle.pokemon1, Pokemon.typeMultiplier(move, battle.pokemon2))
            this.aiAttack()
          } else {
            health2.value = 0
            setTimeout(this.battleOver(true), 5000);
          }
        }
      })
    }


    static async aiAttack () {
      await Game.sleep(1500)
      let pokeoriginal
      let attackSelect
      let move
      let hitChance
      pokeoriginal = Pokemon.all().find(poke => poke.name === this.match()[1].name)
      pokeoriginal.randomizeMoveSet()
      let allAiMoves = pokeoriginal.moveset
      attackSelect = Math.floor((Math.random() * allAiMoves.length - 1) + 1);
      move = pokeoriginal.moves()[attackSelect]
      hitChance = Math.floor((Math.random() * 100))
      if (hitChance>move.accuracy) {
        hitChance = 0
      } else {
        hitChance = 1
      }
      let attackDamage = (move.power * hitChance * Pokemon.typeMultiplier(move, this.match()[0]))
      health1 = document.getElementById("health-1")
      if (this.match()[0].health > attackDamage) {
        this.match()[0].health = this.match()[0].health - attackDamage
        debugger
        health1.value = this.match()[0].health;
        Game.renderText(move, this.match()[1], Pokemon.typeMultiplier(move, this.match()[0]))
      } else {
        this.match()[0].health = 0
        health1.value = this.match()[0].health;
        await Game.sleep(1000)
        this.battleOver(false)
      }
    }

    static battleOver(userWon) {
      moveContainer.innerHTML = ""
      if (userWon) {
        game.score += this.match()[1].pointsOnWin + this.match()[0].health
        pickTitle.innerText = `Congrats You Won With A Score Of: ${game.score}`
        matchContainer.innerHTML = `<p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> CONTINUE?</p>`
      } else {
        match.pop()
        pickTitle.innerText = `${this.match()[0].name} fainted!`
        matchContainer.innerHTML = `
        <p id="CONTINUE" class="pokemon-frame center-text" style="margin:auto;"> Try Again?</p>
        <div id="burnAfterReading"><form id="playerSubmission" class="playerSubmission" action="index.html" method="post">
          <p id="submit-score">Or Submit Your Name to the Scoreboard:</p>
          <input id="playername" type="text" name="playername" value="">
          <input id="submitName" type="submit" name="submit" value="submit">
        </form></div>`
        const playerFormDiv = document.getElementById('burnAfterReading')
        const playerSubmit = document.getElementById('playerSubmission')
        const playerInput = document.getElementById('playername')
        playerSubmit.addEventListener("submit", function(e) {
          e.preventDefault()
          playerFormDiv.innerHTML = ""
          // console.log(playerInput.value);
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
          this.PickOpponent()
        } else {
          pickTitle.innerText = "PICK YOUR POKEMON:"
          this.selectPokemon()
          this.PickPokemon()
          match = []
        }
      })
    }
  }
})()
