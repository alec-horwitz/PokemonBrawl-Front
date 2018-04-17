class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1
    this.pokemon2 = pokemon2
  }

  renderMatch() {
    this.pokemon1.health = 100
    this.pokemon2.health = 100
    this.pokemon2.pointsOnWin = this.pokemon2.health
    return `
    <div id="pokemon-1" class="battle-frame-1">
      <img id="back" src="${this.pokemon1.backImage}">
      <h1 class="center-text" data-pokename="${this.pokemon1.name}" id="back-name">${this.pokemon1.name}</h1>
      <progress id="health-1" value="100" max="100"></progress>
    </div>
    <div id="pokemon-2" class="battle-frame-2">
      <h1 class="center-text" id="front-name">${this.pokemon2.name}</h1>
      <progress id="health-2" value="100" max="100"></progress>
      <img id="front" src="${this.pokemon2.frontImage}">
    </div>
    `
  }

  renderMoves() {
    return `
    <div>
    <button id=${this.pokemon1.moves()[0].id} class="move">${this.pokemon1.moves()[0].name}</button>
    </div>
    `
  }
}
