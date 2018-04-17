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
  }

})()
