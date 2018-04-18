class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1
    this.pokemon2 = pokemon2
  }

  renderMatch() {
    this.pokemon1.health = 500
    this.pokemon2.health = 500
    this.pokemon2.pointsOnWin = this.pokemon2.health
    return `
    <div id="pokemon-1" class="battle-frame-1">
      <img id="back" src="${this.pokemon1.backImage}">
      <h1 class="center-text" data-pokename="${this.pokemon1.name}" id="back-name">${this.pokemon1.name}</h1>
      <progress id="health-1" value="500" max="500"></progress>
    </div>
    <div id="pokemon-2" class="battle-frame-2">
      <h1 class="center-text" id="front-name">${this.pokemon2.name}</h1>
      <progress id="health-2" value="500" max="500"></progress>
      <img id="front" src="${this.pokemon2.frontImage}">
    </div>
    `
  }

  renderAllMoves() {
    if (!this.pokemon1.moveset) {
      let numberofmoves = this.pokemon1.moves().length
      let arrayofmoves = []
      for (let i=0; i<4; i++){
        let move = Math.floor((Math.random() * numberofmoves) + 1);
        if (arrayofmoves.includes(move)) {
          i--
        } else {
          arrayofmoves.push(move)
        }
      }
      this.pokemon1.moveset = arrayofmoves
    }
    return `
    <div>
    ${this.pokemon1.moveset.map(move => this.renderMove(move)).join('')}
    </div>
    `
  }

  renderMove(i) {
    // console.log(i)
    return `
    <button id=${this.pokemon1.moves()[i].id} class="move">${this.pokemon1.moves()[i].name}</button>
    `
  }
}
