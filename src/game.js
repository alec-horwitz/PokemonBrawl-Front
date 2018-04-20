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
      return `<tr><td>${this.name}:</td> <td>${this.score}</td></tr>`
    }
    static renderScores() {
      const scoreContainer = document.getElementById('score-container')
      scoreContainer.innerHTML = `
      <h1 id="score-header"class="pokemon-frame" style="margin:auto">Score Board</h1>
      <table id="score"style="width:100%">
        <tr>
          <th> Name </th>
          <th> Score </th>
        </tr>
      <table>
      `
      const score = document.getElementById('score')

      for (var i in this.all()) {
        score.innerHTML += this.all()[i].render()
      }
    }

  static renderText(move, attacker, effectiveness) {
    // console.log("In renderText");
    let messageBox
    messageBox = document.getElementById('messageBox')
    messageBox.style.visibility = "visible"
    // console.log(`found ${messageBox.id}`);
    messageBox.innerHTML = ""
    if (effectiveness > 1) {
      // console.log("In renderText in if (effectiveness > 1)");
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}! It was super effective!</p>`
    } else if (effectiveness > 0.5) {
      // console.log("In renderText in if (effectiveness > 0.5)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}!</p>`
    } else if (effectiveness > 0) {
      // console.log("In renderText in if (effectiveness > 0)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}! It was not very effective!</p>`
    } else {
      // console.log("In renderText in if (effectiveness == 0)")
      messageBox.innerHTML = `<p>${attacker.name} used ${move.name}! It had no effect!</p>`
    }

    setTimeout(function() {
      // debugger
      messageBox.innerHTML = ""
      messageBox.style.visibility = "hidden"
    }, 1500)
  }

  static sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  }
})()
