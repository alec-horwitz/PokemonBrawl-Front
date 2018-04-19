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
      const scoreContainer = document.getElementById('score-container')
      scoreContainer.innerHTML = `
      <h1 class="pokemon-frame" style="margin:auto">SCORE BOARD</h1>
      <p class="pokemon-frame" style="margin:auto">| Name | Score |</p>
      <ol id="scores" style="margin:auto"></ol>
      `
      const scores = document.getElementById('scores')
      for (var i in this.all()) {
        scores.innerHTML += this.all()[i].render()
      }
    }
  }

})()
