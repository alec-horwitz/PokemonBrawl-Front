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
    <div id="pokemon-1" class="pokemon-frame">
      <h1 class="center-text" data-pokename="${this.pokemon1.name}">${this.pokemon1.name}</h1>
      <div style="width:96px;margin:auto">
        <img id="${this.pokemon1.id}-back" src="${this.pokemon1.backImage}" style="display:block">
      </div>
    </div>
    <div id="pokemon-2" class="pokemon-frame">
      <h1 class="center-text">${this.pokemon2.name}</h1>
      <div style="width:96px;margin:auto">
        <img id="${this.pokemon2.id}-front" src="${this.pokemon2.frontImage}" style="display:block">
      </div>
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
