let Game = (function Game() {
  let all = []
  return class Game {
    constructor(name, score) {
      this.name = name
      this.score = score
      all.push(this)
    }

    static all() {
      return [...all].sort((a,b) => b.score-a.score)
    }

    render() {
      return `<li class="pokemon-frame" style="margin:auto">${this.name}: ${this.score}</li>`
    }
    static renderScores() {
      const moveContainer = document.getElementById('move-container')
      moveContainer.innerHTML = `
      <h1 class="pokemon-frame" style="margin:auto">SCORE BOARD</h1>
      <p class="pokemon-frame" style="margin:auto">| Name | Score |</p>
      <ol id="scoreBoard"class="pokemon-frame" style="margin:auto"></ol>
      `
      const scoreContainer = document.getElementById('scoreBoard')

      for (var i in this.all()) {
        scoreContainer.innerHTML += this.all()[i].render()
      }
    }

  static renderText(move, attacker, effectiveness) {
    console.log("In renderText");
    let messageBox
    messageBox = document.getElementById('messageBox')
    messageBox.style.visibility = "visible"
    console.log(`found ${messageBox.id}`);
    messageBox.innerHTML = ""
    if (effectiveness > 1) {
      console.log("In renderText in if (effectiveness > 1)");
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}. It was super effective!</p>`
    } else if (effectiveness > 0.5) {
      console.log("In renderText in if (effectiveness > 0.5)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}.</p>`
    } else if (effectiveness > 0) {
      console.log("In renderText in if (effectiveness > 0)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}. It was not very effective!</p>`
    } else {
      console.log("In renderText in if (effectiveness == 0)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}. It had no effect!</p>`
    }
    setTimeout(function() {
      // debugger
      messageBox.innerHTML = ""
      messageBox.style.visibility = "hidden"
    }, 3000)
  }

  }
})()
