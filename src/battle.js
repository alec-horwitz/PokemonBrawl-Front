battles = []

class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1
    this.pokemon2 = pokemon2
    battles.push(this)
  }

  renderMatch() {
    this.pokemon1.health = 250
    this.pokemon2.health = 250
    this.pokemon2.pointsOnWin = this.pokemon2.health
    return `
    <div id="pokemon-1" class="battle-frame-1">
        <img id="back" src="${this.pokemon1.backImage}">
      <div class="name-frame-1">
        <h3 class="center-text" data-pokename="${this.pokemon1.name}" id="back-name">${this.pokemon1.name}</h1>
        <progress id="health-1" value="250" max="250"></progress>
      </div>
    </div>
    <div id="pokemon-2" class="battle-frame-2">
        <img id="front" src="${this.pokemon2.frontImage}">
      <div class="name-frame-2">
        <h3 class="center-text" id="front-name">${this.pokemon2.name}</h1>
        <progress id="health-2" value="250" max="250"></progress>
      </div>
    </div>
    `
  }


}
