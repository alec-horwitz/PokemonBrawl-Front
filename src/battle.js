class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1
    this.pokemon2 = pokemon2
  }

  render() {
    return `
    <div id="pokemon-1" class="pokemon-frame">
    <h1 class="center-text" data-pokename="${this.pokemon1.name}">${this.pokemon1.name}</h1>
    <div style="width:96px;margin:auto" data-pokename="${this.pokemon1.name}">
    <img id="${this.pokemon1.name}-front" data-pokename="${this.pokemon1.name}" src="${this.pokemon1.frontImage}" style="display:none">
    <img id="${this.pokemon1.name}-back" data-pokename="${this.pokemon1.name}" src="${this.pokemon1.backImage}" style="display:block">
    </div>
    </div>
    <div id="pokemon-2" class="pokemon-frame">
    <h1 class="center-text" data-pokename="${this.pokemon2.name}">${this.pokemon2.name}</h1>
    <div style="width:96px;margin:auto" data-pokename="${this.pokemon2.name}">
    <img id="${this.pokemon2.name}-front" data-pokename="${this.pokemon2.name}" src="${this.pokemon2.frontImage}" style="display:block">
    <img id="${this.pokemon2.name}-back" data-pokename="${this.pokemon2.name}" src="${this.pokemon2.backImage}" style="display:none">
    </div>
    </div>
    `
  }
}
